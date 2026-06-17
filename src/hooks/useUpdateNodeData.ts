import { useReactFlow } from 'reactflow'

export function useUpdateNodeData() {
    const { setNodes } = useReactFlow()

    // Reusable function to update the memory of any node by its ID
    const updateNodeMemory = (nodeId: string, sliderVal: number) => {
        // Clamp the math to ensure safety
        const clampedVal = Math.min(Math.max(sliderVal, 0), 100)
        const formattedMemory = `${(clampedVal / 100).toFixed(2)} GB`

        // Update the ReactFlow graph
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            memory: formattedMemory,
                        },
                    }
                }
                return node
            })
        )
    }

    return { updateNodeMemory }
}