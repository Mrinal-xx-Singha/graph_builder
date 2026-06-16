
import { Box, Layers, Menu, Moon, Settings, Share2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { useAppStore } from './store/useAppStore'
import { SheetContent, SheetDescription, SheetTitle } from './components/ui/sheet'
import { Sheet } from './components/ui/sheet'
import RightPanel from './components/RightPanel'
import GraphCanvas from './components/GraphCanvas'
import { useReactFlow } from 'reactflow'

const App = () => {
  const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore()
  const { fitView } = useReactFlow()

  return (
    <div
      className="flex h-screen w-full flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navigation */}
      <header
        className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 px-4"

      >
        <div className="flex items-center gap-2 font-semibold text-sm md:text-lg">
          <Layers
            className="h-5 w-5 text-indigo-500"
          />
          <span>App Graph Builder</span>
        </div>
        <div
          className="flex items-center gap-2"
        >
          <Button variant="outline" size="sm" className="hidden border-zinc-700 bg-zinc-900 md:flex"
            onClick={() => fitView({ duration: 800, padding: 0.2 })}
          >
            Fit View
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost" size="icon"
            className="text-zinc-400 hover:text-zinc-900 "
          >
            <Moon className="h-4 w-4" />
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
          >
            <Menu
              className="h-5 w-5 "
            />
          </Button>
        </div>


      </header>
      {/* Main  menu  toggle */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left rail */}
        <aside
          className="hidden w-14 flex-col items-center border-r border-zinc-800 py-4 md:flex"
        >
          <Button
            variant="ghost" size="icon" className="mb-4 bg-zinc-800 text-zinc-100 "
          >
            <Box className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost" size="icon" className="mb-4 text-zinc-400 hover:text-zinc-100"
          >
            <Settings
              className="h-5 w-5"
            />
          </Button>
        </aside>
        {/* Center canvas Area (React Flow ) */}
        <main
          className="relative flex flex-1 border-r border-zinc-800 bg-zinc-900/50">
          <GraphCanvas />

        </main>
        {/* Desktop Right Panel */}
        <div className='hidden md:block'>
          <RightPanel />

        </div>
      </div>
      {/* Mobile Drawer Right Panel */}
      <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetContent side="right" className="w-80 border-l border-zinc-800 bg-zinc-950 p-0 sm:max-w-xs">
          <SheetTitle className="sr-only">App Graph Inspector</SheetTitle>
          <SheetDescription className="sr-only">Configure nodes and view app graphs.</SheetDescription>
          <RightPanel />
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default App