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
import { useState } from 'react'

const AddConversation = () => {
    const [email, setEmail] = useState('')
    return (
        <Dialog>
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
                        placeholder="Enter a email address"
                        className="placeholder:text-neutral-600 dark:placeholder:text-neutral-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose className="py-3 px-2">Close</DialogClose>
                    <Button className="px-2 py-3">Send Request</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddConversation
