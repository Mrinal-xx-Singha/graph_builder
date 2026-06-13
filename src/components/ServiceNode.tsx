import { Handle, Position, type NodeProps } from 'reactflow'
import { Database, Settings, Cloud } from 'lucide-react'
import { Badge } from './ui/badge'

export default function ServiceNode({ data }: NodeProps) {

    console.log(data);
    

    // Determine badge color based on mock status
    const isError = data.status === 'Error'
    const badgeColor = isError
        ? "bg-red-950 text-red-500 border-red-900"
        : "bg-emerald-950 text-emerald-500 border-emerald-900"

    return (
        <div className="w-[320px] rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-100 shadow-2xl">
            {/* Target Handle (Left side connection dot) */}
            <Handle type="target" position={Position.Left} className="h-3! w-3! border-zinc-950! bg-zinc-500!" />

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-md bg-zinc-900 p-2">
                        <Database className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span className="font-semibold text-lg">{data.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-emerald-900 bg-emerald-950/30 text-emerald-400">
                        $0.03/HR
                    </Badge>
                    <div className="cursor-pointer rounded-md bg-zinc-900 p-1.5 text-zinc-400 hover:text-zinc-100">
                        <Settings className="h-4 w-4" />
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="mb-6 grid grid-cols-4 gap-2 text-center text-xs text-zinc-400">
                <div className="rounded bg-zinc-900/50 p-1">
                    <div className="font-medium text-zinc-100">{data.cpu || "0.02"}</div>
                    <div className="mt-1">CPU</div>
                </div>
                <div className="rounded bg-zinc-900/50 p-1">
                    <div className="font-medium text-zinc-100">{data.memory || "0.05 GB"}</div>
                    <div className="mt-1">Memory</div>
                </div>
                <div className="rounded bg-zinc-900/50 p-1">
                    <div className="font-medium text-zinc-100">10.00 GB</div>
                    <div className="mt-1">Disk</div>
                </div>
                <div className="rounded bg-zinc-900/50 p-1">
                    <div className="font-medium text-zinc-100">1</div>
                    <div className="mt-1">Region</div>
                </div>
            </div>

            {/* Slider Visual */}
            <div className="mb-6 flex items-center gap-3">
                <div className="relative flex-1 h-1.5 rounded-full bg-linear-to-r from-blue-500 via-emerald-500 to-red-500">
                    <div className="absolute left-[20%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-zinc-200 bg-white shadow-md"></div>
                </div>
                <div className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs">
                    0.02
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <Badge variant="outline" className={badgeColor}>
                    {data.status || "Success"}
                </Badge>
                <Cloud className="h-6 w-6 text-yellow-500" /> {/* Placeholder for AWS logo */}
            </div>

            {/* Source Handle (Right side connection dot) */}
            <Handle type="source" position={Position.Right} className="h-3! w-3! border-zinc-950! bg-zinc-500!" />
        </div>
    )
}