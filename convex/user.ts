import { internalMutation, internalQuery } from './_generated/server'
import { ConvexError, v } from 'convex/values'

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

export const getCurrentUser = internalQuery({
    args: {},
    handler: async(ctx) => {
        const user = await ctx.auth.getUserIdentity()
        if(!user){
            throw new ConvexError("Unauthorized")
        }
        const currentUser = await ctx.db.query("users").withIndex("by_email",query=>query.eq("email",user.email||"")).unique()
        if(!currentUser){
            throw new ConvexError("User not found")
        }
        return currentUser
    }
})