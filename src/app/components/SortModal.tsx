import { X } from 'lucide-react';
import { useState } from 'react';

export type SortField = 'projectName' | 'lastUpdated' | 'progress' | 'riskClassification' | 'blockers';
export type SortDirection = 'asc' | 'desc';

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sort: SortOptions) => void;
  currentSort: SortOptions;
}

export function SortModal({ isOpen, onClose, onApply, currentSort }: SortModalProps) {
  const [sort, setSort] = useState<SortOptions>(currentSort);

  if (!isOpen) return null;

  const sortOptions: { field: SortField; label: string }[] = [
    { field: 'projectName', label: 'Project Name' },
    { field: 'lastUpdated', label: 'Last Updated' },
    { field: 'progress', label: 'Progress' },
    { field: 'riskClassification', label: 'Risk Classification' },
    { field: 'blockers', label: 'Blockers' },
  ];

  const handleApply = () => {
    onApply(sort);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
            Sort Projects
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#464E58]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Sort Field */}
          <div>
            <label className="block mb-3">
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                Sort By
              </span>
            </label>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label
                  key={option.field}
                  className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="sortField"
                    checked={sort.field === option.field}
                    onChange={() => setSort({ ...sort, field: option.field })}
                    className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                  />
                  <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Direction */}
          <div>
            <label className="block mb-3">
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                Direction
              </span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="sortDirection"
                  checked={sort.direction === 'asc'}
                  onChange={() => setSort({ ...sort, direction: 'asc' })}
                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                />
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                  Ascending (A-Z, 0-100, Old-New)
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="sortDirection"
                  checked={sort.direction === 'desc'}
                  onChange={() => setSort({ ...sort, direction: 'desc' })}
                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                />
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                  Descending (Z-A, 100-0, New-Old)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F0F1F2] flex items-center justify-end gap-3">
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
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
}
