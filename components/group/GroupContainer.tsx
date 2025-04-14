"use client"

import { useSelectStore } from "@/store/useSelectStore"
import Header from "../global/Header";
import MessageContainer from "../global/MessageContainer";
import InputContainer from "../global/InputContainer";

const GroupContainer = () => {
    const { selectedGroup,setSelectedGroup } = useSelectStore()
    
    if(!selectedGroup) return null;


  return (
      <div className="h-full w-full flex flex-col divide-y divide-neutral-400">
          <Header
              conversationId={selectedGroup._id}
              name={selectedGroup.name || ''}
              setSelect={() => setSelectedGroup(null)}
          />
          <MessageContainer conversationId={selectedGroup._id} />
          <InputContainer conversationId={selectedGroup._id} />
      </div>
  )
}
export default GroupContainer