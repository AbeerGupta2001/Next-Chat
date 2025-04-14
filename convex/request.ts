import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'
import { internal } from './_generated/api'

//*Creating a new request
export const create = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        try {
            const currentUser = await ctx.runQuery(internal.user.getCurrentUser)

            const receiver = await ctx.db
                .query('users')
                .withIndex('by_email', (q) => q.eq('email', args.email))
                .unique()
            if (!receiver) {
                throw new ConvexError('User not found')
            }

            if (currentUser.email === args.email) {
                throw new ConvexError('Cannot send request to ourself')
            }

            const requestExists = await ctx.db
                .query('requests')
                .withIndex('by_senderId_receiverId', (q) =>
                    q
                        .eq('senderId', currentUser._id)
                        .eq('receiverId', receiver._id)
                )
                .unique()

            if (requestExists) {
                throw new ConvexError('Request already exists')
            }

            const areFriends = await ctx.db.query("friends").filter(q=>q.or(q.and(q.eq(q.field("user1"),currentUser._id),q.eq(q.field("user2"),receiver._id)),q.and(q.eq(q.field("user1"),receiver._id),q.eq(q.field("user2"),currentUser._id)))).unique()

            if(areFriends){
                throw new ConvexError("Already friends");
            }

            const newRequest = await ctx.db.insert('requests', {
                senderId: currentUser._id,
                receiverId: receiver._id,
            })

            if (newRequest) {
                await ctx.db.insert('notifications', {
                    senderId: currentUser._id,
                    type: 'pending',
                    receiverId: receiver._id,
                })
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
})

//*Accept a request
export const accept = mutation({
    args: { requestId: v.id('requests') },
    handler: async (ctx, args) => {
        try {
            const user = await ctx.auth.getUserIdentity()
            if (!user) throw new ConvexError('Unauthorized')

            const currentUser = await ctx.db
                .query('users')
                .withIndex('by_email', (q) => q.eq('email', user.email || ''))
                .unique()

            if (!currentUser) {
                throw new ConvexError('User not found')
            }

            const request = await ctx.db.get(args.requestId)

            if(!request){
                throw new ConvexError("Request not found")
            }
            
            const sender = await ctx.db.get(request.senderId);
            if(!sender){
                throw new ConvexError("User not found")
            }

            const nofiticaitons = await ctx.db.query("notifications").withIndex("by_senderId_receiverId",q=>q.eq("senderId",sender._id).eq("receiverId",currentUser._id)).unique()

            if(!nofiticaitons){
                throw new ConvexError("Notification not found")
            }

            await ctx.db.insert("friends",{
                user1: currentUser._id,
                user2: sender._id
            })

            const conversation = await ctx.db.insert("conversations",{
                isGroup:false
            })

            await ctx.db.insert("conversationMember",{
                memberId:currentUser._id,
                conversationId: conversation
            })

            await ctx.db.insert('conversationMember', {
                memberId: sender._id,
                conversationId: conversation,
            })

            await ctx.db.patch(nofiticaitons._id,{
                type:"accpeted"
            })

            await ctx.db.delete(request._id)

            await ctx.scheduler.runAfter(60 * 1000,internal.notifications.remove,{
                notificationId:nofiticaitons._id
            })


        } catch (error) {
            console.log(error)
            throw error
        }
    },
})
