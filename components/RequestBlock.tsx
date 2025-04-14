import { RequestBlockProps } from '@/types'
import { Card } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { Check, X } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import toast from 'react-hot-toast'
import { handleError } from '@/lib/utils'

const RequestBlock = ({ fullName, imageUrl, requestId }: RequestBlockProps) => {
    const acceptMutate = useMutation(api.request.accept);

    const handleAcceptRequest = async()=>{
        try {
            await acceptMutate({requestId}).then(()=>toast.success("Request Accepted"))
        } catch (error) {
            console.error(error)
            toast.error(handleError(error))
        }
    }
    return (
        <Card className="w-full px-4 py-3 rounded-lg flex items-center flex-row justify-between">
            <div className="flex items-center gap-2">
                <Image
                    src={imageUrl}
                    alt="user image"
                    width={45}
                    height={45}
                    className="rounded-full"
                />
                <span className="text-xl font-semibold dark:text-neutral-50">
                    {fullName}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-red-400 dark:bg-red-400 hover:bg-red-600 dark:hover:bg-red-600"
                >
                    <X />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-green-400 dark:bg-green-400 hover:bg-green-600 dark:hover:bg-green-600"
                    onClick={handleAcceptRequest}
                >
                    <Check />
                </Button>
            </div>
        </Card>
    )
}
export default RequestBlock
