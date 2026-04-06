import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OrganizationPage } from './components/OrganizationPage';
import { AIInventoryPage } from './components/AIInventoryPage';
import { CompliancePage } from './components/CompliancePage';
import { CompliancePageV2 } from './components/CompliancePageV2';
import { DigitalRegulationHubs } from './components/DigitalRegulationHubs';
import { ProductsPage } from './components/ProductsPage';
import { AIModelPage } from './components/AIModelPage';
import { DatasetPage } from './components/DatasetPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('organization');
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const handleHubSelect = (hubId: string) => {
    if (hubId === 'eu-ai-act') {
      setSelectedHub(hubId);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Reset hub selection when navigating away from compliance
    if (page !== 'compliance') {
      setSelectedHub(null);
    }
  };

  return (
    <div className="size-full flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === 'organization' && <OrganizationPage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'ai-inventory' && <AIInventoryPage />}
      {currentPage === 'ai-model' && <AIModelPage />}
      {currentPage === 'dataset' && <DatasetPage />}
      {currentPage === 'compliance' && !selectedHub && <DigitalRegulationHubs onSelectHub={handleHubSelect} />}
      {currentPage === 'compliance' && selectedHub === 'eu-ai-act' && <CompliancePage />}
      {currentPage === 'compliance-v2' && <CompliancePageV2 />}
      {currentPage !== 'organization' && currentPage !== 'products' && currentPage !== 'ai-inventory' && currentPage !== 'ai-model' && currentPage !== 'dataset' && currentPage !== 'compliance' && currentPage !== 'compliance-v2' && (
        <div className="flex-1 flex items-center justify-center bg-[#FAFBFC]">
          <div className="text-center">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
              {currentPage.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h2>
            <p className="font-['Montserrat',sans-serif] text-[#464E58]">
              This page is under construction
            </p>
          </div>
        </div>
      )}
    </div>
  );
}