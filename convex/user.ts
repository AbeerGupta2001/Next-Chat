import { internalMutation } from './_generated/server'
import { v } from 'convex/values'

export const create = internalMutation({
    args: {
        fullName: v.string(),
        email: v.string(),
        clerkId: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('users', {
            fullName: args.fullName,
            clerkId: args.clerkId,
            imageUrl: args.imageUrl,
            email: args.email,
        })
    },
})
