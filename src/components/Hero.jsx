'use client';
import { useState } from "react";

export default function Index() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg 
          className="w-[2000px] h-[1200px] absolute left-[-16px] top-[22px]" 
          viewBox="0 0 1349 943" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient 
              id="paint0_linear_grid" 
              x1="984" 
              y1="0" 
              x2="984" 
              y2="1200" 
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.193206" stopColor="#036DA9" stopOpacity="0" />
              <stop offset="0.590551" stopColor="#036DA9" stopOpacity="0.44" />
              <stop offset="0.790846" stopColor="#036DA9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g>
            <path 
              d="M184 0H183.5V200H184H184.5V0H184ZM184 200V199.5H-16V200V200.5H184V200ZM384 0H383.5V200H384H384.5V0H384ZM384 200V199.5H184V200V200.5H384V200ZM584 0H583.5V200H584H584.5V0H584ZM584 200V199.5H384V200V200.5H584V200ZM784 0H783.5V200H784H784.5V0H784ZM784 200V199.5H584V200V200.5H784V200ZM984 0H983.5V200H984H984.5V0H984ZM984 200V199.5H784V200V200.5H984V200ZM1184 0H1183.5V200H1184H1184.5V0H1184ZM1184 200V199.5H984V200V200.5H1184V200ZM1384 0H1383.5V200H1384H1384.5V0H1384ZM1384 200V199.5H1184V200V200.5H1384V200ZM1584 0H1583.5V200H1584H1584.5V0H1584ZM1584 200V199.5H1384V200V200.5H1584V200ZM1784 0H1783.5V200H1784H1784.5V0H1784ZM1784 200V199.5H1584V200V200.5H1784V200ZM1984 200V199.5H1784V200V200.5H1984V200Z" 
              fill="url(#paint0_linear_grid)" 
            />
          </g>
        </svg>
      </div>

      {/* Background Blur Effect */}
      <div 
        className="absolute top-[-114px] left-[178px] w-[940px] h-[940px] rounded-[940px] pointer-events-none"
        style={{
          background: "linear-gradient(136deg, rgba(3,109,169,0.09) 5.3%, rgba(197,234,255,0.12) 115.18%)",
          filter: "blur(100px)"
        }}
      />

      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center">
        <div className="flex w-full max-w-[711px] flex-col justify-center items-center gap-[21px] px-4 lg:px-0 mt-[148px]">
          {/* Badge */}
          <div 
            className="flex h-[35px] px-[12px] py-[4px] items-center gap-[8px] rounded-[8px] border border-[rgba(255,255,255,0.07)] bg-[rgba(70,95,241,0.12)] shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_4px_4px_0_rgba(0,0,0,0.05),0_10px_10px_0_rgba(0,0,0,0.10)]"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <svg className="w-[16px] h-[16px]" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.85352 1.83325L8.50018 15.1666" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.1467 1.83325L8.5 15.1666" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.24609 5.83325L8.49943 1.83325" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.7533 5.83325L8.5 1.83325" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.1473 1.83325H3.85398L1.83398 5.83325H15.1673L13.1473 1.83325Z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.50065 15.1666L15.1673 5.83325H1.83398L8.50065 15.1666Z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] font-[500] text-[#000] leading-[20px]">
              Smart Finance, smart living
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="w-full max-w-[837px] text-[#000] text-center text-[32px] sm:text-[48px] lg:text-[60px] font-[700] leading-[1.2] tracking-[-0.02em] lg:tracking-[-2.56px]">
            We're here to help you achieve financial success
          </h1>

          {/* Description */}
          <p className="w-full max-w-[696px] text-[rgba(0,0,0,0.70)] text-center text-[17px] font-[400] leading-[24px]">
            Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui
            gravida ligula nunc posuere neque laoreet. Massa consectetur
            scelerisque faucibus scelerisque elementum mauris interdum. Mi
            ullamcorper sed posuere nibh aliu nunc aliquet et.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center mt-[21px] mb-[40px]">
          <div className="flex items-center gap-[25px]">
            {/* Get Started Button */}
            <div className="w-[150px] h-[51px] relative">
              <div className="w-[150px] h-[51px] rounded-[240px] bg-[#000] absolute left-0 top-0">
                <svg className="w-[40px] h-[40px] absolute left-[7px] top-[6px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.33" />
                  <circle cx="20" cy="20" r="17" fill="white" fillOpacity="0.33" />
                  <circle cx="20" cy="20" r="13" fill="white" fillOpacity="0.33" />
                  <path d="M25.668 13.5045L25.7475 13.5L25.845 13.506L25.9125 13.518L26.0048 13.5443L26.085 13.5788L26.16 13.6215L26.2275 13.6718L26.289 13.728L26.328 13.7722L26.3895 13.8593L26.4285 13.9313C26.4635 14.0063 26.486 14.0853 26.496 14.1683L26.4998 14.2478C26.4998 14.3043 26.4938 14.3593 26.4818 14.4128L26.4555 14.505L21.5565 28.0628C21.4636 28.2649 21.3147 28.4362 21.1274 28.5563C20.9401 28.6763 20.7222 28.7401 20.4998 28.74C20.2994 28.7404 20.1024 28.6891 19.9277 28.5909C19.7531 28.4927 19.6068 28.3511 19.503 28.1798L19.4543 28.0845L16.9403 23.058L11.9378 20.556C11.7527 20.4713 11.593 20.3396 11.4748 20.1739C11.3567 20.0082 11.284 19.8143 11.2643 19.6118L11.2598 19.5C11.2598 19.08 11.4855 18.696 11.8905 18.4725L11.9955 18.42L25.5083 13.5405L25.5878 13.518L25.668 13.5045Z" fill="white" />
                </svg>
                <span className="text-[#FFF] text-[14px] font-[500] leading-[20px] absolute left-[56px] top-[16px] w-[78px] h-[20px]">
                  Get Started
                </span>
              </div>
            </div>

            {/* Get Demo Button */}
            <div className="w-[150px] h-[51px] relative">
              <div 
                className="w-[150px] h-[51px] rounded-[240px] bg-[#036DA9] absolute left-0 top-0 cursor-pointer transition-all duration-200"
                style={{ transform: hoveredButton === 'getdemo' ? 'translateY(-2px)' : 'translateY(0px)' }}
                onMouseEnter={() => setHoveredButton('getdemo')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span className="text-[#FFF] text-[16px] font-[500] leading-[20px] absolute left-[30px] top-[15px] w-[90px] h-[20px]">
                  Get a Demo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE: Large Container Card with Two Cards Inside */}
        <div
          className="w-full max-w-[744px] h-[258px] rounded-[20px] border border-[rgba(255,255,255,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.50)_100%)] shadow-[0_10px_30px_0_rgba(0,0,0,0.15)] relative p-[10px] mb-[40px] mx-auto"
          style={{ backdropFilter: "blur(13px)" }}
        >
          {/* Background Blur Effect */}
          <div
            className="absolute inset-0 rounded-[16px] opacity-30 pointer-events-none"
            style={{
              background: "conic-gradient(from 136deg at 40.63% 50.41%, rgba(242,98,181,0.00) 125deg, rgba(95,197,255,0.70) 193deg, rgba(255,172,137,0.70) 216deg, rgba(129,85,255,0.70) 236deg, rgba(120,157,255,0.70) 260deg, rgba(159,115,241,0.00) 311deg)",
              filter: "blur(45px)"
            }}
          />

          {/* Inner Cards Container */}
          <div className="relative flex gap-[20px] h-full">
            {/* Cash Flow Management Card */}
            <div
              className="flex-1 h-full rounded-[16px] bg-[linear-gradient(135deg,#5FB5E5_0%,#2E8BC0_100%)] shadow-[0_10px_25px_0_rgba(94,181,229,0.3)] relative overflow-hidden transition-all duration-300 hover:z-50 hover:scale-105 hover:shadow-lg"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-white/20"></div>
                <div className="absolute bottom-[-10px] left-[-10px] w-[60px] h-[60px] rounded-full bg-white/10"></div>
              </div>
              <div className="relative z-10 p-[20px] h-full flex flex-col justify-between">
                <div>
                  <div className="bg-white/20 text-white text-[11px] px-[8px] py-[2px] rounded-[12px] inline-block mb-[12px]">Best Offer</div>
                  <div className="text-white text-[20px] font-[600] mb-[8px]">Cash Flow Management</div>
                  <div className="text-white/80 text-[12px] leading-[1.4]">Track and optimize your cash flow with real-time insights and forecasting tools</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white text-[14px] font-[500]">Learn More</div>
                  <div className="w-[24px] h-[24px] bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Buy Subscription Card */}
            <div
              className="flex-1 h-full rounded-[16px] bg-white/60 backdrop-blur-lg shadow-[0_10px_25px_0_rgba(0,0,0,0.1)] border border-white/20 relative transition-all duration-300 hover:z-50 hover:scale-105 hover:shadow-lg"
            >
              <div className="p-[20px] h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <div className="w-[24px] h-[24px] bg-[#036DA9] rounded-[6px] flex items-center justify-center">
                      <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[12px] text-gray-600">All your paid packs in one place</span>
                  </div>
                  <div className="text-[#000] text-[18px] font-[600] mb-[8px]">Buy Subscription</div>
                  <div className="text-gray-600 text-[12px] leading-[1.4]">Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc posuere neque laoreet. Massa consectetur scelerisque</div>
                </div>
                {/* Learn More Button */}
                <div className="mt-4">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-4xl transition-colors duration-200 flex items-center gap-2">
                    Learn More
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Dashboard Image */}
      <div className="w-[261px] h-[353px] absolute left-[31px] top-[356px]">
        <img 
          className="w-[269px] h-[350px] rounded-[10px] absolute left-0 top-0" 
          src="/left.png"
          alt="Finance Dashboard" 
        />
      </div>

      {/* Left Statistics Card */}
      <div 
        className="flex px-[20px] py-[20px] flex-col justify-center items-center gap-[10px] rounded-[10px] border border-[rgba(255,255,255,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.50)_100%)] shadow-[0_5px_10px_0_rgba(0,0,0,0.05),0_15px_30px_0_rgba(0,0,0,0.15),0_20px_40px_0_rgba(0,0,0,0.25)] absolute left-[200px] top-[500px] w-[240px] h-[257px]"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h3 className="w-[206px] h-[60px] text-[#000] text-center text-[20px] font-[500] leading-[30px]">
          Watch your Business Grow
        </h3>

        {/* Pie Chart */}
        <svg className="w-[200px] h-[200px]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paint0_linear_pie" x1="100.01" y1="18.3716" x2="100.01" y2="181.671" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF968E" />
              <stop offset="1" stopColor="#FF968E" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="paint1_linear_pie" x1="188.626" y1="96.6482" x2="40.9047" y2="156.375" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint2_linear_pie" x1="18.3691" y1="99.9998" x2="181.651" y2="99.9998" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7EAB" />
              <stop offset="1" stopColor="#FF7EAB" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="paint3_linear_pie" x1="96.6376" y1="11.3746" x2="156.38" y2="159.103" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint4_linear_pie" x1="10.2051" y1="21.1318" x2="85.0428" y2="21.1318" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6792FF" />
              <stop offset="1" stopColor="#6792FF" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="paint5_linear_pie" x1="15.2869" y1="126.195" x2="142.521" y2="30.2697" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint6_linear_pie" x1="178.849" y1="78.8675" x2="21.1283" y2="121.124" gradientUnits="userSpaceOnUse">
              <stop stopColor="#613CCB" />
              <stop offset="1" stopColor="#613CCB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint7_linear_pie" x1="126.183" y1="184.732" x2="30.2419" y2="57.5046" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint8_linear_pie" x1="100.01" y1="35.3818" x2="100.01" y2="164.66" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.3" />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint9_linear_pie" x1="100.01" y1="35.3818" x2="100.01" y2="164.66" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.3" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint10_linear_pie" x1="95.1866" y1="45.769" x2="143.591" y2="117.112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ED6B60" />
              <stop offset="1" stopColor="#E248E5" />
            </linearGradient>
          </defs>
          
          <path d="M181.651 100.021C181.651 117.995 175.721 135.467 164.781 149.726C153.84 163.986 138.5 174.237 121.141 178.889L114.801 155.229C126.953 151.972 137.691 144.797 145.349 134.815C153.008 124.833 157.159 112.603 157.159 100.021H181.651Z" fill="url(#paint0_linear_pie)" stroke="url(#paint1_linear_pie)" strokeWidth="1.53846" />
          <path d="M78.88 21.1322C90.9761 17.8908 103.656 17.4757 115.938 19.919C128.22 22.3623 139.775 27.5986 149.71 35.2227C159.645 42.8469 167.693 52.6546 173.232 63.8871C178.771 75.1195 181.651 87.4757 181.651 99.9998L157.159 99.9998C157.159 91.2329 155.143 82.5836 151.265 74.7209C147.388 66.8581 141.755 59.9928 134.8 54.6559C127.846 49.3189 119.757 45.6535 111.159 43.9432C102.562 42.2329 93.6863 42.5235 85.2191 44.7925L78.88 21.1322Z" fill="url(#paint2_linear_pie)" stroke="url(#paint3_linear_pie)" strokeWidth="1.53846" />
          <path d="M42.2814 42.2643C52.415 32.1297 65.0375 24.8414 78.8801 21.1318L85.2192 44.7921C75.5293 47.3888 66.6936 52.4906 59.6001 59.5848L42.2814 42.2643Z" fill="url(#paint4_linear_pie)" stroke="url(#paint5_linear_pie)" strokeWidth="1.53846" />
          <path d="M121.12 178.868C103.76 183.519 85.351 182.313 68.747 175.434C52.1431 168.556 38.2725 156.391 29.2865 140.825C20.3004 125.259 16.7012 107.163 19.0471 89.3426C21.3929 71.5225 29.5526 54.9744 42.2607 42.265L59.5794 59.5855C50.6838 68.4821 44.9719 80.0657 43.3299 92.5398C41.6878 105.014 44.2072 117.681 50.4974 128.577C56.7876 139.473 66.4971 147.989 78.1199 152.804C89.7426 157.619 102.629 158.464 114.781 155.207L121.12 178.868Z" fill="url(#paint6_linear_pie)" stroke="url(#paint7_linear_pie)" strokeWidth="1.53846" />
          <path d="M100.01 34.9971C135.918 34.9972 165.026 64.1099 165.026 100.021C165.026 135.933 135.918 165.045 100.01 165.045C64.1018 165.045 34.9924 135.933 34.9922 100.021C34.9922 64.1098 64.1017 34.9971 100.01 34.9971Z" fill="url(#paint8_linear_pie)" fillOpacity="0.7" stroke="url(#paint9_linear_pie)" strokeWidth="0.769231" />
          
          <text x="66.0668" y="99.3145" fill="url(#paint10_linear_pie)" fontSize="40" fontWeight="600" letterSpacing="-0.04em">
            941
          </text>
          <text x="62.207" y="128.136" fill="black" fillOpacity="0.6" fontSize="13" letterSpacing="-0.4px">
            Transactions
          </text>
        </svg>
      </div>

      {/* Right Dashboard Image */}
      <div className="w-[269px] h-[350px] absolute left-[1154px] top-[332px]">
        <img 
          className="w-[269px] h-[350px] rounded-[10px] absolute left-0 top-0" 
          src="/right.png" 
          alt="Finance Dashboard" 
        />
      </div>

      {/* Right Statistics Card */}
      <div 
        className="flex px-[20px] py-[20px] flex-col justify-center items-center gap-[10px] rounded-[10px] border border-[rgba(255,255,255,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.50)_100%)] shadow-[0_5px_10px_0_rgba(0,0,0,0.05),0_15px_30px_0_rgba(0,0,0,0.15),0_20px_40px_0_rgba(0,0,0,0.25)] absolute left-[1039px] top-[500px] w-[246px] h-[310px]"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h3 className="w-[206px] h-[60px] text-[#000] text-center text-[20px] font-[500] leading-[30px]">
          Watch your Business Grow
        </h3>

        {/* Pie Chart */}
        <svg className="w-[200px] h-[200px]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paint0_linear_pie" x1="100.01" y1="18.3716" x2="100.01" y2="181.671" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF968E" />
              <stop offset="1" stopColor="#FF968E" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="paint1_linear_pie" x1="188.626" y1="96.6482" x2="40.9047" y2="156.375" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint2_linear_pie" x1="18.3691" y1="99.9998" x2="181.651" y2="99.9998" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7EAB" />
              <stop offset="1" stopColor="#FF7EAB" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="paint3_linear_pie" x1="96.6376" y1="11.3746" x2="156.38" y2="159.103" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint4_linear_pie" x1="10.2051" y1="21.1318" x2="85.0428" y2="21.1318" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6792FF" />
              <stop offset="1" stopColor="#6792FF" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="paint5_linear_pie" x1="15.2869" y1="126.195" x2="142.521" y2="30.2697" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint6_linear_pie" x1="178.849" y1="78.8675" x2="21.1283" y2="121.124" gradientUnits="userSpaceOnUse">
              <stop stopColor="#613CCB" />
              <stop offset="1" stopColor="#613CCB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint7_linear_pie" x1="126.183" y1="184.732" x2="30.2419" y2="57.5046" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.58" />
              <stop offset="1" stopColor="white" stopOpacity="0.21" />
            </linearGradient>
            <linearGradient id="paint8_linear_pie" x1="100.01" y1="35.3818" x2="100.01" y2="164.66" gradientUnits="userSpaceOnUse">
              <stop stopOpacity="0.3" />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint9_linear_pie" x1="100.01" y1="35.3818" x2="100.01" y2="164.66" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.3" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint10_linear_pie" x1="95.1866" y1="45.769" x2="143.591" y2="117.112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ED6B60" />
              <stop offset="1" stopColor="#E248E5" />
            </linearGradient>
          </defs>
          
          <path d="M181.651 100.021C181.651 117.995 175.721 135.467 164.781 149.726C153.84 163.986 138.5 174.237 121.141 178.889L114.801 155.229C126.953 151.972 137.691 144.797 145.349 134.815C153.008 124.833 157.159 112.603 157.159 100.021H181.651Z" fill="url(#paint0_linear_pie)" stroke="url(#paint1_linear_pie)" strokeWidth="1.53846" />
          <path d="M78.88 21.1322C90.9761 17.8908 103.656 17.4757 115.938 19.919C128.22 22.3623 139.775 27.5986 149.71 35.2227C159.645 42.8469 167.693 52.6546 173.232 63.8871C178.771 75.1195 181.651 87.4757 181.651 99.9998L157.159 99.9998C157.159 91.2329 155.143 82.5836 151.265 74.7209C147.388 66.8581 141.755 59.9928 134.8 54.6559C127.846 49.3189 119.757 45.6535 111.159 43.9432C102.562 42.2329 93.6863 42.5235 85.2191 44.7925L78.88 21.1322Z" fill="url(#paint2_linear_pie)" stroke="url(#paint3_linear_pie)" strokeWidth="1.53846" />
          <path d="M42.2814 42.2643C52.415 32.1297 65.0375 24.8414 78.8801 21.1318L85.2192 44.7921C75.5293 47.3888 66.6936 52.4906 59.6001 59.5848L42.2814 42.2643Z" fill="url(#paint4_linear_pie)" stroke="url(#paint5_linear_pie)" strokeWidth="1.53846" />
          <path d="M121.12 178.868C103.76 183.519 85.351 182.313 68.747 175.434C52.1431 168.556 38.2725 156.391 29.2865 140.825C20.3004 125.259 16.7012 107.163 19.0471 89.3426C21.3929 71.5225 29.5526 54.9744 42.2607 42.265L59.5794 59.5855C50.6838 68.4821 44.9719 80.0657 43.3299 92.5398C41.6878 105.014 44.2072 117.681 50.4974 128.577C56.7876 139.473 66.4971 147.989 78.1199 152.804C89.7426 157.619 102.629 158.464 114.781 155.207L121.12 178.868Z" fill="url(#paint6_linear_pie)" stroke="url(#paint7_linear_pie)" strokeWidth="1.53846" />
          <path d="M100.01 34.9971C135.918 34.9972 165.026 64.1099 165.026 100.021C165.026 135.933 135.918 165.045 100.01 165.045C64.1018 165.045 34.9924 135.933 34.9922 100.021C34.9922 64.1098 64.1017 34.9971 100.01 34.9971Z" fill="url(#paint8_linear_pie)" fillOpacity="0.7" stroke="url(#paint9_linear_pie)" strokeWidth="0.769231" />
          
          <text x="66.0668" y="99.3145" fill="url(#paint10_linear_pie)" fontSize="40" fontWeight="600" letterSpacing="-0.04em">
            941
          </text>
          <text x="62.207" y="128.136" fill="black" fillOpacity="0.6" fontSize="13" letterSpacing="-0.4px">
            Transactions
          </text>
        </svg>
      </div>
    </div>
  );
}