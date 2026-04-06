import {
  LayoutDashboard,
  Bot,
  Building2,
  Database,
  FileCheck,
  Activity,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Package,
  Cpu,
  HardDrive,
  Truck,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole?: 'admin' | 'standard';
}

const topItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-assistants', label: 'AI Assistants', icon: Bot },
];

const registryItems = [
  { id: 'organization', label: 'Organization', icon: Building2, roleBased: false },
  { id: 'products', label: 'Products', icon: Package, roleBased: false },
  { id: 'ai-inventory', label: 'AI Inventory', icon: Database, roleBased: false },
  { id: 'ai-model', label: 'AI Model', icon: Cpu, roleBased: false },
  { id: 'dataset', label: 'Dataset', icon: HardDrive, roleBased: false },
  { id: 'vendors', label: 'Vendors', icon: Truck, roleBased: true },
  { id: 'investments', label: 'Investments', icon: TrendingUp, roleBased: true },
];

const bottomItems = [
  { id: 'compliance', label: 'Compliance', icon: FileCheck },
  { id: 'compliance-v2', label: 'Compliance V2', icon: FileCheck },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'reporting', label: 'Reporting', icon: FileText },
];

export function Sidebar({ currentPage, onNavigate, userRole = 'admin' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState(true);

  const isRegistryActive = registryItems.some((item) => item.id === currentPage);

  const visibleRegistryItems = registryItems.filter(
    (item) => !item.roleBased || userRole === 'admin'
  );

  const NavButton = ({
    id,
    label,
    icon: Icon,
    indented = false,
  }: {
    id: string;
    label: string;
    icon: React.ElementType;
    roleBased?: boolean;
    indented?: boolean;
  }) => {
    const isActive = currentPage === id;
    return (
      <button
        key={id}
        onClick={() => onNavigate(id)}
        className={`
          w-full flex items-center
          ${isCollapsed ? 'justify-center px-0' : `gap-3 px-3 ${indented ? 'pl-5' : ''}`}
          py-2.5 rounded-lg
          font-['Montserrat',sans-serif] font-medium text-sm
          transition-colors duration-150
          ${isActive
            ? 'bg-[#ECE9FE] text-[#5720B7]'
            : 'text-[#464E58] hover:bg-[#ECE9FE]/50 hover:text-[#5720B7]'
          }
        `}
        title={isCollapsed ? label : ''}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {!isCollapsed && <span className="flex-1 text-left">{label}</span>}
      </button>
    );
  };

  return (
    <div
      className={`bg-[rgba(236,233,254,0.3)] ${isCollapsed ? 'w-[72px]' : 'w-[240px]'} h-screen flex flex-col border-r border-[#F0F1F2] shrink-0 transition-all duration-300 relative`}
    >
      {/* Logo */}
      <div className={`py-5 border-b border-[#F0F1F2] ${isCollapsed ? 'px-4' : 'px-6'}`}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="bg-[#5720B7] rounded-lg p-2">
              <div className="w-5 h-5 bg-white rounded-sm" />
            </div>
            <div>
              <div className="font-['Montserrat',sans-serif] font-bold text-[#5720B7] text-sm">DT MASTER</div>
              <div className="font-['Montserrat',sans-serif] font-normal text-[#5720B7] text-xs">AI Governance</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="bg-[#5720B7] rounded-lg p-2">
              <div className="w-5 h-5 bg-white rounded-sm" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">

          {/* Top Items: Dashboard, AI Assistants */}
          {topItems.map((item) => (
            <NavButton key={item.id} {...item} />
          ))}

          {/* Registry Section */}
          <div className="pt-2">
            {!isCollapsed ? (
              <button
                onClick={() => setIsRegistryOpen(!isRegistryOpen)}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 rounded-lg
                  transition-colors duration-150
                  ${isRegistryActive && !isRegistryOpen
                    ? 'bg-[#ECE9FE] text-[#5720B7]'
                    : 'text-[#B5BCC4] hover:text-[#5720B7] hover:bg-[#ECE9FE]/30'
                  }
                `}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left font-['Montserrat',sans-serif] font-semibold text-xs tracking-widest uppercase">
                  Registry
                </span>
                {isRegistryOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>
            ) : (
              <div className="mx-3 my-1 border-t border-[#E5E7EB]" />
            )}

            <div
              className={`
                overflow-hidden transition-all duration-300
                ${isCollapsed || isRegistryOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className={`space-y-1 ${!isCollapsed ? 'mt-1' : ''}`}>
                {visibleRegistryItems.map((item) => (
                  <NavButton
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    indented={!isCollapsed}
                  />
                ))}
              </div>
            </div>
          </div>

          {isCollapsed && <div className="mx-3 my-1 border-t border-[#E5E7EB]" />}

          {/* Bottom Items: Compliance, Monitoring, Reporting */}
          <div className={`space-y-1 ${!isCollapsed ? 'pt-2' : ''}`}>
            {bottomItems.map((item) => (
              <NavButton key={item.id} {...item} />
            ))}
          </div>

        </nav>
      </div>

      {/* Account Center */}
      <div className="border-t border-[#F0F1F2] p-4">
        <button
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-[#464E58] hover:bg-[#ECE9FE]/50 hover:text-[#5720B7] transition-colors`}
          title={isCollapsed ? 'Account Center' : ''}
        >
          <User className="w-5 h-5 shrink-0" />
          {!isCollapsed && (
            <span className="font-['Montserrat',sans-serif] font-medium text-sm">Account Center</span>
          )}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-[#F0F1F2] p-1.5 rounded-full hover:bg-[#ECE9FE] hover:border-[#5720B7] transition-all shadow-md z-10"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-[#5720B7]" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#5720B7]" />
        )}
      </button>
    </div>
  );
}
