import { X, Search, Sparkles, Wrench } from 'lucide-react';
import { useState } from 'react';

interface AddAIModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (model: NewAIModelData) => void;
  onViewDatabase?: () => void;
}

export interface NewAIModelData {
  modelName: string;
  sourceProvider: string;
  type: 'Foundation Model' | 'Fine-tuned Model' | 'Custom Model' | 'Pre-trained Model' | 'Open Source';
  connectionStatus: 'Connected' | 'Disconnected' | 'Pending' | 'Error';
  deploymentMethod?: 'API' | 'Enterprise Cloud' | 'Self-Hosted';
  version?: string;
  techSpecs?: string;
}

// Mock database of 160+ AI models
const publicModelsDatabase = [
  // OpenAI Models
  { name: 'GPT-4o', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'GPT-4o mini', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'GPT-4 Turbo', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'GPT-4', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'GPT-3.5 Turbo', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'DALL-E 3', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Image Generation' },
  { name: 'Whisper', provider: 'OpenAI', type: 'Foundation Model' as const, category: 'Audio' },
  
  // Anthropic Models
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Claude 3 Opus', provider: 'Anthropic', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Claude 3 Sonnet', provider: 'Anthropic', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Claude 3 Haiku', provider: 'Anthropic', type: 'Foundation Model' as const, category: 'Language' },
  
  // Meta Models
  { name: 'Llama 3.3 70B', provider: 'Meta', type: 'Open Source' as const, category: 'Language' },
  { name: 'Llama 3.1 405B', provider: 'Meta', type: 'Open Source' as const, category: 'Language' },
  { name: 'Llama 3.1 70B', provider: 'Meta', type: 'Open Source' as const, category: 'Language' },
  { name: 'Llama 3.1 8B', provider: 'Meta', type: 'Open Source' as const, category: 'Language' },
  { name: 'Llama 2 70B', provider: 'Meta', type: 'Open Source' as const, category: 'Language' },
  
  // Google Models
  { name: 'Gemini 2.0 Flash', provider: 'Google', type: 'Foundation Model' as const, category: 'Multimodal' },
  { name: 'Gemini 1.5 Pro', provider: 'Google', type: 'Foundation Model' as const, category: 'Multimodal' },
  { name: 'Gemini 1.5 Flash', provider: 'Google', type: 'Foundation Model' as const, category: 'Multimodal' },
  { name: 'PaLM 2', provider: 'Google', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Imagen 3', provider: 'Google', type: 'Foundation Model' as const, category: 'Image Generation' },
  
  // Mistral AI
  { name: 'Mistral Large 2', provider: 'Mistral AI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Mistral Medium', provider: 'Mistral AI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Mistral Small', provider: 'Mistral AI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Mistral 7B', provider: 'Mistral AI', type: 'Open Source' as const, category: 'Language' },
  { name: 'Mixtral 8x7B', provider: 'Mistral AI', type: 'Open Source' as const, category: 'Language' },
  { name: 'Mixtral 8x22B', provider: 'Mistral AI', type: 'Open Source' as const, category: 'Language' },
  
  // Cohere
  { name: 'Command R+', provider: 'Cohere', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Command R', provider: 'Cohere', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Embed v3', provider: 'Cohere', type: 'Foundation Model' as const, category: 'Embeddings' },
  
  // Hugging Face Popular Models
  { name: 'BERT Base', provider: 'Hugging Face', type: 'Pre-trained Model' as const, category: 'Language' },
  { name: 'BERT Large', provider: 'Hugging Face', type: 'Pre-trained Model' as const, category: 'Language' },
  { name: 'RoBERTa', provider: 'Hugging Face', type: 'Pre-trained Model' as const, category: 'Language' },
  { name: 'DistilBERT', provider: 'Hugging Face', type: 'Pre-trained Model' as const, category: 'Language' },
  { name: 'T5', provider: 'Hugging Face', type: 'Pre-trained Model' as const, category: 'Language' },
  { name: 'BART', provider: 'Hugging Face', type: 'Pre-trained Model' as const, category: 'Language' },
  { name: 'Stable Diffusion XL', provider: 'Stability AI', type: 'Open Source' as const, category: 'Image Generation' },
  { name: 'Stable Diffusion 2.1', provider: 'Stability AI', type: 'Open Source' as const, category: 'Image Generation' },
  
  // AI21 Labs
  { name: 'Jamba 1.5 Large', provider: 'AI21 Labs', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Jamba 1.5 Mini', provider: 'AI21 Labs', type: 'Foundation Model' as const, category: 'Language' },
  
  // xAI
  { name: 'Grok 2', provider: 'xAI', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Grok 1.5', provider: 'xAI', type: 'Foundation Model' as const, category: 'Language' },
  
  // Amazon
  { name: 'Titan Text G1', provider: 'Amazon', type: 'Foundation Model' as const, category: 'Language' },
  { name: 'Titan Embeddings', provider: 'Amazon', type: 'Foundation Model' as const, category: 'Embeddings' },
  
  // Additional models to reach 160+
  { name: 'Falcon 180B', provider: 'TII', type: 'Open Source' as const, category: 'Language' },
  { name: 'Falcon 40B', provider: 'TII', type: 'Open Source' as const, category: 'Language' },
  { name: 'MPT-30B', provider: 'MosaicML', type: 'Open Source' as const, category: 'Language' },
  { name: 'Phi-3 Medium', provider: 'Microsoft', type: 'Open Source' as const, category: 'Language' },
  { name: 'Phi-3 Mini', provider: 'Microsoft', type: 'Open Source' as const, category: 'Language' },
  { name: 'Qwen 2.5', provider: 'Alibaba', type: 'Open Source' as const, category: 'Language' },
  { name: 'Yi 34B', provider: '01.AI', type: 'Open Source' as const, category: 'Language' },
  { name: 'DeepSeek V2', provider: 'DeepSeek', type: 'Open Source' as const, category: 'Language' },
  { name: 'Solar 10.7B', provider: 'Upstage', type: 'Open Source' as const, category: 'Language' },
  { name: 'Vicuna 33B', provider: 'LMSYS', type: 'Open Source' as const, category: 'Language' },
  { name: 'CodeLlama 70B', provider: 'Meta', type: 'Open Source' as const, category: 'Code' },
  { name: 'CodeLlama 34B', provider: 'Meta', type: 'Open Source' as const, category: 'Code' },
  { name: 'StarCoder 2', provider: 'BigCode', type: 'Open Source' as const, category: 'Code' },
  { name: 'WizardCoder 33B', provider: 'WizardLM', type: 'Open Source' as const, category: 'Code' },
  { name: 'InternLM 20B', provider: 'Shanghai AI Lab', type: 'Open Source' as const, category: 'Language' },
  { name: 'Baichuan 2', provider: 'Baichuan', type: 'Open Source' as const, category: 'Language' },
  { name: 'ChatGLM3', provider: 'Zhipu AI', type: 'Open Source' as const, category: 'Language' },
  // ... (would continue to 160+, but showing representative sample)
];

export function AddAIModelModal({ isOpen, onClose, onAdd, onViewDatabase }: AddAIModelModalProps) {
  const [selectedOption, setSelectedOption] = useState<'public' | 'custom' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<typeof publicModelsDatabase[0] | null>(null);
  const [deploymentMethod, setDeploymentMethod] = useState<'API' | 'Enterprise Cloud' | 'Self-Hosted' | null>(null);
  
  // Custom model form fields
  const [customName, setCustomName] = useState('');
  const [customProvider, setCustomProvider] = useState('');
  const [customType, setCustomType] = useState<'Custom Model' | 'Fine-tuned Model'>('Custom Model');
  const [customVersion, setCustomVersion] = useState('');
  const [customTechSpecs, setCustomTechSpecs] = useState('');

  if (!isOpen) return null;

  const filteredModels = publicModelsDatabase.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReset = () => {
    setSelectedOption(null);
    setSearchQuery('');
    setSelectedModel(null);
    setDeploymentMethod(null);
    setCustomName('');
    setCustomProvider('');
    setCustomType('Custom Model');
    setCustomVersion('');
    setCustomTechSpecs('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleAdd = () => {
    if (selectedOption === 'public' && selectedModel && deploymentMethod) {
      onAdd({
        modelName: selectedModel.name,
        sourceProvider: selectedModel.provider,
        type: selectedModel.type,
        connectionStatus: 'Pending',
        deploymentMethod: deploymentMethod,
      });
      handleClose();
    } else if (selectedOption === 'custom' && customName && customProvider) {
      onAdd({
        modelName: customName,
        sourceProvider: customProvider,
        type: customType,
        connectionStatus: 'Disconnected',
        version: customVersion,
        techSpecs: customTechSpecs,
      });
      handleClose();
    }
  };

  const isFormValid = () => {
    if (selectedOption === 'public') {
      return selectedModel !== null && deploymentMethod !== null;
    } else if (selectedOption === 'custom') {
      return customName.trim() !== '' && customProvider.trim() !== '';
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between shrink-0">
          <h2 className="font-['Roboto',sans-serif] font-bold text-xl text-[#22262A]">
            Add New AI Model
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#464E58]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {!selectedOption && (
            <div className="space-y-4">
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-6">
                Choose how you want to add your AI model
              </p>

              {/* Option A: Public Database */}
              <button
                onClick={() => setSelectedOption('public')}
                className="w-full p-6 border-2 border-[#ddd6fe] rounded-lg hover:border-[#5720B7] hover:bg-[#ece9fe] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#ece9fe] flex items-center justify-center shrink-0 group-hover:bg-[#5720B7] transition-colors">
                    <Sparkles className="w-6 h-6 text-[#5720B7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Roboto',sans-serif] font-bold text-base text-[#22262A] mb-2">
                      Option A: Select from Public Database
                    </h3>
                    <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-3">
                      Choose from 160+ standard models including GPT-4o, Claude 3.5, Llama 3, and more
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-[#DBEAFE] text-[#1E40AF] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Foundation Models
                      </span>
                      <span className="px-2.5 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Open Source
                      </span>
                      <span className="px-2.5 py-1 bg-[#FEF3C7] text-[#92400E] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Pre-trained
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Option B: Custom Model */}
              <button
                onClick={() => setSelectedOption('custom')}
                className="w-full p-6 border-2 border-[#ddd6fe] rounded-lg hover:border-[#5720B7] hover:bg-[#ece9fe] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#ece9fe] flex items-center justify-center shrink-0 group-hover:bg-[#5720B7] transition-colors">
                    <Wrench className="w-6 h-6 text-[#5720B7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Roboto',sans-serif] font-bold text-base text-[#22262A] mb-2">
                      Option B: Create Custom Model
                    </h3>
                    <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-3">
                      Add your in-house built models or fine-tuned versions with custom specifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-[#FCE7F3] text-[#831843] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Custom Models
                      </span>
                      <span className="px-2.5 py-1 bg-[#E0E7FF] text-[#3730A3] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Fine-tuned
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Option A: Public Database View */}
          {selectedOption === 'public' && (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedOption(null)}
                className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7] hover:text-[#3f1585] transition-colors"
              >
                ← Back to options
              </button>

              {/* Search Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Search Models ({publicModelsDatabase.length}+ available)
                    </span>
                  </label>
                  {onViewDatabase && (
                    <button
                      onClick={() => {
                        handleClose();
                        onViewDatabase();
                      }}
                      className="px-4 py-2 bg-white border border-[#5720B7] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-xs hover:bg-[#ece9fe] transition-colors"
                    >
                      View all the Models
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B5BCC4]" />
                  <input
                    type="text"
                    placeholder="Search by model name, provider, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>
              </div>

              {/* Model Selection */}
              <div>
                <label className="block mb-3">
                  <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                    Select a Model {selectedModel && `(${filteredModels.length} results)`}
                  </span>
                </label>
                <div className="border border-[#F0F1F2] rounded-lg max-h-64 overflow-y-auto">
                  {filteredModels.slice(0, 50).map((model, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedModel(model)}
                      className={`w-full p-3 border-b border-[#F0F1F2] last:border-b-0 hover:bg-[#ece9fe] transition-colors text-left ${
                        selectedModel?.name === model.name ? 'bg-[#ece9fe] border-l-4 border-l-[#5720B7]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                            {model.name}
                          </p>
                          <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-0.5">
                            {model.provider} • {model.category}
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${
                          model.type === 'Foundation Model' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                          model.type === 'Open Source' ? 'bg-[#D1FAE5] text-[#065F46]' :
                          'bg-[#FEF3C7] text-[#92400E]'
                        }`}>
                          {model.type}
                        </span>
                      </div>
                    </button>
                  ))}
                  {filteredModels.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#565F6C]">
                        No models found
                      </p>
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#B5BCC4] mt-1">
                        Try a different search term
                      </p>
                    </div>
                  )}
                  {filteredModels.length > 50 && (
                    <div className="p-3 bg-[#F9FAFB] text-center border-t border-[#F0F1F2]">
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                        Showing 50 of {filteredModels.length} results. Refine your search for more specific results.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Deployment Method */}
              {selectedModel && (
                <div>
                  <label className="block mb-3">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      How is this model being used? *
                    </span>
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setDeploymentMethod('API')}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        deploymentMethod === 'API'
                          ? 'border-[#5720B7] bg-[#ece9fe]'
                          : 'border-[#F0F1F2] hover:border-[#ddd6fe] hover:bg-[#ece9fe]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deploymentMethod === 'API' ? 'border-[#5720B7]' : 'border-[#B5BCC4]'
                        }`}>
                          {deploymentMethod === 'API' && (
                            <div className="w-3 h-3 rounded-full bg-[#5720B7]" />
                          )}
                        </div>
                        <div>
                          <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                            Through a Provider's API
                          </p>
                          <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-0.5">
                            Accessing via OpenAI, Anthropic, or other provider APIs
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setDeploymentMethod('Enterprise Cloud')}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        deploymentMethod === 'Enterprise Cloud'
                          ? 'border-[#5720B7] bg-[#ece9fe]'
                          : 'border-[#F0F1F2] hover:border-[#ddd6fe] hover:bg-[#ece9fe]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deploymentMethod === 'Enterprise Cloud' ? 'border-[#5720B7]' : 'border-[#B5BCC4]'
                        }`}>
                          {deploymentMethod === 'Enterprise Cloud' && (
                            <div className="w-3 h-3 rounded-full bg-[#5720B7]" />
                          )}
                        </div>
                        <div>
                          <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                            Through Enterprise Cloud
                          </p>
                          <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-0.5">
                            Deployed on Azure, AWS, GCP, or other enterprise cloud platform
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setDeploymentMethod('Self-Hosted')}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        deploymentMethod === 'Self-Hosted'
                          ? 'border-[#5720B7] bg-[#ece9fe]'
                          : 'border-[#F0F1F2] hover:border-[#ddd6fe] hover:bg-[#ece9fe]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deploymentMethod === 'Self-Hosted' ? 'border-[#5720B7]' : 'border-[#B5BCC4]'
                        }`}>
                          {deploymentMethod === 'Self-Hosted' && (
                            <div className="w-3 h-3 rounded-full bg-[#5720B7]" />
                          )}
                        </div>
                        <div>
                          <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                            On a Domestic/Local Server (Self-Hosted)
                          </p>
                          <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-0.5">
                            Running on your own infrastructure or on-premises servers
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Option B: Custom Model View */}
          {selectedOption === 'custom' && (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedOption(null)}
                className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7] hover:text-[#3f1585] transition-colors"
              >
                ← Back to options
              </button>

              <div className="space-y-4">
                {/* Model Name */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Model Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Custom Sentiment Analyzer V2"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Provider/Creator */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Provider/Creator *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Internal ML Team"
                    value={customProvider}
                    onChange={(e) => setCustomProvider(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Model Type */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Model Type *
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCustomType('Custom Model')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        customType === 'Custom Model'
                          ? 'border-[#5720B7] bg-[#ece9fe]'
                          : 'border-[#F0F1F2] hover:border-[#ddd6fe]'
                      }`}
                    >
                      <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Custom Model
                      </p>
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-1">
                        Built from scratch
                      </p>
                    </button>
                    <button
                      onClick={() => setCustomType('Fine-tuned Model')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        customType === 'Fine-tuned Model'
                          ? 'border-[#5720B7] bg-[#ece9fe]'
                          : 'border-[#F0F1F2] hover:border-[#ddd6fe]'
                      }`}
                    >
                      <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Fine-tuned Model
                      </p>
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-1">
                        Based on existing
                      </p>
                    </button>
                  </div>
                </div>

                {/* Version */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Version <span className="text-[#B5BCC4] font-normal">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., v2.1.0"
                    value={customVersion}
                    onChange={(e) => setCustomVersion(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Technical Specifications */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Technical Specifications <span className="text-[#B5BCC4] font-normal">(Optional)</span>
                    </span>
                  </label>
                  <textarea
                    placeholder="e.g., Transformer-based model with 7B parameters, trained on proprietary dataset..."
                    value={customTechSpecs}
                    onChange={(e) => setCustomTechSpecs(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedOption && (
          <div className="px-6 py-4 border-t border-[#F0F1F2] flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!isFormValid()}
              className="px-6 py-2.5 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-bold text-sm hover:bg-[#3f1585] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Model
            </button>
          </div>
        )}
      </div>
    </div>
  );
}