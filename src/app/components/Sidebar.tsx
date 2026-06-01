import { BarChart3, Database, GitBranch, Home, Settings, TrendingUp, Users } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'preprocess', label: 'Preprocessing', icon: Settings },
    { id: 'explore', label: 'Exploration', icon: TrendingUp },
    { id: 'association', label: 'Association', icon: GitBranch },
    { id: 'classify', label: 'Classification', icon: BarChart3 },
    { id: 'cluster', label: 'Clustering', icon: Users },
  ];

  return (
    <div className="w-64 h-full bg-[#2C2C2E] text-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-8 h-8" />
          <span className="font-semibold text-lg">Market Basket</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-[#C9A86A] text-white'
                  : 'text-gray-300 hover:bg-[#3A3A3C]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-[#C9A86A] flex items-center justify-center font-semibold">
            GA
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Group 2</div>
            <div className="text-xs text-gray-400">BCSC 406</div>
          </div>
        </div>
      </div>
    </div>
  );
}
