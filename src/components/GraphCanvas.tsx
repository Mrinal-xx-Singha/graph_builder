import React from 'react'
import { useEffect, useCallback } from "react";
import 'reactflow/dist/style.css'
import ReactFlow, { Background, BackgroundVariant, Controls, useEdgesState, useNodesState, type OnSelectionChangeParams } from "reactflow";

import { useAppStore } from "@/store/useAppStore";
import { useAppGraph } from "@/hooks/useAppData";
import ServiceNode from './ServiceNode';

const nodeTypes = {
    service: ServiceNode
}

const GraphCanvas = () => {
    const { selectedAppId, setSelectedNodeId } = useAppStore()
    // fetch data from the mock api whenever selectedAppId changes
    const { data: graphData, isLoading } = useAppGraph(selectedAppId)

    // local state for reactFlow (this allows to drag nodes!)
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgeChange] = useEdgesState([])

    // sync API Data into reactFlows state

    useEffect(() => {
        if (graphData) {
            setNodes(graphData.nodes || [])
            setEdges(graphData.edges || [])
            setSelectedNodeId(null)
        } else {
            setNodes([])
            setEdges([])
        }

    }, [graphData, setNodes, setEdges, setSelectedNodeId])

    // handlde node clicks
    const handleSelectionChange = useCallback(({ nodes }: OnSelectionChangeParams) => {
        // If a node is selected, tell zustand.Otherwise,clear it.

        if (nodes.length > 0) {
            setSelectedNodeId(nodes[0].id)
        } else {
            setSelectedNodeId(null)
        }

    }, [setSelectedNodeId])



    if (!selectedAppId) {
        return <div
            className="flex w-full h-full items-center justify-center text-zinc-500 text-center"
        >Please select an application from the right panel</div>
    }

    if (isLoading) {
        return <div className="flex h-full items-center justify-center text-zinc-500">
            Loading graph....
        </div>
    }
    return (
        <div className="absolute inset-0">
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgeChange}
                onSelectionChange={handleSelectionChange}
                fitView
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    color="#52525b"
                    gap={16}
                />
                <Controls
                    className="bg-zinc-900 fill-zinc-400 stroke-zinc-400"
                />
            </ReactFlow>
        </div>
    )
}

export default GraphCanvas