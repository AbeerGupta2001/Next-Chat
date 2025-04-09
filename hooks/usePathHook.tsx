import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Home, Users } from 'lucide-react'

export const usePathHook = () => {
    const pathname = usePathname()
    const paths = useMemo(
        () => [
            {
                label: 'Conversations',
                icon: Home,
                href: '/conversations',
                isActive: pathname.startsWith('/conversations'),
            },
            {
                label: 'Groups',
                icon: Users,
                href: '/groups',
                isActive: pathname.startsWith('/groups'),
            },
        ],
        [pathname]
    )
    return paths
}
