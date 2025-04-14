"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import PracticeComponent from "../PracticeComponent";
import { useSelectStore } from "@/store/useSelectStore";
import GroupAndConverationBlockSkeleton from "../skeleton/GroupAndConverationBlockSkeleton";

const GroupList = () => {
  const groups = useQuery(api.conversations.getGroups);
  const { selectedGroup,setSelectedGroup } = useSelectStore()
  return (
      <div className="flex-1 w-full overflow-y-auto flex flex-col space-y-2 mt-4">
          {groups
              ? groups.map((group) => (
                    <PracticeComponent
                        conversationId={group._id}
                        name={group.name || ''}
                        id={group}
                        lastMessage={group.lastMessage}
                        select={selectedGroup}
                        setSelect={setSelectedGroup}
                        key={group._id}
                        isGroup={group.isGroup}
                    />
                ))
              : [...Array(4)].map((_,i)=>(
                <GroupAndConverationBlockSkeleton key={i} />
              ))}
      </div>
  )
}
export default GroupList