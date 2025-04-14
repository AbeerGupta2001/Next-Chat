"use client"

import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type HeaderProps = {
    imageUrl?:string;
    name:string;
    conversationId:Id<"conversations">
    setSelect: () => void;
}

const Header = ({conversationId,name,setSelect,imageUrl}:HeaderProps) => {
    const router = useRouter()
    const handleClick = () => {
        setSelect();
        router.back()
    }
  return (
    <div className="w-full h-20 py-4 px-4 flex items-center justify-between ">
        <div className="flex items-center gap-4">
            <Button size="icon" variant="link" onClick={handleClick} className="cursor-pointer rounded-full">
                <ArrowLeft className="size-6 dark:text-neutral-50" />
            </Button>
            <div className="flex items-center gap-2">
                <div>
                    {imageUrl && <Image src={imageUrl} alt="user image" width={40} height={40} className="rounded-full" />}
                </div>
                <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                    {name}
                </span>
            </div>
        </div>
    </div>
  )
}
export default Header