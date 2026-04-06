import svgPaths from "./svg-d82zseub21";

function Container3() {
  return <div className="bg-white h-[20px] rounded-[6px] shrink-0 w-full" data-name="Container" />;
}

function Container2() {
  return (
    <div className="bg-[#5720b7] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#5720b7] text-[14px] top-0">DT MASTER</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#5720b7] text-[12px]">AI Governance</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36px] relative shrink-0 w-[87.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[77px] relative shrink-0 w-[239px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[20px] px-[24px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2d959480} id="Vector_2" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p31922e00} id="Vector_3" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p8942d80} id="Vector_4" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] text-[#464e58] text-[14px] text-center top-0">Dashboard</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p6145d00} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pa26dc00} id="Vector_2" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66699 11.668H3.33366" id="Vector_3" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.667 11.668H18.3337" id="Vector_4" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 10.832V12.4987" id="Vector_5" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 10.832V12.4987" id="Vector_6" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[89.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[45px] text-[#464e58] text-[14px] text-center top-0">AI Assistants</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_697_136)" id="Icon">
          <path d={svgPaths.p3d089a00} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pff91a00} id="Vector_2" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2b722f80} id="Vector_3" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33301 5H11.6663" id="Vector_4" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33301 8.33203H11.6663" id="Vector_5" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33301 11.668H11.6663" id="Vector_6" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33301 15H11.6663" id="Vector_7" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_697_136">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[92.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[46.5px] text-[#464e58] text-[14px] text-center top-0">Organization</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p137ec880} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30bc7240} id="Vector_2" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2a44e700} id="Vector_3" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[43px] text-[#464e58] text-[14px] text-center top-0">AI Inventory</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon3 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p212f6b00} id="Vector" stroke="var(--stroke-0, #292D33)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da1d040} id="Vector_2" stroke="var(--stroke-0, #292D33)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p24229b00} id="Vector_3" stroke="var(--stroke-0, #292D33)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[43px] text-[#292d33] text-[14px] text-center top-0">Compliance</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#ece9fe] h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon4 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2b9cb700} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[33px] text-[#464e58] text-[14px] text-center top-0">Evidence</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon5 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_697_150)" id="Icon">
          <path d={svgPaths.p28121300} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_697_150">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] text-[#464e58] text-[14px] text-center top-0">Monitoring</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon6 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p212f6b00} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da1d040} id="Vector_2" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33366 7.5H6.66699" id="Vector_3" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3337 10.832H6.66699" id="Vector_4" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3337 14.168H6.66699" id="Vector_5" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[36.5px] text-[#464e58] text-[14px] text-center top-0">Reporting</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon7 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[348px] relative shrink-0 w-full" data-name="Navigation">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[239px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[16px] relative rounded-[inherit] size-full">
        <Navigation />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pf1df080} id="Vector" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25b54d00} id="Vector_2" stroke="var(--stroke-0, #464E58)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[111.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] left-[56px] text-[#464e58] text-[14px] text-center top-0">Account Center</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon8 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[73px] relative shrink-0 w-[239px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17px] px-[16px] relative size-full">
        <Button8 />
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="bg-[rgba(236,233,254,0.3)] content-stretch flex flex-col items-start pr-px relative size-full" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#f0f1f2] border-r border-solid inset-0 pointer-events-none" />
      <Container />
      <Container7 />
      <Container8 />
    </div>
  );
}