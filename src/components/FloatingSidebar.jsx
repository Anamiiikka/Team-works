'use client';

const IconWrapper = ({ children }) => (
  <div className="w-14 h-14 my-2 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
    style={{
      background: 'linear-gradient(135deg, #6DD5FA, #2980B9)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    }}
  >
    {children}
  </div>
);

export default function FloatingSidebar() {
  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50">
      <div 
        className="flex flex-col items-center p-2 rounded-full shadow-2xl border border-white/30"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <IconWrapper>
          {/* Icon 1: Document with pencil */}
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconWrapper>

        <IconWrapper>
          {/* Icon 2: Document with download */}
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 16L12 18L14 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconWrapper>

        <IconWrapper>
          {/* Icon 3: Phone with mail */}
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59533 1.99522 8.06813 2.16708 8.43418 2.48353C8.80023 2.79999 9.03394 3.23945 9.09999 3.72C9.222 4.68007 9.45385 5.62273 9.78999 6.53C9.9334 6.88792 9.97366 7.27691 9.90710 7.65088C9.84055 8.02485 9.66928 8.37143 9.40999 8.64L8.08999 9.96C9.51355 12.4135 11.5865 14.4864 14.04 15.91L15.36 14.59C15.6286 14.3307 15.9751 14.1595 16.3491 14.0929C16.7231 14.0263 17.1121 14.0666 17.47 14.21C18.3773 14.5461 19.3199 14.778 20.28 14.9C20.7658 14.9654 21.2094 15.2015 21.5265 15.5719C21.8437 15.9423 22.0122 16.4201 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 5L15 8L11 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconWrapper>
      </div>
    </div>
  );
}

