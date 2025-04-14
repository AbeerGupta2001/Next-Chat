import ActionComponent from "@/components/ActionComponent"
import GroupDialog from "@/components/group/GroupDialog"
import GroupList from "@/components/group/GroupList"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren


const GroupLayout = ({children}:Props) => {
  return (
      <div className="w-full h-full flex">
          <ActionComponent label="Groups" ActionNode={<GroupDialog />}>
              <GroupList />
          </ActionComponent>
          {children}
      </div>
  )
}
export default GroupLayout