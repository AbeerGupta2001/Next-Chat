import { ReactNode } from 'react'
import DesktopNav from '@/components/desktop/DesktopNav'
import MobileNav from '@/components/mobile/MobileNav'

const SidebarWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col lg:flex-row">
            <DesktopNav />
            <main className="w-full lg:h-full h-[calc(100%-80px)] ">
                {children}
            </main>
            <MobileNav />
        </div>
    )
}
export default SidebarWrapper
