import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationProvider } from "@/components/navigation-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import Logo from "@/components/Logo"
import { ThemeToggle } from "@/components/theme-toggle"
import UserMenu from "@/components/UserMenu"
import { Toaster } from "@/components/ui/toaster"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <NavigationProvider>
          <SidebarProvider defaultOpen={false}>
            {/* Windshift Ribbon - Fixed at top, full width, z-50 above everything */}
            <header className="fixed top-0 left-0 right-0 z-50 shrink-0 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
              <div className="w-full px-2 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Logo />
                  <span className="text-body font-medium text-primary-600/80 dark:text-primary-300/80 whitespace-nowrap pb-[1px] ml-1">
                    Headquarters Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <UserMenu />
                </div>
              </div>
            </header>

            {/* Content area with sidebar - starts below ribbon */}
            <div className="pt-[60px] w-full">
              <AppSidebar />
              <div className="ml-[48px] w-[calc(100vw-48px)] transition-all duration-200">
                <main className="w-full h-[calc(100vh-60px)]">
                  <Home />
                </main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </NavigationProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

