import { CheckCircle, AlertTriangle, Shield } from 'lucide-react';

export function AISafetyPlanSection() {
  return (
    <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
      <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
        <Shield className="w-6 h-6 text-[#F13D30]" />
        <span>AI Safety Plan</span>
      </h2>

      {/* Current Safety Controls */}
      <div className="mb-8">
        <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#10B981]" />
          Current Safety Controls (✅ Implemented)
        </h3>

        <div className="space-y-4">
          <div className="bg-[#D1FAE5] border border-[#10B981] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#065F46] mb-2">
              Transparency (Article 50 Compliance)
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">AI Disclosure Notice</span> - Clear panel informing users they're interacting with AI</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Model Identification</span> - Model name displayed to users</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Disclaimer Notices</span> - Not legal advice, verify with sources</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">AI-Generated Content Label</span> - Footer on every response</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#D1FAE5] border border-[#10B981] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#065F46] mb-2">
              System Prompt Safety
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Context Constraints</span> - Based ONLY on provided context document</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Citation Requirements</span> - ALWAYS cite specific Articles</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Legal Counsel Reminders</span> - Emphasize professional advice</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Temperature Control</span> - temperature=0.3 for deterministic outputs</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#D1FAE5] border border-[#10B981] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#065F46] mb-2">
              User Experience
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Clear Exit Options</span> - exit/quit/q commands available</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Conversation History Clear</span> - 'clear' command implemented</span>
              </li>
              <li className="flex items-start gap-2 text-[#065F46]">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span><span className="font-semibold">Error Handling</span> - Exception handling with user feedback</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Missing Safety Controls */}
      <div className="mb-8">
        <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#DC180A]" />
          Missing Safety Controls (❌ Not Implemented)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FEF2F2] border border-[#DC180A] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A] mb-2">
              Input Guards
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Prompt Injection Detection</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Input Validation</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Rate Limiting</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FEF2F2] border border-[#DC180A] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A] mb-2">
              Output Filters
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Toxicity Filtering</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>PII Detection</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Confidence Scoring</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FEF2F2] border border-[#DC180A] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A] mb-2">
              Monitoring & Logging
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Query Logging</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Response Logging</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Error Tracking</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Usage Analytics</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FEF2F2] border border-[#DC180A] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A] mb-2">
              Security
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>API Key Rotation</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Input Sanitization</span>
              </li>
              <li className="flex items-start gap-2 text-[#991B1B]">
                <span className="text-[#DC180A] mt-0.5">✗</span>
                <span>Session Management</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Plan */}
      <div className="mb-8">
        <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
          Testing Plan
        </h3>

        <div className="space-y-4">
          <div className="border border-[#E5E7EB] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] mb-3">
              Pre-Launch Red Teaming
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Direct injection attempts</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Indirect injection via user content</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Multi-turn manipulation attempts</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Jailbreak scenarios</span>
              </div>
            </div>
          </div>

          <div className="border border-[#E5E7EB] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] mb-3">
              Bias Testing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Test responses across regulatory topics</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Check for consistent citation quality</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Verify balanced interpretation</span>
              </div>
            </div>
          </div>

          <div className="border border-[#E5E7EB] rounded-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] mb-3">
              Continuous Testing
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Monthly review of flagged interactions</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Quarterly security assessment</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#B5BCC4]">☐</span>
                <span>Annual compliance audit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring Plan */}
      <div className="mb-8">
        <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
          Monitoring Plan
        </h3>

        <h4 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
          Safety Metrics Dashboard
        </h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-[#E5E7EB]">
            <thead>
              <tr className="bg-[#F9FAFB]">
                <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-xs text-[#22262A] border-b border-[#E5E7EB]">Metric</th>
                <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-xs text-[#22262A] border-b border-[#E5E7EB]">Target</th>
                <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-xs text-[#22262A] border-b border-[#E5E7EB]">Current</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">Response Accuracy</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">&gt;95% with citations</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#B5BCC4]">Not measured</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">Disclaimer Display Rate</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">100%</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#10B981]">✅ 100%</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">Error Rate</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">&lt;1%</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#B5BCC4]">Not measured</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">Average Response Latency</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#464E58]">&lt;5s</td>
                <td className="py-2 px-3 font-['Montserrat',sans-serif] text-xs text-[#B5BCC4]">Not measured</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
          Alerting Thresholds
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="px-2 py-0.5 bg-[#FEE2E2] border border-[#DC180A] rounded text-[#DC180A] font-['Montserrat',sans-serif] font-bold">Critical</span>
            <span className="font-['Montserrat',sans-serif] text-[#464E58]">API errors &gt;5% in 1 hour</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="px-2 py-0.5 bg-[#FEF3C7] border border-[#F59E0B] rounded text-[#92400E] font-['Montserrat',sans-serif] font-bold">High</span>
            <span className="font-['Montserrat',sans-serif] text-[#464E58]">Response latency &gt;10s sustained</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="px-2 py-0.5 bg-[#FEF3C7] border border-[#FBBF24] rounded text-[#92400E] font-['Montserrat',sans-serif] font-bold">Medium</span>
            <span className="font-['Montserrat',sans-serif] text-[#464E58]">Unusual query patterns detected</span>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div>
        <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
          Safety Action Items
        </h3>

        <div className="space-y-4">
          <div className="border-l-4 border-[#DC180A] bg-[#FEF2F2] rounded-r-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A] mb-3">
              Immediate (Before Next Release)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#DC180A]">☐</span>
                <span>Add input validation/prompt injection detection</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#DC180A]">☐</span>
                <span>Implement basic query logging</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#DC180A]">☐</span>
                <span>Add response latency monitoring</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[#F59E0B] bg-[#FFFBEB] rounded-r-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#92400E] mb-3">
              Short-term (Within 30 days)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#F59E0B]">☐</span>
                <span>Implement rate limiting</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#F59E0B]">☐</span>
                <span>Add output safety filtering</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#F59E0B]">☐</span>
                <span>Create error tracking system</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[#FBBF24] bg-[#FFFBEB] rounded-r-lg p-4">
            <h4 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#92400E] mb-3">
              Medium-term (Within 90 days)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#FBBF24]">☐</span>
                <span>Develop red teaming test suite</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#FBBF24]">☐</span>
                <span>Implement comprehensive logging</span>
              </div>
              <div className="flex items-start gap-2 text-[#464E58]">
                <span className="text-[#FBBF24]">☐</span>
                <span>Create safety metrics dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
