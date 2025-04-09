import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    users: defineTable({
        fullName: v.string(),
        email: v.string(),
        clerkId: v.string(),
        imageUrl: v.string(),
    }),
})
