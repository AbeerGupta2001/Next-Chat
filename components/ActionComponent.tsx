"use client"
import { useConversationIdHook } from '@/hooks/useConversationIdHook'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    label: string
    ActionNode: React.ReactNode
}>

const ActionComponent = ({ ActionNode, children, label }: Props) => {
    const { isActive } = useConversationIdHook()
    return (
        <div className={cn("w-full hidden lg:w-96 h-full py-6 px-4 lg:border-r-4",
            {
                "block":!isActive,
                "lg:block":isActive
            }
        )}>
            <div className="flex items-center justify-between py-2">
                <h1 className="dark:text-neutral-50 text-neutral-950 text-4xl font-bold">
                    {label}
                </h1>
                {ActionNode}
            </div>
            {children}
        </div>
    )
}
export default ActionComponent
