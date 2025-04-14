"use client"

import { Id } from "@/convex/_generated/dataModel"
import { Input } from "../ui/input"
import { KeyboardEvent, useState } from "react"
import { Button } from "../ui/button"
import { SendHorizonal } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import toast from "react-hot-toast"
import { handleError } from "@/lib/utils"

const InputContainer = ({conversationId}:{conversationId:Id<"conversations">}) => {
    const [message,setMessage] = useState("")
    const mutate = useMutation(api.message.create);
    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Enter"){
        handleMessageSend()
      }
    }
    const handleMessageSend = async() => {
      try {
        await mutate({content:message,conversationId}).then(()=>{
          setMessage("")
          toast.success("Message sent!")
        })
      } catch (error) {
        console.log(error)
        toast.error(handleError(error))
      }
    }
  return (
    <div className="w-full py-1 px-2 relative">
        <Input className="px-2 py-6 focus-visible:outline-none focus-visible:ring-0 border-0 dark:placeholder:text-neutral-50" placeholder="Send a message....." value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={handleKeyDown} />
        <Button size="icon" variant="ghost" className="absolute top-[50%] -translate-y-[50%] right-4" onClick={handleMessageSend}>
          <SendHorizonal className="dark:text-neutral-50 size-7"/>
        </Button>
    </div>
  )
}
export default InputContainer