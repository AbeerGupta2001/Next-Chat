



const FallbackComponent = ({type}:{type:"group"|"conversation"}) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-neutral-800">
        {
            type === "group" ? (<TextComponents title="group" />) : (<TextComponents title="conversation" />)
        }
    </div>
  )
}
export default FallbackComponent

const TextComponents = ({title}:{title:string}) => {
    return <p className="text-3xl font-semibold text-neutral-950 dark:text-neutral-50">
        Select a {title} to start a conversation
    </p>
}
