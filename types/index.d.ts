import { Id } from "@/convex/_generated/dataModel";





interface RequestBlockProps {
    requestId: Id<'requests'>;
    _id: Id<'users'>;
    _creationTime: number;
    fullName: string;
    email: string;
    clerkId: string;
    imageUrl: string;
}


interface Conversation {
    _id: Id<'users'>
    _creationTime: number
    fullName: string
    email: string
    clerkId: string
    imageUrl: string
    lastMessage: string | undefined
    isGroup: boolean
    conversationId: Id<'conversations'>
    currentUserId: Id<"users">;
}

interface Group {
    currentUserId: Id<'users'>
    _id: Id<'conversations'>
    _creationTime: number
    name?: string | undefined
    lastMessage?: string | undefined
    isGroup: boolean
}