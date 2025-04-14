import FallbackComponent from "@/components/FallbackComponent"

const ConversationsPage = () => {
    return <div className="hidden lg:flex lg:flex-1 lg:w-full">
        <FallbackComponent type="conversation" />
    </div>
}
export default ConversationsPage
