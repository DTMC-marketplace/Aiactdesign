import { X } from 'lucide-react';
import { useState } from 'react';

export interface FilterOptions {
  riskClassifications: string[];
  progressRange: { min: number; max: number };
  hasBlockers: 'all' | 'withBlockers' | 'noBlockers';
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export function FilterModal({ isOpen, onClose, onApply, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  if (!isOpen) return null;

  const riskOptions = ['Prohibited', 'High-Risk', 'Limited transparency', 'Minimal'];

  const handleRiskToggle = (risk: string) => {
    if (filters.riskClassifications.includes(risk)) {
      setFilters({
        ...filters,
        riskClassifications: filters.riskClassifications.filter(r => r !== risk),
      });
    } else {
      setFilters({
        ...filters,
        riskClassifications: [...filters.riskClassifications, risk],
      });
    }
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      riskClassifications: [],
      progressRange: { min: 0, max: 100 },
      hasBlockers: 'all',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
            Filter Projects
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#464E58]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Risk Classification */}
          <div>
            <label className="block mb-3">
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                Risk Classification
              </span>
            </label>
            <div className="space-y-2">
              {riskOptions.map((risk) => (
                <label
                  key={risk}
                  className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.riskClassifications.includes(risk)}
                    onChange={() => handleRiskToggle(risk)}
                    className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30]"
                  />
                  <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                    {risk}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Progress Range */}
          <div>
            <label className="block mb-3">
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                Progress Range
              </span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                value={filters.progressRange.min}
                onChange={(e) => setFilters({
                  ...filters,
                  progressRange: { ...filters.progressRange, min: Number(e.target.value) }
                })}
                className="w-20 px-3 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
              />
              <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.progressRange.max}
                onChange={(e) => setFilters({
                  ...filters,
                  progressRange: { ...filters.progressRange, max: Number(e.target.value) }
                })}
                className="w-20 px-3 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
              />
              <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">%</span>
            </div>
          </div>

          {/* Blocker Status */}
          <div>
            <label className="block mb-3">
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                Blocker Status
              </span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="blockers"
                  checked={filters.hasBlockers === 'all'}
                  onChange={() => setFilters({ ...filters, hasBlockers: 'all' })}
                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                />
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                  All Projects
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="blockers"
                  checked={filters.hasBlockers === 'withBlockers'}
                  onChange={() => setFilters({ ...filters, hasBlockers: 'withBlockers' })}
                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                />
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                  With Blockers
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="blockers"
                  checked={filters.hasBlockers === 'noBlockers'}
                  onChange={() => setFilters({ ...filters, hasBlockers: 'noBlockers' })}
                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                />
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                  No Blockers
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F0F1F2] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
          >
            Reset
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#DC180A] transition-colors shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
