import { ArrowUpRight, FileText } from 'lucide-react';

interface DigitalRegulationHubsProps {
  onSelectHub: (hubId: string) => void;
}

export function DigitalRegulationHubs({ onSelectHub }: DigitalRegulationHubsProps) {
  const hubs = [
    {
      id: 'eu-ai-act',
      label: 'EU AI Act',
      type: 'square-eu-flag-with-text',
      available: true
    },
    {
      id: 'gdpr',
      label: 'GDPR',
      type: 'circle-eu-flag',
      available: false
    },
    {
      id: 'dsa',
      label: 'DSA Digital Services Act',
      type: 'circle-text-only',
      available: false
    },
    {
      id: 'data-act',
      label: 'Data Act',
      type: 'rect-eu-flag-with-text',
      available: false
    }
  ];

  // EU Flag Logo Components
  const SquareEUFlagWithText = () => (
    <div className="relative w-[88px] h-[88px] bg-[#003399] rounded-[12px] flex flex-col items-center justify-center">
      {/* EU Stars Circle */}
      <div className="relative w-[40px] h-[40px] mb-1">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 16 + 20;
          const y = Math.sin(angle) * 16 + 20;
          return (
            <div
              key={i}
              className="absolute w-[5px] h-[5px]"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
                <path d="M2.5 0L2.9 1.5L4.5 1.5L3.3 2.5L3.7 4L2.5 3L1.3 4L1.7 2.5L0.5 1.5L2.1 1.5L2.5 0Z" fill="#FFDD00"/>
              </svg>
            </div>
          );
        })}
      </div>
      {/* AI ACT Text */}
      <div className="font-['Montserrat',sans-serif] font-bold text-[10px] text-white tracking-tight">
        AI ACT
      </div>
    </div>
  );

  const CircleEUFlag = () => (
    <div className="relative w-[72px] h-[72px] bg-[#003399] rounded-full flex items-center justify-center">
      {/* EU Stars Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[44px] h-[44px]">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 17 + 22;
            const y = Math.sin(angle) * 17 + 22;
            return (
              <div
                key={i}
                className="absolute w-[4.5px] h-[4.5px]"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
                  <path d="M2.5 0L2.9 1.5L4.5 1.5L3.3 2.5L3.7 4L2.5 3L1.3 4L1.7 2.5L0.5 1.5L2.1 1.5L2.5 0Z" fill="#FFDD00"/>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      {/* GDPR Text */}
      <div className="relative z-10 font-['Montserrat',sans-serif] font-bold text-[11px] text-white">
        GDPR
      </div>
    </div>
  );

  const CircleTextOnly = () => (
    <div className="w-[72px] h-[72px] bg-[#0066CC] rounded-full flex items-center justify-center">
      <div className="font-['Montserrat',sans-serif] font-bold text-[16px] text-white">
        GRI
      </div>
    </div>
  );

  const RectEUFlagWithText = () => (
    <div className="relative w-[120px] h-[72px] bg-[#003399] rounded-[8px] flex items-center justify-center">
      {/* EU Stars on the sides */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <div className="relative w-[28px] h-[28px]">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 11 + 14;
            const y = Math.sin(angle) * 11 + 14;
            return (
              <div
                key={i}
                className="absolute w-[4px] h-[4px]"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                  <path d="M2 0L2.3 1.2L3.6 1.2L2.6 2L2.9 3.2L2 2.4L1.1 3.2L1.4 2L0.4 1.2L1.7 1.2L2 0Z" fill="#FFDD00"/>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <div className="relative w-[28px] h-[28px]">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 11 + 14;
            const y = Math.sin(angle) * 11 + 14;
            return (
              <div
                key={i}
                className="absolute w-[4px] h-[4px]"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                  <path d="M2 0L2.3 1.2L3.6 1.2L2.6 2L2.9 3.2L2 2.4L1.1 3.2L1.4 2L0.4 1.2L1.7 1.2L2 0Z" fill="#FFDD00"/>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      {/* Data Act Text */}
      <div className="relative z-10 font-['Montserrat',sans-serif] font-bold text-[11px] text-white text-center px-2 leading-tight">
        Data Act
      </div>
    </div>
  );

  const renderLogo = (type: string) => {
    switch (type) {
      case 'square-eu-flag-with-text':
        return <SquareEUFlagWithText />;
      case 'circle-eu-flag':
        return <CircleEUFlag />;
      case 'circle-text-only':
        return <CircleTextOnly />;
      case 'rect-eu-flag-with-text':
        return <RectEUFlagWithText />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="bg-white rounded-lg p-8 mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A] mb-2">
              Digital Regulation Hubs
            </h1>
            <p className="font-['Montserrat',sans-serif] text-base text-[#6E7787]">
              EU AI Act Framework and reporting
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#F13D30] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#F13D30] hover:bg-[#FFF5F5] transition-colors">
            <FileText className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => hub.available && onSelectHub(hub.id)}
              disabled={!hub.available}
              className={`
                bg-white rounded-[20px] p-6 text-left transition-all relative group
                border border-[#E5E7EB]
                ${hub.available 
                  ? 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer hover:border-[#D1D5DB]' 
                  : 'opacity-50 cursor-not-allowed'
                }
              `}
            >
              {/* Icon */}
              <div className="mb-4">
                {renderLogo(hub.type)}
              </div>

              {/* Title */}
              <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#1F2937] pr-8">
                {hub.label}
              </h3>

              {/* Arrow Icon */}
              <ArrowUpRight 
                className={`
                  w-5 h-5 absolute top-6 right-6 transition-all
                  ${hub.available 
                    ? 'text-[#6B7280] group-hover:text-[#1F2937] group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                    : 'text-[#D1D5DB]'
                  }
                `}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}