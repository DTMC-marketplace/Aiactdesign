import { X } from 'lucide-react';
import { useState } from 'react';

interface AISystem {
  id: string;
  name: string;
  riskClassification: string;
  status: string;
}

interface NewComplianceProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (selectedSystemIds: string[], projectName: string) => void;
  availableSystems: AISystem[];
}

export function NewComplianceProjectModal({ 
  isOpen, 
  onClose, 
  onCreateProject,
  availableSystems 
}: NewComplianceProjectModalProps) {
  const [selectedSystemIds, setSelectedSystemIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectName, setProjectName] = useState('');

  if (!isOpen) return null;

  const filteredSystems = availableSystems.filter(system =>
    system.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSystem = (systemId: string) => {
    if (selectedSystemIds.includes(systemId)) {
      setSelectedSystemIds(selectedSystemIds.filter(id => id !== systemId));
    } else {
      setSelectedSystemIds([...selectedSystemIds, systemId]);
    }
  };

  const handleSubmit = () => {
    if (selectedSystemIds.length === 0) {
      alert('Please select at least one AI system');
      return;
    }
    onCreateProject(selectedSystemIds, projectName);
    setSelectedSystemIds([]);
    setSearchTerm('');
    setProjectName('');
  };

  const handleCancel = () => {
    setSelectedSystemIds([]);
    setSearchTerm('');
    setProjectName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between">
          <div>
            <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
              New Compliance Project
            </h2>
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mt-1">
              Select one or more AI systems to create a compliance assessment project
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#464E58]" />
          </button>
        </div>

        {/* Project Name */}
        <div className="px-6 py-4 border-b border-[#F0F1F2]">
          <label className="block mb-2">
            <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
              Project Name <span className="text-[#B5BCC4] font-normal">(Optional)</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="e.g., Q1 2026 Compliance Review"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
          />
          <p className="mt-2 font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
            <span className="font-semibold">Note:</span> The Project Name is a custom label for this compliance assessment (e.g., "Q1 2026 Compliance Review"). The AI System Name refers to the actual AI system being assessed from your inventory (e.g., "Credit Scoring AI").
          </p>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-[#F0F1F2]">
          <label className="block mb-2">
            <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
              Select AI System(s)
            </span>
          </label>
          <input
            type="text"
            placeholder="Search AI systems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
          />
        </div>

        {/* System List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filteredSystems.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">
                No AI systems found
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSystems.map((system) => (
                <label
                  key={system.id}
                  className="flex items-start gap-3 p-4 border border-[#F0F1F2] rounded-lg hover:bg-[#FEEDEC] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedSystemIds.includes(system.id)}
                    onChange={() => handleToggleSystem(system.id)}
                    className="mt-0.5 w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                        {system.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-2.5 py-1 rounded-full font-['Montserrat',sans-serif] font-medium text-xs bg-[#E5E7EB] text-[#6B7280]">
                          {system.status}
                        </span>
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Montserrat',sans-serif] font-medium text-xs ${
                          system.riskClassification === 'High-risk' 
                            ? 'bg-[#FED7AA] text-[#9A3412]' 
                            : system.riskClassification === 'Limited transparency'
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : 'bg-[#D1FAE5] text-[#065F46]'
                        }`}>
                          {system.riskClassification}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Selected Count */}
        {selectedSystemIds.length > 0 && (
          <div className="px-6 py-3 bg-[#FEEDEC] border-t border-[#F0F1F2]">
            <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#F13D30]">
              {selectedSystemIds.length} system{selectedSystemIds.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F0F1F2] flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#DC180A] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedSystemIds.length === 0}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}