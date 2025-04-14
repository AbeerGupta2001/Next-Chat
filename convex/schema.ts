import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    users: defineTable({
        fullName: v.string(),
        email: v.string(),
        clerkId: v.string(),
        imageUrl: v.string(),
    }).index("by_clerkId",["clerkId"]).index("by_email",["email"]),
    requests: defineTable({
        senderId: v.id("users"),
        receiverId: v.id("users")
    }).index("by_receiverId",["receiverId"]).index("by_senderId_receiverId",["senderId","receiverId"]),

    friends: defineTable({
        user1: v.id("users"),
        user2: v.id("users")
    }),

    notifications: defineTable({
        senderId:v.id("users"),
        receiverId:v.id("users"),
        type:v.string()
    }).index("by_senderId",["senderId"]).index("by_senderId_receiverId",["senderId","receiverId"]),

    conversations:defineTable({
        isGroup: v.boolean(),
        name: v.optional(v.string()),
        lastMessage: v.optional(v.string())
    }),

    conversationMember: defineTable({
        memberId: v.id("users"),
        conversationId: v.id("conversations")
    }).index("by_memberId",["memberId"]).index("by_conversationId",["conversationId"]),

    messages: defineTable({
        senderId: v.id("users"),
        content:v.string(),
        conversationId: v.id("conversations")
    }).index("by_conversationId",["conversationId"])
})
