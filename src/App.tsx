import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Share2, 
  HardDrive, 
  ListOrdered, 
  Calendar, 
  Table, 
  Settings, 
  FileText, 
  Activity,
  Search,
  Bell,
  User,
  Power,
  RefreshCw,
  Menu,
  ChevronLeft,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Dashboard from './pages/Dashboard';
import ProfileGroups from './pages/ProfileGroups';
import Channels from './pages/Channels';
import DriveAutomation from './pages/DriveAutomation';
import ContentQueue from './pages/ContentQueue';
import Scheduling from './pages/Scheduling';
import SheetsIntegration from './pages/SheetsIntegration';
import PlatformSettings from './pages/PlatformSettings';
import Logs from './pages/Logs';
import SystemControl from './pages/SystemControl';

const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: { 
  isOpen: boolean, 
  setIsOpen: (v: boolean) => void,
  isCollapsed: boolean,
  setIsCollapsed: (v: boolean) => void
}) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Profile Groups', path: '/groups' },
    { icon: Share2, label: 'Channels', path: '/channels' },
    { icon: HardDrive, label: 'Drive Automation', path: '/drive' },
    { icon: ListOrdered, label: 'Content Queue', path: '/queue' },
    { icon: Calendar, label: 'Scheduling', path: '/scheduling' },
    { icon: Table, label: 'Sheets Integration', path: '/sheets' },
    { icon: Settings, label: 'Platform Settings', path: '/settings' },
    { icon: FileText, label: 'Logs', path: '/logs' },
    { icon: Activity, label: 'System Control', path: '/control' },
  ];

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 bg-[#0a0a0c] border-r border-white/5 transition-all duration-300 lg:translate-x-0 lg:static",
    isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0",
    isCollapsed ? "lg:w-20" : "lg:w-64"
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="font-bold text-xl tracking-tight whitespace-nowrap">DriveFlow</span>
              )}
            </div>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5 text-slate-500"
            >
              <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "sidebar-item group relative",
                  location.pathname === item.path && "active",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5">
            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">Admin User</span>
                  <span className="text-xs text-slate-500 truncate">Agency Plan</span>
                </div>
              )}
              {!isCollapsed && (
                <button className="ml-auto text-slate-500 hover:text-white">
                  <Power className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-30">
    <div className="flex items-center gap-4 flex-1">
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="relative hidden md:block max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search files, groups, logs..." 
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-start transition-all"
        />
      </div>
      
      <button className="p-2 text-slate-400 hover:text-white md:hidden">
        <Search className="w-5 h-5" />
      </button>
    </div>
    
    <div className="flex items-center gap-2 md:gap-6">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] md:text-xs font-medium text-emerald-500">System Online</span>
      </div>
      
      <div className="flex items-center gap-1 md:gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-start rounded-full border-2 border-[#0a0a0c]" />
        </button>
        <div className="hidden md:block h-4 w-px bg-white/10" />
        <button className="btn-primary text-xs md:text-sm py-1.5 px-3 md:px-4">
          <span className="hidden sm:inline">New Group</span>
          <Plus className="w-4 h-4 sm:hidden" />
        </button>
      </div>
    </div>
  </header>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle auto-collapse on laptop sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsSidebarCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#0a0a0c]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/groups" element={<ProfileGroups />} />
                  <Route path="/channels" element={<Channels />} />
                  <Route path="/drive" element={<DriveAutomation />} />
                  <Route path="/queue" element={<ContentQueue />} />
                  <Route path="/scheduling" element={<Scheduling />} />
                  <Route path="/sheets" element={<SheetsIntegration />} />
                  <Route path="/settings" element={<PlatformSettings />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/control" element={<SystemControl />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}
