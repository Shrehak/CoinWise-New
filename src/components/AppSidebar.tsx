
import { NavLink } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { 
  BarChart, 
  CreditCard, 
  Wallet, 
  PieChart, 
  Settings as SettingsIcon,
  LogOut, 
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/ThemeContext";

export default function AppSidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: BarChart },
    { name: 'Expenses', path: '/expenses', icon: CreditCard },
    { name: 'Budgets', path: '/budgets', icon: Wallet },
    { name: 'Reports', path: '/reports', icon: PieChart },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const activeClass = "bg-primary/10 text-primary font-medium";
  const inactiveClass = "text-foreground/70 hover:text-foreground hover:bg-primary/5";

  return (
    <Sidebar 
      collapsed={collapsed}
      className="border-r border-border/40 bg-background/80 backdrop-blur-md"
    >
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="h-8 w-8 bg-primary/90 rounded-lg flex items-center justify-center text-white font-semibold">
            CW
          </div>
          {!collapsed && <span className="text-xl font-semibold text-primary">CoinWise</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive ? activeClass : inactiveClass
                    )}
                    end={item.path === '/'}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start"
          >
            {theme === 'light' ? 
              <Moon size={16} className="mr-2" /> : 
              <Sun size={16} className="mr-2" />
            }
            {!collapsed && (theme === 'light' ? 'Dark Mode' : 'Light Mode')}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut size={16} className="mr-2" />
            {!collapsed && 'Log Out'}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
