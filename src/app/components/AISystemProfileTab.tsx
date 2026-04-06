import { HelpCircle, FileText, Link } from 'lucide-react';
import { useAISystemCtx } from './AISystemDataCollectionContext';
import { CollapsibleSection, DocumentUploadSection, ComponentLinker, DatasetLinker } from './AISystemDataCollectionHelpers';

export function AISystemProfileTab() {
  const c = useAISystemCtx();

  const isSection1Link = (link: string) => link.includes('/api/documents/');

  const btnCancel = "px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors";
  const btnSave   = "px-6 py-2.5 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors";
  const inputCls  = "w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]";
  const labelCls  = "block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]";
  const radioInline = "w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]";

  return (
    <>
      {/* Section 1: Document Upload */}
      <CollapsibleSection title="1. Document & Evidence Upload" description="Upload documents for AI-powered auto-fill" defaultOpen>
        <DocumentUploadSection />
      </CollapsibleSection>

      {/* Section 2: System Identity */}
      <CollapsibleSection title="2. System Identity" description="Basic information about this AI system" defaultOpen>
        <div className="space-y-6">
          <div>
            <label className={`${labelCls} mb-2`}>Q1: AI System Name <span className="text-[#F13D30]">*</span></label>
            <input type="text" value={c.aiSystemName} onChange={e => c.setAiSystemName(e.target.value)} placeholder="Enter AI system name" className={inputCls} />
          </div>
          <div>
            <label className={`${labelCls} mb-2`}>Q2: Internal system ID / reference</label>
            <input type="text" value={c.internalSystemId} onChange={e => c.setInternalSystemId(e.target.value)} placeholder="Enter internal system ID or reference" className={inputCls} />
          </div>
          <div>
            <label className={`${labelCls} mb-2`}>Q3: Commercial name of the AI system, if any</label>
            <input type="text" value={c.commercialName} onChange={e => c.setCommercialName(e.target.value)} placeholder="Enter commercial name" className={inputCls} />
          </div>
          <div className="space-y-4">
            <label className={labelCls}>Q4: Owner / Responsible Team</label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={c.sameAsComplianceOwner} onChange={e => c.handleSameAsComplianceOwner(e.target.checked)} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">Same as internal AI compliance owner</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[['Name', c.ownerName, c.setOwnerName, 'Enter name', 'text'],
                ['Email', c.ownerEmail, c.setOwnerEmail, 'Enter email', 'email'],
                ['Department', c.ownerDepartment, c.setOwnerDepartment, 'Enter department', 'text']].map(([label, val, setter, ph, type]) => (
                <div key={label as string}>
                  <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">{label as string}</label>
                  <input type={type as string} value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} placeholder={ph as string} disabled={c.sameAsComplianceOwner}
                    className={`${inputCls} disabled:bg-[#F9FAFB] disabled:cursor-not-allowed`} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className={`${labelCls} mb-2`}>Q5: System status <span className="text-[#F13D30]">*</span></label>
            <select value={c.systemStatus} onChange={e => c.setSystemStatus(e.target.value as any)} className={inputCls}>
              {['Planned','In development','Testing / Pilot','In use (production)','Retired'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={`${labelCls} mb-2`}>Q6: Go-live date (planned or actual)</label>
            <input type="date" value={c.goLiveDate} onChange={e => c.setGoLiveDate(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q7: Is this system part of a broader product / service?</label>
            <div className="flex gap-4">
              {['Yes','No'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="broaderProduct" value={v} checked={c.isPartOfBroaderProduct === v} onChange={() => c.setIsPartOfBroaderProduct(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
            {c.isPartOfBroaderProduct === 'Yes' && (
              <input type="text" value={c.productServiceName} onChange={e => c.setProductServiceName(e.target.value)} placeholder="Enter product / service name" className={inputCls} />
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={c.handleSaveSection1} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 3: Source & Operator Role */}
      <CollapsibleSection title="3. Source & Operator Role" description="Define your organization's role and system source">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>
              Q1: In Organization module, your default role is set to be: <span className="text-[#F13D30]">"{c.orgDefaultRole}"</span>. Does your organisation's default role apply to this AI system? <span className="text-[#F13D30]">*</span>
            </label>
            <div className="flex gap-4">
              {['Yes','No'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="defaultRole" value={v} checked={c.defaultRoleApplies === v} onChange={() => c.handleDefaultRoleApplies(v as 'Yes' | 'No')} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <label className={labelCls}>Q2: Your role for this AI system <span className="text-[#F13D30]">*</span></label>
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-[#B5BCC4] cursor-help" />
                <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-3 bg-[#22262A] text-white text-xs rounded-lg shadow-lg z-10">
                  <p className="font-['Montserrat',sans-serif] font-normal">
                    <strong>Provider:</strong> Develops, produces or trains AI systems<br />
                    <strong>Deployer:</strong> Uses AI systems under its authority<br />
                    <strong>Importer:</strong> Places AI systems on EU market<br />
                    <strong>Distributor:</strong> Makes AI systems available on EU market
                  </p>
                </div>
              </div>
            </div>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="grid grid-cols-2 gap-3">
              {['Provider','Deployer','Importer','Distributor'].map(role => (
                <label key={role} className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${c.selectedRoles.includes(role) ? 'border-[#F13D30] bg-[#FEEDEC]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'}`}>
                  <input type="checkbox" checked={c.selectedRoles.includes(role)} onChange={() => c.handleRoleToggle(role)} disabled={c.defaultRoleApplies === 'Yes'} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30]" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{role}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q3: System source <span className="text-[#F13D30]">*</span></label>
            <div className="grid grid-cols-2 gap-3">
              {['In-house','Vendor / Third-party','Mixed','Unknown'].map(source => (
                <label key={source} className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${c.systemSource === source ? 'border-[#F13D30] bg-[#FEEDEC]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'}`}>
                  <input type="radio" name="systemSource" value={source} checked={c.systemSource === source} onChange={() => c.setSystemSource(source as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{source}</span>
                </label>
              ))}
            </div>
            {(c.systemSource === 'Vendor / Third-party' || c.systemSource === 'Mixed') && (
              <div className="space-y-3 pt-3">
                <div>
                  <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">External vendor / provider name <span className="text-[#F13D30]">*</span></label>
                  <input type="text" value={c.vendorName} onChange={e => c.setVendorName(e.target.value)} placeholder="Enter vendor / provider name" className={inputCls} />
                </div>
                <div className="space-y-3">
                  <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">Paste a link from Section 1 or an external link</label>
                  <div className="flex gap-2">
                    <input type="text" value={c.vendorEvidenceLink} onChange={e => c.setVendorEvidenceLink(e.target.value)} placeholder="Paste link here" className={`flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors`} />
                    <button onClick={c.saveVendorLink} className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors whitespace-nowrap">Save link</button>
                  </div>
                  {c.vendorEvidenceSavedLink && (
                    <div className="flex items-center gap-2 mt-2">
                      {isSection1Link(c.vendorEvidenceSavedLink) ? (
                        <><FileText className="w-4 h-4 text-[#F13D30]" /><span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">Document link saved</span></>
                      ) : (
                        <><Link className="w-4 h-4 text-[#F13D30]" /><a href={c.vendorEvidenceSavedLink} target="_blank" rel="noopener noreferrer" className="font-['Montserrat',sans-serif] font-normal text-sm text-[#F13D30] hover:underline">{c.vendorEvidenceSavedLink}</a></>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <label className={labelCls}>Q4: Do you modify / customize this AI system before use or resale? <span className="text-[#F13D30]">*</span></label>
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-[#B5BCC4] cursor-help" />
                <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-3 bg-[#22262A] text-white text-xs rounded-lg shadow-lg z-10">
                  <p className="font-['Montserrat',sans-serif] font-normal">Examples: fine-tuning, retraining, changing decision logic, changing intended purpose, re-branding</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {['Yes','No','Unknown'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="modifyCustomize" value={v} checked={c.modifyCustomize === v} onChange={() => c.setModifyCustomize(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
            {c.modifyCustomize === 'Yes' && (
              <div className="bg-[#FEF3C7] border border-[#FDE047] rounded-lg p-4 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#92400E] mb-1">Role impact</p>
                  <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#92400E]">Customising / modifying an AI system may make your organisation responsible as a Provider. Please review and update the role for this AI system if needed.</p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q5: Is this AI system offered / used in the EU / EEA? <span className="text-[#F13D30]">*</span></label>
            <div className="grid grid-cols-2 gap-3">
              {['Yes','No','Planned','Unknown'].map(v => (
                <label key={v} className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${c.euEeaRelevance === v ? 'border-[#F13D30] bg-[#FEEDEC]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'}`}>
                  <input type="radio" name="euEeaRelevance" value={v} checked={c.euEeaRelevance === v} onChange={() => c.setEuEeaRelevance(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q6: Do system outputs affect persons located in the EU / EEA? <span className="text-[#F13D30]">*</span></label>
            <div className="grid grid-cols-2 gap-3">
              {['Yes','No','Planned','Unknown'].map(v => (
                <label key={v} className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${c.euEeaOutputsAffect === v ? 'border-[#F13D30] bg-[#FEEDEC]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'}`}>
                  <input type="radio" name="euEeaOutputsAffect" value={v} checked={c.euEeaOutputsAffect === v} onChange={() => c.setEuEeaOutputsAffect(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
          </div>
          {c.euEeaRelevance === 'No' && c.euEeaOutputsAffect === 'No' && (
            <div className="bg-[#E0F2FE] border border-[#7DD3FC] rounded-lg p-4 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#0C4A6E] shrink-0 mt-0.5" />
              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#0C4A6E]">Your AI System is not regulated by the EU AI Act.</p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={c.handleSaveSection2} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 4: Intended Purpose */}
      <CollapsibleSection title="4. Intended Purpose & Decision Use" description="Define the purpose and usage domain">
        <div className="space-y-6">
          <div>
            <label className={`${labelCls} mb-2`}>Q1: What is the intended purpose of this system? (1–3 sentences) <span className="text-[#F13D30]">*</span></label>
            <textarea value={c.intendedPurpose} onChange={e => c.setIntendedPurpose(e.target.value)} placeholder="Describe the intended purpose of this AI system..." rows={4} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q2: In which sector / domain is this system used? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="space-y-2">
              {['Biometric identification and categorisation','Critical infrastructure management','Education & vocational training','Employment & workforce management','Access to essential private or public services & benefits','Law enforcement','Migration, asylum & border control','Justice & democratic processes'].map(sector => (
                <label key={sector} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.sectorDomains.includes(sector)} onChange={e => c.setSectorDomains(e.target.checked ? [...c.sectorDomains, sector] : c.sectorDomains.filter(s => s !== sector))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{sector}</span>
                </label>
              ))}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={c.sectorDomains.includes('Other / not listed')} onChange={e => { if (e.target.checked) c.setSectorDomains([...c.sectorDomains, 'Other / not listed']); else { c.setSectorDomains(c.sectorDomains.filter(s => s !== 'Other / not listed')); c.setOtherSectorDomain(''); }}} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                <div className="flex-1">
                  <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">Other / not listed:</label>
                  {c.sectorDomains.includes('Other / not listed') && <input type="text" value={c.otherSectorDomain} onChange={e => c.setOtherSectorDomain(e.target.value)} placeholder="Please specify" className={`w-full mt-2 ${inputCls}`} />}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q3: Is this AI system a safety component of a product covered by EU harmonisation legislation in Annex I? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['Yes','No'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="safetyComponent" value={v} checked={c.safetyComponent === v} onChange={() => { c.setSafetyComponent(v as any); if (v === 'No') c.setThirdPartyConformity(''); }} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{v}</span>
                </label>
              ))}
            </div>
            {c.safetyComponent === 'Yes' && (
              <div className="ml-7 mt-4 pl-4 border-l-2 border-[#F0F1F2] space-y-3">
                <label className={labelCls}>If the product requires a third-party conformity assessment under the corresponding legislation. <span className="text-[#F13D30]">*</span></label>
                <div className="space-y-2">
                  {['Yes','No'].map(v => (
                    <label key={v} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="thirdPartyConformity" value={v} checked={c.thirdPartyConformity === v} onChange={() => c.setThirdPartyConformity(v as any)} className={radioInline} />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{v}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={() => alert('Section 4 saved!')} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 5: Deployment & Stakeholders */}
      <CollapsibleSection title="5. Deployment & Stakeholders" description="Define deployment context and affected parties">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Q1: In what context will this AI system be deployed? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['Workplace (employee-facing)','Educational institution','Healthcare setting','Law enforcement / public security','Public administration / government service','General public / consumer-facing'].map(ctx => (
                <label key={ctx} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="deploymentContext" value={ctx} checked={c.deploymentContext === ctx} onChange={() => { c.setDeploymentContext(ctx); c.setDeploymentContextOther(''); }} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{ctx}</span>
                </label>
              ))}
              <div className="flex items-start gap-3">
                <input type="radio" name="deploymentContext" value="Other" checked={c.deploymentContext === 'Other'} onChange={() => c.setDeploymentContext('Other')} className={`${radioInline} mt-0.5`} />
                <div className="flex-1">
                  <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">Other:</label>
                  {c.deploymentContext === 'Other' && <input type="text" value={c.deploymentContextOther} onChange={e => c.setDeploymentContextOther(e.target.value)} placeholder="Please specify" className={`w-full mt-2 ${inputCls}`} />}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q2: Who will use this AI system? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="space-y-2">
              {['Internal employees','External contractors / service providers','Customers / consumers','Students','Patients','Public authority staff'].map(user => (
                <label key={user} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.systemUsers.includes(user)} onChange={e => c.setSystemUsers(e.target.checked ? [...c.systemUsers, user] : c.systemUsers.filter(u => u !== user))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{user}</span>
                </label>
              ))}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={c.systemUsers.includes('Other')} onChange={e => { if (e.target.checked) c.setSystemUsers([...c.systemUsers,'Other']); else { c.setSystemUsers(c.systemUsers.filter(u=>u!=='Other')); c.setSystemUsersOther(''); }}} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                <div className="flex-1">
                  <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">Other:</label>
                  {c.systemUsers.includes('Other') && <input type="text" value={c.systemUsersOther} onChange={e => c.setSystemUsersOther(e.target.value)} placeholder="Please specify" className={`w-full mt-2 ${inputCls}`} />}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q3: Who can be affected by the AI system's outputs? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="space-y-2">
              {['Employees','Job applicants','Students','Patients','Customers / consumers','Citizens / residents'].map(p => (
                <label key={p} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.affectedPersons.includes(p)} onChange={e => c.setAffectedPersons(e.target.checked ? [...c.affectedPersons,p] : c.affectedPersons.filter(x=>x!==p))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{p}</span>
                </label>
              ))}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={c.affectedPersons.includes('Other')} onChange={e => { if(e.target.checked) c.setAffectedPersons([...c.affectedPersons,'Other']); else { c.setAffectedPersons(c.affectedPersons.filter(p=>p!=='Other')); c.setAffectedPersonsOther(''); }}} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                <div className="flex-1">
                  <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">Other:</label>
                  {c.affectedPersons.includes('Other') && <input type="text" value={c.affectedPersonsOther} onChange={e => c.setAffectedPersonsOther(e.target.value)} placeholder="Please specify" className={`w-full mt-2 ${inputCls}`} />}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q4: Does the AI system affect vulnerable persons? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="space-y-2">
              {['Children / minors','Persons with disabilities','Persons in socio-economic vulnerability','None / not applicable','Unknown'].map(cat => (
                <label key={cat} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.vulnerablePersons.includes(cat)} onChange={e => c.setVulnerablePersons(e.target.checked ? [...c.vulnerablePersons,cat] : c.vulnerablePersons.filter(v=>v!==cat))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={() => alert('Section 5 saved!')} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 6: Workflow, Outputs & Decision Impact */}
      <CollapsibleSection title="6. Workflow, Outputs & Decision Impact" description="Define how the AI system operates and its decision-making role">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Q1: What does the AI system do in the workflow? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['Provides insights / recommendations only (human decides)','Supports decisions (human approval required)','Automatically makes decisions / actions (no human approval)','Mixed / depends on case','Unknown'].map(role => (
                <label key={role} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="workflowRole" value={role} checked={c.workflowRole === role} onChange={() => c.setWorkflowRole(role)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{role}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q2: What type of output does the AI system produce? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Select all that apply</p>
            <div className="space-y-2">
              {['Score / rating','Ranking','Recommendation','Classification / label','Prediction / forecasting','Matching (e.g., job matching, content matching)','Detection (e.g., fraud detection)','Identification / verification','Generated content (text / image / audio / video)','Automated decision (system executes action)'].map(t => (
                <label key={t} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.outputTypes.includes(t)} onChange={e => c.setOutputTypes(e.target.checked ? [...c.outputTypes,t] : c.outputTypes.filter(x=>x!==t))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{t}</span>
                </label>
              ))}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={c.outputTypes.includes('Other')} onChange={e => { if(e.target.checked) c.setOutputTypes([...c.outputTypes,'Other']); else { c.setOutputTypes(c.outputTypes.filter(t=>t!=='Other')); c.setOutputTypesOther(''); }}} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                <div className="flex-1">
                  <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">Other:</label>
                  {c.outputTypes.includes('Other') && <input type="text" value={c.outputTypesOther} onChange={e => c.setOutputTypesOther(e.target.value)} placeholder="Please specify" className={`w-full mt-2 ${inputCls}`} />}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q3: Is the AI output used to make or influence decisions about individuals? <span className="text-[#F13D30]">*</span></label>
            <div className="flex gap-4">
              {['Yes','No','Not sure'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="decisionsAboutIndividuals" value={v} checked={c.decisionsAboutIndividuals === v} onChange={() => c.setDecisionsAboutIndividuals(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q4: Does the AI system automatically execute actions based on its output? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['No (advisory only)','Yes (automatic actions)','Mixed','Unknown'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="automaticActions" value={v} checked={c.automaticActions === v} onChange={() => c.setAutomaticActions(v)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{v}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={() => alert('Section 6 saved!')} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 7: Capabilities */}
      <CollapsibleSection title="7. Capabilities" description="Identify specific capabilities and interaction modes">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Q1: Does your AI system use any of the following capabilities or practices? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Select all that apply</p>
            <div className="space-y-2">
              {['Subliminal / manipulative / deceptive techniques that materially distort behaviour and are likely to cause significant harm','Exploitation of vulnerabilities (age, disability, or social / economic situation) to distort behaviour likely causing significant harm','Social scoring leading to detrimental / unfavourable treatment (esp. unjustified / disproportionate)','Criminal offence risk assessment / prediction based solely on profiling or personality traits (individual predictive policing)','Untargeted scraping of facial images from the internet or CCTV to build / expand facial recognition databases','Emotion recognition in the workplace or in education settings','Biometric categorisation that infers or predicts sensitive traits (e.g., race, political opinions, religion, trade union membership, sexual orientation)','Real-time remote biometric identification (RBI) in publicly accessible spaces for law enforcement purposes','None of the above'].map(cap => (
                <label key={cap} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.capabilities.includes(cap)} onChange={e => {
                    if (e.target.checked) {
                      if (cap === 'None of the above') c.setCapabilities(['None of the above']);
                      else c.setCapabilities([...c.capabilities.filter(x => x !== 'None of the above'), cap]);
                    } else c.setCapabilities(c.capabilities.filter(x => x !== cap));
                  }} className="w-4 h-4 shrink-0 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{cap}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q2: Does the AI system interact directly with natural persons? <span className="text-[#F13D30]">*</span></label>
            <div className="flex gap-4">
              {['Yes','No','Unknown'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="interactWithPersons" value={v} checked={c.interactWithPersons === v} onChange={() => c.setInteractWithPersons(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q3: Does the AI system generate synthetic content that may be perceived as human-made? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="space-y-2">
              {['Text','Image','Audio','Video','No','Unknown'].map(t => (
                <label key={t} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.syntheticContent.includes(t)} onChange={e => c.setSyntheticContent(e.target.checked ? [...c.syntheticContent,t] : c.syntheticContent.filter(x=>x!==t))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={() => alert('Section 7 saved!')} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 8: Technical Profile */}
      <CollapsibleSection title="8. Technical Profile (Model & Data)" description="Technical details about the AI model and data processing">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Q1: What kind of AI is used? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['Rules-based automation','Machine learning','Deep learning','Generative AI','Hybrid','Unknown'].map(k => (
                <label key={k} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="aiKind" value={k} checked={c.aiKind === k} onChange={() => c.setAiKind(k)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{k}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q2: Is this system provided as a GPAI model / component or does it integrate one? <span className="text-[#F13D30]">*</span></label>
            <div className="flex gap-4">
              {['Yes','No','Unknown'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gpaiIntegration" value={v} checked={c.gpaiIntegration === v} onChange={() => { c.setGpaiIntegration(v as any); if (v !== 'Yes') c.setGpaiProvider(''); }} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
            {c.gpaiIntegration === 'Yes' && (
              <div className="mt-3">
                <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">Which GPAI provider / model? (optional)</label>
                <input type="text" value={c.gpaiProvider} onChange={e => c.setGpaiProvider(e.target.value)} placeholder="e.g., OpenAI GPT-4, Google Gemini, etc." className={inputCls} />
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q3: What is the training source? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['In-house training','Vendor-trained model (no training by us)','Fine-tuned by us','Unknown / not applicable'].map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="trainingSource" value={s} checked={c.trainingSource === s} onChange={() => c.setTrainingSource(s)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelCls}>Q4: How often does the model / system update? <span className="text-[#F13D30]">*</span></label>
            <div className="space-y-2">
              {['Static / never','Periodic retraining','Continuous learning','Unknown'].map(f => (
                <label key={f} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="modelUpdateFrequency" value={f} checked={c.modelUpdateFrequency === f} onChange={() => c.setModelUpdateFrequency(f)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{f}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Q5: Datasets */}
          <DatasetLinker selectedIds={c.linkedDatasetIds} onChange={c.setLinkedDatasetIds} />

          <div className="space-y-3">
            <label className={labelCls}>Q6: What data types are processed? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Multiple selections allowed</p>
            <div className="space-y-2">
              {['Personal data','Sensitive data (health, biometric, etc.)','Employee data','Children / minors data','Public web data','Non-personal / industrial data','Unknown'].map(d => (
                <label key={d} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={c.dataTypes.includes(d)} onChange={e => c.setDataTypes(e.target.checked ? [...c.dataTypes,d] : c.dataTypes.filter(x=>x!==d))} className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5" />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q7: DPIA */}
          <div className="space-y-3">
            <label className={labelCls}>Q7: Has a Data Protection Impact Assessment (DPIA) been completed for this system? <span className="text-[#F13D30]">*</span></label>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">Required under GDPR Art. 35 for high-risk processing activities involving personal data.</p>
            <div className="grid grid-cols-2 gap-3">
              {(['Yes','No','In Progress','Not Applicable (No personal data)'] as const).map(v => (
                <label key={v} className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${c.dpiaStatus === v ? 'border-[#F13D30] bg-[#FEEDEC]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'}`}>
                  <input type="radio" name="dpiaStatus" value={v} checked={c.dpiaStatus === v} onChange={() => c.setDpiaStatus(v as any)} className={radioInline} />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">{v}</span>
                </label>
              ))}
            </div>
            {c.dpiaStatus === 'No' && (
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 flex items-start gap-3">
                <span className="text-[#DC2626] font-bold text-sm shrink-0 mt-0.5">!</span>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#991B1B]">A DPIA may be required under <strong>GDPR Art. 35</strong> for AI systems that process personal data at scale, perform profiling, or make automated decisions with significant effects on individuals.</p>
              </div>
            )}
            {c.dpiaStatus === 'In Progress' && (
              <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-4 flex items-start gap-3">
                <span className="text-[#EA580C] font-bold text-sm shrink-0 mt-0.5">!</span>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#9A3412]">Ensure the DPIA is completed and documented before this system is deployed in production.</p>
              </div>
            )}
          </div>

          {/* Q8: Linked Components */}
          <ComponentLinker selectedIds={c.linkedComponentIds} onChange={c.setLinkedComponentIds} />

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={c.onBack} className={btnCancel}>Cancel</button>
            <button onClick={() => alert('Section 8 saved!')} className={btnSave}>Confirm and Save</button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Proceed to Assessment */}
      <div className="flex justify-end pt-4 pb-8">
        <button onClick={() => c.setActiveTab('Assessment')} className="px-8 py-3 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-semibold text-base hover:bg-[#ddd6fe] transition-colors shadow-sm">
          Save all and proceed to Assessment
        </button>
      </div>
    </>
  );
}