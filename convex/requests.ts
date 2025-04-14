import { ConvexError } from "convex/values";
import {  query } from "./_generated/server";




export const getAllRequests = query({
    args: {  },
    handler: async(ctx)=>{
        try {
            const user = await ctx.auth.getUserIdentity();
            if(!user) throw new ConvexError("Unauthorized");

            const currentUser = await ctx.db.query("users").withIndex("by_email",q=>q.eq("email",user.email || "")).unique()

            if(!currentUser){
                throw new ConvexError("User not found");
            }

            const requests = await ctx.db.query("requests").withIndex("by_receiverId",q=>q.eq("receiverId",currentUser._id)).collect()

            const results = await Promise.all(requests.map(async(item)=>{
                const sender = await ctx.db.get(item.senderId)
                if(!sender){
                    throw new ConvexError("User not found")
                }
                return { ...sender,requestId:item._id }
            }))

            return results

        } catch (error) {
            console.log(error)
            throw error
        }
    }
})