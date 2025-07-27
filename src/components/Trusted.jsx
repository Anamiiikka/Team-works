import React from 'react';

const logos = [
  { name: 'Notion', src: '/notion.png' },
  { name: 'Slack', src: '/slack.png' },
  { name: 'Loom', src: '/loom.png' },
  { name: 'Afterpay', src: '/afterpay.png' },
  { name: 'monday.com', src: '/monday.png' },
  { name: 'Notion', src: '/notion.png' },
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
                  className="bg-gradient-to-b from-white to-blue-100 rounded-full w-full h-full flex items-center justify-center shadow-md px-4"
                >
                  <img src={logo.src} alt={logo.name} className="h-8 w-8 object-contain mr-3 flex-shrink-0" />
                  <span className="text-lg font-bold text-black">{logo.name}</span>
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
