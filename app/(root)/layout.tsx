import { ReactNode } from 'react'
import SidebarWrapper from '@/components/sidebar/SidebarWrapper'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <SidebarWrapper>{children}</SidebarWrapper>
}
export default RootLayout
