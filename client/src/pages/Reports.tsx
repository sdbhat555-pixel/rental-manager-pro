import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const monthlyData = [
  { month: 'Jan', collected: 95000, target: 100000 },
  { month: 'Feb', collected: 102000, target: 100000 },
  { month: 'Mar', collected: 98000, target: 100000 },
  { month: 'Apr', collected: 110000, target: 100000 },
  { month: 'May', collected: 115000, target: 100000 },
  { month: 'Jun', collected: 145000, target: 100000 },
];

const occupancyData = [
  { property: 'Apartment 101', occupancy: 100 },
  { property: 'Shop 5', occupancy: 100 },
  { property: 'Office 12', occupancy: 80 },
  { property: 'Room 8', occupancy: 60 },
  { property: 'Apartment 205', occupancy: 100 },
];

const paymentStatusData = [
  { name: 'Paid', value: 125000, color: '#c9a961' },
  { name: 'Pending', value: 18500, color: '#3a4563' },
  { name: 'Overdue', value: 8000, color: '#ef4444' },
];

export default function Reports() {
  const handleExportPDF = () => {
    toast.success('Report exported as PDF!');
  };

  const handleExportExcel = () => {
    toast.success('Report exported as Excel!');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">View detailed insights about your rental business</p>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3 mb-8">
        <Button
          onClick={handleExportPDF}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Download className="w-4 h-4 mr-2" />
          Export as PDF
        </Button>
        <Button
          onClick={handleExportExcel}
          variant="outline"
          className="border-accent/20 text-accent hover:bg-accent/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Export as Excel
        </Button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Rent Collection */}
        <Card className="p-6 border-accent/20">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Monthly Rent Collection
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                name="Collected"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'hsl(var(--muted-foreground))', r: 4 }}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Status Overview */}
        <Card className="p-6 border-accent/20">
          <h2 className="text-lg font-semibold text-foreground mb-4">Payment Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${(value / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Occupancy Rate Chart */}
      <Card className="p-6 border-accent/20 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Property Occupancy Rate</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value) => `${value}%`}
            />
            <Bar dataKey="occupancy" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue (6 months)</p>
          <p className="text-2xl font-bold text-accent">₹665,000</p>
          <p className="text-xs text-accent mt-2">Average: ₹110,833/month</p>
        </Card>
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Average Occupancy</p>
          <p className="text-2xl font-bold text-accent">88%</p>
          <p className="text-xs text-accent mt-2">5 of 5 properties</p>
        </Card>
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Collection Rate</p>
          <p className="text-2xl font-bold text-accent">93%</p>
          <p className="text-xs text-accent mt-2">Excellent performance</p>
        </Card>
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Outstanding Balance</p>
          <p className="text-2xl font-bold text-destructive">₹26,500</p>
          <p className="text-xs text-destructive mt-2">Action required</p>
        </Card>
      </div>
    </div>
  );
}
