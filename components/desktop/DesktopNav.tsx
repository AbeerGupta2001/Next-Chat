'use client'

import { usePathHook } from '@/hooks/usePathHook'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/ModeToggle'
import { UserButton } from '@clerk/nextjs'
import ToolTipComponent from '@/components/ToolTipComponent'

const DesktopNav = () => {
    const paths = usePathHook()
    return (
        <div className="hidden lg:flex lg:w-20 lg:h-full lg:flex-col lg:px-2 lg:py-6 lg:border-r-2 lg:items-center lg:justify-between">
            <div className="w-full flex flex-col space-y-3">
                {paths.map(({ href, label, isActive, icon: Icon }) => (
                    <ToolTipComponent key={label} label={label}>
                        <Link
                            href={href}
                            className={cn(
                                'rounded-full flex items-center justify-center py-4 px-2',
                                isActive && 'bg-gray-300 dark:bg-gray-700'
                            )}
                        >
                            <Icon className="lg:size-8 size-5 text-gray-950 dark:text-neutral-50" />
                        </Link>
                    </ToolTipComponent>
                ))}
            </div>

            <div className="flex flex-col space-y-4 pb-20 items-center">
                <ToolTipComponent label="Mode Toggle">
                    <ModeToggle />
                </ToolTipComponent>
                <ToolTipComponent label="User Button">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: '2.5rem',
                                    width: '2.5rem',
                                },
                            },
                        }}
                    />
                </ToolTipComponent>
            </div>
        </div>
    )
}
export default DesktopNav
