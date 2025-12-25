
import React from 'react';
import { Home, Compass,  Layers,  X, PackageOpen, CreditCard,  UserRoundCog, Gem } from 'lucide-react';
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react"
import Logo from '@/assets/flowva_icon.png';


interface NavItem {
  title: string;
  icon: React.ElementType;
  url: string;
  active?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}



// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems: NavItem[] = [
    { title: 'Home', icon: Home, url: '#home' },
    { title: 'Discover', icon: Compass, url: '#discover' },
    { title: 'Library', icon: PackageOpen, url: '#library' },
    { title: 'Tech Stack', icon: Layers, url: '#tech-stack' },
     { title: 'Subscribe', icon: CreditCard, url: '#subcribe' },
    { title: 'Rewards Hub', icon:Gem , url: '#rewards', active: true },
    { title: 'Settings', icon: UserRoundCog, url: '#settings' },
  ];
    const { user } = useContext(AppContext);
   
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-50 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Sidebar navigation"
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-6 ">
          <div className="flex items-center align-middle justify-center gap-2 mt-4">
          <img src={Logo} alt="" className='w-16'/>
            <span className="text-xl font-bold text-violet-500">Flowva</span>
            
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.url}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  text-sm
                  transition-colors duration-200
                  ${item.active 
                    ? 'bg-purple-50 text-purple-600 font-semibold' 
                    : 'text-black hover:bg-gray-50 font-medium'
                  }
                `}
                aria-current={item.active ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </a>
            );
          })}
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">E</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              {/* <p className="text-sm font-semibold text-gray-900 truncate">Emmanuel</p> */}
              <p className="text-xs text-gray-500 truncate">{user?.email}.</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
