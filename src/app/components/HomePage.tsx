import { WelcomeHeader } from './WelcomeHeader';
import { KPICard } from './KPICard';
import { ShoppingCart, Users, Package, Calendar, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function HomePage() {
  const chartData = [
    { id: 'cat-dairy', name: 'Dairy', value: 2513, color: '#4CAF50' },
    { id: 'cat-produce', name: 'Produce', value: 1903, color: '#2196F3' },
    { id: 'cat-bakery', name: 'Bakery', value: 1809, color: '#FFC107' },
    { id: 'cat-beverages', name: 'Beverages', value: 1715, color: '#FF5722' },
    { id: 'cat-others', name: 'Others', value: 891, color: '#9E9E9E' },
  ];

  const topItems = [
    { name: 'whole milk', purchases: 2513 },
    { name: 'other vegetables', purchases: 1903 },
    { name: 'rolls/buns', purchases: 1809 },
    { name: 'soda', purchases: 1715 },
    { name: 'yogurt', purchases: 1372 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <WelcomeHeader />

      <div className="grid grid-cols-4 gap-4 mt-6">
        <KPICard
          icon={ShoppingCart}
          label="Total Records"
          value="38,765"
          iconColor="bg-orange-500"
          trend="+5%"
          trendData={[30, 35, 32, 38, 40, 42, 45]}
        />
        <KPICard
          icon={Users}
          label="Customers"
          value="3,898"
          iconColor="bg-yellow-500"
          trend="+5%"
          trendData={[20, 25, 23, 28, 30, 32, 35]}
        />
        <KPICard
          icon={Package}
          label="Unique Items"
          value="167"
          iconColor="bg-blue-500"
          trend="+6%"
          trendData={[150, 155, 158, 162, 164, 165, 167]}
        />
        <KPICard
          icon={Calendar}
          label="Transactions"
          value="14,963"
          iconColor="bg-purple-500"
          trend="+8%"
          trendData={[12000, 12500, 13000, 13500, 14000, 14500, 14963]}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
            <PieChart id="home-cat-pie">
              <Pie
                key="home-cat-pie-series"
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="home-cat-pie-tooltip" />
              <Legend key="home-cat-pie-legend" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Top 5 Items</h3>
          <div className="space-y-4 mt-6">
            {topItems.map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A86A] to-[#B89860] flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C9A86A] to-[#B89860] rounded-full"
                      style={{ width: `${(item.purchases / 2513) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-600">{item.purchases}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-4">Dataset Overview</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Source</div>
            <div className="font-medium">Kaggle Groceries Dataset</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Date Range</div>
            <div className="font-medium">Jan 2014 - Oct 2015</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Avg Basket Size</div>
            <div className="font-medium">2.59 items</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Association Mining</h4>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">19</div>
          <div className="text-sm text-blue-100">Rules discovered</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Classification</h4>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">96.67%</div>
          <div className="text-sm text-green-100">Best accuracy (RF)</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Clustering</h4>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">4</div>
          <div className="text-sm text-purple-100">Customer segments</div>
        </div>
      </div>
    </div>
  );
}