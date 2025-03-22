
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { Sparkles } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AppLayout = () => {
  return (
    <div className="h-screen flex w-full overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 lg:px-6">
          <div className="lg:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold text-foreground hidden sm:block">CoinWise</h1>
            <div className="flex items-center gap-2">
              <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Pro Features</span>
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-background/90">
          <div className="container mx-auto py-6 px-4 xl:px-8 max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
