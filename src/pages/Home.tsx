import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState, useRef } from 'react'
import ConceptOverlay from '@/components/ConceptOverlay'

function SortableToolItem({ id, name, description, demo, url }: { id: string; name: string; description: string; demo?: boolean; url?: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (url && dragStartPos.current) {
      const deltaX = Math.abs(e.clientX - dragStartPos.current.x)
      const deltaY = Math.abs(e.clientY - dragStartPos.current.y)
      // Only open URL if it was a click (not a drag)
      if (deltaX < 5 && deltaY < 5 && !isDragging) {
        window.open(url, '_blank')
      }
    }
    dragStartPos.current = null
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`p-3 rounded-lg ${url ? 'cursor-pointer' : 'cursor-move'} hover:bg-secondary transition-colors flex flex-col items-center text-center relative bg-surface border border-default`}
    >
      {demo && <span className="absolute top-2 right-2 px-2 py-0.5 bg-status-success text-white text-[10px] font-semibold rounded-full whitespace-nowrap">DEMO</span>}
      <p className="text-sm font-semibold mb-1">{name}</p>
      <p className="text-xs text-tertiary">{description}</p>
    </div>
  )
}

export default function Home() {
  // State for showing/hiding details on hover
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [showConcept, setShowConcept] = useState(false) // Hidden for now - see CONCEPT_OVERLAY.md
  const [debugConcept, setDebugConcept] = useState(false)
  
  // Refs for concept map anchors
  const rootRef = useRef<HTMLDivElement | null>(null)
  const humanRef = useRef<HTMLDivElement | null>(null)
  const orchRef = useRef<HTMLDivElement | null>(null)
  const agentsRef = useRef<HTMLDivElement | null>(null)
  const toolsRef = useRef<HTMLDivElement | null>(null)
  const kbRef = useRef<HTMLDivElement | null>(null)
  const docintelRef = useRef<HTMLDivElement | null>(null)

  // Track panel sizes for collapsed state
  const [_panelSizes, setPanelSizes] = useState({
    topPanel: 15,
    projects: 60,
    teams: 40,
    middlePanel: 68,
    exchange: 20,
    workspace: 60,
    knowledgeBase: 20,
    bottomPanel: 17
  })

  const [tools, setTools] = useState([
    { id: '1', name: 'Agentic Deep Research', description: 'Comprehensive research and analysis', demo: true, url: 'https://dev.researcher.windshift.io' },
    { id: '2', name: 'Web-Scraping', description: 'Extract data from websites', demo: false },
    { id: '3', name: 'Custom Search', description: 'Advanced search capabilities', demo: false },
    { id: '4', name: 'Survey', description: 'Data collection and surveys', demo: false },
    { id: '5', name: 'XLS Generator', description: 'Excel model creation', demo: false },
    { id: '6', name: 'Contract Analysis', description: 'Review and analyze contracts', demo: false },
    { id: '7', name: 'Data Processing', description: 'Clean and transform data', demo: false },
    { id: '8', name: 'Benchmarking', description: 'Compare metrics and KPIs', demo: false },
    { id: '9', name: 'Visualization', description: 'Create charts and dashboards', demo: false },
    { id: '10', name: 'PPT Generator', description: 'PowerPoint slide generation', demo: false },
    { id: '11', name: 'Think-Cell', description: 'PowerPoint chart generation', demo: false },
    { id: '12', name: 'Transcription', description: 'Create, summarize, extract', demo: false },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setTools((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Toggle details view
  const toggleDetailsView = () => {
    setShowDetails(!showDetails)
    setHoveredSection(null)
  }

  return (
    <div 
      ref={rootRef}
      className="w-full h-full p-4 overflow-hidden relative bg-gradient-to-br from-light-background to-light-background-secondary dark:from-dark-background dark:to-dark-background-secondary">

      {/* Debug Toggle Buttons - HIDDEN FOR NOW - See CONCEPT_OVERLAY.md */}
      {false && (
        <div className="fixed top-3 right-[140px] z-[60] flex gap-2">
          <button 
            onClick={() => setShowConcept(v => !v)}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition-colors ${
              showConcept 
                ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
            }`}
          >
            {showConcept ? 'Concept: On' : 'Concept: Off'}
          </button>
          {showConcept && (
            <button 
              onClick={() => setDebugConcept(v => !v)}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition-colors ${
                debugConcept 
                  ? 'bg-status-info hover:bg-status-info/90 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
              }`}
            >
              {debugConcept ? 'Debug: On' : 'Debug: Off'}
            </button>
          )}
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition-colors ${
              isLocked 
                ? 'bg-status-warning hover:bg-status-warning/90 text-white' 
                : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
            }`}
          >
            {isLocked ? '🔒 Locked' : '🔓 Unlocked'}
          </button>
          <button 
            onClick={toggleDetailsView}
            className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-semibold shadow-sm transition-colors"
          >
            {showDetails ? 'Overview' : 'Details'}
          </button>
        </div>
      )}

      <PanelGroup direction="vertical" className="h-[calc(100%-2rem)]">
        {/* Top Panel: Projects & Teams */}
        <Panel defaultSize={15} minSize={3} onResize={(size) => setPanelSizes(prev => ({ ...prev, topPanel: size }))}>
          <PanelGroup direction="horizontal">
            {/* Projects */}
            <Panel defaultSize={60} minSize={3} onResize={(size) => setPanelSizes(prev => ({ ...prev, projects: size }))}>
              {!showDetails && hoveredSection !== 'projects' ? (
              <div
                  className="card h-full flex flex-col overflow-hidden p-3 relative transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => {
                  if (!isLocked) setHoveredSection('projects')
                }}
                onMouseLeave={() => {
                  if (!isLocked) setHoveredSection(null)
                }}
              >
                  <div className="flex-1 flex flex-row gap-4">
                    <div className="flex flex-col w-[220px] flex-shrink-0">
                      <h2 className="text-lg font-semibold mb-1.5 whitespace-nowrap">Projects</h2>
                      <p className="text-xs text-secondary whitespace-nowrap">Multi-Deal Command Center</p>
                    </div>

                    <div className="flex-1 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex flex-col">
                      <div className="flex gap-4 flex-1">
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-lg font-bold mb-1">Project Command Center</h3>
                          <p className="text-sm text-secondary mb-3">Project-scoped by design</p>
                        </div>
                        <div className="flex-1 flex items-start justify-end">
                          <p className="text-sm text-secondary leading-relaxed italic text-right">Auto-tracks human and agent activity, surfaces the relevant analysis, and rolls up milestones, risks, and KPIs into a live project view</p>
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-3">
                        <div className="mt-auto">
                          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Real-time activity tracking</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                ) : (
                <div
                  className="card h-full p-3"
                  onMouseEnter={() => {
                    setHoveredSection('projects')
                  }}
                  onMouseLeave={() => {
                    setHoveredSection(null)
                  }}
                >
                    <h2 className="text-lg font-semibold mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">Projects</h2>
                    <p className="text-xs text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">Multi-Deal Command Center</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { code: 'Magellan', company: 'SpaceX' },
                        { code: 'Odyssey', company: 'Blue Origin' },
                        { code: 'Horizon', company: 'Rocket Lab' },
                        { code: 'Pathfinder', company: 'Relativity Space' }
                      ].map((project, i) => (
                        <div key={i} className="p-4 rounded-lg flex flex-col items-center justify-center bg-secondary">
                          <p className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{project.code}</p>
                          <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-tertiary">{project.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </Panel>

            <PanelResizeHandle className="w-[6px] relative cursor-col-resize select-none flex items-center justify-center z-30">
              <div className="w-[10px] h-[1in] rounded-md border border-default bg-surface shadow-sm z-10 flex items-center justify-center">
                <div className="text-xs text-tertiary rotate-90">⋯</div>
              </div>
            </PanelResizeHandle>

            {/* Teams */}
            <Panel defaultSize={40} minSize={3} onResize={(size) => setPanelSizes(prev => ({ ...prev, teams: size }))}>
              {!showDetails && hoveredSection !== 'teams' ? (
              <div
                  className="card h-full flex flex-col overflow-hidden p-3 relative transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => {
                  setHoveredSection('teams')
                }}
                onMouseLeave={() => {
                  setHoveredSection(null)
                }}
              >
                  <div className="flex-1 flex flex-row gap-4">
                    <div className="flex flex-col w-[220px] flex-shrink-0">
                      <h2 className="text-lg font-semibold mb-1.5 whitespace-nowrap">Teams & Access</h2>
                      <p className="text-xs text-secondary whitespace-nowrap">Secure Collaboration Hub</p>
                    </div>

                    <div ref={humanRef} className="flex-1 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex flex-col">
                      <div className="flex gap-4 flex-1">
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-lg font-bold mb-1">Teams & Access</h3>
                          <p className="text-sm text-secondary mb-3">Securely partitioned collaboration</p>
                        </div>
                        <div className="flex-1 flex items-start justify-end">
                          <p className="text-sm text-secondary leading-relaxed italic text-right">Assign human and agent seats, connect shared datasets, tools, and expert networks - collaborate inside strict Chinese walls</p>
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-3">
                        <div className="mt-auto">
                          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Chinese-wall enabled</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                ) : (
                <div
                  className="card h-full p-3"
                  onMouseEnter={() => {
                    setHoveredSection('teams')
                  }}
                  onMouseLeave={() => {
                    setHoveredSection(null)
                  }}
                >
                    <h2 className="text-lg font-semibold mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">Teams & Access</h2>
                    <p className="text-xs text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">Secure Collaboration Hub</p>
                    <div className="flex gap-3">
                      {['ND', 'JP', 'JC', 'CE', 'QR', 'DG'].map((initials) => (
                        <div key={initials} className="h-12 w-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                          {initials}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="h-[6px] relative cursor-row-resize select-none flex items-center justify-center z-30">
          <div className="h-[10px] w-[1in] rounded-md border border-default bg-surface shadow-sm z-10 flex items-center justify-center">
            <div className="text-xs text-tertiary">⋯</div>
          </div>
        </PanelResizeHandle>

        {/* Middle Panel: Exchange | WindShift Workspace | Knowledge Base */}
        <Panel defaultSize={68} minSize={3}>
          <PanelGroup direction="horizontal">
            {/* Exchange */}
            <Panel defaultSize={20} minSize={3}>
              {!showDetails && hoveredSection !== 'exchange' ? (
              <div
                className="card h-full flex flex-col overflow-hidden p-3 relative transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => {
                  setHoveredSection('exchange')
                }}
                onMouseLeave={() => {
                  setHoveredSection(null)
                }}
              >
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold mb-1.5 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Exchange</h2>
                    <p className="text-xs text-secondary mb-3 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Gateway for Experts, Data, Tools and Services</p>

                    <div className="flex-1 flex flex-col gap-4">
                      {/* External Vendors Card */}
                      <div className="flex-1 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">External Vendors</h3>
                        <p className="text-sm text-secondary mb-3">Experts, data, tools and services in one flow</p>
                        <div className="flex-1 flex items-center justify-center px-8">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">Compare providers, schedule calls, and route insights to the Workspace and Knowledge Base for instant (re)use</p>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <span className="px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo: Expert Network</span>
                          <div className="mt-auto">
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Easy vendor access</p>
                          </div>
                        </div>
                      </div>

                      {/* WindShift Data Card */}
                      <div className="flex-1 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">WindShift Data</h3>
                        <p className="text-sm text-secondary mb-3">First-party aviation and supply-chain datasets</p>
                        <div className="flex-1 flex items-center justify-center px-8">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">Ready-to-query data powered by proprietary conversational analytics</p>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <span className="px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo: Aviation Data</span>
                          <div className="mt-auto">
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Minutes, not hours</p>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                <div
                  className="card h-full flex flex-col overflow-hidden p-3"
                  onMouseEnter={() => {
                    setHoveredSection('exchange')
                  }}
                  onMouseLeave={() => {
                    setHoveredSection(null)
                  }}
                >
                    <h2 className="text-lg font-semibold mb-1.5 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Exchange</h2>
                    <p className="text-xs text-secondary mb-3 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Gateway for Experts, Data, Tools and Services</p>
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                      {/* External Vendors Container */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">External Vendors</h3>
                        <p className="text-sm text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">Access to external providers of services, tools, and data</p>
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="p-3 rounded-lg bg-surface border border-default">
                            <p className="text-sm font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Services Marketplace</p>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Browse and source services from...</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-default">
                            <p className="text-sm font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Proprietary Data</p>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Access exclusive, high-value data...</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-default">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis flex-1">Expert Networks</p>
                              <span className="px-2 py-0.5 bg-status-success text-white text-[10px] font-semibold rounded-full whitespace-nowrap">DEMO</span>
                            </div>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Connect with industry experts for...</p>
                          </div>
                        </div>
                      </div>

                      {/* WindShift Data Container */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">WindShift Data</h3>
                        <p className="text-sm text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">Proprietary access to WindShift curated data sources</p>
                        <div className="flex flex-col gap-2 flex-1">
                          <div
                            className="p-3 rounded-lg bg-surface border border-default cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors"
                            onClick={() => window.open('https://dev.t100.app.windshift.io', '_blank')}
                            tabIndex={0}
                            role="button"
                            onKeyDown={e => {
                              if (e.key === "Enter" || e.key === " ") {
                                window.open('https://dev.t100.app.windshift.io', '_blank');
                              }
                            }}
                            aria-label="Go to Aviation Data demo"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis flex-1">Aviation Data</p>
                              <span className="px-2 py-0.5 bg-status-success text-white text-[10px] font-semibold rounded-full whitespace-nowrap">DEMO</span>
                            </div>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Aviation industry datasets and...</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-default">
                            <p className="text-sm font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Procurement Data</p>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Procurement and supply chain in...</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-default">
                            <p className="text-sm font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Domain-Specific Data</p>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Specialized data for your unique...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </Panel>

            <PanelResizeHandle className="w-[6px] relative cursor-col-resize select-none flex items-center justify-center z-30">
              <div className="w-[10px] h-[1in] rounded-md border border-default bg-surface shadow-sm z-10 flex items-center justify-center">
                <div className="text-xs text-tertiary rotate-90">⋯</div>
              </div>
            </PanelResizeHandle>

            {/* WindShift Workspace */}
            <Panel defaultSize={60} minSize={10}>
              {!showDetails && hoveredSection !== 'workspace' ? (
              <div
                className="card h-full flex flex-col overflow-hidden p-3 relative transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => {
                  setHoveredSection('workspace')
                }}
                onMouseLeave={() => {
                  setHoveredSection(null)
                }}
              >
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold mb-1.5 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">WindShift Workspace</h2>
                    <p className="text-xs text-secondary mb-3 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Human and Artificial Intelligence Collaborative Platform</p>

                    <div className="flex flex-col gap-3 flex-1">
                      <div ref={orchRef} className="p-4 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl flex-shrink-0 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">Level 1 - Orchestration Layer</h3>
                        <p className="text-sm text-secondary mb-3">Plan, route, and verify work</p>
                        <div className="flex-1 flex items-center justify-center px-80">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">
                            Humans set objectives and constraints; the conductor coordinates agent runs and toolchains, applies QA checks, and records lineage to the Knowledge Base.
                          </p>
                        </div>
                        <div className="flex items-end justify-end gap-3">
                          <div className="mt-auto">
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Automated workflow routing</p>
                          </div>
                        </div>
                      </div>

                      <div ref={agentsRef} className="p-4 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl flex-shrink-0 flex flex-col pb-[17px]">
                        <h3 className="text-lg font-bold mb-1">Level 2 - Agent Teams</h3>
                        <p className="text-sm text-secondary mb-2">Specialized diligence agents</p>
                        <div className="flex-1 flex items-center justify-center px-80">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">
                            Profiling, market mapping, forecasting, and voice-of-customer agents you can trigger directly or via Orchestration. All read and write to the Knowledge Base.
                          </p>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <span className="px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo: Competitive Profiler</span>
                          <div>
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Same-day competitive profiles</p>
                          </div>
                        </div>
                      </div>

                      <div ref={toolsRef} className="p-4 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">Level 3 - Domain-Specific Tools</h3>
                        <p className="text-sm text-secondary mb-3">Professional-grade utilities</p>
                        <div className="flex-1 flex items-center justify-center px-80">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">
                            Deep Research, Contract Analysis, Web-Scraping, Excel/PPT generators and more. Tools can be used by humans or chained by agents with strict citation output.
                          </p>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <span className="px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo: Agentic Deep Research</span>
                          <div>
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Human or agent operated</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                ) : (
                <div
                  className="card h-full flex flex-col overflow-hidden p-3"
                  onMouseEnter={() => {
                    setHoveredSection('workspace')
                  }}
                  onMouseLeave={() => {
                    setHoveredSection(null)
                  }}
                >
                    <h2 className="text-lg font-semibold mb-1.5 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">WindShift Workspace</h2>
                    <p className="text-xs text-secondary mb-3 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Human and Artificial Intelligence Collaborative Platform</p>

                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                      {/* Level 1 - Orchestration */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-shrink-0 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">Level 1 - Orchestration Layer</h3>
                        <p className="text-sm text-secondary mb-3">Plan, route, and verify work</p>
                        <div className="flex-1"></div>
                        <div className="grid grid-cols-6 gap-3">
                          <div className="p-3 rounded-lg bg-surface border border-default flex flex-col text-center">
                            <p className="text-sm font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Arbiter</p>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Decision support</p>
                          </div>
                          <div className="col-span-4 p-3 rounded-lg bg-surface border border-default flex flex-col items-center justify-center">
                            <p className="text-base font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Conductor</p>
                            <p className="text-sm text-center text-tertiary whitespace-nowrap overflow-hidden text-ellipsis max-w-full">Coordinates all agent teams</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-default flex flex-col text-center">
                            <p className="text-sm font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Archivist</p>
                            <p className="text-xs text-tertiary whitespace-nowrap overflow-hidden text-ellipsis">Knowledge base</p>
                          </div>
                        </div>
                      </div>

                      {/* Level 2 - Agent Teams */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-shrink-0 flex flex-col relative">
                        <span className="absolute top-4 right-4 px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo: Competitive Profiler</span>
                        <h3 className="text-lg font-bold mb-1">Level 2 - Agent Teams</h3>
                        <p className="text-sm text-secondary mb-3">Specialized diligence agents</p>
                        <div className="flex-1"></div>
                        <div className="grid grid-cols-6 gap-3">
                          {[
                            { name: 'Rainmaker', desc: 'Lead generation', demo: false },
                            { name: 'Surveyor', desc: 'Market modeling', demo: false },
                            { name: 'Profiler', desc: 'Competitive profiling', demo: true },
                            { name: 'Oracle', desc: 'Financial Forecasting', demo: false },
                            { name: 'Sounder', desc: 'Stakeholder insights', demo: false },
                            { name: 'Alchemist', desc: 'Value opportunities', demo: false }
                          ].map((agent) => (
                            <div key={agent.name} className="p-3 rounded-lg flex flex-col items-center text-center relative bg-surface border border-default">
                              {agent.demo && <span className="absolute top-2 right-2 px-2 py-0.5 bg-status-success text-white text-[10px] font-semibold rounded-full whitespace-nowrap">DEMO</span>}
                              <p className="text-sm font-semibold mb-2">{agent.name}</p>
                              <p className="text-xs text-tertiary">{agent.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Level 3 Tools - Draggable */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-1 min-h-0 overflow-hidden flex flex-col relative">
                        <h3 className="text-lg font-bold mb-1 flex-shrink-0">Level 3 - Domain-Specific Tools</h3>
                        <p className="text-sm text-secondary mb-3 flex-shrink-0">Professional-grade utilities</p>
                        <div className="flex-1 min-h-0 overflow-y-auto">
                          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={tools.map(t => t.id)} strategy={rectSortingStrategy}>
                              <div className="grid grid-cols-4 gap-3">
                                {tools.map((tool) => (
                                  <SortableToolItem key={tool.id} id={tool.id} name={tool.name} description={tool.description} demo={tool.demo} url={tool.url} />
                                ))}
                              </div>
                            </SortableContext>
                          </DndContext>
                        </div>
                        <div className="flex items-end justify-between gap-3 mt-3 flex-shrink-0">
                          <span className="px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo: Agentic Deep Research</span>
                          <div>
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Human or agent operated</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </Panel>

            <PanelResizeHandle className="w-[6px] relative cursor-col-resize select-none flex items-center justify-center z-30">
              <div className="w-[10px] h-[1in] rounded-md border border-default bg-surface shadow-sm z-10 flex items-center justify-center">
                <div className="text-xs text-tertiary rotate-90">⋯</div>
              </div>
            </PanelResizeHandle>

            {/* Project Knowledge Base */}
            <Panel defaultSize={20} minSize={3}>
              {!showDetails && hoveredSection !== 'knowledge' ? (
              <div
                ref={kbRef}
                className="card h-full flex flex-col p-3 relative transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => {
                  setHoveredSection('knowledge')
                }}
                onMouseLeave={() => {
                  setHoveredSection(null)
                }}
              >
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold mb-1.5 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Project Knowledge Base</h2>
                    <p className="text-xs text-secondary mb-3 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">Institutional Memory Engine</p>

                    <div className="flex-1 flex flex-col gap-4">
                      {/* Custom Knowledge Graph Card */}
                      <div className="flex-1 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">Custom Knowledge Graph</h3>
                        <p className="text-sm text-secondary mb-3">Source of truth with lineage</p>
                        <div className="flex-1 flex items-center justify-center px-8">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">Knowledge graph expands alongside the analysis progress - facts always point back to project-scoped documents</p>
                        </div>
                        <div className="flex items-end justify-end gap-3">
                          <div className="mt-auto">
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Real-time answers</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold mb-1">Insight Archivist</h3>
                        <p className="text-sm text-secondary mb-3">Curated findings with traceability</p>
                        <div className="flex-1 flex items-center justify-center px-8">
                          <p className="text-sm text-secondary leading-relaxed italic text-center">Patterns, benchmarks, and best practices distilled from prior work are shared as templates and playbooks</p>
                        </div>
                        <div className="flex items-end justify-end gap-3">
                          <div className="mt-auto">
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">Compounding insights</p>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                ) : (
                <div
                  className="card h-full flex flex-col p-3"
                  onMouseEnter={() => {
                    setHoveredSection('knowledge')
                  }}
                  onMouseLeave={() => {
                    setHoveredSection(null)
                  }}
                >
                    <h2 className="text-lg font-semibold mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">Project Knowledge Base</h2>
                    <p className="text-xs text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">Institutional Memory Engine</p>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-1">
                        <h3 className="text-lg font-bold mb-1">Custom Knowledge Graph</h3>
                        <p className="text-sm text-secondary mb-3">Source of truth with lineage</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex-1">
                        <h3 className="text-lg font-bold mb-1">Insight Archivist</h3>
                        <p className="text-sm text-secondary mb-3">Curated findings with traceability</p>
                      </div>
                    </div>
                  </div>
                )}
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="h-[6px] relative cursor-row-resize select-none flex items-center justify-center z-30">
          <div className="h-[10px] w-[1in] rounded-md border border-default bg-surface shadow-sm z-10 flex items-center justify-center">
            <div className="text-xs text-tertiary">⋯</div>
          </div>
        </PanelResizeHandle>

        {/* Bottom Panel: Document Intelligence */}
        <Panel defaultSize={17} minSize={3}>
          {!showDetails && hoveredSection !== 'documents' ? (
          <div
              ref={docintelRef}
              className="card h-full flex flex-col overflow-hidden p-3 relative transition-all duration-300 hover:shadow-xl"
            onMouseEnter={() => {
              if (!isLocked) setHoveredSection('documents')
            }}
            onMouseLeave={() => {
              if (!isLocked) setHoveredSection(null)
            }}
          >
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">Document Intelligence</h2>
                <p className="text-xs text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">AI That Understands Complex Investment Documents</p>
                <span className="absolute top-3 right-3 px-4 py-2 bg-status-success text-white text-sm rounded-full font-bold">
                  All Features Live
                </span>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex gap-3 flex-1">
                  {[
                    {
                      title: 'Smart Processing',
                      subtitle: 'Layout-aware parsing with vision',
                      value: 'Vision-enabled understanding',
                      unit: '',
                      blurb: 'Vision-enabled pipeline understands CIMs, frameworks, tables, and charts'
                    },
                    {
                      title: 'Collections Management',
                      subtitle: 'Organize by deal, theme, or chronology',
                      value: 'One-click agent access',
                      unit: '',
                      blurb: 'Curate permissioned collections that feed agent runs and maintains confidentiality'
                    },
                    {
                      title: 'Agentic Retrieval',
                      subtitle: 'Ask a question, get an answer with citations',
                      value: 'Hours → seconds',
                      unit: '',
                      blurb: 'Agentic search returns exact documents, passages, facts... all linked to sources'
                    }
                    ].map((stat, i) => (
                      <div key={i} className="bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 rounded-xl p-4 flex-1 flex flex-col">
                        <div className="flex gap-4 flex-1">
                          {/* Left side: Title, Subtitle */}
                          <div className="flex flex-col flex-1">
                            <h3 className="text-base font-bold mb-1">{stat.title}</h3>
                            <p className="text-xs text-secondary">{stat.subtitle}</p>
                          </div>
                          {/* Right side: Blurb */}
                          <div className="flex-1 flex items-start justify-end">
                            <p className="text-sm text-secondary leading-relaxed italic text-right">{stat.blurb}</p>
                          </div>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <span className="px-2 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap min-w-[120px] text-center flex-shrink-0">Demo Available</span>
                          <div className="flex items-baseline gap-2">
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</p>
                            <p className="text-xs text-tertiary">{stat.unit}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                </div>
                </div>
              </div>
            ) : (
            <div
              className="card h-full p-3 flex flex-col"
              onMouseEnter={() => {
                if (!isLocked) setHoveredSection('documents')
              }}
              onMouseLeave={() => {
                if (!isLocked) setHoveredSection(null)
              }}
            >
              <div className="flex-1 flex flex-col relative">
                <h2 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis mb-1.5">Document Intelligence</h2>
                <p className="text-xs text-secondary mb-3 whitespace-nowrap overflow-hidden text-ellipsis">AI That Understands Complex Investment Documents</p>
                <span className="absolute top-0 right-0 px-4 py-2 bg-status-success text-white text-sm rounded-full font-bold">
                  All Features Live
                </span>
                <div className="flex gap-3 flex-1">
                  <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex flex-col relative">
                    <h3 className="text-base font-bold mb-1">Smart Processing</h3>
                    <p className="text-xs text-secondary mb-3">Layout-aware parsing with vision</p>
                    <div className="flex-1"></div>
                    <div className="flex">
                      <span className="px-4 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap">Demo Available</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex flex-col relative">
                    <h3 className="text-base font-bold mb-1">Collections Management</h3>
                    <p className="text-xs text-secondary mb-3">Organize by deal, theme, or chronology</p>
                    <div className="flex-1"></div>
                    <div className="flex">
                      <span className="px-4 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap">Demo Available</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-150 dark:from-primary-800 dark:to-primary-700 flex flex-col relative">
                    <h3 className="text-base font-bold mb-1">Agentic Retrieval</h3>
                    <p className="text-xs text-secondary mb-3">Ask a question, get an answer with citations</p>
                    <div className="flex-1"></div>
                    <div className="flex">
                      <span className="px-4 py-0.5 bg-status-success text-white text-xs font-semibold rounded-full whitespace-nowrap">Demo Available</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )}
        </Panel>
      </PanelGroup>

      <ConceptOverlay
        root={rootRef.current}
        visible={!showDetails && showConcept}
        debug={debugConcept}
        hoveredSection={hoveredSection}
        anchors={{
          human: humanRef.current,
          orch: orchRef.current,
          agents: agentsRef.current,
          tools: toolsRef.current,
          kb: kbRef.current,
          docintel: docintelRef.current,
        }}
      />
    </div>
  )
}

