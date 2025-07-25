import React from 'react';

const logos = [
  { name: 'Notion', src: '/notion.svg' },
  { name: 'Slack', src: '/slack.svg' },
  { name: 'Loom', src: '/loom.svg' },
  { name: 'Afterpay', src: '/afterpay.svg' },
  { name: 'monday.com', src: '/monday.svg' },
  { name: 'Notion', src: '/notion-alt.svg' },
];

const Trusted = () => {
  return (
    <section className="py-20" style={{ backgroundColor: '#F6F5EF' }}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-black">
          Trusted By Over <span style={{ color: '#0077B6' }}>+10,000</span> Industry Leaders
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-infinite-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="rounded-full p-[1px] mx-4 flex-shrink-0"
                style={{
                  width: '220px',
                  height: '84px',
                  background: 'linear-gradient(128.01deg, rgba(164, 160, 160, 0.55) -13.77%, rgba(151, 151, 151, 0.55) 71.94%)',
                }}
              >
                <div
                  className="bg-gradient-to-b from-white to-blue-100 rounded-full w-full h-full flex items-center justify-center shadow-md"
                >
                  <span className="text-xl font-semibold text-gray-700">{logo.name}</span>
                  {/* In a real app, you'd use an <img /> tag with the logo src */}
                  {/* <img src={logo.src} alt={logo.name} className="h-8" /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
