import svgPaths from "./svg-si4njayc2z";

function TableHeaderCell() {
  return (
    <div className="bg-[#1a417c] content-stretch flex h-[46px] items-center p-[16px] relative shrink-0 w-[90px]" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#f4f5f6] text-[16px]">ID</p>
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-[#1a417c] content-stretch flex h-[46px] items-center p-[16px] relative shrink-0 w-[120px]" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#f4f5f6] text-[16px]">Paragraph</p>
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-[#1a417c] flex-[1_0_0] h-[46px] min-h-px min-w-px relative" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#f4f5f6] text-[16px]">Data Points</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-[#1a417c] flex-[1_0_0] h-[46px] min-h-px min-w-px relative" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#f4f5f6] text-[16px]">Company’s Information</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-[#1a417c] content-stretch flex h-[46px] items-center p-[16px] relative shrink-0 w-[160px]" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#f4f5f6] text-[16px]">Status</p>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Table Header">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
        <TableHeaderCell />
        <TableHeaderCell1 />
        <TableHeaderCell2 />
        <TableHeaderCell3 />
        <TableHeaderCell4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ddeaf4] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M18 15L12 9L6 15" id="Icon" stroke="var(--stroke-0, #163769)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader() {
  return (
    <div className="bg-[#daefee] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Strategy and Business Model (SBM)</p>
          <Chevron />
        </div>
      </div>
    </div>
  );
}

function TableCellNarrow() {
  return (
    <div className="content-stretch flex gap-[12px] items-start p-[16px] relative self-stretch shrink-0 w-[90px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">E4.SBM-3_01</p>
    </div>
  );
}

function TableCellNarrow1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start p-[16px] relative self-stretch shrink-0 w-[120px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">16 a</p>
    </div>
  );
}

function TableCellNarrow2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px relative text-[#175cd3] text-[14px] whitespace-pre-wrap">List of material sites in own operation</p>
      </div>
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Edit">
          <path d={svgPaths.pe2c8580} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function HoverButton() {
  return (
    <div className="absolute bg-[#f4f5f6] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] right-[16px] rounded-[8px] top-[16px]" data-name="Hover Button">
      <div aria-hidden="true" className="absolute border border-[#b5bcc4] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[1px_1px_3px_0px_rgba(34,38,42,0.1),0px_1px_2px_0px_rgba(34,38,42,0.06)]" />
      <Edit />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px] text-center">Edit</p>
    </div>
  );
}

function TableCellNarrow3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">{`ABC Agro S.A. operates several key material sites: Normandy Dairy Farms: ABC Agro's largest dairy farm, responsible for about 40% of milk production. Provence Olive and Plant-Based Processing Unit: A major processing plant for olive-based products and plant-based alternatives. Aquitaine Agricultural Hub: A large-scale farm with crop production and cattle farming operations. Pyrenees Water Bottling Plant: Sources water from natural springs in the Pyrenees mountains for bottled water production.`}</p>
        <HoverButton />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="bg-[#feedec] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #DC180A)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">To Do</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="bg-[#feedec] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #DC180A)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">To Do</p>
    </div>
  );
}

function Item() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
        <Label1 />
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #D78C02)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#9b5e01] text-[14px] text-center">In Progress</p>
    </div>
  );
}

function Item1() {
  return (
    <div className="bg-[#d2d6db] relative rounded-[4px] shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
        <Label2 />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #038149)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#016a3e] text-[14px] text-center">Done</p>
    </div>
  );
}

function Item2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
        <Label3 />
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="bg-[#f0f1f2] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #B5BCC4)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">Deprioritized</p>
    </div>
  );
}

function Item3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
        <Label4 />
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] items-start left-[4px] p-[4px] rounded-[8px] top-[46px] w-[150px]" data-name="List">
      <div aria-hidden="true" className="absolute border border-[#f0f1f2] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[6px_12px_16px_0px_rgba(34,38,42,0.1),0px_4px_6px_0px_rgba(34,38,42,0.05)]" />
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
    </div>
  );
}

function TableCellNarrow4() {
  return (
    <div className="content-stretch flex gap-[12px] items-start p-[16px] relative self-stretch shrink-0 w-[160px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <Label />
      <List />
    </div>
  );
}

function Row() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <TableCellNarrow />
      <TableCellNarrow1 />
      <TableCellNarrow2 />
      <TableCellNarrow3 />
      <TableCellNarrow4 />
    </div>
  );
}

function TableCellNarrow5() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[90px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">E4.SBM-3_01</p>
    </div>
  );
}

function TableCellNarrow6() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[120px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">E4.SBM-3_02</p>
    </div>
  );
}

function TableCellNarrow7() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px relative text-[#175cd3] text-[14px] whitespace-pre-wrap">Disclosure of activities negatively affecting biodiversity sensitive areas</p>
      </div>
    </div>
  );
}

function TableCellNarrow8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">Normandy Dairy Farms: The high concentration of livestock results in overgrazing, which can affect the local grasslands and native species like wild bees and birds. Aquitaine Agricultural Hub: Monoculture farming and overuse of fertilizers have led to nutrient run-off, contributing to the eutrophication of nearby wetlands, affecting aquatic life and plant diversity. Pyrenees Water Bottling Plant: The abstraction of water from natural springs poses a risk to the surrounding sensitive alpine ecosystems, which are home to several endemic plant species.</p>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #038149)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#016a3e] text-[14px] text-center">Done</p>
    </div>
  );
}

function TableCellNarrow9() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[160px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <Label5 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow5 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow6 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableCellNarrow7 />
      </div>
      <TableCellNarrow8 />
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow9 />
      </div>
    </div>
  );
}

function TableCellNarrow10() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[90px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">E4.SBM-3_01</p>
    </div>
  );
}

function TableCellNarrow11() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[120px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">16 a</p>
    </div>
  );
}

function TableCellNarrow12() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px relative text-[#175cd3] text-[14px] whitespace-pre-wrap">Disclosure of list of material sites in own operations based on results of identification and assessment of actual and potential impacts on biodiversity and ecosystems</p>
      </div>
    </div>
  );
}

function TableCellNarrow13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">Provence Olive and Plant-Based Processing Unit: Olive farming contributes to habitat loss due to deforestation and land clearing for plantations. Soil erosion has been noted in hillside areas, reducing local vegetation cover. Normandy Dairy Farms: Large-scale dairy farming leads to methane emissions, water pollution, and degradation of local flora and fauna. Pyrenees Water Bottling Plant: Water abstraction has reduced water levels in certain areas, leading to lower availability of water for local wildlife and vegetation.</p>
      </div>
    </div>
  );
}

function Label6() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #D78C02)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#9b5e01] text-[14px] text-center">In Progress</p>
    </div>
  );
}

function TableCellNarrow14() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[160px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <Label6 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow10 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow11 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableCellNarrow12 />
      </div>
      <TableCellNarrow13 />
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow14 />
      </div>
    </div>
  );
}

function TableCellNarrow15() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[90px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">E4.SBM-3_01</p>
    </div>
  );
}

function TableCellNarrow16() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[120px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">16 a</p>
    </div>
  );
}

function TableCellNarrow17() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px relative text-[#175cd3] text-[14px] whitespace-pre-wrap">Material negative impacts with regards to land degradation, desertification or soil sealing have been identified</p>
      </div>
    </div>
  );
}

function TableCellNarrow18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#22262a] text-[14px] whitespace-pre-wrap">ABC Agro S.A. operates near several biodiversity-sensitive areas: Normandy Wetlands: The runoff from dairy farming operations contributes to nutrient pollution and the loss of native wetland species. Camargue Wetlands in Provence: Monoculture and pesticide use from the Provence plant-based processing unit have resulted in habitat loss and reduced bird populations. Pyrenees Mountains: The water abstraction activities affect the ecosystem around natural springs, home to protected alpine species such as the Pyrenean desman, an endangered aquatic mammal.</p>
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="bg-[#f0f1f2] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Label">
      <div className="relative shrink-0 size-[6px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #B5BCC4)" id="Ellipse 1" r="3" />
        </svg>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">Deprioritized</p>
    </div>
  );
}

function TableCellNarrow19() {
  return (
    <div className="content-stretch flex gap-[12px] h-full items-start p-[16px] relative shrink-0 w-[160px]" data-name="Table Cell - Narrow">
      <div aria-hidden="true" className="absolute border-[#ddeaf4] border-b border-r border-solid inset-0 pointer-events-none" />
      <Label7 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow15 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow16 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableCellNarrow17 />
      </div>
      <TableCellNarrow18 />
      <div className="flex flex-row items-center self-stretch">
        <TableCellNarrow19 />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function TableSection() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader />
      <Content1 />
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader1() {
  return (
    <div className="bg-[#f3eec5] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Impact, Risk, and Opportunities (IRO)</p>
          <Chevron1 />
        </div>
      </div>
    </div>
  );
}

function TableSection1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader1 />
    </div>
  );
}

function Chevron2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader2() {
  return (
    <div className="bg-[#e0eaff] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Strategy</p>
          <Chevron2 />
        </div>
      </div>
    </div>
  );
}

function TableSection2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader2 />
    </div>
  );
}

function Chevron3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader3() {
  return (
    <div className="bg-[#dbf6fe] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">IRO Management - Policy</p>
          <Chevron3 />
        </div>
      </div>
    </div>
  );
}

function TableSection3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader3 />
    </div>
  );
}

function Chevron4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader4() {
  return (
    <div className="bg-[#feede1] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">IRO Management - Actions and Resources</p>
          <Chevron4 />
        </div>
      </div>
    </div>
  );
}

function TableSection4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader4 />
    </div>
  );
}

function Chevron5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader5() {
  return (
    <div className="bg-[#e6f4d7] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Metrics and Targets - Targets Related to Biodiversity and Ecosystems (BES)</p>
          <Chevron5 />
        </div>
      </div>
    </div>
  );
}

function TableSection5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader5 />
    </div>
  );
}

function Chevron6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader6() {
  return (
    <div className="bg-[#ece9fe] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Metrics and Targets - Impact Metrics Related to Biodiversity and Ecosystems (BES)</p>
          <Chevron6 />
        </div>
      </div>
    </div>
  );
}

function TableSection6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader6 />
    </div>
  );
}

function Chevron7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableSectionHeader7() {
  return (
    <div className="bg-[#fde8ee] h-[46px] relative shrink-0 w-full" data-name="Table Section Header">
      <div aria-hidden="true" className="absolute border-[#f4f5f6] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Metrics and Targets - Anticipated Financial Effects from BES - Related Risks and Opportunities</p>
          <Chevron7 />
        </div>
      </div>
    </div>
  );
}

function TableSection7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Section">
      <TableSectionHeader7 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <TableSection />
        <TableSection1 />
        <TableSection2 />
        <TableSection3 />
        <TableSection4 />
        <TableSection5 />
        <TableSection6 />
        <TableSection7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ddeaf4] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Content">
      <TableHeader />
      <Table />
    </div>
  );
}

export default function Content() {
  return (
    <div className="content-stretch flex flex-col items-start px-[32px] relative size-full" data-name="Content">
      <TableContent />
    </div>
  );
}