import svgPaths from "./svg-jnntt4mcf3";
import imgAvatar from "figma:asset/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-left">
          <path d={svgPaths.pbf7d180} id="Icon" stroke="var(--stroke-0, #F13D30)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-right">
          <path d={svgPaths.p39396800} id="Icon" stroke="var(--stroke-0, #B5BCC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function BackForward() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Back & Forward">
      <ArrowLeft />
      <ArrowRight />
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Breadcrumbs">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#f13d30] text-[14px]">AI use cases</p>
    </div>
  );
}

function NavigationMiniBar() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Navigation Mini Bar">
      <BackForward />
      <Breadcrumbs />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Text">
      <p className="css-4hzbpn font-['Montserrat:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#22262a] text-[24px] tracking-[-0.24px] w-full">AI Systems</p>
      <p className="css-4hzbpn font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#464e58] text-[16px] w-full">List all your AI use cases</p>
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="download-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="download-01">
          <path d={svgPaths.p38c27af0} id="Icon" stroke="var(--stroke-0, #DC180A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <div aria-hidden="true" className="absolute border border-[#dc180a] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Download />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f13d30] text-[16px] text-center">
        <p className="css-ew64yg leading-[24px]">Import</p>
      </div>
    </div>
  );
}

function Share() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="share-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="share-02">
          <path d={svgPaths.p178c7998} id="Icon" stroke="var(--stroke-0, #DC180A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded1() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <div aria-hidden="true" className="absolute border border-[#dc180a] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Share />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f13d30] text-[16px] text-center">
        <p className="css-ew64yg leading-[24px]">Export</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Actions">
      <ButtonRounded />
      <ButtonRounded1 />
    </div>
  );
}

function ContrastBorder() {
  return <div className="absolute border-[#b5bcc4] border-[0.75px] border-solid inset-0 rounded-[9999px]" data-name="Contrast border" />;
}

function Avatar() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9999px] size-full" src={imgAvatar} />
      <ContrastBorder />
    </div>
  );
}

function PageHeader1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Page Header">
      <Text />
      <Actions />
      <Avatar />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Page Header">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[32px] py-0 relative w-full">
        <NavigationMiniBar />
        <PageHeader1 />
      </div>
    </div>
  );
}

function InfoCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_9_11318)" id="info-circle">
          <path d={svgPaths.p2c60bd00} id="Icon" stroke="var(--stroke-0, #DC180A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.666" />
        </g>
        <defs>
          <clipPath id="clip0_9_11318">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconButtonRectangular() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <InfoCircle />
    </div>
  );
}

function ButtonRectangular() {
  return (
    <div className="bg-[#feedec] content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button/Rectangular">
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#a2150b] text-[14px] text-center">
        <p className="css-ew64yg leading-[20px]">View</p>
      </div>
    </div>
  );
}

function XClose() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="x-close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="x-close">
          <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.666" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <XClose />
    </div>
  );
}

function Banner() {
  return (
    <div className="backdrop-blur-[6px] bg-white relative rounded-[8px] shrink-0 w-full" data-name="Banner">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <IconButtonRectangular />
          <p className="css-4hzbpn flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-h-px min-w-px relative text-[#464e58] text-[16px]">AI use cases completed. 25 use cases require attention.</p>
          <ButtonRectangular />
          <IconButtonRectangular1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dc180a] border-b border-r border-solid inset-0 pointer-events-none rounded-[8px] shadow-[8px_10px_16px_0px_rgba(34,38,42,0.05)]" />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="plus">
          <path d={svgPaths.p17eb400} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <Plus />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#464e58] text-[14px] text-center">
        <p className="css-ew64yg leading-[20px]">Add New</p>
      </div>
    </div>
  );
}

function FilterLines() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="filter-lines">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="filter-lines">
          <path d={svgPaths.p29f1100} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <FilterLines />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#464e58] text-[14px] text-center">
        <p className="css-ew64yg leading-[20px]">Filter</p>
      </div>
    </div>
  );
}

function SwitchVertical() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="switch-vertical-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="switch-vertical-01">
          <path d={svgPaths.p1a7f6b00} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <SwitchVertical />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#464e58] text-[14px] text-center">
        <p className="css-ew64yg leading-[20px]">Sort</p>
      </div>
    </div>
  );
}

function SearchMd() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search-md">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search-md">
          <path d={svgPaths.p272bfa00} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <SearchMd />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#464e58] text-[14px] text-center">
        <p className="css-ew64yg leading-[20px]">Search</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Buttons">
      <ButtonRounded2 />
      <ButtonRounded3 />
      <ButtonRounded4 />
      <ButtonRounded5 />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b5bcc4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[4px] relative w-full">
          <p className="css-g0mm18 font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] overflow-hidden relative shrink-0 text-[#22262a] text-[14px] text-center text-ellipsis w-[39px]">10</p>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[75px]" data-name="Dropdown">
      <Container />
    </div>
  );
}

function RowPerPage() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Row Per Page">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Rows per page</p>
      <Dropdown />
    </div>
  );
}

function ChevronLeftDouble() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-left-double">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-left-double">
          <path d={svgPaths.p15761e80} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular2() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <ChevronLeftDouble />
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-left">
          <path d="M12.5 15L7.5 10L12.5 5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular3() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <ChevronLeft />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-right">
          <path d="M7.5 15L12.5 10L7.5 5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular4() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <ChevronRight />
    </div>
  );
}

function ChevronRightDouble() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-right-double">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-right-double">
          <path d={svgPaths.p570c300} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular5() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <ChevronRightDouble />
    </div>
  );
}

function Buttons1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Buttons">
      <IconButtonRectangular2 />
      <IconButtonRectangular3 />
      <IconButtonRectangular4 />
      <IconButtonRectangular5 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Pagination">
      <RowPerPage />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">1-10 of 135</p>
      <Buttons1 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="Actions">
      <Buttons />
      <Pagination />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-[#f0f1f2] content-stretch flex h-[46px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-l border-r border-solid inset-0 pointer-events-none" />
      <Checkbox />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox1 />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox2 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox3 />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox4 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox5 />
    </div>
  );
}

function Select() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Select">
      <TableHeaderCell />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold gap-[4px] items-center leading-[20px] p-[16px] relative size-full text-[14px]">
          <p className="css-ew64yg relative shrink-0 text-[#292d33]">AI Agents</p>
          <p className="css-ew64yg relative shrink-0 text-[#464e58]">(15)</p>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Gemini</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text1 />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content1 />
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Cursor Agent</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text2 />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content2 />
          <ChevronDown2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Claude code</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text3 />
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content3 />
          <ChevronDown3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">ChatGPT</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text4 />
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content4 />
          <ChevronDown4 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Emmy AI</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text5 />
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content5 />
          <ChevronDown5 />
        </div>
      </div>
    </div>
  );
}

function SiteName() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Site Name">
      <TableHeaderCell1 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-[#f0f1f2] content-stretch flex gap-[4px] h-[46px] items-center p-[16px] relative shrink-0 w-[199px]" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Compliance Status</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#dc180a] text-[14px]">Reviewing</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text6 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="content-stretch flex h-[72px] items-center p-[16px] relative shrink-0 w-[200px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text7 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="content-stretch flex h-[72px] items-center p-[16px] relative shrink-0 w-[200px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#038149] text-[14px]">Cleared</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text8 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="content-stretch flex h-[72px] items-center p-[16px] relative shrink-0 w-[200px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text9 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="content-stretch flex h-[72px] items-center p-[16px] relative shrink-0 w-[200px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text10 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="content-stretch flex h-[72px] items-center p-[16px] relative shrink-0 w-[200px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content10 />
    </div>
  );
}

function Location() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[198px]" data-name="Location">
      <TableHeaderCell2 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Location />
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-[#f0f1f2] col-1 content-stretch flex gap-[4px] h-[46px] items-center ml-0 mt-0 p-[16px] relative row-1 w-[100px]" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">AI Act Role</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Deployer</p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text11 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-0 mt-[46px] p-[16px] relative row-1 w-[100px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Deployer</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text12 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-0 mt-[118px] p-[16px] relative row-1 w-[100px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Deployer</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text13 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-0 mt-[190px] p-[16px] relative row-1 w-[100px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Deployer</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text14 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-0 mt-[262px] p-[16px] relative row-1 w-[100px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Deployer</p>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text15 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-0 mt-[334px] p-[16px] relative row-1 w-[100px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content15 />
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <TableHeaderCell3 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function Location1() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[100px]" data-name="Location">
      <Group10 />
    </div>
  );
}

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Location1 />
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Data Collection Progress</p>
        </div>
      </div>
    </div>
  );
}

function ProgressBar1() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[39.56%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar1 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">5/8</p>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

function ProgressBar3() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[39.56%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar3 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">5/8</p>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar2 />
        </div>
      </div>
    </div>
  );
}

function ProgressBar5() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[49.64%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar5 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">4/8</p>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar4 />
        </div>
      </div>
    </div>
  );
}

function ProgressBar7() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[49.64%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar7 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">4/8</p>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar6 />
        </div>
      </div>
    </div>
  );
}

function ProgressBar9() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[49.64%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar9 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">4/8</p>
      </div>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar8 />
        </div>
      </div>
    </div>
  );
}

function Type() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[200px]" data-name="Type">
      <TableHeaderCell4 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Vendors</p>
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">Google</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">Cursor</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">Claude</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text18 />
        </div>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">Microsoft</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">DT Master Nature</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text20 />
        </div>
      </div>
    </div>
  );
}

function Weight() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[156px]" data-name="Weight">
      <TableHeaderCell5 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function TableHeaderCell6() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Risk classification</p>
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="col-1 content-stretch flex h-[73px] items-center justify-center ml-0 mt-0 p-[16px] relative row-1 w-[160px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[calc(50%-80px)] mt-0 relative row-1">
      <TableCell30 />
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
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-[28.5px] mt-[28px] px-[8px] py-[2px] relative rounded-[4px] row-1" data-name="Badge/Rectangular">
      <DotIcon />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">High Risks</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Group1 />
      <BadgeRectangular />
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[160px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text21 />
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
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-0 mt-0 px-[8px] py-[2px] relative rounded-[4px] row-1" data-name="Badge/Rectangular">
      <DotIcon1 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">High Risks</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[calc(50%-51.5px)] mt-[calc(50%-13px)] relative row-1">
      <BadgeRectangular1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <TableCell31 />
      <Group2 />
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="col-1 content-stretch flex h-[70px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[160px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text22 />
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <TableCell32 />
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <Group5 />
    </div>
  );
}

function Group7() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <Group6 />
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

function BadgeRectangular2() {
  return (
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-[28px] mt-[23px] px-[8px] py-[2px] relative rounded-[4px] row-1" data-name="Badge/Rectangular">
      <DotIcon2 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">High Risks</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Group7 />
      <BadgeRectangular2 />
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[160px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text23 />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <TableCell33 />
    </div>
  );
}

function Weight1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Weight">
      <TableHeaderCell6 />
      <Group />
      <Group3 />
      <Group4 />
      <Group8 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Table">
      <Select />
      <SiteName />
      <Group11 />
      <Group12 />
      <Type />
      <Weight />
      <Weight1 />
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell34() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox6 />
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Sola multi Agent</p>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text24 />
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-up">
          <path d="M15 12.5L10 7.5L5 12.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content16 />
          <ChevronUp />
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#dc180a] text-[14px]">Revewing</p>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text25 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content17 />
        </div>
      </div>
    </div>
  );
}

function ProgressBar11() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-[0.33px] rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#dadada] h-[8px] left-0 right-[59.71%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar11 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">3/8</p>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar10 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">DT Master Nature</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[100px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text26 />
    </div>
  );
}

function DotIcon3() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Dot Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Dot Icon">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #D78C02)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeRectangular3() {
  return (
    <div className="absolute bg-[#fff3d1] content-stretch flex gap-[4px] h-[23.333px] items-center justify-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[123px]" data-name="Badge/Rectangular">
      <DotIcon3 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#9b5e01] text-[14px] text-center">Limited Risks</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[23.333px] relative shrink-0 w-[123px]">
      <BadgeRectangular3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[62px] items-start ml-0 mt-0 relative row-1 w-[1135px]">
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <Frame11 />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Provider</p>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text27 />
    </div>
  );
}

function TableCell39() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-[527px] mt-[2px] p-[16px] relative row-1 w-[192.667px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content18 />
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <Frame1 />
      <TableCell39 />
    </div>
  );
}

function TableCell40() {
  return (
    <div className="h-full relative shrink-0 w-[52px]" data-name="Table Cell">
      <div className="absolute inset-0" style={{ "--stroke-0": "rgba(240, 241, 242, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 168">
          <g id="Table Cell">
            <mask fill="white" id="path-1-inside-1_9_11345">
              <path d="M0 0H52V168H0V0Z" />
            </mask>
            <path d={svgPaths.p2ef86af0} fill="var(--stroke-0, #F0F1F2)" mask="url(#path-1-inside-1_9_11345)" />
            <path d={svgPaths.p18e42680} fill="var(--stroke-0, #2C78B1)" id="Vector 37" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Overview</p>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text28 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content19 />
        </div>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Limited risks</p>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text29 />
    </div>
  );
}

function TableCell42() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content20 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Limited risks</p>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text30 />
    </div>
  );
}

function TableCell43() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content21 />
        </div>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Limited risks</p>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text31 />
    </div>
  );
}

function TableCell44() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content22 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[143px]">
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Use cases</p>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text32 />
    </div>
  );
}

function TableCell45() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content23 />
        </div>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Match carbon emission factors</p>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text33 />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content24 />
        </div>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Check the data collection</p>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text34 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content25 />
        </div>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Extract and retrive data</p>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text35 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content26 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[236px]">
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Models</p>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text36 />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content27 />
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Gemini - o3</p>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text37 />
    </div>
  );
}

function TableCell50() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content28 />
        </div>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">GPT 5.2</p>
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text38 />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content29 />
        </div>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">{`Claude  Haiku`}</p>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text39 />
    </div>
  );
}

function TableCell52() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content30 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[97px]">
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
    </div>
  );
}

function Text40() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Datasets</p>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text40 />
    </div>
  );
}

function TableCell53() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content31 />
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Ademe Databases V08</p>
    </div>
  );
}

function Content32() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text41 />
    </div>
  );
}

function TableCell54() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content32 />
        </div>
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">User data</p>
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text42 />
    </div>
  );
}

function TableCell55() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content33 />
        </div>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">User data</p>
    </div>
  );
}

function Content34() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text43 />
    </div>
  );
}

function TableCell56() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content34 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[184px]">
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
    </div>
  );
}

function Text44() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Risks</p>
    </div>
  );
}

function Content35() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text44 />
    </div>
  );
}

function TableCell57() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content35 />
        </div>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Hallucination</p>
    </div>
  );
}

function Content36() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text45 />
    </div>
  );
}

function TableCell58() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content36 />
        </div>
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Hallucination</p>
    </div>
  );
}

function Content37() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text46 />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content37 />
        </div>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Hallucination</p>
    </div>
  );
}

function Content38() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text47 />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content38 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[159px]">
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell60 />
    </div>
  );
}

function Text48() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">{`EU AI Act `}</p>
    </div>
  );
}

function TableCell61() {
  return (
    <div className="col-1 content-stretch flex h-[42px] items-center justify-center ml-0 mt-0 p-[16px] relative row-1 w-[128px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <Text48 />
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check Icon">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(3, 129, 73, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Check Icon">
            <path d={svgPaths.p3aa02200} fill="var(--fill-0, #038149)" />
            <path d="M6.25 10L8.75 12.5L13.75 7.5" id="Icon" stroke="var(--stroke-0, #F4F5F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TableCell62() {
  return (
    <div className="col-1 content-stretch flex h-[42px] items-center justify-center ml-0 mt-[42px] p-[16px] relative row-1 w-[128px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <CheckIcon />
    </div>
  );
}

function CheckIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check Icon">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(220, 24, 10, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Check Icon">
            <path d={svgPaths.p3aa02200} fill="var(--fill-0, #DC180A)" />
            <path d="M7 13L13 7M7 7L13 13" id="Icon" stroke="var(--stroke-0, #F4F5F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TableCell63() {
  return (
    <div className="col-1 content-stretch flex h-[42px] items-center justify-center ml-0 mt-[84px] p-[16px] relative row-1 w-[128px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <CheckIcon1 />
    </div>
  );
}

function CheckIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check Icon">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(220, 24, 10, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Check Icon">
            <path d={svgPaths.p3aa02200} fill="var(--fill-0, #DC180A)" />
            <path d="M7 13L13 7M7 7L13 13" id="Icon" stroke="var(--stroke-0, #F4F5F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="col-1 content-stretch flex h-[42px] items-center justify-center ml-0 mt-[126px] p-[16px] relative row-1 w-[128px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <CheckIcon2 />
    </div>
  );
}

function Group16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <TableCell61 />
      <TableCell62 />
      <TableCell63 />
      <TableCell64 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px]">
      <Group16 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#f4f5f6] col-1 content-stretch flex items-center ml-0 mt-0 relative row-1 w-[1135px]">
      <div aria-hidden="true" className="absolute border border-[#1a417c] border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <TableCell40 />
      </div>
      <Frame2 />
      <Frame8 />
      <Frame10 />
      <Frame3 />
      <Frame4 />
      <Frame6 />
    </div>
  );
}

function Sola() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full" data-name="Sola">
      <Frame7 />
    </div>
  );
}

function Cursor() {
  return (
    <div className="absolute left-[46px] size-[20px] top-[42px]" data-name="Cursor">
      <div className="absolute inset-[0_0_-6.88%_-1.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.3749 21.375">
          <g id="Cursor">
            <g filter="url(#filter0_d_9_11266)" id="Shape">
              <path clipRule="evenodd" d={svgPaths.p3c99b00} fill="var(--fill-0, #F4F5F6)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p3c99b00} fillRule="evenodd" stroke="var(--stroke-0, #292D33)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </g>
            <path d={svgPaths.p2e487e80} fill="var(--fill-0, #292D33)" id="Lines" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.75" id="filter0_d_9_11266" width="18.7499" x="-2.98023e-08" y="0.625049">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_9_11266" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_9_11266" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function InfoCircle1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_9_11342)" id="info-circle">
          <path d={svgPaths.p3f43b940} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_9_11342">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content39() {
  return (
    <div className="bg-[#feedec] relative rounded-[8px] shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative w-full">
          <InfoCircle1 />
          <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#464e58] text-[12px] text-center">xxx not aligned</p>
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[37px] shadow-[2px_4px_8px_-2px_rgba(34,38,42,0.1),0px_2px_4px_-2px_rgba(34,38,42,0.06)] top-[18px]" data-name="Info">
      <Content39 />
    </div>
  );
}

function Hover() {
  return (
    <div className="absolute h-[62px] left-[824px] top-[135px] w-[108px]" data-name="Hover">
      <Cursor />
      <Info />
    </div>
  );
}

function ExpandedRow() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Expanded Row">
      <Group9 />
      <Sola />
      <Hover />
    </div>
  );
}

function Checkbox7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell65() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox7 />
    </div>
  );
}

function Text49() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">CarbonStop AI</p>
    </div>
  );
}

function Content40() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text49 />
    </div>
  );
}

function ChevronDown6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell66() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-between ml-0 mt-0 p-[16px] relative row-1 w-[276px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content40 />
      <ChevronDown6 />
    </div>
  );
}

function Text50() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content41() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text50 />
    </div>
  );
}

function TableCell67() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-[276px] mt-0 p-[16px] relative row-1 w-[198px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content41 />
    </div>
  );
}

function ProgressBar13() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[59.71%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar13 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">3/8</p>
      </div>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-[565px] mt-0 p-[16px] relative row-1 w-[210px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <ProgressBar12 />
    </div>
  );
}

function Text51() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">Deepseek o1</p>
    </div>
  );
}

function TableCell69() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-[750px] mt-0 p-[16px] relative row-1 w-[168px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text51 />
    </div>
  );
}

function Text52() {
  return <div className="content-stretch flex flex-col gap-[2px] items-end shrink-0" data-name="Text" />;
}

function TableCell70() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-[895px] mt-0 p-[16px] relative row-1 w-[188px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text52 />
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <TableCell65 />
      <Group13 />
    </div>
  );
}

function Checkbox8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TableCell71() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox8 />
    </div>
  );
}

function Text53() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Codex</p>
    </div>
  );
}

function Content42() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text53 />
    </div>
  );
}

function ChevronDown7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TableCell72() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content42 />
          <ChevronDown7 />
        </div>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content43() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text54 />
    </div>
  );
}

function TableCell73() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center ml-0 mt-0 p-[16px] relative row-1 w-[288px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Content43 />
    </div>
  );
}

function Group15() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <TableCell73 />
    </div>
  );
}

function Group14() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Group15 />
    </div>
  );
}

function ProgressBar15() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[59.71%] rounded-[9999px] top-0" data-name="Progress" />
    </div>
  );
}

function ProgressBar14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Progress Bar">
      <ProgressBar15 />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#292d33] text-[12px]">
        <p className="css-ew64yg leading-[18px]">3/8</p>
      </div>
    </div>
  );
}

function TableCell74() {
  return (
    <div className="content-stretch flex h-[72px] items-center p-[16px] relative shrink-0 w-[207px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <ProgressBar14 />
    </div>
  );
}

function Text55() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">GPT 5.2</p>
    </div>
  );
}

function TableCell75() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[122px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text55 />
    </div>
  );
}

function Text56() {
  return <div className="content-stretch flex flex-col gap-[2px] items-end shrink-0" data-name="Text" />;
}

function TableCell76() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[166px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text56 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <TableCell71 />
      <TableCell72 />
      <Group14 />
      <TableCell74 />
      <TableCell75 />
      <TableCell76 />
    </div>
  );
}

function Rows() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Rows">
      <Frame />
      <Frame5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Table />
        <ExpandedRow />
        <Rows />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f1f2] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[1px_1px_2px_0px_rgba(34,38,42,0.05)]" />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-0 relative shrink-0 w-[1199px]" data-name="Content">
      <Banner />
      <Actions1 />
      <Frame9 />
    </div>
  );
}

export default function Main() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[32px] items-start px-0 py-[24px] relative size-full" data-name="Main">
      <PageHeader />
      <Content />
    </div>
  );
}