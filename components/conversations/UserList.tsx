'use client'

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import RequestBlock from "../RequestBlock";
import { useSelectStore } from "@/store/useSelectStore";
import PracticeComponent from "../PracticeComponent";
import GroupAndConverationBlockSkeleton from "../skeleton/GroupAndConverationBlockSkeleton";

const UserList = () => {
    const requests = useQuery(api.requests.getAllRequests);
    const conversations = useQuery(api.conversations.getAllConversations);
    const { selectedUser,setSelectedUser } = useSelectStore()
    return (
        <div className="mt-4 flex-1 w-full flex flex-col overflow-y-auto space-y-2">
            {requests &&
                requests.map((request) => (
                    <RequestBlock key={request._id} {...request} />
                ))}
            {conversations
                ? conversations.map((conversation) => (
                      <PracticeComponent
                          key={conversation._id}
                          conversationId={conversation.conversationId}
                          id={conversation}
                          isGroup={conversation.isGroup}
                          lastMessage={conversation.lastMessage}
                          name={conversation.fullName}
                          imageUrl={conversation.imageUrl}
                          select={selectedUser}
                          setSelect={setSelectedUser}
                      />
                  ))
                : [...Array(4)].map((_, i) => (
                      <GroupAndConverationBlockSkeleton key={i} />
                  ))}
        </div>
    )
}
export default UserList
