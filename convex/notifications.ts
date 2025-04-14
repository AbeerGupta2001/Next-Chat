import { v } from "convex/values";
import { internalMutation } from "./_generated/server";





export const remove = internalMutation({
    args: { notificationId:v.id("notifications") },
    handler: async(ctx,args)=>{
        await ctx.db.delete(args.notificationId)
    }
})