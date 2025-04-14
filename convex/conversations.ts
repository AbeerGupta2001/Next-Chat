import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAllConversations = query({
    args: {},
    handler: async (ctx) => {
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

            const conversations = await ctx.db
                .query('conversationMember')
                .withIndex('by_memberId', (q) =>
                    q.eq('memberId', currentUser._id)
                )
                .collect()

            const otherMembers = await Promise.all(
                conversations.map(async (item) => {
                    const member = await ctx.db
                        .query('conversationMember')
                        .withIndex('by_conversationId', (q) =>
                            q.eq('conversationId', item.conversationId)
                        )
                        .filter((q) =>
                            q.neq(q.field('memberId'), currentUser._id)
                        )
                        .unique()

                    if (!member) {
                        throw new ConvexError('Conversation member not present')
                    }

                    const otherMember = await ctx.db.get(member.memberId)

                    if (!otherMember) {
                        throw new ConvexError('User not present')
                    }

                    const conversation = await ctx.db.get(member.conversationId)
                    if (!conversation) {
                        throw new ConvexError('Conversation not present')
                    }

                    return {
                        lastMessage: conversation.lastMessage,
                        isGroup: conversation.isGroup,
                        conversationId: conversation._id,
                        currentUserId: currentUser._id,
                        ...otherMember,
                    }
                })
            )

            const result = otherMembers.filter((item) => !item.isGroup)

            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    },
})

export const createGroup = mutation({
    args: { groupName: v.string(), emails: v.string() },
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

            const emailArr = args.emails.split(",");
            
            const conversation = await ctx.db.insert("conversations",{
                isGroup:true,
                name:args.groupName
            })

            await ctx.db.insert("conversationMember",{
                memberId: currentUser._id,
                conversationId: conversation
            })

            await Promise.all(emailArr.map(async(email)=>{
                
                //*Find user
                const receiver = await ctx.db.query("users").withIndex("by_email",q=>q.eq("email",email)).unique()
                if(!receiver) throw new ConvexError("User not found");

                //*Are friends or not
                const areFriends = await ctx.db
                    .query('friends')
                    .filter((q) =>
                        q.or(
                            q.and(
                                q.eq(q.field('user1'), currentUser._id),
                                q.eq(q.field('user2'), receiver._id)
                            ),
                            q.and(
                                q.eq(q.field('user1'), receiver._id),
                                q.eq(q.field('user2'), currentUser._id)
                            )
                        )
                    )
                    .unique();
                
                if(!areFriends) throw new ConvexError("Cannot create group with non-friend user");

                //*create conversation

                await ctx.db.insert("conversationMember",{
                    conversationId: conversation,
                    memberId: receiver._id
                })
            }))


        } catch (error) {
            console.log(error)
            throw error
        }
    },
})

export const getGroups = query({
    args:{},
    handler: async(ctx)=>{
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

            const conversations = await ctx.db.query("conversationMember").withIndex("by_memberId",q=>q.eq("memberId",currentUser._id)).collect()

            const result = await Promise.all(conversations.map(async(item)=>{
                const conversation = await ctx.db.get(item.conversationId)
                if(!conversation){
                    throw new ConvexError("Conversation not found")
                }
                return { ...conversation,currentUserId: currentUser._id }
            }))

            const groupConversation = result.filter((item)=> item.isGroup)
            return groupConversation;

        } catch (error) {
            console.log(error)
            throw error
        }
    }
})