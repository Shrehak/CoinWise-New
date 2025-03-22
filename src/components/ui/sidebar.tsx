
import * as React from "react";
import { cn } from "@/lib/utils";

// Context
type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Provider
interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export function Sidebar({
  children,
  collapsed,
  className,
  ...props
}: SidebarProps) {
  const context = useSidebar();
  const isCollapsed = collapsed !== undefined ? collapsed : context.collapsed;

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen flex-shrink-0 flex flex-col border-r border-solid z-20 bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
      data-collapsed={isCollapsed}
      {...props}
    >
      {children}
    </aside>
  );
}

// Trigger
interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <button
      className={cn("flex items-center justify-center", className)}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="9" x2="15" y1="3" y2="3" />
        <line x1="9" x2="15" y1="21" y2="21" />
        <line x1="9" y1="9" x2="9" y2="15" />
        <line x1="15" y1="9" x2="15" y2="15" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

// Header
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div className={cn("px-3 py-2", className)} {...props} />
  );
}

// Content
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div className={cn("flex-1 overflow-auto", className)} {...props} />
  );
}

// Footer
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("mt-auto", className)} {...props} />
  );
}

// Group
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div className={cn("space-y-1 py-2", className)} {...props} />
  );
}

// GroupLabel
interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <div className={cn("px-3 py-1 text-xs font-medium text-muted-foreground", className)} {...props} />
  );
}

// GroupContent
interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div className={cn("space-y-1", className)} {...props} />
  );
}

// Menu
interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul className={cn("space-y-1 px-2", className)} {...props} />
  );
}

// MenuItem
interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li className={cn("", className)} {...props} />
  );
}

// MenuButton
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function SidebarMenuButton({ className, asChild = false, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "button";
  
  return (
    <Comp
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}
