import { Zap } from 'lucide-react'

const Loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Zap
                className="w-20 h-28 animate-pulse duration-500 transition-all"
                fill="#f9e509"
            />
        </div>
    )
}
export default Loading
