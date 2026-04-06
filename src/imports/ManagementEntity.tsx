import svgPaths from "./svg-zd84deynzj";

function Title() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Title">
      <p className="css-4hzbpn font-['Montserrat:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#22262a] text-[24px] tracking-[-0.24px] w-[800px]">Management</p>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[32px] py-0 relative w-full">
          <Title />
        </div>
      </div>
    </div>
  );
}

function TabBase() {
  return (
    <div className="bg-[#eef3fd] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0" data-name="_Tab Base">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#1a417c] text-[16px] text-center">Entity</p>
    </div>
  );
}

function TabBase1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0" data-name="_Tab Base">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px] text-center">Site</p>
    </div>
  );
}

function TabBase2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0" data-name="_Tab Base">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px] text-center">Contact</p>
    </div>
  );
}

function TabBase3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0" data-name="_Tab Base">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px] text-center">List</p>
    </div>
  );
}

function TabNavigation() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tab Navigation">
      <div aria-hidden="true" className="absolute border-[#eef3fd] border-b-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[32px] py-0 relative w-full">
          <TabBase />
          <TabBase1 />
          <TabBase2 />
          <TabBase3 />
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Search">
          <path d={svgPaths.p21545500} id="Icon" stroke="var(--stroke-0, #1A417C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function InputSearch() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[12px] h-[36px] items-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0 w-[300px]" data-name="Input_Search">
      <div aria-hidden="true" className="absolute border border-[#b5bcc4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Search />
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Search</p>
    </div>
  );
}

function Bar() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Bar">
      <InputSearch />
    </div>
  );
}

function ChevronSelect() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron Select">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Chevron Select">
          <path d={svgPaths.p3461d80} id="Down" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1849080} id="Up" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">{`Name `}</p>
          <ChevronSelect />
        </div>
      </div>
    </div>
  );
}

function TableCellStandard() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">EU Operations</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard1() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Bangladesh BU</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard2() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">GreenWood Timber Ltd.</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard3() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Green Timber Ltd.</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard4() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">UK BU</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard5() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Test 1</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard6() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Test 2</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStandard7() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">FR BU</p>
        </div>
      </div>
    </div>
  );
}

function Select() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[332px]" data-name="Select">
      <TableHeaderCell />
      <TableCellStandard />
      <TableCellStandard1 />
      <TableCellStandard2 />
      <TableCellStandard3 />
      <TableCellStandard4 />
      <TableCellStandard5 />
      <TableCellStandard6 />
      <TableCellStandard7 />
    </div>
  );
}

function ChevronSelect1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron Select">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Chevron Select">
          <path d={svgPaths.p3461d80} id="Down" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1849080} id="Up" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-[#f0f1f2] h-[45px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Value Chain</p>
          <ChevronSelect1 />
        </div>
      </div>
    </div>
  );
}

function DotIcon() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Dot Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Dot Icon">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #DC180A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#dc180a] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <DotIcon />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">Direct</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular />
        </div>
      </div>
    </div>
  );
}

function DotIcon1() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Dot Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Dot Icon">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #DC180A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular1() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#dc180a] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <DotIcon1 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">Direct</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular1 />
        </div>
      </div>
    </div>
  );
}

function ArrowsUp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrows-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrows-up">
          <path d={svgPaths.p2e920c00} id="Icon" stroke="var(--stroke-0, #D78C02)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular2() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#d78c02] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ArrowsUp />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#9b5e01] text-[14px] text-center">Upstream</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular2 />
        </div>
      </div>
    </div>
  );
}

function ArrowsDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrows-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrows-down">
          <path d={svgPaths.p15e10a00} id="Icon" stroke="var(--stroke-0, #038149)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular3() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#038149] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ArrowsDown />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#016a3e] text-[14px] text-center">Downstream</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular3 />
        </div>
      </div>
    </div>
  );
}

function ArrowsUp1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrows-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrows-up">
          <path d={svgPaths.p2e920c00} id="Icon" stroke="var(--stroke-0, #D78C02)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular4() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#d78c02] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ArrowsUp1 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#9b5e01] text-[14px] text-center">Upstream</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular4 />
        </div>
      </div>
    </div>
  );
}

function DotIcon2() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Dot Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Dot Icon">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #DC180A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular5() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#dc180a] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <DotIcon2 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">Direct</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular5 />
        </div>
      </div>
    </div>
  );
}

function ArrowsUp2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrows-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrows-up">
          <path d={svgPaths.p2e920c00} id="Icon" stroke="var(--stroke-0, #D78C02)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular6() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#d78c02] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ArrowsUp2 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#9b5e01] text-[14px] text-center">Upstream</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular6 />
        </div>
      </div>
    </div>
  );
}

function ArrowsDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrows-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrows-down">
          <path d={svgPaths.p15e10a00} id="Icon" stroke="var(--stroke-0, #038149)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular7() {
  return (
    <div className="bg-[#f4f5f6] content-stretch flex gap-[4px] items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge/Rectangular">
      <div aria-hidden="true" className="absolute border border-[#038149] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ArrowsDown1 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#016a3e] text-[14px] text-center">Downstream</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <BadgeRectangular7 />
        </div>
      </div>
    </div>
  );
}

function Type1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Type">
      <TableHeaderCell1 />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function Type() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[157px]" data-name="Type">
      <Type1 />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Parent Entity</p>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">EU</p>
    </div>
  );
}

function TableCellStandard8() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">APAC</p>
    </div>
  );
}

function TableCellStandard9() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText1 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">&nbsp;</p>
    </div>
  );
}

function TableCellStandard10() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText2 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">&nbsp;</p>
    </div>
  );
}

function TableCellStandard11() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText3 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Global</p>
    </div>
  );
}

function TableCellStandard12() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText4 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">France</p>
    </div>
  );
}

function TableCellStandard13() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText5 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">&nbsp;</p>
    </div>
  );
}

function TableCellStandard14() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText6 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">&nbsp;</p>
    </div>
  );
}

function TableCellStandard15() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText7 />
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Contact">
      <TableHeaderCell2 />
      <TableCellStandard8 />
      <TableCellStandard9 />
      <TableCellStandard10 />
      <TableCellStandard11 />
      <TableCellStandard12 />
      <TableCellStandard13 />
      <TableCellStandard14 />
      <TableCellStandard15 />
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Country</p>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Berlin</p>
    </div>
  );
}

function TableCellStandard16() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText8 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Bangladesh</p>
    </div>
  );
}

function TableCellStandard17() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText9 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">UK</p>
    </div>
  );
}

function TableCellStandard18() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText10 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">US</p>
    </div>
  );
}

function TableCellStandard19() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText11 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">UK</p>
    </div>
  );
}

function TableCellStandard20() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText12 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">France</p>
    </div>
  );
}

function TableCellStandard21() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText13 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">France</p>
    </div>
  );
}

function TableCellStandard22() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText14 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">France</p>
    </div>
  );
}

function TableCellStandard23() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText15 />
        </div>
      </div>
    </div>
  );
}

function Contact1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[190px]" data-name="Contact">
      <TableHeaderCell3 />
      <TableCellStandard16 />
      <TableCellStandard17 />
      <TableCellStandard18 />
      <TableCellStandard19 />
      <TableCellStandard20 />
      <TableCellStandard21 />
      <TableCellStandard22 />
      <TableCellStandard23 />
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">Primary Contact</p>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Amy A</p>
    </div>
  );
}

function TableCellStandard24() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText16 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Ban Ben</p>
    </div>
  );
}

function TableCellStandard25() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText17 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Claire C</p>
    </div>
  );
}

function TableCellStandard26() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText18 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">David D</p>
    </div>
  );
}

function TableCellStandard27() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText19 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Edouard E</p>
    </div>
  );
}

function TableCellStandard28() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText20 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Fiora F</p>
    </div>
  );
}

function TableCellStandard29() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText21 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Geraldine G</p>
    </div>
  );
}

function TableCellStandard30() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText22 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#22262a] text-[16px]">Helene H</p>
    </div>
  );
}

function TableCellStandard31() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <TextAndSupportingText23 />
        </div>
      </div>
    </div>
  );
}

function Contact2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[181px]" data-name="Contact">
      <TableHeaderCell4 />
      <TableCellStandard24 />
      <TableCellStandard25 />
      <TableCellStandard26 />
      <TableCellStandard27 />
      <TableCellStandard28 />
      <TableCellStandard29 />
      <TableCellStandard30 />
      <TableCellStandard31 />
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-[#f0f1f2] content-stretch flex h-[46px] items-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#464e58] text-[16px]">&nbsp;</p>
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash />
    </div>
  );
}

function TableCellStandard32() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit />
      <ButtonUtility />
    </div>
  );
}

function Edit1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash1 />
    </div>
  );
}

function TableCellStandard33() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit1 />
      <ButtonUtility1 />
    </div>
  );
}

function Edit2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash2 />
    </div>
  );
}

function TableCellStandard34() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit2 />
      <ButtonUtility2 />
    </div>
  );
}

function Edit3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash3 />
    </div>
  );
}

function TableCellStandard35() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit3 />
      <ButtonUtility3 />
    </div>
  );
}

function Edit4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash4 />
    </div>
  );
}

function TableCellStandard36() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit4 />
      <ButtonUtility4 />
    </div>
  );
}

function Edit5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash5 />
    </div>
  );
}

function TableCellStandard37() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit5 />
      <ButtonUtility5 />
    </div>
  );
}

function Edit6() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility6() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash6 />
    </div>
  );
}

function TableCellStandard38() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit6 />
      <ButtonUtility6 />
    </div>
  );
}

function Edit7() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Edit">
          <path d={svgPaths.p2fbb1f00} id="Icon" stroke="var(--stroke-0, #5A5A5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Trash7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Trash">
          <path d={svgPaths.p176b3800} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUtility7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Utility">
      <Trash7 />
    </div>
  );
}

function TableCellStandard39() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center justify-center p-[16px] relative shrink-0 w-[132px]" data-name="Table Cell - Standard">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Edit7 />
      <ButtonUtility7 />
    </div>
  );
}

function Sector() {
  return (
    <div className="content-stretch flex flex-col h-[622px] items-start min-w-[160px] relative shrink-0" data-name="Sector">
      <TableHeaderCell5 />
      <TableCellStandard32 />
      <TableCellStandard33 />
      <TableCellStandard34 />
      <TableCellStandard35 />
      <TableCellStandard36 />
      <TableCellStandard37 />
      <TableCellStandard38 />
      <TableCellStandard39 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white min-w-[720px] relative rounded-[8px] shrink-0 w-full" data-name="Table">
      <div className="content-stretch flex items-start min-w-[inherit] overflow-clip relative rounded-[inherit] w-full">
        <Select />
        <Type />
        <Contact />
        <Contact1 />
        <Contact2 />
        <Sector />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f1f2] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[1px_1px_2px_0px_rgba(34,38,42,0.05)]" />
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Chevron">
          <path d="M12.5 5L7.5 10L12.5 15" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonFunction() {
  return (
    <div className="bg-white relative rounded-[9999px] shrink-0 w-[120px]" data-name="Button - Function">
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip pl-[8px] pr-[16px] py-[8px] relative rounded-[inherit] w-full">
        <Chevron />
        <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Previous</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b5bcc4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Content2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">1</p>
    </div>
  );
}

function PaginationNumberBase() {
  return (
    <div className="bg-[#f4f5f6] overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content2 />
    </div>
  );
}

function Content3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">2</p>
    </div>
  );
}

function PaginationNumberBase1() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">3</p>
    </div>
  );
}

function PaginationNumberBase2() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content4 />
    </div>
  );
}

function Content5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">...</p>
    </div>
  );
}

function PaginationNumberBase3() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content5 />
    </div>
  );
}

function Content6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">8</p>
    </div>
  );
}

function PaginationNumberBase4() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content6 />
    </div>
  );
}

function Content7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">9</p>
    </div>
  );
}

function PaginationNumberBase5() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content7 />
    </div>
  );
}

function Content8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[8px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#464e58] text-[14px] text-center">10</p>
    </div>
  );
}

function PaginationNumberBase6() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content8 />
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <PaginationNumberBase />
      <PaginationNumberBase1 />
      <PaginationNumberBase2 />
      <PaginationNumberBase3 />
      <PaginationNumberBase4 />
      <PaginationNumberBase5 />
      <PaginationNumberBase6 />
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Chevron">
          <path d="M7.5 15L12.5 10L7.5 5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonFunction1() {
  return (
    <div className="bg-white relative rounded-[9999px] shrink-0 w-[120px]" data-name="Button - Function">
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip pl-[16px] pr-[8px] py-[8px] relative rounded-[inherit] w-full">
        <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Next</p>
        <Chevron1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#b5bcc4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Pagination() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full" data-name="Pagination">
      <ButtonFunction />
      <PaginationNumbers />
      <ButtonFunction1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <Bar />
      <Table />
      <Pagination />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[32px] py-0 relative w-full">
        <Content1 />
      </div>
    </div>
  );
}

function LogoFlatten() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logo Flatten">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Logo Flatten">
          <g id="Vector">
            <path d={svgPaths.p1ece9200} fill="var(--fill-0, #1A417C)" />
            <path d={svgPaths.p28eb38f0} fill="#F4F5F6" />
            <path d={svgPaths.p1fb6d900} fill="#F4F5F6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HamburgerMenu() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Hamburger Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Hamburger Menu">
          <path d="M3 12H21M3 6H21M3 18H21" id="Icon" stroke="var(--stroke-0, #1A417C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ArrowStraight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrow Straight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Arrow Straight">
          <path d={svgPaths.p3ee6ae80} id="Icon" stroke="var(--stroke-0, #1A417C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ArrowStraight1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrow Straight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Arrow Straight">
          <path d={svgPaths.p25529c80} id="Icon" stroke="var(--stroke-0, #B5BCC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavIcons() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Nav Icons">
      <LogoFlatten />
      <HamburgerMenu />
      <ArrowStraight />
      <ArrowStraight1 />
    </div>
  );
}

function Chevron2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <path d="M6 12L10 8L6 4" id="Icon" stroke="var(--stroke-0, #B5BCC4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Chevron3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <path d="M6 12L10 8L6 4" id="Icon" stroke="var(--stroke-0, #B5BCC4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Breadcrumbs">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Dashboard</p>
      <Chevron2 />
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Management</p>
      <Chevron3 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Entity</p>
    </div>
  );
}

function MiniNavigationBarFullLeft() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[16px] top-[16px]" data-name="Mini Navigation Bar/Full/Left">
      <NavIcons />
      <Breadcrumbs />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px min-w-px px-0 py-[64px] relative" data-name="Main">
      <Header />
      <TabNavigation />
      <Content />
      <MiniNavigationBarFullLeft />
    </div>
  );
}

export default function ManagementEntity() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Management - Entity">
      <Main />
    </div>
  );
}