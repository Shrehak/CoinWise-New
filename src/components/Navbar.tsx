
import { useState } from 'react';
import { Home, CreditCard, PieChart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-200 hover:bg-primary/10",
        active ? "bg-primary/10 text-primary font-medium" : "text-foreground/70"
      )}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-primary">CoinWise</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handleTabChange('dashboard')}
            className={cn(
              "px-3 py-2 rounded-md transition-all",
              activeTab === 'dashboard' 
                ? "text-primary font-medium" 
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Dashboard
          </button>
          <button 
            onClick={() => handleTabChange('expenses')}
            className={cn(
              "px-3 py-2 rounded-md transition-all",
              activeTab === 'expenses' 
                ? "text-primary font-medium" 
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Expenses
          </button>
          <button 
            onClick={() => handleTabChange('budgets')}
            className={cn(
              "px-3 py-2 rounded-md transition-all",
              activeTab === 'budgets' 
                ? "text-primary font-medium" 
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Budgets
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-in bg-background border-b border-border/40">
          <div className="flex flex-col p-4 space-y-1">
            <NavItem 
              icon={<Home size={18} />} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => handleTabChange('dashboard')} 
            />
            <NavItem 
              icon={<CreditCard size={18} />} 
              label="Expenses" 
              active={activeTab === 'expenses'} 
              onClick={() => handleTabChange('expenses')} 
            />
            <NavItem 
              icon={<PieChart size={18} />} 
              label="Budgets" 
              active={activeTab === 'budgets'} 
              onClick={() => handleTabChange('budgets')} 
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
