import { useReactFlow } from 'reactflow'
import { useApps } from '@/hooks/useAppData'

import { useAppStore } from '@/store/useAppStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Slider } from './ui/slider'
import { Input } from './ui/input'

const RightPanel = () => {
    // global state 
    const { selectedAppId, setSelectedAppId, selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore()


    // fetch mock API data
    const { data: apps, isLoading, isError } = useApps()

    // local state for slider 
    const [sliderValue, setSliderValue] = useState(50)
    const { setNodes, getNode } = useReactFlow()
    useEffect(() => {
        if (selectedNodeId) {
            const node = getNode(selectedNodeId)
            if (node && node.data.memory) {
                // Our mock data uses 0.05GB lets extract just the number for the slider
                const memoryNumber = parseFloat(node.data.memory)
                // Convert to 0-100 scale for the slider 
                setSliderValue(memoryNumber * 100)
            }
        }

    }, [selectedNodeId, getNode])

    // Creating a helper function to fire when the user move the slider
    const handleSliderChange = (newVal: number) => {
        setSliderValue(newVal) // Update the local slider UI
        // Tell ReactFlow to update the specific node on the canvas!
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNodeId) {
                    // It's critical to return a brand NEW object here, or React won't re-render it
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            memory: `${(newVal / 100).toFixed(2)} GB`, // format it nicely
                        },
                    }
                }
                return node
            })
        )
    }


    return (
        <div className='flex h-full w-full flex-col overflow-y-auto bg-zinc-950 text-zinc-100'>
            {/* App Selector Dropdown */}
            <div className='border-b boder-zinc-800 p-4'>
                <h1
                    className='mb-2 text-sm font-medium text-zinc-400'
                >Application</h1>
                <Select
                    value={selectedAppId || ""}
                    onValueChange={setSelectedAppId}
                >
                    <SelectTrigger
                        className='w-full border-zinc-700 bg-zinc-900'
                    >
                        <SelectValue placeholder={isLoading ? "Loading apps...." : "Select an app"} />
                    </SelectTrigger>
                    <SelectContent
                        className='border-zinc-700 bg-zinc-900 text-zinc-100'
                    >
                        {apps?.map((app: { id: string, name: string }) => (
                            <SelectItem key={app.id} value={app.id}>
                                {app.name}
                            </SelectItem>
                        ))}
                    </SelectContent>

                </Select>
                {isError && <p
                    className='mt-1 text-xs text-red-500'
                >Failed to load page</p>}

                {/* Node inspector */}
                <div className='flex-1 p-4'>
                    {!selectedNodeId ? (
                        // empty state (No node is selected)
                        <div
                            className='flex h-full items-center justify-center text-center text-sm text-zinc-500'
                        >
                            Select a node on the canvas <br /> to view its properties
                        </div>

                    ) : (
                        // Active state (Node is selected)
                        <div
                            className='flex flex-col gap-4'
                        >
                            <h2 className='text-lg font-semibold'>
                                Service Node: {selectedNodeId}
                            </h2>
                            <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                                    <TabsTrigger value='config'>Config</TabsTrigger>
                                    <TabsTrigger value='runtime'>Runtime</TabsTrigger>
                                </TabsList>
                                <TabsContent value='config' className='mt-4 space-y-4'>
                                    <div className='space-y-2'>
                                        <label>
                                            Memory Allocation (GB)
                                        </label>
                                        <div className='flex items-center gap-4'>
                                            {/* The synced slider and input */}
                                            <Slider
                                                value={[sliderValue]}
                                                onValueChange={(vals) => handleSliderChange(vals[0])}
                                                max={100}
                                                step={1}
                                                className="flex-1"

                                            />
                                            <Input
                                                type='number'
                                                value={sliderValue}
                                                onChange={(e) => handleSliderChange(Number(e.target.value))}
                                                className='w-16 border-zinc-700 bg-zinc-900'
                                            />
                                        </div>

                                    </div>
                                </TabsContent>
                                <TabsContent value='runtime' className='mt-4'>
                                    <p
                                        className='text-sm text-zinc-400'
                                    >Runtime metrics will appear here.</p>

                                </TabsContent>
                            </Tabs>
                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}

export default RightPanel