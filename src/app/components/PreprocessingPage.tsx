import { CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { KPICard } from './KPICard';

export function PreprocessingPage() {
  const cleaningSteps = [
    { step: '1. Parse dates', description: 'Convert DD-MM-YYYY strings to datetime', impact: 'All rows', status: 'completed' },
    { step: '2. Drop missing values', description: 'Remove rows with null values', impact: '0 rows removed', status: 'completed' },
    { step: '3. Remove duplicates', description: 'Remove exact duplicate records', impact: '759 rows removed', status: 'completed' },
    { step: '4. Standardize item names', description: 'Strip whitespace from item descriptions', impact: 'All rows', status: 'completed' },
    { step: '5. Create TransactionID', description: 'Combine Member + Date as unique key', impact: 'New column added', status: 'completed' },
    { step: '6. Extract time features', description: 'Year, Month, Quarter, DayOfWeek', impact: '7 new columns', status: 'completed' },
    { step: '7. Map item categories', description: '167 items → 10 product categories', impact: 'New Category column', status: 'completed' },
    { step: '8. Compute BasketSize', description: 'Items per transaction', impact: 'New column', status: 'completed' },
    { step: '9. Create BasketClass', description: 'Small/Medium/Large classification', impact: 'New column', status: 'completed' },
  ];

  const categoryMap = [
    { category: 'Dairy', items: 15, examples: 'whole milk, yogurt, butter' },
    { category: 'Produce', items: 14, examples: 'other vegetables, tropical fruit' },
    { category: 'Bakery', items: 8, examples: 'rolls/buns, pastry, brown bread' },
    { category: 'Beverages', items: 25, examples: 'soda, bottled water, beer' },
    { category: 'Meat & Fish', items: 15, examples: 'sausage, beef, chicken' },
    { category: 'Snacks & Sweets', items: 14, examples: 'chocolate, candy, ice cream' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Data Preprocessing</h1>
        <p className="text-gray-600">Clean and transform raw data for analysis</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <KPICard
          icon={Settings}
          label="Raw Rows"
          value="38,765"
          iconColor="bg-blue-500"
          trend="100%"
          trendData={[38765, 38765, 38765, 38765]}
        />
        <KPICard
          icon={CheckCircle}
          label="Clean Rows"
          value="38,006"
          iconColor="bg-green-500"
          trend="-2%"
          trendData={[38765, 38500, 38200, 38006]}
        />
        <KPICard
          icon={AlertCircle}
          label="Duplicates Removed"
          value="759"
          iconColor="bg-orange-500"
          trend="+2%"
          trendData={[0, 265, 565, 759]}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">9-Step Cleaning Pipeline</h3>
          <button className="px-4 py-2 bg-gradient-to-r from-[#C9A86A] to-[#B89860] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Run Preprocessing
          </button>
        </div>
        <div className="space-y-2">
          {cleaningSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">{step.step}</div>
                <div className="text-sm text-gray-600">{step.description}</div>
              </div>
              <div className="text-sm text-gray-500">{step.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Category Mapping (CATEGORY_MAP)</h3>
          <div className="space-y-3">
            {categoryMap.map((cat, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-blue-900">{cat.category}</span>
                  <span className="text-sm text-blue-700">{cat.items} items</span>
                </div>
                <div className="text-sm text-blue-600">{cat.examples}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Engineered Features</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-900 mb-1">TransactionID</div>
              <div className="text-sm text-green-700">Member_number + Date → Unique basket identifier</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-900 mb-1">BasketSize</div>
              <div className="text-sm text-purple-700">Number of items per transaction</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-900 mb-1">BasketClass</div>
              <div className="text-sm text-orange-700">Small (≤2) / Medium (3-4) / Large (≥5)</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-900 mb-1">Time Features</div>
              <div className="text-sm text-blue-700">Year, Month, Quarter, DayOfWeek, WeekOfYear</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Data Warehouse</h3>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Build Warehouse
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-1">Fact Table</div>
            <div className="font-semibold">fact_purchases</div>
            <div className="text-xs text-gray-500 mt-1">38,006 rows</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-1">Dimension</div>
            <div className="font-semibold">dim_customer</div>
            <div className="text-xs text-gray-500 mt-1">3,898 rows</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-1">Dimension</div>
            <div className="font-semibold">dim_item</div>
            <div className="text-xs text-gray-500 mt-1">167 rows</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-1">Dimension</div>
            <div className="font-semibold">dim_date</div>
            <div className="text-xs text-gray-500 mt-1">~650 rows</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">ETL Process Complete</h3>
        <p className="text-sm">
          All data has been cleaned, transformed, and loaded into a star schema warehouse.
          The dataset is now ready for association mining, classification, and clustering analysis.
        </p>
      </div>
    </div>
  );
}
