import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import MessageBlock from "./MessageBlock"
import GroupAndConversationMessageBlockSkeleton from "../skeleton/GroupAndConversationMessageBlockSkeleton"
import { useEffect, useRef } from "react"


const MessageContainer = ({conversationId}:{conversationId:Id<"conversations">}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const messages = useQuery(api.messages.getAllMessage,{
    conversationId
  })

  useEffect(()=>{
    if(!divRef.current) return
    divRef.current.scrollTop = divRef.current.scrollHeight
  },[messages])

  return <div ref={divRef} className="flex-1 px-4 flex flex-col overflow-y-auto space-y-3 py-2 scroll-smooth">
    {
      messages ? messages.map((message,idx)=>(
        <MessageBlock key={idx} content={message.content} currentUserId={message.currentUserId} senderId={message._id} createdAt={message.createdAt} imageUrl={message.imageUrl} />
      )) : ([...Array(6)].map((_,i)=>(
        <GroupAndConversationMessageBlockSkeleton key={i} idx={i} />
      )))
    }
  </div>
}
export default MessageContainer