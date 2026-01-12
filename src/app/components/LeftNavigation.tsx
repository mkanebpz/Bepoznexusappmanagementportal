import { 
  Home, 
  Users, 
  UserPlus, 
  FileText, 
  Settings,
  LifeBuoy,
  Send,
  LogOut
} from 'lucide-react';

export type UserRole = 'manager' | 'staff';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  managerOnly?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: Users, label: 'Users', id: 'users', managerOnly: true },
  { icon: UserPlus, label: 'Requests', id: 'requests', managerOnly: true },
  { icon: FileText, label: 'Audit Log', id: 'audit', managerOnly: true },
  { icon: Settings, label: 'Portal Settings', id: 'settings', managerOnly: true },
];

export function LeftNavigation({ 
  activeItem, 
  onItemClick,
  userRole = 'manager',
  onLogout
}: { 
  activeItem: string; 
  onItemClick: (id: string) => void;
  userRole?: UserRole;
  onLogout: () => void;
}) {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col pt-4 pb-4">
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          if (item.managerOnly && userRole !== 'manager') return null;

          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#002D6A] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 mt-auto space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <LifeBuoy className="w-5 h-5" />
          <span className="font-medium text-sm">Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Send className="w-5 h-5" />
          <span className="font-medium text-sm">Feedback</span>
        </button>
        
        <div className="pt-2 mt-2 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer relative">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium text-xs">
              AU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@company.com</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
