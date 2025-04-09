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

  return (
    <div className="p-4 bg-white rounded shadow max-w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Peyzaj Firmaları Fiyat Karşılaştırması</h1>

      {/* Sekmeler */}
      <div className="mb-6 flex justify-center space-x-4">
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
      </div>

      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
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
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              {selectedItem ? `${selectedItem} Fiyat Karşılaştırması` : "Ürün Seçin"}
            </h2>
            {/* Seçilen ürün için grafik/detay yeri */}
          </div>
        </div>
      )}

      {activeTab === 'summary' && (
        <div className="bg-gray-100 p-6 rounded shadow text-center text-gray-500">
          <p>Özet ekranı buraya eklenecek. Toplam fiyat grafiği, en uygun firma yüzdesi vs.</p>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<PeyzajApp />, document.getElementById("app"));