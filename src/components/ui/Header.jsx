'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header({ className = "" }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const pathname = usePathname();

  const getActiveTab = () => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/about":
        return "About";
      case "/services":
        return "Services";
      case "/clients":
        return "Client";
      case "/contact":
        return "Contact";
      default:
        return "Home";
    }
  };

  const activeTab = getActiveTab();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Client", path: "/clients" },
    { name: "Contact", path: "/contact", display: "Contact us" },
  ];

  return (
    <div className={`absolute top-0 left-[-25px] w-[1400px] h-[72px] flex items-center justify-center ${className}`}>
      <div className="flex w-[1400px] h-[72px] px-[60px] justify-between items-start relative">
        {/* Logo */}
        <Link href="/" className="text-[24px] font-[600] text-[#000] flex items-center h-full">
          FinanceFlow
        </Link>

        {/* Navigation */}
        <div className="flex items-start gap-[1px] absolute left-[328px] top-[21px] w-[416px] h-[32px]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex px-[12px] py-[4px] justify-center items-center gap-[${item.name === "Contact" ? "8" : "10"}px] cursor-pointer ${
                activeTab === item.name 
                  ? "rounded-[30px]" 
                  : "rounded-[99px] shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_4px_4px_0_rgba(0,0,0,0.05),0_10px_10px_0_rgba(0,0,0,0.10)]"
              }`}
              style={activeTab !== item.name ? { backdropFilter: "blur(10px)" } : {}}
            >
              <span className="text-[14px] font-[500] text-[#000]">
                {item.display || item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex p-[2px] justify-center items-center rounded-[50px] border border-[rgba(108,114,120,0.09)] bg-[rgba(255,255,255,0.33)] absolute left-[1161px] top-[20px] w-[151px] h-[32px]">
          <div className="flex px-[12px] py-[4px] justify-center items-center gap-[10px] rounded-[30px]">
            <span className="text-[14px] font-[500] text-[#000]">Sign In</span>
          </div>
          <div 
            className="flex px-[12px] py-[4px] justify-center items-center gap-[8px] rounded-[100px] border border-[#FFF] cursor-pointer transition-all duration-200"
            style={{
              background: "linear-gradient(136deg, #4198C9 5.3%, #036DA9 115.18%)",
              backdropFilter: "blur(5px)",
              transform: hoveredButton === 'signup' ? 'translateY(-1px)' : 'translateY(0px)'
            }}
            onMouseEnter={() => setHoveredButton('signup')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span className="text-[14px] font-[500] text-[#FFF]">Sign Up</span>
          </div>
        </div>
      </div>

      {/* Header Border */}
      <div className="w-[1400px] h-[1px] bg-[rgba(0,0,0,0.10)] absolute bottom-0" />
    </div>
  );
}