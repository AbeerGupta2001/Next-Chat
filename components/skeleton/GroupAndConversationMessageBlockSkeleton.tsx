import { cn } from '@/lib/utils'

const GroupAndConversationMessageBlockSkeleton = ({ idx }: { idx: number }) => {
    return (
        <div
            className={cn(
                'w-1/2 px-1 py-1 flex',
                idx % 2 === 0 ? 'self-end justify-end' : 'self-start'
            )}
        >
            <div className="max-w-xs px-2 w-full py-4 rounded-lg animate-pulse transition duration-300 bg-neutral-400/90 dark:bg-neutral-700/50" />
        </div>
    )
}
export default GroupAndConversationMessageBlockSkeleton
