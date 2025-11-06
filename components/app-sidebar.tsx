import React from "react"
import {
  Database,
  FileText,
  Globe,
  Users,
  Briefcase,
  TrendingUp,
  Search,
  BarChart3,
  MessageSquare,
  Calculator,
  Eye,
  FileSpreadsheet,
  ChevronRight,
  ShoppingCart,
  Plane,
  FolderOpen,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useNavigation } from "./navigation-context"
import { useSidebar } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";

// WindShift Platform Architecture Data - Aligned with Landing Page
const platformSections = {
  exchange: {
    title: "WindShift Exchange",
    icon: ShoppingCart,
    sections: [
      {
        title: "External Vendors",
        icon: Globe,
        items: [
          { title: "Services Marketplace", icon: ShoppingCart },
          { title: "Proprietary Data", icon: Database },
          { title: "Expert Networks", icon: Users },
        ],
      },
      {
        title: "WindShift Data",
        icon: Database,
        items: [
          { title: "Aviation Data", icon: Plane },
          { title: "Procurement Data", icon: Briefcase },
          { title: "Domain-Specific Data", icon: FolderOpen },
        ],
      },
    ],
  },
  workspace: {
    title: "WindShift Workspace",
    icon: Users,
    sections: [
      {
        title: "Orchestration",
        icon: Briefcase,
        items: [
          { title: "Arbiter", icon: Eye },
          { title: "Orchestrator", icon: Users },
          { title: "Archivist", icon: Database },
        ],
      },
      {
        title: "Agent Teams",
        icon: Users,
        items: [
          { title: "Rainmaker", icon: TrendingUp },
          { title: "Surveyor", icon: Search },
          { title: "Profiler", icon: Eye },
          { title: "Oracle", icon: Calculator },
          { title: "Sounder", icon: MessageSquare },
          { title: "Value Creator", icon: BarChart3 },
        ],
      },
      {
        title: "Domain-Specific Tools",
        icon: Settings,
        items: [
          { title: "Deep Research", icon: Search },
          { title: "Web-Scraping", icon: Globe },
          { title: "Custom Search", icon: Search },
          { title: "Survey", icon: MessageSquare },
          { title: "XLS Generator", icon: FileSpreadsheet },
          { title: "Contract Analysis", icon: FileText },
          { title: "Data Processing", icon: Database },
          { title: "Benchmarking", icon: BarChart3 },
          { title: "Visualization", icon: BarChart3 },
          { title: "PPT Generator", icon: FileSpreadsheet },
          { title: "Think-Cell", icon: BarChart3 },
        ],
      },
    ],
  },
  knowledgeBase: {
    title: "Project Knowledge Base",
    icon: Database,
    sections: [
      {
        title: "Documents",
        icon: FileText,
        items: [],
      },
      {
        title: "Insights",
        icon: TrendingUp,
        items: [],
      },
    ],
  },
  documentIntelligence: {
    title: "Document Intelligence",
    icon: FileText,
    sections: [
      {
        title: "Document Processing",
        icon: FileText,
        items: [],
      },
      {
        title: "Collections Management",
        icon: FolderOpen,
        items: [],
      },
      {
        title: "Agentic Retrieval",
        icon: Search,
        items: [],
      },
    ],
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const pathname = location.pathname;
  const { setOpen, isMobile, open, state } = useSidebar();
  const [openPopover, setOpenPopover] = React.useState<string | null>(null);
  const popoverTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const { setActiveNav, setHoverNav } = useNavigation();
  // Helper to slugify titles
  const slug = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

  // Helper to handle popover close with a slight delay
  const handlePopoverClose = () => {
    popoverTimeout.current = setTimeout(() => setOpenPopover(null), 120);
  };
  const handlePopoverCancelClose = () => {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
  };

  return (
    <div
      className="group"
      onMouseEnter={() => { if (!isMobile) setOpen(true) }}
      onMouseLeave={() => {
        setTimeout(() => setOpenPopover(null), 80);
        if (!isMobile) setOpen(false);
        setHoverNav(null); // Clear hover state when leaving sidebar
      }}
    >
      <Sidebar
        collapsible="icon"
        className="border-r border-light-border dark:border-dark-border transition-all duration-300 group-hover:w-64 bg-[var(--sidebar-bg)] text-inherit"
        {...props}
      >
        {state === "collapsed" ? (
          <nav className="flex flex-col gap-8 bg-[var(--sidebar-bg)] px-2 pt-6">
            {/* Exchange group */}
            <div className="flex flex-col items-center">
              <SidebarGroupLabel className="px-3 py-2 flex flex-col items-center gap-1 text-sm md:text-base font-semibold rounded-md justify-center">
                <ShoppingCart className="h-6 w-6 stroke-[2.5]" />
                <span className="transition-all duration-200 opacity-0 w-0 overflow-hidden">
                  WindShift Exchange
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0">
                  {platformSections.exchange.sections.map((section) => {
                    const href = `/exchange/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <div
                        key={section.title}
                        className="h-7 w-full flex items-center justify-center relative"
                        onPointerEnter={() => {
                          setHoverNav({ level1: platformSections.exchange.title, level2: section.title });
                        }}
                        onPointerLeave={() => {
                          setHoverNav(null);
                        }}
                      >
                        <Link
                          to={href}
                          className={`p-1.5 rounded-md transition-all duration-200 ${isActive ? 'bg-primary-500/15 dark:bg-primary-500/20' : 'hover:bg-primary-500/5 dark:hover:bg-primary-500/10'}`}
                        >
                          <section.icon className={`h-4 w-4 stroke-[1.5] transition-colors duration-200 ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-light-text-tertiary dark:text-dark-text-tertiary hover:text-primary-500 dark:hover:text-primary-400'}`} />
                        </Link>
                      </div>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
            {/* Workspace group */}
            <div className="flex flex-col items-center">
              <SidebarGroupLabel className="px-3 py-2 flex flex-col items-center gap-1 text-sm md:text-base font-semibold rounded-md justify-center">
                <Users className="h-6 w-6 stroke-[2.5]" />
                <span className="transition-all duration-200 opacity-0 w-0 overflow-hidden">
                  WindShift Workspace
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0">
                  {platformSections.workspace.sections.map((section) => {
                    const href = `/workspace/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <SidebarMenuItem
                        key={section.title}
                        className="h-7 w-full flex items-center justify-center"
                      >
                        <Link
                          to={href}
                          className={`p-1.5 rounded-md transition-all duration-200 ${isActive ? 'bg-primary-500/15 dark:bg-primary-500/20' : 'hover:bg-primary-500/5 dark:hover:bg-primary-500/10'}`}
                          onMouseEnter={() => setHoverNav({ level1: platformSections.workspace.title, level2: section.title })}
                        >
                          <section.icon className={`h-4 w-4 stroke-[1.5] transition-colors duration-200 ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-light-text-tertiary dark:text-dark-text-tertiary hover:text-primary-500 dark:hover:text-primary-400'}`} />
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
            {/* Knowledge Base group */}
            <div className="flex flex-col items-center">
              <SidebarGroupLabel className="px-2 py-2 flex flex-col items-center gap-1 text-sm md:text-base font-semibold justify-center">
                <Database className="h-6 w-6 stroke-[2.5]" />
                <span className="transition-all duration-200 opacity-0 w-0 overflow-hidden">
                  Project Knowledge Base
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0">
                  {platformSections.knowledgeBase.sections.map((section) => {
                    const href = `/knowledge-base/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <SidebarMenuItem key={section.title} className="h-7 w-full flex items-center justify-center">
                        <Link
                          to={href}
                          className={`p-1.5 rounded-md transition-all duration-200 ${isActive ? 'bg-primary-500/15 dark:bg-primary-500/20' : 'hover:bg-primary-500/5 dark:hover:bg-primary-500/10'}`}
                          onMouseEnter={() => setHoverNav({ level1: platformSections.knowledgeBase.title, level2: section.title })}
                        >
                          <section.icon className={`h-4 w-4 stroke-[1.5] transition-colors duration-200 ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-light-text-tertiary dark:text-dark-text-tertiary hover:text-primary-500 dark:hover:text-primary-400'}`} />
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
            {/* Document Intelligence group */}
            <div className="flex flex-col items-center">
              <SidebarGroupLabel className="px-2 py-2 flex flex-col items-center gap-1 text-sm md:text-base font-semibold justify-center">
                <FileText className="h-6 w-6 stroke-[2.5]" />
                <span className="transition-all duration-200 opacity-0 w-0 overflow-hidden">
                  Document Intelligence
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0">
                  {platformSections.documentIntelligence.sections.map((section) => {
                    const href = `/document-intelligence/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <SidebarMenuItem key={section.title} className="h-7 w-full flex items-center justify-center">
                        <Link
                          to={href}
                          className={`p-1.5 rounded-md transition-all duration-200 ${isActive ? 'bg-primary-500/15 dark:bg-primary-500/20' : 'hover:bg-primary-500/5 dark:hover:bg-primary-500/10'}`}
                          onMouseEnter={() => setHoverNav({ level1: platformSections.documentIntelligence.title, level2: section.title })}
                        >
                          <section.icon className={`h-4 w-4 stroke-[1.5] transition-colors duration-200 ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-light-text-tertiary dark:text-dark-text-tertiary hover:text-primary-500 dark:hover:text-primary-400'}`} />
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          </nav>
        ) : (
          // Expanded: render full sidebar content
          <SidebarContent className="bg-transparent text-inherit pt-6">
            {/* WindShift Exchange */}
            <SidebarGroup className="mb-6">
              <SidebarGroupLabel className="px-3 py-2 flex items-center gap-2 text-base font-semibold rounded-md mb-1">
                <ShoppingCart className="h-6 w-6 stroke-[2.5]" />
                WindShift Exchange
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {platformSections.exchange.sections.map((section) => {
                    const href = `/exchange/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    // Only show Level 2 in sidebar, Level 3 in popout
                    return (
                      <Popover.Root
                        key={section.title}
                        open={openPopover === section.title && open}
                        onOpenChange={(v: boolean) => setOpenPopover(v ? section.title : null)}
                      >
                        <Popover.Trigger asChild>
                          <SidebarMenuItem
                            onMouseEnter={() => { handlePopoverCancelClose(); setOpenPopover(section.title); }}
                            onMouseLeave={handlePopoverClose}
                          >
                            <SidebarMenuButton
                              asChild
                              className={`${open ? "pl-6" : ""} text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover ${isActive ? "bg-light-surface-active text-light-text dark:bg-dark-surface-active dark:text-dark-text" : ""}`}
                            >
                              <Link
                                to={href}
                                className={`flex items-center gap-2 w-full ${open ? "justify-between" : "justify-center"}`}
                                onClick={() => setActiveNav({
                                  level1: platformSections.exchange.title,
                                  level2: section.title
                                })}
                              >
                                <span className="flex items-center gap-2">
                                  <section.icon className="h-4 w-4 stroke-[1.5]" />
                                  {open && <span className="text-sm">{section.title}</span>}
                                </span>
                                {open && section.items && section.items.length > 0 && (
                                  <ChevronRight className="h-4 w-4 stroke-[1.5] text-light-text-tertiary dark:text-dark-text-tertiary ml-2" />
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </Popover.Trigger>
                        {section.items && section.items.length > 0 && (
                          <Popover.Portal>
                            <Popover.Content
                              side="right"
                              align="start"
                              className="z-50 min-w-[180px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] shadow-lg rounded-md p-2
                                data-[state=open]:animate-in data-[state=closed]:animate-out
                                data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
                                data-[state=open]:slide-in-from-left-2 data-[state=closed]:slide-out-to-left-2"
                              onMouseEnter={handlePopoverCancelClose}
                              onMouseLeave={handlePopoverClose}
                            >
                              <ul>
                                {section.items.map(item => {
                                  const itemHref = `/exchange/${slug(section.title)}/${slug(item.title)}`;
                                  return (
                                    <Link
                                      key={itemHref}
                                      to={itemHref}
                                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] text-light-text-tertiary dark:text-dark-text-tertiary text-sm"
                                      onClick={() => setActiveNav({
                                        level1: platformSections.exchange.title,
                                        level2: section.title,
                                        level3: item.title
                                      })}
                                    >
                                      {item.icon && <item.icon className="h-3.5 w-3.5 stroke-[1.5]" />}
                                      <span>{item.title}</span>
                                    </Link>
                                  );
                                })}
                              </ul>
                            </Popover.Content>
                          </Popover.Portal>
                        )}
                      </Popover.Root>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* WindShift Workspace */}
            <SidebarGroup className="mb-6">
              <SidebarGroupLabel className="px-3 py-2 flex items-center gap-2 text-base font-semibold rounded-md mb-1">
                <Users className="h-6 w-6 stroke-[2.5]" />
                WindShift Workspace
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {platformSections.workspace.sections.map((section) => {
                    const href = `/workspace/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <Popover.Root
                        key={section.title}
                        open={openPopover === section.title && open}
                        onOpenChange={(v: boolean) => setOpenPopover(v ? section.title : null)}
                      >
                        <Popover.Trigger asChild>
                          <SidebarMenuItem
                            onMouseEnter={() => { handlePopoverCancelClose(); setOpenPopover(section.title); }}
                            onMouseLeave={handlePopoverClose}
                          >
                            <SidebarMenuButton
                              asChild
                              className={`${open ? "pl-6" : ""} text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover ${isActive ? "bg-light-surface-active text-light-text dark:bg-dark-surface-active dark:text-dark-text" : ""}`}
                            >
                              <Link
                                to={href}
                                className={`flex items-center gap-2 w-full ${open ? "justify-between" : "justify-center"}`}
                                onClick={() => setActiveNav({
                                  level1: platformSections.workspace.title,
                                  level2: section.title
                                })}
                              >
                                <span className="flex items-center gap-2">
                                  <section.icon className="h-4 w-4 stroke-[1.5]" />
                                  {open && <span className="text-sm">{section.title}</span>}
                                </span>
                                {open && section.items && section.items.length > 0 && (
                                  <ChevronRight className="h-4 w-4 stroke-[1.5] text-light-text-tertiary dark:text-dark-text-tertiary ml-2" />
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </Popover.Trigger>
                        {section.items && section.items.length > 0 && (
                          <Popover.Portal>
                            <Popover.Content
                              side="right"
                              align="start"
                              className="z-50 min-w-[180px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] shadow-lg rounded-md p-2
                                data-[state=open]:animate-in data-[state=closed]:animate-out
                                data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
                                data-[state=open]:slide-in-from-left-2 data-[state=closed]:slide-out-to-left-2"
                              onMouseEnter={handlePopoverCancelClose}
                              onMouseLeave={handlePopoverClose}
                            >
                              <ul>
                                {section.items.map(item => {
                                  const itemHref = `/workspace/${slug(section.title)}/${slug(item.title)}`;
                                  return (
                                    <Link
                                      key={itemHref}
                                      to={itemHref}
                                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] text-light-text-tertiary dark:text-dark-text-tertiary text-sm"
                                      onClick={() => setActiveNav({
                                        level1: platformSections.workspace.title,
                                        level2: section.title,
                                        level3: item.title
                                      })}
                                    >
                                      {item.icon && <item.icon className="h-3.5 w-3.5 stroke-[1.5]" />}
                                      <span>{item.title}</span>
                                    </Link>
                                  );
                                })}
                              </ul>
                            </Popover.Content>
                          </Popover.Portal>
                        )}
                      </Popover.Root>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* Project Knowledge Base */}
            <SidebarGroup className="mb-6">
              <SidebarGroupLabel className="px-2 py-2 flex items-center gap-2 text-base font-semibold mb-1">
                <Database className="h-6 w-6 stroke-[2.5]" />
                Project Knowledge Base
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {platformSections.knowledgeBase.sections.map((section) => {
                    const href = `/knowledge-base/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <SidebarMenuItem key={section.title}>
                        <SidebarMenuButton
                          asChild
                          className={`${open ? "pl-6" : ""} text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover ${isActive ? "bg-light-surface-active text-light-text dark:bg-dark-surface-active dark:text-dark-text" : ""}`}
                        >
                          <Link
                            to={href}
                            className={`flex items-center gap-2 w-full ${open ? "justify-between" : "justify-center"}`}
                            onClick={() => setActiveNav({
                              level1: platformSections.knowledgeBase.title,
                              level2: section.title
                            })}
                          >
                            <span className="flex items-center gap-2">
                              <section.icon className="h-4 w-4 stroke-[1.5]" />
                              {open && <span className="text-sm">{section.title}</span>}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* Document Intelligence */}
            <SidebarGroup className="mb-6">
              <SidebarGroupLabel className="px-2 py-2 flex items-center gap-2 text-base font-semibold mb-1">
                <FileText className="h-6 w-6 stroke-[2.5]" />
                Document Intelligence
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {platformSections.documentIntelligence.sections.map((section) => {
                    const href = `/document-intelligence/${slug(section.title)}`;
                    const isActive = pathname.startsWith(href);
                    return (
                      <SidebarMenuItem key={section.title}>
                        <SidebarMenuButton
                          asChild
                          className={`${open ? "pl-6" : ""} text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover ${isActive ? "bg-light-surface-active text-light-text dark:bg-dark-surface-active dark:text-dark-text" : ""}`}
                        >
                          <Link
                            to={href}
                            className={`flex items-center gap-2 w-full ${open ? "justify-between" : "justify-center"}`}
                            onClick={() => setActiveNav({
                              level1: platformSections.documentIntelligence.title,
                              level2: section.title
                            })}
                          >
                            <span className="flex items-center gap-2">
                              <section.icon className="h-4 w-4 stroke-[1.5]" />
                              {open && <span className="text-sm">{section.title}</span>}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        )}
        <SidebarRail />
      </Sidebar>
    </div>
  );
}