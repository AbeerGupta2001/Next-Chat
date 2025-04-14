/* eslint-disable @typescript-eslint/no-explicit-any */
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Conversation, Group } from "@/types";

type PracticeProps = {
    imageUrl?: string
    name: string
    conversationId: Id<'conversations'>
    id: Conversation | Group
    lastMessage:string | undefined;
    select:Conversation | Group | null;
    setSelect:(user:any)=>void
    isGroup:boolean;
}


const PracticeComponent = ({conversationId,id,name,imageUrl,lastMessage,select,setSelect,isGroup}:PracticeProps) => {


    
  return (
      <Link
          href={ isGroup ? `/groups/${conversationId}`:`/conversations/${conversationId}`}
          onClick={()=>setSelect(id)}
      >
          <Card
              className={cn(
                  'flex flex-row items-center px-3 gap-4',
                  select === id &&
                      'bg-neutral-300 dark:bg-neutral-700'
              )}
          >
              <div>
                 {
                    imageUrl ? ( <Image
                      src={imageUrl}
                      alt="user image"
                      width={45}
                      height={45}
                      className="rounded-full"
                  />) : (<div></div>)
                 }
              </div>
              <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                      {name}
                  </span>
                  {lastMessage && (
                      <p className="text-sm font-medium text-slate-400 dark:text-slate-100 mt-1">
                          {lastMessage}
                      </p>
                  )}
              </div>
          </Card>
      </Link>
  )
}
export default PracticeComponent