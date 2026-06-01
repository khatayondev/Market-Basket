import { LucideIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
  trend?: string;
  trendData?: number[];
}

export function KPICard({ icon: Icon, label, value, iconColor, trend, trendData }: KPICardProps) {
  const chartData = trendData?.map((value, index) => ({ index, value })) || [];
  const chartId = `kpi-line-${label.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">{label}</div>
            {trend && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        
        {trendData && trendData.length > 0 && (
          <div className="w-20 h-12">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart id={chartId} data={chartData}>
                <Line
                  key={`kpi-line-${chartId}`}
                  type="monotone"
                  dataKey="value"
                  stroke="#C9A86A"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}