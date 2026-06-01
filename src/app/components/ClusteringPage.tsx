import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import { Users, Target, TrendingUp, Activity } from 'lucide-react';
import { KPICard } from './KPICard';

export function ClusteringPage() {
  const scatterData = [
    { id: 'loyal-1', transactions: 15, uniqueItems: 28, cluster: 'Loyal', size: 150 },
    { id: 'loyal-2', transactions: 12, uniqueItems: 24, cluster: 'Loyal', size: 120 },
    { id: 'loyal-3', transactions: 18, uniqueItems: 32, cluster: 'Loyal', size: 180 },
    { id: 'quick-1', transactions: 3, uniqueItems: 5, cluster: 'Quick-Trip', size: 60 },
    { id: 'quick-2', transactions: 2, uniqueItems: 4, cluster: 'Quick-Trip', size: 50 },
    { id: 'quick-3', transactions: 4, uniqueItems: 7, cluster: 'Quick-Trip', size: 70 },
    { id: 'explorer-1', transactions: 8, uniqueItems: 22, cluster: 'Explorer', size: 100 },
    { id: 'explorer-2', transactions: 7, uniqueItems: 20, cluster: 'Explorer', size: 95 },
    { id: 'explorer-3', transactions: 9, uniqueItems: 24, cluster: 'Explorer', size: 110 },
    { id: 'infrequent-1', transactions: 1, uniqueItems: 2, cluster: 'Infrequent', size: 30 },
    { id: 'infrequent-2', transactions: 2, uniqueItems: 3, cluster: 'Infrequent', size: 40 },
  ];

  const clusterProfiles = [
    {
      name: 'Loyal High-Value',
      customers: 287,
      avgTransactions: 16.2,
      avgItems: 42.1,
      avgBasket: 2.8,
      color: '#4CAF50',
    },
    {
      name: 'Quick-Trip Shoppers',
      customers: 1823,
      avgTransactions: 3.1,
      avgItems: 7.9,
      avgBasket: 2.1,
      color: '#2196F3',
    },
    {
      name: 'Explorer Shoppers',
      customers: 945,
      avgTransactions: 8.4,
      avgItems: 23.7,
      avgBasket: 2.9,
      color: '#FF9800',
    },
    {
      name: 'Infrequent Visitors',
      customers: 843,
      avgTransactions: 1.8,
      avgItems: 4.2,
      avgBasket: 2.3,
      color: '#9E9E9E',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Customer Clustering</h1>
        <p className="text-gray-600">Segment customers by purchasing behavior using K-Means and Hierarchical clustering</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          icon={Users}
          label="Clusters Found"
          value="4"
          iconColor="bg-purple-500"
          trend="0%"
          trendData={[4, 4, 4, 4, 4, 4, 4]}
        />
        <KPICard
          icon={Target}
          label="Silhouette Score"
          value="0.35"
          iconColor="bg-blue-500"
          trend="+0.02"
          trendData={[0.2, 0.25, 0.28, 0.3, 0.32, 0.34, 0.35]}
        />
        <KPICard
          icon={TrendingUp}
          label="Features Used"
          value="6"
          iconColor="bg-green-500"
          trend="0%"
          trendData={[6, 6, 6, 6, 6, 6, 6]}
        />
        <KPICard
          icon={Activity}
          label="Total Customers"
          value="3,898"
          iconColor="bg-orange-500"
          trend="+2.1%"
          trendData={[3000, 3200, 3400, 3600, 3700, 3800, 3898]}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold mb-4">Customer Segments Visualization</h3>
        <ResponsiveContainer width="100%" height={400} minWidth={0} minHeight={0}>
          <ScatterChart id="cluster-scatter" margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid key="cluster-grid" strokeDasharray="3 3" />
            <XAxis key="cluster-xaxis" type="number" dataKey="transactions" name="Transactions" unit="" />
            <YAxis key="cluster-yaxis" type="number" dataKey="uniqueItems" name="Unique Items" unit="" />
            <ZAxis key="cluster-zaxis" type="number" dataKey="size" range={[50, 200]} />
            <Tooltip key="cluster-tooltip" cursor={{ strokeDasharray: '3 3' }} />
            <Legend key="cluster-legend" />
            <Scatter key="cluster-scatter-loyal" dataKey="loyal" name="Loyal" data={scatterData.filter(d => d.cluster === 'Loyal')} fill="#4CAF50" />
            <Scatter key="cluster-scatter-quick" dataKey="quick" name="Quick-Trip" data={scatterData.filter(d => d.cluster === 'Quick-Trip')} fill="#2196F3" />
            <Scatter key="cluster-scatter-explorer" dataKey="explorer" name="Explorer" data={scatterData.filter(d => d.cluster === 'Explorer')} fill="#FF9800" />
            <Scatter key="cluster-scatter-infrequent" dataKey="infrequent" name="Infrequent" data={scatterData.filter(d => d.cluster === 'Infrequent')} fill="#9E9E9E" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold mb-4">Cluster Profiles</h3>
        <div className="grid grid-cols-2 gap-4">
          {clusterProfiles.map((cluster, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cluster.color }}
                />
                <h4 className="font-semibold">{cluster.name}</h4>
                <span className="ml-auto text-sm text-gray-600">{cluster.customers} customers</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-gray-600">Avg Transactions</div>
                  <div className="font-semibold">{cluster.avgTransactions}</div>
                </div>
                <div>
                  <div className="text-gray-600">Avg Items</div>
                  <div className="font-semibold">{cluster.avgItems}</div>
                </div>
                <div>
                  <div className="text-gray-600">Basket Size</div>
                  <div className="font-semibold">{cluster.avgBasket}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <h4 className="font-semibold mb-2">Loyal (7.4%)</h4>
          <p className="text-sm">High-value frequent shoppers. Target with premium products and loyalty rewards.</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <h4 className="font-semibold mb-2">Quick-Trip (46.8%)</h4>
          <p className="text-sm">Convenience-focused. Optimize checkout speed and convenient item placement.</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <h4 className="font-semibold mb-2">Explorer (24.2%)</h4>
          <p className="text-sm">High diversity shoppers. Introduce new products and seasonal items.</p>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-5 text-white">
          <h4 className="font-semibold mb-2">Infrequent (21.6%)</h4>
          <p className="text-sm">Re-engagement needed. Use targeted promotions and app notifications.</p>
        </div>
      </div>
    </div>
  );
}
