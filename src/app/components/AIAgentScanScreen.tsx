import { ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AIAgentScanResults } from './AIAgentScanResults';
import { AIEvaluationDocument } from './AIEvaluationDocument';

interface AIAgentScanScreenProps {
  toolName: string;
  taskName: string;
  article: string;
  onBack: () => void;
}

export function AIAgentScanScreen({
  toolName,
  taskName,
  article,
  onBack,
}: AIAgentScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate AI scan process (3 seconds)
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      // Show evaluation document after scan completes
      setTimeout(() => {
        setShowEvaluation(true);
      }, 500);
    }, 3000);
  };

  // If evaluation document should be shown, display it
  if (showEvaluation) {
    return (
      <AIEvaluationDocument
        toolName={toolName}
        taskName={taskName}
        article={article}
        onBack={onBack}
      />
    );
  }

  // If scan is complete, show results (questionnaire)
  if (scanComplete) {
    return (
      <AIAgentScanResults
        toolName={toolName}
        taskName={taskName}
        article={article}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#F0F1F2] px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#565F6C] hover:text-[#22262A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-['Montserrat',sans-serif] font-medium text-sm">
            Back to Method Selection
          </span>
        </button>

        <div className="mb-2">
          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58]">
            {taskName} · AI Agent Scan
          </span>
        </div>

        <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A]">
          Risk Assessment and Management
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        <div className="max-w-[600px] w-full px-8 py-8 text-center">
          {!isScanning ? (
            // Ready to Scan State
            <>
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-[#F13D30] flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-4">
                  Ready to Scan
                </h2>
                <p className="font-['Montserrat',sans-serif] font-normal text-base text-[#565F6C] max-w-[500px] mx-auto">
                  Our AI agents will analyze your system configuration, data flows, and compliance posture to generate a comprehensive assessment report.
                </p>
              </div>

              <button
                onClick={handleStartScan}
                className="px-8 py-3 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-bold text-base hover:bg-[#DC180A] transition-colors flex items-center gap-2 mx-auto shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Start AI Scan
              </button>
            </>
          ) : (
            // Scanning State
            <>
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-[#F13D30] flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-4">
                  Scanning in Progress...
                </h2>
                <p className="font-['Montserrat',sans-serif] font-normal text-base text-[#565F6C] max-w-[500px] mx-auto mb-8">
                  Our AI agents are analyzing your system. This will take a few moments.
                </p>

                {/* Progress Steps */}
                <div className="space-y-3 max-w-[400px] mx-auto">
                  <div className="flex items-center gap-3 p-3 bg-[#D1FAE5] border border-[#065F46] rounded-lg">
                    <svg className="w-5 h-5 text-[#065F46] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#065F46]">
                      System configuration analyzed
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#DBEAFE] border border-[#1E40AF] rounded-lg">
                    <div className="w-5 h-5 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#1E40AF]">
                      Data flows evaluation in progress
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#F0F1F2] border border-[#B5BCC4] rounded-lg">
                    <div className="w-5 h-5 rounded-full border-2 border-[#B5BCC4] flex-shrink-0"></div>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">
                      Compliance posture assessment pending
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#F0F1F2] border border-[#B5BCC4] rounded-lg">
                    <div className="w-5 h-5 rounded-full border-2 border-[#B5BCC4] flex-shrink-0"></div>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">
                      Generating recommendations
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}