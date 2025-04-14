import { Card } from "../ui/card"



const GroupAndConverationBlockSkeleton = () => {
  return (
      <Card className="flex flex-row items-center px-3 gap-4">
          <div className="size-11 rounded-full animate-pulse transition duration-300 bg-neutral-400/90 dark:bg-neutral-700/50" />
          <div className="w-[250px] h-2 animate-pulse transition duration-300 bg-neutral-400/90 dark:bg-neutral-700/50" />
      </Card>
  )
}
export default GroupAndConverationBlockSkeleton