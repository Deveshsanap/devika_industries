import React from 'react';

const Stats = () => {
  const stats = [
    { number: "2006", label: "Year of Establishment" },
    { number: "45%", label: "Export Percentage" },
    { number: "15", label: "No. of Employees" },
    { number: "1CR", label: "Annual Turnover" }
  ];

  return (
    <section className="relative py-24 bg-fixed bg-center bg-cover bg-no-repeat" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
    }}>
      {/* Dark Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-600/50">
          
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center px-4">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-300 uppercase tracking-widest text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;