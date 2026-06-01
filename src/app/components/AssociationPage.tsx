import { GitBranch, TrendingUp, Target, Activity } from 'lucide-react';
import { KPICard } from './KPICard';

export function AssociationPage() {
  const associationRules = [
    { antecedent: 'whole milk', consequent: 'other vegetables', support: 0.074, confidence: 0.295, lift: 1.513 },
    { antecedent: 'yogurt', consequent: 'whole milk', support: 0.056, confidence: 0.402, lift: 1.571 },
    { antecedent: 'rolls/buns', consequent: 'whole milk', support: 0.057, confidence: 0.308, lift: 1.205 },
    { antecedent: 'other vegetables', consequent: 'whole milk', support: 0.074, confidence: 0.387, lift: 1.513 },
    { antecedent: 'root vegetables', consequent: 'whole milk', support: 0.049, confidence: 0.449, lift: 1.756 },
  ];

  const frequentItemsets = [
    { itemset: '{whole milk}', support: 0.256, count: 2513 },
    { itemset: '{other vegetables}', support: 0.193, count: 1903 },
    { itemset: '{rolls/buns}', support: 0.184, count: 1809 },
    { itemset: '{whole milk, other vegetables}', support: 0.074, count: 736 },
    { itemset: '{whole milk, yogurt}', support: 0.056, count: 551 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Association Rule Mining</h1>
        <p className="text-gray-600">Discover product purchase patterns using Apriori and FP-Growth algorithms</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          icon={GitBranch}
          label="Frequent Itemsets"
          value="126"
          iconColor="bg-blue-500"
          trend="+12%"
          trendData={[100, 105, 110, 115, 120, 124, 126]}
        />
        <KPICard
          icon={Target}
          label="Rules Found"
          value="19"
          iconColor="bg-green-500"
          trend="+3"
          trendData={[12, 14, 15, 16, 17, 18, 19]}
        />
        <KPICard
          icon={TrendingUp}
          label="Max Lift"
          value="1.76"
          iconColor="bg-purple-500"
          trend="+0.1"
          trendData={[1.5, 1.55, 1.6, 1.65, 1.7, 1.72, 1.76]}
        />
        <KPICard
          icon={Activity}
          label="Min Support"
          value="0.5%"
          iconColor="bg-orange-500"
          trend="0%"
          trendData={[0.5, 0.5, 0.5, 0.5, 0.5]}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Top Frequent Itemsets</h3>
          <div className="space-y-3">
            {frequentItemsets.map((itemset, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A86A] to-[#B89860] flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium">{itemset.itemset}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{(itemset.support * 100).toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">{itemset.count} baskets</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Association Rules</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">If</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Then</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Lift</th>
                </tr>
              </thead>
              <tbody>
                {associationRules.map((rule, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 px-2 text-xs">{rule.antecedent}</td>
                    <td className="py-2 px-2 text-xs">{rule.consequent}</td>
                    <td className="py-2 px-2 text-right">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded font-semibold text-xs">
                        {rule.lift.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold mb-4">Algorithm Parameters</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Minimum Support</label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              defaultValue="0.005"
              className="w-full"
            />
            <div className="text-sm font-medium mt-1">0.5%</div>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Minimum Confidence</label>
            <input
              type="range"
              min="0.05"
              max="0.9"
              step="0.05"
              defaultValue="0.1"
              className="w-full"
            />
            <div className="text-sm font-medium mt-1">10%</div>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Minimum Lift</label>
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.1"
              defaultValue="1.0"
              className="w-full"
            />
            <div className="text-sm font-medium mt-1">1.0</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-3">Business Recommendations</h3>
        <ul className="space-y-2 text-sm">
          <li>• Place whole milk and other vegetables near each other (lift: 1.51)</li>
          <li>• Bundle yogurt with whole milk for promotions (lift: 1.57)</li>
          <li>• Position root vegetables close to dairy section (lift: 1.76 - highest association)</li>
          <li>• Create combo deals for frequently co-purchased items</li>
        </ul>
      </div>
    </div>
  );
}
