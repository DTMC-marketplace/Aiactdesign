import svgPaths from "./svg-1ltgthjj4k";
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
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#f13d30] text-[14px]">Datasets</p>
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
      <p className="css-4hzbpn font-['Montserrat:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#22262a] text-[24px] tracking-[-0.24px] w-full">Investments</p>
      <p className="css-4hzbpn font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#464e58] text-[16px] w-full">Vendors compliance checker</p>
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
        <g clipPath="url(#clip0_1_3578)" id="info-circle">
          <path d={svgPaths.p2c60bd00} id="Icon" stroke="var(--stroke-0, #DC180A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.666" />
        </g>
        <defs>
          <clipPath id="clip0_1_3578">
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
          <p className="css-4hzbpn flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-h-px min-w-px relative text-[#464e58] text-[16px]">AI investment assessment completed 25 Datasets require attention.</p>
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
          <p className="css-ew64yg relative shrink-0 text-[#292d33]">Investment Name</p>
          <p className="css-ew64yg relative shrink-0 text-[#464e58]">(15)</p>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">DT Master Nature</p>
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
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">OpenIA</p>
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
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Google</p>
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
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Gamma AI</p>
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
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Microsoft</p>
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
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">Status</p>
        </div>
      </div>
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
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content6 />
        </div>
      </div>
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
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content7 />
        </div>
      </div>
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
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content8 />
        </div>
      </div>
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
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content9 />
        </div>
      </div>
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
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[250px]" data-name="Location">
      <TableHeaderCell2 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
    </div>
  );
}

function TableHeaderCell3() {
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
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-[-0.5px] rounded-[9999px] top-0" data-name="Background" />
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

function TableCell15() {
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
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-[-0.5px] rounded-[9999px] top-0" data-name="Background" />
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

function TableCell16() {
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
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-[-0.5px] rounded-[9999px] top-0" data-name="Background" />
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

function TableCell17() {
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
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-[-0.5px] rounded-[9999px] top-0" data-name="Background" />
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

function TableCell18() {
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
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-[-0.5px] rounded-[9999px] top-0" data-name="Background" />
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

function TableCell19() {
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
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Type">
      <TableHeaderCell3 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">IA Act</p>
        </div>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="h-[103px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] size-full" />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Weight() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Weight">
      <TableHeaderCell4 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">GDPR</p>
        </div>
      </div>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="col-1 content-stretch flex h-[73px] items-center justify-center ml-0 mt-0 p-[16px] relative row-1 w-[114px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[calc(50%-57px)] mt-0 relative row-1">
      <TableCell24 />
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
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-[12.47px] mt-[28px] px-[8px] py-[2px] relative rounded-[4px] row-1 w-[89.063px]" data-name="Badge/Rectangular">
      <DotIcon />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">No compliant</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <Group1 />
      <BadgeRectangular />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-[22.52px] mt-0 p-[16px] relative row-1 w-[79.968px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text14 />
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
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">No compliant</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[calc(50%-62.5px)] mt-[calc(50%-13px)] relative row-1">
      <BadgeRectangular1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <TableCell25 />
      <Group2 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="col-1 content-stretch flex h-[70px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[102px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text15 />
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <TableCell26 />
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
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-[10.84px] mt-[23px] px-[8px] py-[2px] relative rounded-[4px] row-1 w-[79.688px]" data-name="Badge/Rectangular">
      <DotIcon2 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">No compliant</p>
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

function Text16() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[114px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text16 />
    </div>
  );
}

function Group17() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <TableCell27 />
    </div>
  );
}

function Weight1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[114px]" data-name="Weight">
      <TableHeaderCell5 />
      <Group />
      <Group3 />
      <Group4 />
      <Group17 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-[895px]" data-name="Table">
      <Select />
      <SiteName />
      <Location />
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

function TableCell28() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox6 />
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Claude</p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text17 />
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

function TableCell29() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content11 />
          <ChevronDown6 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text18 />
    </div>
  );
}

function TableCell30() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function ProgressBar11() {
  return (
    <div className="flex-[1_0_0] h-[8px] min-h-px min-w-px relative" data-name="Progress bar">
      <div className="absolute bg-[#f0f1f2] h-[8px] left-0 right-0 rounded-[9999px] top-0" data-name="Background" />
      <div className="absolute bg-[#2c78b1] h-[8px] left-0 right-[59.71%] rounded-[9999px] top-0" data-name="Progress" />
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

function TableCell31() {
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

function Text19() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[145px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text19 />
    </div>
  );
}

function Text20() {
  return <div className="content-stretch flex flex-col gap-[2px] items-end shrink-0" data-name="Text" />;
}

function TableCell33() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[188px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text20 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[973px]">
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
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

function TableCell34() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-center p-[16px] relative shrink-0" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Checkbox7 />
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#22262a] text-[14px]">Carbonstop</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Text21 />
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

function TableCell35() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Content13 />
          <ChevronDown7 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1a417c] text-[14px]">Assessing</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Content">
      <Text22 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Content14 />
        </div>
      </div>
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

function TableCell37() {
  return (
    <div className="flex-[1_0_0] h-[72px] min-h-px min-w-px relative" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ProgressBar12 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return <div className="content-stretch flex flex-col gap-[2px] items-end shrink-0" data-name="Text" />;
}

function TableCell38() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[145px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text23 />
    </div>
  );
}

function Text24() {
  return <div className="content-stretch flex flex-col gap-[2px] items-end shrink-0" data-name="Text" />;
}

function TableCell39() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end p-[16px] relative shrink-0 w-[188px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text24 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[973px]">
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
    </div>
  );
}

function Rows() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[895px]" data-name="Rows">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-[1039px]">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Table />
        <Rows />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f1f2] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[1px_1px_2px_0px_rgba(34,38,42,0.05)]" />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-0 relative w-full">
        <Banner />
        <Actions1 />
        <Frame2 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[32px] h-[924px] items-start left-[280px] px-0 py-[24px] top-0 w-[1199px]" data-name="Main">
      <PageHeader />
      <Content />
    </div>
  );
}

function LogoFlatten() {
  return (
    <div className="h-[28px] relative shrink-0 w-[136px]" data-name="Logo Flatten">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 136 28">
        <g id="Logo Flatten">
          <g id="Vector">
            <path d={svgPaths.p32dfb500} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p16596900} fill="#F4F5F6" />
            <path d={svgPaths.p337e2240} fill="#F4F5F6" />
            <path d={svgPaths.p1b11ed80} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p3c1c7300} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p29d00e80} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.pd032980} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.pcfd3500} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p568ec80} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.pd8a1b70} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p241cbe80} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p31ea0f00} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.pb600df0} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p33329d00} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p381ed100} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p40de870} fill="var(--fill-0, #F13D30)" />
            <path d={svgPaths.p1f0a4680} fill="var(--fill-0, #F13D30)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="menu-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu-02">
          <path d="M3 12H15M3 6H21M3 18H21" id="Icon" stroke="var(--stroke-0, #F13D30)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function LogoMenu() {
  return (
    <div className="col-1 content-stretch flex items-start justify-between ml-0 mt-0 relative row-1 w-[256px]" data-name="Logo & Menu">
      <LogoFlatten />
      <Menu />
    </div>
  );
}

function BarChartSquare() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="bar-chart-square-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="bar-chart-square-01">
          <path d={svgPaths.p2b280a00} id="Icon" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeadIconText() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <BarChartSquare />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Dashboard</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[4px] relative w-full">
          <LeadIconText />
        </div>
      </div>
    </div>
  );
}

function NavMenuItem() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Item">
      <Container1 />
    </div>
  );
}

function Box() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="box">
          <path d={svgPaths.p1a95dd00} id="Icon" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeadIconText1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <Box />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">AI use cases</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[4px] relative w-full">
          <LeadIconText1 />
        </div>
      </div>
    </div>
  );
}

function NavMenuItem1() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-[36px] px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Item">
      <Container2 />
    </div>
  );
}

function Stars() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="stars-03">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3590)" id="stars-03">
          <path d={svgPaths.p1ca4b700} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_3590">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeadIconText2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <Stars />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">AI Assistant</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[4px] relative w-full">
          <LeadIconText2 />
        </div>
      </div>
    </div>
  );
}

function NavMenuItem2() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-[72px] px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Item">
      <Container3 />
    </div>
  );
}

function Activity() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="activity">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="activity">
          <path d={svgPaths.p19431180} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeadIconText3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <Activity />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Risk assessment</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[4px] relative w-full">
          <LeadIconText3 />
        </div>
      </div>
    </div>
  );
}

function NavMenuItem3() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-[108px] px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Item">
      <Container4 />
    </div>
  );
}

function Data() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="data">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3563)" id="data">
          <g id="Icon">
            <path d={svgPaths.p12d6080} stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p35af0300} stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p349b8c40} stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1ebbef00} stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_3563">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeadIconText4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <Data />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Data Collection</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[4px] relative w-full">
          <LeadIconText4 />
        </div>
      </div>
    </div>
  );
}

function NavMenuItem4() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-[144px] px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Item">
      <Container5 />
    </div>
  );
}

function Group20() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <NavMenuItem />
      <NavMenuItem1 />
      <NavMenuItem2 />
      <NavMenuItem3 />
      <NavMenuItem4 />
    </div>
  );
}

function FunctionalNavigation() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[256px]" data-name="Functional Navigation">
      <Group20 />
    </div>
  );
}

function HorizontalBarChart() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="horizontal-bar-chart-03">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="horizontal-bar-chart-03">
          <path d={svgPaths.p27d8cd00} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeadIconText5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <HorizontalBarChart />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Data Hub</p>
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-up">
          <path d="M12 10L8 6L4 10" id="Icon" stroke="var(--stroke-0, #919AA7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <LeadIconText5 />
          <ChevronUp />
        </div>
      </div>
    </div>
  );
}

function LeadIconText6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#464e58] text-[12px]">Models</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative w-full">
          <LeadIconText6 />
        </div>
      </div>
    </div>
  );
}

function NavMenuDropdownBase() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_Nav Menu Dropdown Base">
      <Container7 />
    </div>
  );
}

function LeadIconText7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#464e58] text-[12px]">Datasets</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative w-full">
          <LeadIconText7 />
        </div>
      </div>
    </div>
  );
}

function NavMenuDropdownBase1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_Nav Menu Dropdown Base">
      <Container8 />
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 w-full" data-name="List">
      <div className="content-stretch flex flex-col gap-[2px] items-start px-[32px] py-0 relative w-full">
        <NavMenuDropdownBase />
        <NavMenuDropdownBase1 />
      </div>
    </div>
  );
}

function NavMenuDropdown() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[2px] items-start ml-0 mt-0 px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Dropdown">
      <Container6 />
      <List />
    </div>
  );
}

function LeadIconText8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#464e58] text-[12px]">Vendors</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative w-full">
          <LeadIconText8 />
        </div>
      </div>
    </div>
  );
}

function NavMenuDropdownBase2() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-[32px] mt-[100px] relative row-1 w-[192px]" data-name="_Nav Menu Dropdown Base">
      <Container9 />
    </div>
  );
}

function Group19() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <NavMenuDropdown />
      <NavMenuDropdownBase2 />
    </div>
  );
}

function Building() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="building-08">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="building-08">
          <path d={svgPaths.p19fc1000} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeadIconText9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <Building />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Reporting</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <LeadIconText9 />
        </div>
      </div>
    </div>
  );
}

function NavMenuDropdown1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[2px] items-start ml-0 mt-[162px] px-0 py-[4px] relative row-1 w-[256px]" data-name="_Nav Menu Dropdown">
      <Container10 />
    </div>
  );
}

function LeadIconText10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Lead Icon & Text">
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#f13d30] text-[12px]">Investments</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="col-1 content-stretch flex items-center ml-[32px] mt-[136px] px-[8px] py-[4px] relative rounded-[4px] row-1 w-[192px]" data-name="Container">
      <LeadIconText10 />
    </div>
  );
}

function Group22() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-[200px] relative row-1">
      <Group19 />
      <NavMenuDropdown1 />
      <Container11 />
    </div>
  );
}

function Group21() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-[52px] relative row-1">
      <FunctionalNavigation />
      <Group22 />
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="user-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="user-01">
          <path d={svgPaths.p1911e380} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeadIconText11() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center ml-0 mt-0 relative row-1 w-[248px]" data-name="Lead Icon & Text">
      <User />
      <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#464e58] text-[14px]">Account Center</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <LeadIconText11 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="col-1 content-stretch flex flex-col items-center justify-end ml-0 mt-0 relative row-1">
      <Group9 />
    </div>
  );
}

function LogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="log-out-04">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="log-out-04">
          <path d={svgPaths.p2decdd00} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ButtonRounded6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Button/Rounded">
      <LogOut />
      <div className="css-g0mm18 flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#464e58] text-[14px] text-center">
        <p className="css-ew64yg leading-[20px]">Switch to Navigation store</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="col-1 content-stretch flex flex-col items-center justify-end ml-0 mt-[30px] relative row-1">
      <ButtonRounded6 />
    </div>
  );
}

function Group25() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Group23() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-[784px] relative row-1">
      <Group25 />
    </div>
  );
}

function Group24() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <LogoMenu />
      <Group21 />
      <Group23 />
    </div>
  );
}

function NavigationSidebar() {
  return (
    <div className="absolute bg-[#feedec] h-[924px] left-0 top-0 w-[280px]" data-name="Navigation Sidebar">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[12px] py-[16px] relative rounded-[inherit] size-full">
        <Group24 />
      </div>
      <div aria-hidden="true" className="absolute border-[#b5bcc4] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TableHeaderCell6() {
  return (
    <div className="bg-[#f0f1f2] h-[46px] relative shrink-0 w-full" data-name="Table Header Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="css-ew64yg font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#292d33] text-[14px]">DSA</p>
        </div>
      </div>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="col-1 content-stretch flex h-[73px] items-center justify-center ml-0 mt-0 p-[16px] relative row-1 w-[87px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group10() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[calc(50%-43.5px)] mt-0 relative row-1">
      <TableCell40 />
    </div>
  );
}

function DotIcon3() {
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

function BadgeRectangular3() {
  return (
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-[29.91px] mt-[28px] px-[8px] py-[2px] relative rounded-[4px] row-1 w-[27.188px]" data-name="Badge/Rectangular">
      <DotIcon3 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">NA</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <Group10 />
      <BadgeRectangular3 />
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[87px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text25 />
    </div>
  );
}

function DotIcon4() {
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

function BadgeRectangular4() {
  return (
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-0 mt-0 px-[8px] py-[2px] relative rounded-[4px] row-1" data-name="Badge/Rectangular">
      <DotIcon4 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">NA</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[calc(50%-25px)] mt-[calc(50%-13px)] relative row-1">
      <BadgeRectangular4 />
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <TableCell41 />
      <Group12 />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="col-1 content-stretch flex h-[70px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[87px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text26 />
    </div>
  );
}

function Group16() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <TableCell42 />
    </div>
  );
}

function Group15() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <Group16 />
    </div>
  );
}

function Group14() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <Group15 />
    </div>
  );
}

function DotIcon5() {
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
    <div className="bg-[#feedec] col-1 content-stretch flex gap-[4px] h-[23.333px] items-center ml-[29.63px] mt-[23px] px-[8px] py-[2px] relative rounded-[4px] row-1 w-[27.188px]" data-name="Badge/Rectangular">
      <DotIcon5 />
      <p className="css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#a2150b] text-[14px] text-center">NA</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <Group14 />
      <BadgeRectangular5 />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Text">
      <p className="css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#22262a] text-[14px] text-right">&nbsp;</p>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="col-1 content-stretch flex h-[72px] items-center justify-end ml-0 mt-0 p-[16px] relative row-1 w-[87px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <Text27 />
    </div>
  );
}

function Group18() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <TableCell43 />
    </div>
  );
}

function Weight2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[358.615px] items-start left-[1197px] top-[288px] w-[87px]" data-name="Weight">
      <TableHeaderCell6 />
      <Group8 />
      <Group11 />
      <Group13 />
      <Group18 />
    </div>
  );
}

function Edit4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="edit-02">
          <path d={svgPaths.p301a7e80} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular6() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <Edit4 />
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[77.538px] items-center justify-center left-[1284px] p-[16px] top-[356.46px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <IconButtonRectangular6 />
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="edit-02">
          <path d={svgPaths.p301a7e80} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular7() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <Edit />
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.308px] items-center justify-center left-[1284px] p-[16px] top-[423.23px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <IconButtonRectangular7 />
    </div>
  );
}

function Edit1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="edit-02">
          <path d={svgPaths.p301a7e80} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular8() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <Edit1 />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[77.538px] items-center justify-center left-[1284px] p-[16px] top-[511.54px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <IconButtonRectangular8 />
    </div>
  );
}

function Edit2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="edit-02">
          <path d={svgPaths.p301a7e80} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular9() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <Edit2 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[77.538px] items-center justify-center left-[1284px] p-[16px] top-[589.08px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <IconButtonRectangular9 />
    </div>
  );
}

function Edit3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="edit-02">
          <path d={svgPaths.p301a7e80} id="Icon" stroke="var(--stroke-0, #565F6C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonRectangular10() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="Icon Button/Rectangular">
      <Edit3 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[77.538px] items-center justify-center left-[1284px] p-[16px] top-[666.62px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-r border-solid inset-0 pointer-events-none" />
      <IconButtonRectangular10 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents left-[1284px] top-[356.46px]">
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
    </div>
  );
}

export default function Group26() {
  return (
    <div className="relative size-full">
      <Main />
      <NavigationSidebar />
      <Weight2 />
      <Group27 />
    </div>
  );
}