
import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category, ChartData, categoryColors } from '@/lib/types';
import { formatCurrency } from '@/lib/expenseUtils';
import { PieChart as PieChartIcon, Sparkles, Zap } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: ChartData;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary/20 text-sm animate-fade-in">
        <p className="font-bold text-foreground mb-1">{payload[0].name}</p>
        <p className="text-primary font-semibold">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

interface ChartProps {
  data: Record<Category, number>;
  title: string;
}

const Chart = ({ data, title }: ChartProps) => {
  // Transform data for the chart
  const chartData = useMemo(() => {
    return Object.entries(data)
      .filter(([_, value]) => value > 0) // Only show non-zero values
      .map(([name, value]) => ({
        name,
        value,
        color: categoryColors[name as Category]
      }))
      .sort((a, b) => b.value - a.value); // Sort by highest value first
  }, [data]);

  // Calculate total
  const total = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  // Legend item component
  const LegendItem = ({ item, index }: { item: ChartData; index: number }) => {
    const percentage = ((item.value / total) * 100).toFixed(1);
    
    return (
      <div className={`flex items-center justify-between py-2 px-3 rounded-md hover:bg-accent/30 transition-colors animate-in stagger-${index + 1}`}>
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold">{formatCurrency(item.value)}</span>
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="animate-in w-full h-full overflow-hidden relative border border-primary/20 shadow-lg hover-lift">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-400/5 z-0"></div>
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="relative flex items-center justify-center h-6 w-6">
            <PieChartIcon size={20} className="text-primary" />
            <span className="absolute -top-1 -right-1">
              <Sparkles size={8} className="text-amber-400" />
            </span>
          </div>
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        {chartData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={300}
                    className="drop-shadow-xl"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={2}
                        className="hover:opacity-90 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 md:border-l md:pl-6 max-h-64 overflow-y-auto scrollbar-thin">
              <div className="flex items-center justify-between mb-3 pb-2 border-b">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Zap size={14} className="text-amber-500" />
                  Categories
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(total)}
                </span>
              </div>
              {chartData.map((item, index) => (
                <LegendItem key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <PieChartIcon className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
