


import {  Bell,  Menu } from "lucide-react";



export const Header = ({ onMenuClick}:{
  onMenuClick: () => void;
}) => {


  return (
   <header className="h-16 flex items-center justify-between px-4 lg:px-6 my-5">
    
      <div className="flex items-center gap-4">
      
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl lg:text-2xl font-normal text-gray-900">Rewards Hub</h1>
          <p className="text-lg text-gray-500 hidden sm:block">Earn points, unlock rewards, and celebrate your progress!</p>
        </div>
      </div>

    
      <div className="flex items-center gap-2">


        {/* Notification Bell */}
        <button className="relative   bg-gray-100 hover:text-violet-500 p-2 w-10 h-10 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

     
      </div>
    </header>
  );
};

export default Header;
