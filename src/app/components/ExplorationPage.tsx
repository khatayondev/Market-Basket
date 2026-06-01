import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export function ExplorationPage() {
  const itemFrequencyData = [
    { item: 'whole milk', count: 2513 },
    { item: 'other vegetables', count: 1903 },
    { item: 'rolls/buns', count: 1809 },
    { item: 'soda', count: 1715 },
    { item: 'yogurt', count: 1372 },
    { item: 'bottled water', count: 1087 },
    { item: 'root vegetables', count: 1072 },
    { item: 'tropical fruit', count: 1032 },
  ];

  const monthlyTrends = [
    { month: 'Jan', transactions: 1245, items: 3210 },
    { month: 'Feb', transactions: 1156, items: 2987 },
    { month: 'Mar', transactions: 1298, items: 3354 },
    { month: 'Apr', transactions: 1187, items: 3067 },
    { month: 'May', transactions: 1334, items: 3445 },
    { month: 'Jun', transactions: 1267, items: 3278 },
    { month: 'Jul', transactions: 1401, items: 3621 },
    { month: 'Aug', transactions: 1356, items: 3503 },
  ];

  const categoryData = [
    { category: 'Dairy', items: 15, percentage: 25.3 },
    { category: 'Produce', items: 14, percentage: 23.1 },
    { category: 'Beverages', items: 25, percentage: 18.4 },
    { category: 'Bakery', items: 8, percentage: 14.2 },
    { category: 'Meat & Fish', items: 15, percentage: 10.8 },
    { category: 'Other', items: 90, percentage: 8.2 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Data Exploration</h1>
        <p className="text-gray-600">Visualize patterns and trends in shopping behavior</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold mb-4">Top Items by Purchase Frequency</h3>
        <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
          <BarChart id="explore-freq-bar" data={itemFrequencyData}>
            <CartesianGrid key="freq-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis key="freq-xaxis" dataKey="item" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
            <YAxis key="freq-yaxis" />
            <Tooltip key="freq-tooltip" />
            <Bar key="freq-bar" dataKey="count" fill="#C9A86A" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Monthly Transaction Trends</h3>
          <ResponsiveContainer width="100%" height={250} minWidth={0} minHeight={0}>
            <LineChart id="explore-monthly-line" data={monthlyTrends}>
              <CartesianGrid key="monthly-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="monthly-xaxis" dataKey="month" />
              <YAxis key="monthly-yaxis" />
              <Tooltip key="monthly-tooltip" />
              <Legend key="monthly-legend" />
              <Line key="monthly-line-tx" type="monotone" dataKey="transactions" stroke="#C9A86A" strokeWidth={2} />
              <Line key="monthly-line-items" type="monotone" dataKey="items" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250} minWidth={0} minHeight={0}>
            <BarChart id="explore-cat-bar" data={categoryData} layout="vertical">
              <CartesianGrid key="cat-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="cat-xaxis" type="number" />
              <YAxis key="cat-yaxis" dataKey="category" type="category" width={100} />
              <Tooltip key="cat-tooltip" />
              <Bar key="cat-bar" dataKey="percentage" fill="#2196F3" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-3">Key Insights</h3>
        <ul className="space-y-2 text-sm">
          <li>• Whole milk is the most frequently purchased item (2,513 purchases - 6.48% of all records)</li>
          <li>• Dairy and Produce categories dominate customer baskets (48.4% combined)</li>
          <li>• Summer months (Jul-Aug) show higher transaction volumes</li>
          <li>• Average basket size remains consistent at 2.59 items per transaction</li>
        </ul>
      </div>
    </div>
  );
}