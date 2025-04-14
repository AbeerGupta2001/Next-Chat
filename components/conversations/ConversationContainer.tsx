"use client"
import { useSelectStore } from "@/store/useSelectStore"
import Header from "../global/Header"
import MessageContainer from "../global/MessageContainer"
import InputContainer from "../global/InputContainer"





const ConversationContainer = () => {
  const { selectedUser,setSelectedUser } = useSelectStore()

  if(!selectedUser){
    return null
  }


  return (
      <div className="h-full w-full flex flex-col divide-y divide-neutral-600">
          <Header
              conversationId={selectedUser.conversationId}
              name={selectedUser.fullName}
              imageUrl={selectedUser.imageUrl}
              setSelect={() => setSelectedUser(null)}
          />
          <MessageContainer conversationId={selectedUser.conversationId} />
          <InputContainer conversationId={selectedUser.conversationId} />
      </div>
  )
}
export default ConversationContainer