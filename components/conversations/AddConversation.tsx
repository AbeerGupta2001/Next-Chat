'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { KeyboardEvent, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import toast from 'react-hot-toast'
import { handleError } from '@/lib/utils'

const AddConversation = () => {
    const [email, setEmail] = useState('')
    const [isOpen,setIsOpen] = useState(false)
    const mutate = useMutation(api.request.create)

    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handleSendRequest()
        }
    }

    const handleSendRequest = async() => {
        try {
            await mutate({email}).then(()=>{
                toast.success("Request Sent!")
                setEmail("");
                setIsOpen(false)
            })
        } catch (error) {
            console.log(error)
            toast.error(handleError(error))
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-full size-10 flex items-center justify-center"
                >
                    <Plus className="size-6 text-neutral-950 dark:text-neutral-50" />
                </Button>
            </DialogTrigger>
            <DialogContent className="py-6 px-4">
                <DialogHeader>
                    <DialogTitle className="text-neutral-950 text-2xl font-semibold dark:text-neutral-50">
                        Send Request
                    </DialogTitle>
                    <DialogDescription className="text-lg font-medium text-neutral-700 dark:text-neutral-200">
                        Enter a email:
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <Input
                        type="email"
                        placeholder="Enter a email address"
                        className="placeholder:text-neutral-600 dark:placeholder:text-neutral-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <DialogFooter>
                    <DialogClose className="py-3 px-2">Close</DialogClose>
                    <Button onClick={handleSendRequest} className="px-2 py-3">Send Request</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddConversation
