import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Award, Target, TrendingUp, Users } from 'lucide-react';
import { KPICard } from './KPICard';

export function ClassificationPage() {
  const modelResults = [
    { model: 'Decision Tree', accuracy: 92.56, precision: 92.4, recall: 92.6, f1: 92.4 },
    { model: 'Random Forest', accuracy: 96.67, precision: 96.6, recall: 96.7, f1: 96.6 },
    { model: 'Naive Bayes', accuracy: 75.64, precision: 74.9, recall: 75.6, f1: 73.1 },
    { model: 'KNN', accuracy: 92.18, precision: 92.0, recall: 92.2, f1: 91.9 },
  ];

  const classDistribution = [
    { class: 'Small (≤2)', count: 2453, percentage: 62.9 },
    { class: 'Medium (3-4)', count: 1098, percentage: 28.2 },
    { class: 'Large (≥5)', count: 347, percentage: 8.9 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Customer Classification</h1>
        <p className="text-gray-600">Predict customer basket size using machine learning algorithms</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          icon={Award}
          label="Best Accuracy"
          value="96.67%"
          iconColor="bg-green-500"
          trend="+2.1%"
          trendData={[90, 92, 94, 95, 96, 96.5, 96.67]}
        />
        <KPICard
          icon={Target}
          label="Models Trained"
          value="4"
          iconColor="bg-blue-500"
          trend="+1"
          trendData={[1, 2, 3, 4, 4, 4, 4]}
        />
        <KPICard
          icon={Users}
          label="Target Classes"
          value="3"
          iconColor="bg-purple-500"
          trend="0%"
          trendData={[3, 3, 3, 3, 3, 3, 3]}
        />
        <KPICard
          icon={TrendingUp}
          label="Features"
          value="7"
          iconColor="bg-orange-500"
          trend="0%"
          trendData={[7, 7, 7, 7, 7, 7, 7]}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold mb-4">Model Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
          <BarChart id="class-model-bar" data={modelResults}>
            <CartesianGrid key="class-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis key="class-xaxis" dataKey="model" />
            <YAxis key="class-yaxis" domain={[0, 100]} />
            <Tooltip key="class-tooltip" />
            <Legend key="class-legend" />
            <Bar key="class-bar-acc" dataKey="accuracy" fill="#C9A86A" radius={[8, 8, 0, 0]} />
            <Bar key="class-bar-prec" dataKey="precision" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            <Bar key="class-bar-rec" dataKey="recall" fill="#2196F3" radius={[8, 8, 0, 0]} />
            <Bar key="class-bar-f1" dataKey="f1" fill="#FF9800" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Model Metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Model</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Accuracy</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">F1-Score</th>
                </tr>
              </thead>
              <tbody>
                {modelResults.map((model, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium">{model.model}</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded font-semibold ${
                        model.accuracy > 95 ? 'bg-green-100 text-green-700' :
                        model.accuracy > 90 ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {model.accuracy.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-medium">{model.f1.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Customer Class Distribution</h3>
          <div className="space-y-4 mt-4">
            {classDistribution.map((cls, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{cls.class}</span>
                  <span className="text-sm text-gray-600">{cls.count} customers</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A86A] to-[#B89860] rounded-full"
                    style={{ width: `${cls.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{cls.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold mb-4">Customer Features</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Total Transactions</div>
            <div className="font-semibold">Shopping frequency</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600">Unique Items</div>
            <div className="font-semibold">Product variety</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600">Avg Basket Size</div>
            <div className="font-semibold">Items per trip</div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="text-sm text-gray-600">Diversity Score</div>
            <div className="font-semibold">Purchase variety</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Award className="w-8 h-8 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">Best Model: Random Forest</h3>
            <p className="text-sm mb-3">
              Random Forest achieved the highest accuracy of 96.67% by ensembling 100 decision trees,
              effectively handling the class imbalance and capturing complex customer behavior patterns.
            </p>
            <ul className="space-y-1 text-sm">
              <li>• Excellent generalization with minimal overfitting</li>
              <li>• Robust to outliers and noise in customer data</li>
              <li>• AvgBasketSize identified as the strongest predictor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
