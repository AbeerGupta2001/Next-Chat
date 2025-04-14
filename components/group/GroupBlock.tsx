import { Group } from '@/types'
import Link from 'next/link'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'

type GroupBlockProps = {
    group: Group
}

const GroupBlock = ({ group }: GroupBlockProps) => {
    return (
        <Link href={`/conversations/${group._id}`}>
            <Card className={cn("flex flex-row items-center px-3 gap-4")}>
                          <div>
                              
                          </div>
                          <div className="flex flex-col">
                              <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                                  {group.name}
                              </span>
                              {group.lastMessage && (
                                  <p className="text-sm font-medium text-slate-400 dark:text-slate-100 mt-1">
                                      {group.lastMessage}
                                  </p>
                              )}
                          </div>
                      </Card>
        </Link>
    )
}
export default GroupBlock
