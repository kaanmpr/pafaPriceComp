const { useState, useEffect } = React;

const SimpleBarChart = ({ data, dataKey, nameKey, height }) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  return (
    <div style={{ height: height || 300 }}>
      {data.map((item, index) => {
        const barWidth = (item[dataKey] / maxValue) * 100;
        return (
          <div key={index} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item[nameKey]}
              </div>
              <div style={{ width: 'calc(100% - 100px)', height: '24px', position: 'relative' }}>
                <div style={{ width: `${barWidth}%`, height: '100%', backgroundColor: '#8884d8', borderRadius: '4px' }}>
                  <span style={{ position: 'absolute', right: '8px', top: '2px', color: 'white', fontSize: '12px' }}>
                    {item[dataKey].toLocaleString('tr-TR')} TL
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SimplePieChart = ({ data, valueKey, nameKey, height }) => {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
  
  let currentAngle = 0;
  
  return (
    <div style={{ height: height || 300, position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        <g transform="translate(150, 150)">
          {data.map((item, index) => {
            const value = item[valueKey];
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;
            
            const startRad = (startAngle - 90) * Math.PI / 180;
            const endRad = (endAngle - 90) * Math.PI / 180;
            
            const x1 = 100 * Math.cos(startRad);
            const y1 = 100 * Math.sin(startRad);
            const x2 = 100 * Math.cos(endRad);
            const y2 = 100 * Math.sin(endRad);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = `M 0 0 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            const midAngle = startAngle + angle / 2;
            const midRad = (midAngle - 90) * Math.PI / 180;
            const labelX = 70 * Math.cos(midRad);
            const labelY = 70 * Math.sin(midRad);
            
            return (
              <g key={index}>
                <path d={pathData} fill={colors[index % colors.length]} />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {percentage.toFixed(0)}%
                </text>
              </g>
            );
          })}
        </g>
        <g transform="translate(150, 260)">
          {data.map((item, index) => (
            <g key={index} transform={`translate(${(index - data.length / 2) * 80}, 0)`}>
              <rect width="16" height="16" fill={colors[index % colors.length]} />
              <text x="20" y="12" fontSize="12">{item[nameKey]}: {item[valueKey]}%</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const PeyzajApp = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [useSimpleCharts, setUseSimpleCharts] = useState(false);
  const [activeTab, setActiveTab] = useState('comparison');

  useEffect(() => {
    if (typeof window.Recharts === 'undefined') {
      setUseSimpleCharts(true);
    }
  }, []);

  const companies = ["IŞIK LANDSCAPE", "Vento Peyzaj", "Yağmur Botanik", "İstanbul Firma"];
  const items = [
    { name: "Strelitzia nicolai", description: "170-200 cm", quantity: 28, prices: [12500, 4500, 5500, 4000], bestCompany: "İstanbul Firma" },
    { name: "Strelitzia reginea", description: "100-120 cm", quantity: 3, prices: [15000, 5750, 7000, 6500], bestCompany: "Vento Peyzaj" },
    { name: "Chamaerops humilis", description: "50-60 cm", quantity: 10, prices: [3750, 12500, 15000, 7000], bestCompany: "IŞIK LANDSCAPE" },
    { name: "Cycas revoluta 1", description: "50-60 cm", quantity: 10, prices: [1300, 10500, 12500, 7800], bestCompany: "IŞIK LANDSCAPE" },
    { name: "Cycas revoluta 2", description: "100-120 cm", quantity: 1, prices: [7800, 24500, 29000, 17000], bestCompany: "IŞIK LANDSCAPE" },
    { name: "Asparagus meyerii", description: "30-40 cm", quantity: 100, prices: [250, 500, 600, 600], bestCompany: "IŞIK LANDSCAPE" },
    { name: "Muhlenbeckia", description: "20-30 cm", quantity: 120, prices: [250, 250, 300, 165], bestCompany: "İstanbul Firma" },
    { name: "Viburnum lucidum", description: "200-250 cm", quantity: 12, prices: [7500, 4000, 4800, 3000], bestCompany: "İstanbul Firma" },
    { name: "Areca", description: "160-180 cm", quantity: 2, prices: [5000, 9000, 11000, 3000], bestCompany: "İstanbul Firma" },
    { name: "Monstera deliciosa", description: "160-180 cm", quantity: 3, prices: [12500, 8500, 10500, 4000], bestCompany: "İstanbul Firma" },
    { name: "Olea europea 1", description: "120-150 cm", quantity: 2, prices: [7500, 27500, 33500, 17500], bestCompany: "IŞIK LANDSCAPE" },
    { name: "Olea europea 2", description: "80-100 cm, top form", quantity: 2, prices: [4500, 22500, 27500, 11500], bestCompany: "IŞIK LANDSCAPE" },
    { name: "Saksı içi CTP kaplama", description: "CTP kaplama", quantity: 70, prices: [3700, 2500, 3100, 1900], bestCompany: "İstanbul Firma" },
    { name: "İthal torf", description: "50 lt", quantity: 150, prices: [600, 450, 550, 300], bestCompany: "İstanbul Firma" },
    { name: "Nebati toprak", description: "40 lt", quantity: 200, prices: [250, 250, 300, 100], bestCompany: "İstanbul Firma" },
    { name: "Ponza / Cüruf", description: "80 lt", quantity: 30, prices: [350, 275, 350, 400], bestCompany: "Vento Peyzaj" },
    { name: "Geotekstil", description: "Geotekstil Dupont SF27", quantity: 120, prices: [60, 250, 300, 25], bestCompany: "İstanbul Firma" },
    { name: "Otomatik sulama sistemi", description: "Damlama", quantity: 20, prices: [600, 350, 410, 120], bestCompany: "İstanbul Firma" },
    { name: "Bluetooth timer", description: "Timer", quantity: 1, prices: [5500, 8500, 10000, 5750], bestCompany: "IŞIK LANDSCAPE" },
    { name: "İşçilik/Nakliye/Genel Gider", description: "İşçilik + Nakliye", quantity: 1, prices: [331200, 285000, 300000, 30000], bestCompany: "İstanbul Firma" }
  ];

  const calculateTotalWithQuantities = () => {
    return items.reduce((acc, item) => {
      const totalsByCompany = item.prices.map(price => price * item.quantity);
      return acc.length === 0 ? totalsByCompany : acc.map((sum, i) => sum + totalsByCompany[i]);
    }, []);
  };

  const totals = calculateTotalWithQuantities();

  const getTableData = () => {
    return items.map(item => {
      const differences = calculateDifference(item.prices);
      const totalPrices = item.prices.map((p) => p * item.quantity);
      const totalDifferences = calculateDifference(totalPrices);
      return {
        ...item,
        prices: item.prices.map(formatPrice),
        totalPrices: totalPrices.map(formatPrice),
        differences,
        totalDifferences,
      };
    });
  };

  const calculateDifference = (arr) => {
    const min = Math.min(...arr.filter(v => v > 0));
    return arr.map(val => val === 0 || min === 0 ? "N/A" : `${Math.round((val - min) / min * 100)}%`);
  };

  const formatPrice = price => price.toLocaleString('tr-TR');

  // Seçilen ürün için detaylı karşılaştırma paneli
  const renderItemDetailPanel = () => {
    if (!selectedItem) return null;
    
    const item = items.find(i => i.name === selectedItem);
    if (!item) return null;
    
    const minPrice = Math.min(...item.prices.filter(p => p > 0));
    const advList = companies.map((company, i) => {
      const price = item.prices[i];
      const diff = price === 0 ? "N/A" : `${Math.round((price - minPrice) / minPrice * 100)}%`;
      const isMin = price === minPrice;
      
      return {
        company,
        price,
        diff,
        isMin,
        advantage: isMin ? "En uygun fiyat" : (diff === "N/A" ? "Bilgi yok" : "")
      };
    });

    const chartData = advList.map(adv => ({
      name: adv.company,
      value: adv.price
    }));
    
    return (
      <div className="bg-white p-4 rounded shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{item.name} Detaylı Fiyat Karşılaştırması</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedItem(null)}
          >
            ✕
          </button>
        </div>
        <p className="mb-4"><strong>Tanım:</strong> {item.description}, <strong>Adet:</strong> {item.quantity}</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Firma</th>
                <th className="px-4 py-2 text-left">Birim Fiyat (TL)</th>
                <th className="px-4 py-2 text-left">Fark %</th>
                <th className="px-4 py-2 text-left">Toplam (TL)</th>
                <th className="px-4 py-2 text-left">Avantaj</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {advList.map((adv, i) => (
                <tr key={i} className={adv.isMin ? "bg-green-50" : ""}>
                  <td className="px-4 py-2">{adv.company}</td>
                  <td className="px-4 py-2">{adv.price.toLocaleString('tr-TR')}</td>
                  <td className="px-4 py-2">{adv.diff}</td>
                  <td className="px-4 py-2">{(adv.price * item.quantity).toLocaleString('tr-TR')}</td>
                  <td className="px-4 py-2">{adv.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Fiyat Grafiği</h3>
          <SimpleBarChart 
            data={chartData} 
            dataKey="value" 
            nameKey="name" 
            height={200}
          />
        </div>
      </div>
    );
  };

  // Özet grafikleri için veri fonksiyonları
  const getTotalChartData = () => {
    return companies.map((company, index) => ({
      name: company,
      total: totals[index]
    }));
  };
  
  const getPieChartData = () => {
    const bestCompanyCounts = companies.map(company => 
      items.filter(item => item.bestCompany === company).length
    );
    const totalItems = items.length;
    return companies.map((company, index) => ({
      name: company,
      value: Math.round((bestCompanyCounts[index] / totalItems) * 100)
    })).filter(item => item.value > ാന);
  };
  
  const renderTotalChart = () => {
    if (useSimpleCharts) {
      return <SimpleBarChart data={getTotalChartData()} dataKey="total" nameKey="name" />;
    }
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={getTotalChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString('tr-TR') + ' TL'} />
            <Bar dataKey="total" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  const renderPieChart = () => {
    if (useSimpleCharts) {
      return <SimplePieChart data={getPieChartData()} valueKey="value" nameKey="name" />;
    }
    const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } = Recharts;
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={getPieChartData()}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}%`}
              dataKey="value"
            >
              {getPieChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Peyzaj Firmaları Fiyat Karşılaştırması</h1>

      {/* Sekmeler ve Yazdır Butonu */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center no-print">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'comparison' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('comparison')}
        >
          Ürün Karşılaştırma
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('summary')}
        >
          Özet
        </button>
        <button 
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          onClick={() => window.print()}
        >
          Yazdır / PDF Kaydet
        </button>
      </div>

      {activeTab === 'comparison' && (
        <>
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2">Ürün</th>
                  <th className="px-2 py-2">Açıklama</th>
                  <th className="px-2 py-2">Adet</th>
                  {companies.map((company, index) => (
                    <React.Fragment key={`${company}-head`}>
                      <th className="px-2 py-2">{company} (TL)</th>
                      <th className="px-2 py-2">Fark %</th>
                      <th className="px-2 py-2">Toplam (TL)</th>
                    </React.Fragment>
                  ))}
                  <th className="px-2 py-2">En Uygun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {getTableData().map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedItem(item.name)}
                  >
                    <td className="px-2 py-1">{item.name}</td>
                    <td className="px-2 py-1">{item.description}</td>
                    <td className="px-2 py-1">{item.quantity}</td>
                    {companies.map((company, i) => {
                      const isMin = item.differences[i] === '0%';
                      const isTotalMin = item.totalDifferences[i] === '0%';
                      return (
                        <React.Fragment key={`${item.name}-${company}`}>
                          <td className={`px-2 py-1 ${isMin ? 'bg-green-100' : ''}`}>{item.prices[i]}</td>
                          <td className={`px-2 py-1 ${isMin ? 'bg-green-100' : ''}`}>{item.differences[i]}</td>
                          <td className={`px-2 py-1 ${isTotalMin ? 'bg-green-100' : ''}`}>{item.totalPrices[i]}</td>
                        </React.Fragment>
                      );
                    })}
                    <td className="px-2 py-1">{item.bestCompany}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedItem && renderItemDetailPanel()}
        </>
      )}

      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Toplam Fiyat Karşılaştırması</h2>
            {renderTotalChart()}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">En Uygun Firma Yüzdeleri</h2>
            {renderPieChart()}
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<PeyzajApp />, document.getElementById("app"));