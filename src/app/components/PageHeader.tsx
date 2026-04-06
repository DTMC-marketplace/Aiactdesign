import { ArrowLeft, ArrowRight } from 'lucide-react';
import imgAvatar from "figma:asset/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

interface PageHeaderProps {
  breadcrumb: string | React.ReactNode;
  title: string;
  subtitle?: string | React.ReactNode;
  actions?: React.ReactNode;
  onBack?: () => void;
  onForward?: () => void;
}

export function PageHeader({ breadcrumb, title, subtitle, actions, onBack, onForward }: PageHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleForward = () => {
    if (onForward) {
      onForward();
    } else {
      window.history.forward();
    }
  };

  return (
    <div className="bg-white border-b border-[#F0F1F2] px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={handleBack} className="p-1 hover:bg-[#ece9fe] rounded transition-colors" title="Go back">
          <ArrowLeft className="w-6 h-6 text-[#5720B7]" />
        </button>
        <button onClick={handleForward} className="p-1 hover:bg-[#F0F1F2] rounded transition-colors" title="Go forward">
          <ArrowRight className="w-6 h-6 text-[#B5BCC4]" />
        </button>
        <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7]">
          {breadcrumb}
        </span>
      </div>

      {/* Title and Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-['Roboto',sans-serif] font-bold text-2xl text-[#22262A] tracking-[-0.24px] mb-1">
            {title}
          </h1>
          {subtitle && (
            <div className="font-['Roboto',sans-serif] font-normal text-base text-[#464E58]">
              {subtitle}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {actions}
          <div className="w-10 h-10 rounded-full border border-[#B5BCC4] overflow-hidden">
            <img src={imgAvatar} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}