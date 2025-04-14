import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'

export const create = mutation({
    args: { conversationId: v.id('conversations'), content: v.string() },
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

            const conversation = await ctx.db.get(args.conversationId)

            if(!conversation){
                throw new ConvexError("Conversation not found")
            }

            await ctx.db.insert("messages",{
                content:args.content,
                conversationId: args.conversationId,
                senderId: currentUser._id
            })

        } catch (error) {
            console.log(error)
            throw error
        }
    },
})
