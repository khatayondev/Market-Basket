import { Database, FileText, Calendar, ShoppingBag, Upload, Download } from 'lucide-react';
import { KPICard } from './KPICard';

export function DatasetPage() {
  const sampleData = [
    { id: 1, member: '1808', date: '21-07-2015', item: 'tropical fruit', category: 'Produce', price: '$2.50' },
    { id: 2, member: '2552', date: '05-01-2015', item: 'whole milk', category: 'Dairy', price: '$3.20' },
    { id: 3, member: '2300', date: '19-09-2015', item: 'pip fruit', category: 'Produce', price: '$1.80' },
    { id: 4, member: '1187', date: '12-12-2014', item: 'other vegetables', category: 'Produce', price: '$4.10' },
    { id: 5, member: '3037', date: '01-02-2015', item: 'whole milk', category: 'Dairy', price: '$3.20' },
    { id: 6, member: '4941', date: '14-02-2015', item: 'rolls/buns', category: 'Bakery', price: '$2.00' },
    { id: 7, member: '1501', date: '19-05-2015', item: 'root vegetables', category: 'Produce', price: '$3.50' },
    { id: 8, member: '2093', date: '25-06-2015', item: 'bottled water', category: 'Beverages', price: '$1.00' },
    { id: 9, member: '3442', date: '12-08-2015', item: 'soda', category: 'Beverages', price: '$1.50' },
    { id: 10, member: '4231', date: '05-10-2015', item: 'yogurt', category: 'Dairy', price: '$2.20' },
  ];

  const topItems = [
    { item: 'whole milk', count: 2513, percentage: '6.48%' },
    { item: 'other vegetables', count: 1903, percentage: '4.91%' },
    { item: 'rolls/buns', count: 1809, percentage: '4.67%' },
    { item: 'soda', count: 1715, percentage: '4.42%' },
    { item: 'yogurt', count: 1372, percentage: '3.54%' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dataset Management</h1>
          <p className="text-gray-600">Explore and understand the Groceries dataset</p>
        </div>
        
        <div className="flex gap-3">
          <label className="cursor-pointer bg-[#C9A86A] hover:bg-[#B89860] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Dataset</span>
            <input 
              type="file" 
              className="hidden" 
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          icon={Database}
          label="Total Rows"
          value="38,765"
          iconColor="bg-blue-500"
          trend="+5%"
          trendData={[30, 35, 32, 38, 40, 42, 45]}
        />
        <KPICard
          icon={FileText}
          label="Columns"
          value="5"
          iconColor="bg-green-500"
          trend="0%"
          trendData={[3, 3, 3, 3, 3, 3, 3]}
        />
        <KPICard
          icon={ShoppingBag}
          label="Unique Items"
          value="167"
          iconColor="bg-purple-500"
          trend="+6%"
          trendData={[150, 155, 158, 162, 164, 165, 167]}
        />
        <KPICard
          icon={Calendar}
          label="Months"
          value="22"
          iconColor="bg-orange-500"
          trend="+2%"
          trendData={[15, 16, 17, 18, 20, 21, 22]}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold">Dataset Preview</h3>
          <button className="text-sm flex items-center gap-1 text-[#C9A86A] hover:text-[#B89860] font-medium">
            <Download className="w-4 h-4" />
            Export Sample
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Member</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Item</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 text-gray-500">{row.id}</td>
                  <td className="py-3 px-6 font-medium">{row.member}</td>
                  <td className="py-3 px-6 text-gray-600">{row.date}</td>
                  <td className="py-3 px-6">{row.item}</td>
                  <td className="py-3 px-6">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-600">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 text-sm text-gray-500 text-center">
          Showing 10 of 38,765 rows
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Top 5 Most Purchased Items</h3>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A86A] to-[#B89860] flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium">{item.item}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{item.count.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{item.percentage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-6">Dataset Information</h3>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Source</div>
              <div className="font-medium">Kaggle - Groceries Dataset</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Date Range</div>
              <div className="font-medium">Jan 2014 - Oct 2015</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Missing Values</div>
              <div className="font-medium text-green-600">0 (Complete)</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Duplicates</div>
              <div className="font-medium text-orange-600">759 rows</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Avg Basket Size</div>
              <div className="font-medium">2.59 items</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Unique Transactions</div>
              <div className="font-medium">14,963</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
