"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import toast from 'react-hot-toast'
import { handleError } from '@/lib/utils'

const GroupDialog = () => {
    const mutate = useMutation(api.conversations.createGroup);
    const [groupName, setGroupName] = useState('')
    const [emails,setEmails] = useState("")
    const [isOpen,setIsOpen] = useState(false)
    const handleCreateGroup = async()=>{
        try {
            await mutate({groupName,emails}).then(()=>{
                toast.success("Group created");
                setEmails("");
                setGroupName("");
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
                        Create a group
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col items-start space-y-2">
                    <div className="flex flex-col items-start w-full">
                        <label className="text-lg font-semibold">
                            Group name:
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter a group name"
                            className="placeholder:text-neutral-600 dark:placeholder:text-neutral-300 mt-2"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label className="text-lg font-semibold">
                            Emails:
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter emails seperated by comma"
                            className="placeholder:text-neutral-600 dark:placeholder:text-neutral-300 mt-2"
                            value={emails}
                            onChange={(e) => setEmails(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose className="py-3 px-2">Close</DialogClose>
                    <Button onClick={handleCreateGroup} className="px-2 py-3">
                        Create Group
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default GroupDialog
