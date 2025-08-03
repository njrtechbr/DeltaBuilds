"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({
  children,
  initialOpen = true,
}: {
  children: React.ReactNode
  initialOpen?: boolean
}) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(isMobile ? false : initialOpen)

  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      setIsOpen(initialOpen)
    }
  }, [isMobile, initialOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen, isMobile } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => useSidebar().setIsOpen(open)}>
        <SheetContent side="left" className="w-[300px] p-0">
          <aside
            ref={ref}
            className={cn(
              "flex h-full flex-col bg-card text-card-foreground",
              className
            )}
            {...props}
          />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside
      ref={ref}
      className={cn(
        "hidden sm:flex flex-col bg-card text-card-foreground transition-all duration-300 ease-in-out",
        isOpen ? "w-72" : "w-14",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { isMobile, setIsOpen } = useSidebar()

  if (isMobile) {
    return (
      <SheetTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className={cn("sm:hidden", className)}
          {...props}
        >
          <PanelLeft />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
    )
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("hidden sm:flex", className)}
      onClick={() => setIsOpen((prev) => !prev)}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-16 items-center border-b px-4 transition-all duration-300",
        !isOpen && "px-2",
        className
      )}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-16 items-center border-t px-4 transition-all duration-300",
        !isOpen && "px-2",
        className
      )}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("space-y-1 p-2", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("relative", className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
    "flex w-full items-center gap-3 overflow-hidden rounded-md p-2 text-left text-sm font-medium outline-none ring-primary transition-all duration-300 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "hover:bg-muted/50",
                active: "bg-primary text-primary-foreground hover:bg-primary/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: React.ReactNode
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant,
      tooltip,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "a"
    const { isOpen, isMobile } = useSidebar()

    const buttonContent = (
      <Comp
        ref={ref}
        className={cn(sidebarMenuButtonVariants({ variant: isActive ? "active" : "default" }), "justify-start", !isOpen && !isMobile && "justify-center size-10 p-0", className)}
        {...props}
      >
        {children}
      </Comp>
    )

    if (!isOpen && !isMobile && tooltip) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                <TooltipContent side="right" align="center">
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        )
    }

    return buttonContent;
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"
