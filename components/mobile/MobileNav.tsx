'use client'

import { usePathHook } from '@/hooks/usePathHook'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/ModeToggle'
import { UserButton } from '@clerk/nextjs'

const MobileNav = () => {
    const paths = usePathHook()
    return (
        <div className="lg:hidden fixed bottom-0 inset-x-0 w-full flex items-center justify-around px-2 py-2 border-t-4">
            {paths.map(({ href, label, isActive, icon: Icon }) => (
                <Link
                    key={label}
                    href={href}
                    className={cn(
                        'rounded-full flex items-center justify-center py-4 px-4',
                        isActive && 'bg-gray-300 dark:bg-gray-700'
                    )}
                >
                    <Icon className="size-7 text-gray-950 dark:text-neutral-50" />
                </Link>
            ))}

            <ModeToggle />

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
        </div>
    )
}
export default MobileNav
