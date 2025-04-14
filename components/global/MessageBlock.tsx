import { Id } from '@/convex/_generated/dataModel'
import { cn, formatTime } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
type MessageBlockProps = {
    content: string
    senderId: Id<'users'>
    currentUserId: Id<'users'>
    imageUrl: string
    createdAt: number
}

const MessageBlock = ({
    content,
    senderId,
    currentUserId,
    imageUrl,
    createdAt,
}: MessageBlockProps) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: currentUserId === senderId ? 50 : -50,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                type: 'spring',
                mass: 0.7,
                damping: 30,
                bounce: 0.25,
            }}
            className={cn(
                'w-1/2 px-1 py-1 flex',
                currentUserId === senderId ? 'self-end' : 'self-start'
            )}
        >
            <div
                className={cn(
                    'flex w-full gap-2',
                    currentUserId === senderId && 'flex-row-reverse'
                )}
            >
                <div>
                    <Image
                        src={imageUrl}
                        alt="user image"
                        width={35}
                        height={35}
                        className="rounded-full"
                    />
                </div>

                <div
                    className={cn(
                        'flex flex-col w-full space-y-1',
                        currentUserId === senderId && 'items-end'
                    )}
                >
                    <p
                        className={cn(
                            'max-w-xs break-words px-2 w-fit py-2 rounded-lg',
                            currentUserId === senderId
                                ? 'bg-neutral-900 dark:bg-neutral-700/60 dark:text-neutral-50 text-neutral-50'
                                : 'bg-neutral-200 dark:text-neutral-900'
                        )}
                    >
                        {content}
                    </p>
                    <span className="text-sm text-neutral-600/50 font-normal dark:text-neutral-400">
                        {formatTime(createdAt)}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
export default MessageBlock
