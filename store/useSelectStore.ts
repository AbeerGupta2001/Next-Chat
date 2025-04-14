import { Conversation, Group } from "@/types";
import { create } from "zustand"
import { persist,createJSONStorage } from "zustand/middleware"


type UseSelectStoreProps = {
    selectedUser: Conversation | null;
    setSelectedUser: (user:Conversation| null)=>void;
    selectedGroup: Group | null;
    setSelectedGroup: (user: Group | null) => void
}



export const useSelectStore = create<UseSelectStoreProps>()(
    persist(
        (set) => ({
            selectedUser: null,
            setSelectedUser: (user:Conversation|null)=>set({selectedUser:user}),
            selectedGroup:null,
            setSelectedGroup: (conversation:Group|null) => set({selectedGroup:conversation})
        }),
        {
            name: 'select-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)