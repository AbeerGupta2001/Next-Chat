import { ConvexError, v } from 'convex/values'
import { query } from './_generated/server'

export const getAllMessage = query({
    args: { conversationId: v.id('conversations') },
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

            const conversation = await ctx.db.get(args.conversationId);

            if(!conversation){
                throw new ConvexError("Conversation not found")
            }

            const messages = await ctx.db.query("messages").withIndex("by_conversationId",q=>q.eq("conversationId",args.conversationId)).collect()

            const result = await Promise.all(messages.map(async(message)=>{
                const receiver = await ctx.db.get(message.senderId);
                if(!receiver) throw new ConvexError("User not found");
                return { ...receiver,content:message.content,currentUserId:currentUser._id,createdAt:message._creationTime }
            }))

            return result;
        } catch (error) {
            console.log(error)
            throw error
        }
    },
})
