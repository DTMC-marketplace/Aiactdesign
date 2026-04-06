import { useAISystemCtx } from './AISystemDataCollectionContext';

export function AISystemResultTab() {
  const c = useAISystemCtx();

  const statusBadge = (status: string) => {
    const cls =
      status === 'Prohibited' || status === 'High-Risk'
        ? 'bg-[#FEEDEC] text-[#DC180A]'
        : status === 'Not Prohibited' || status === 'Not High-Risk' || status === 'Not Applicable'
        ? 'bg-[#E8F5E9] text-[#2E7D32]'
        : status === 'De-activated'
        ? 'bg-[#F0F1F2] text-[#B5BCC4]'
        : 'bg-[#FFF9E6] text-[#F57C00]';
    return (
      <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${cls}`}>
        {status}
      </div>
    );
  };

  const block1 = c.getBlock1Status();
  const block2 = c.getBlock2Status();
  const block3 = c.getBlock3Status();
  const block4 = c.getBlock4Status();
  const block4Risk = c.getBlock4RiskEvaluation();

  const descriptions: Record<string, Record<string, string>> = {
    block1: {
      Prohibited: 'This AI system is classified as prohibited under Article 5 of the EU AI Act. It cannot be deployed or used within the EU.',
      'Not Prohibited': 'This AI system does not fall under prohibited practices. It may proceed to further compliance assessment.',
      'Needs Review': 'This AI system requires further review to determine if it constitutes a prohibited practice. Consult with your legal team.',
    },
    block2: {
      'De-activated': 'This assessment is de-activated because the AI system is prohibited.',
      'High-Risk': 'This AI system is classified as high-risk under Annex III of the EU AI Act. It must comply with strict requirements including risk management, data governance, and conformity assessment.',
      'Not High-Risk': 'This AI system is not classified as high-risk. It may still be subject to other obligations such as transparency requirements.',
      'Needs Review': 'This AI system requires further review to determine its high-risk classification. Additional information or clarification is needed.',
    },
    block3: {
      'De-activated': 'This assessment is de-activated because the AI system is prohibited.',
      Applies: 'This AI system is subject to transparency obligations under Article 50 of the EU AI Act. Users must be informed that they are interacting with AI.',
      'Not Applicable': 'This AI system is not subject to transparency obligations under Article 50, either because it does not trigger the requirements or valid exceptions apply.',
      'Needs Review': 'The transparency obligation status requires further review. Additional clarification or documentation may be needed.',
    },
    block4: {
      'De-activated': 'This assessment is de-activated because the AI system is prohibited.',
      Applies: 'This AI system is subject to General-Purpose AI obligations under Chapter V of the EU AI Act as you are the provider of the AI model.',
      'Not Applicable': 'This AI system is not subject to GPAI obligations, either because it does not integrate a GPAI model or you are not the provider.',
      'Needs Review': 'Your provider status needs to be clarified to determine GPAI applicability. Consult with your legal team.',
      Pending: 'The GPAI assessment is not yet complete. Please complete the assessment to see the final status.',
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
        <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">Assessment Result</h1>
        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
          Summary of EU AI Act compliance assessment for this AI system
        </p>
      </div>

      {/* Block 1 */}
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">Block 1 — Prohibited Practices</h2>
          {statusBadge(block1)}
        </div>
        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
          {descriptions.block1[block1] ?? ''}
        </p>
      </div>

      {/* Block 2 */}
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">Block 2 — High-Risk Classification</h2>
          {statusBadge(block2)}
        </div>
        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
          {descriptions.block2[block2] ?? ''}
        </p>
      </div>

      {/* Block 3 */}
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">Block 3 — Transparency Obligation</h2>
          {statusBadge(block3)}
        </div>
        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
          {descriptions.block3[block3] ?? ''}
        </p>
      </div>

      {/* Block 4 */}
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">Block 4 — GPAI (General-Purpose AI) Applicability</h2>
          <div className="flex items-center gap-3">
            {statusBadge(block4)}
            {block4Risk && (() => {
              const riskCls =
                block4Risk === 'Systemic Risk' ? 'bg-[#FEEDEC] text-[#DC180A]'
                : block4Risk === 'Standard GPAI' ? 'bg-[#FFF3E0] text-[#E65100]'
                : block4Risk === 'No Risk' ? 'bg-[#E8F5E9] text-[#2E7D32]'
                : 'bg-[#F0F1F2] text-[#6B7280]';
              return <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${riskCls}`}>{block4Risk}</div>;
            })()}
          </div>
        </div>
        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
          {descriptions.block4[block4] ?? ''}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 pb-8">
        <button
          onClick={() => c.setActiveTab('Assessment')}
          className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
        >
          Back to Assessment
        </button>
      </div>
    </div>
  );
}
