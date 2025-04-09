import { ReactNode } from 'react'
import ActionComponent from '@/components/ActionComponent'
import AddConversation from '@/components/conversations/AddConversation'
import UserList from '@/components/conversations/UserList'

const ConversationPageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-full lg:flex flex-none">
            <ActionComponent
                label="Conversations"
                ActionNode={<AddConversation />}
            >
                <UserList />
            </ActionComponent>
            {children}
        </div>
    )
}
export default ConversationPageLayout
