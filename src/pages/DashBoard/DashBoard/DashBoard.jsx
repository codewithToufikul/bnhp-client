import { useState } from 'react';
import {  
  FileText, 
  Settings, 
  Menu, 
  X,
  NewspaperIcon,
  CalendarHeart,
  Image,
  FileTextIcon
} from 'lucide-react';
import { useAuth } from '../../../component/AuthContext';
import { NavLink, Outlet } from 'react-router-dom';

const DashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user, userLoading} = useAuth();

  const sidebarItems = [
    { icon: NewspaperIcon, label: 'সংবাদসমূহ', path: '/dashboard/manage-news' },
    { icon: CalendarHeart, label: 'ইভেন্টসমূহ', path: '/dashboard/manage-events' },
    { icon: Image, label: 'Sliders', path: '/dashboard/manage-slider' },
    { icon: FileTextIcon, label: 'কার্যক্রম ও ব্লগ সমূহ', path: '/dashboard/manage-blog' },
  ];
  
  if (userLoading) return <p>Loading user info...</p>;

  if (!user) return <p>Access denied. Please login first.</p>;

  return (
    <div className="h-screen bg-teal-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-teal-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-teal-900 flex-shrink-0">
          <h1 className="text-xl font-bold text-white">BNHP</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-yellow-300"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 mt-8 px-4 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center px-4 py-3 mb-2 text-white rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-teal-700 border-l-4 border-yellow-300' 
                      : 'hover:bg-teal-700'
                  }`
                }
              >
                <item.icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-teal-100 h-16 flex-shrink-0">
          <div className="flex items-center justify-between px-6 h-full">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-900 hover:text-teal-800 mr-4"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-800 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Outlet - Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet/>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashBoard;