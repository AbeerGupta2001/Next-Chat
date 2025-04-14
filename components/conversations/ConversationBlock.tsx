"use client"

import { Conversation } from "@/types"
import { Card } from "../ui/card"
import Image from "next/image"
import Link from "next/link"
import { useSelectStore } from "@/store/useSelectStore"
import { cn } from "@/lib/utils"


type ConversationBlockProps = {
    conversation: Conversation
}

const ConversationBlock = ({conversation}:ConversationBlockProps) => {
    const { setSelectedUser,selectedUser } = useSelectStore()
  return (
      <Link href={`/conversations/${conversation.conversationId}`} onClick={()=>setSelectedUser(conversation)}>
          <Card className={cn("flex flex-row items-center px-3 gap-4",selectedUser?.conversationId === conversation.conversationId && "bg-neutral-300 dark:bg-neutral-700")}>
              <div>
                  <Image
                      src={conversation.imageUrl}
                      alt="user image"
                      width={45}
                      height={45}
                      className="rounded-full"
                  />
              </div>
              <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                      {conversation.fullName}
                  </span>
                  {conversation.lastMessage && (
                      <p className="text-sm font-medium text-slate-400 dark:text-slate-100 mt-1">
                          {conversation.lastMessage}
                      </p>
                  )}
              </div>
          </Card>
      </Link>
  )
}
export default ConversationBlock