import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, DollarSign, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = {
  totalProperties: 12,
  activeTenants: 28,
  rentCollected: 145000,
  pendingPayments: 18500,
  monthlyData: [
    { month: 'Jan', collected: 95000, pending: 5000 },
    { month: 'Feb', collected: 102000, pending: 8000 },
    { month: 'Mar', collected: 98000, pending: 12000 },
    { month: 'Apr', collected: 110000, pending: 9000 },
    { month: 'May', collected: 115000, pending: 15000 },
    { month: 'Jun', collected: 145000, pending: 18500 },
  ],
  recentPayments: [
    { id: 1, tenant: 'Ahmed Khan', property: 'Apartment 101', amount: 5000, date: '2024-06-28', status: 'Paid' },
    { id: 2, tenant: 'Fatima Ali', property: 'Shop 5', amount: 8000, date: '2024-06-27', status: 'Paid' },
    { id: 3, tenant: 'Hassan Omar', property: 'Office 12', amount: 6000, date: '2024-06-26', status: 'Pending' },
    { id: 4, tenant: 'Zainab Malik', property: 'Room 8', amount: 3500, date: '2024-06-25', status: 'Pending' },
  ],
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your rental management overview.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Properties */}
        <Card className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Properties</p>
              <p className="text-3xl font-bold text-foreground">{mockData.totalProperties}</p>
              <p className="text-xs text-accent mt-2">+2 this month</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Building2 className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        {/* Active Tenants */}
        <Card className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Tenants</p>
              <p className="text-3xl font-bold text-foreground">{mockData.activeTenants}</p>
              <p className="text-xs text-accent mt-2">Occupancy: 95%</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        {/* Rent Collected */}
        <Card className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rent Collected</p>
              <p className="text-3xl font-bold text-foreground">₹{(mockData.rentCollected / 1000).toFixed(0)}K</p>
              <p className="text-xs text-accent mt-2">This month</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        {/* Pending Payments */}
        <Card className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Payments</p>
              <p className="text-3xl font-bold text-foreground">₹{(mockData.pendingPayments / 1000).toFixed(1)}K</p>
              <p className="text-xs text-destructive mt-2">Action needed</p>
            </div>
            <div className="p-3 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Rent Collection Chart */}
        <Card className="p-6 border-accent/20">
          <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Rent Collection</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.monthlyData}>
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
              />
              <Line 
                type="monotone" 
                dataKey="pending" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--destructive))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Collection Trend Chart */}
        <Card className="p-6 border-accent/20">
          <h2 className="text-lg font-semibold text-foreground mb-4">Collection Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.monthlyData}>
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
              <Bar dataKey="collected" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card className="p-6 border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Payments</h2>
          <Button variant="outline" size="sm" className="border-accent/20 text-accent hover:bg-accent/10">
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-muted-foreground/10">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Tenant</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Property</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-muted-foreground/5 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 text-foreground font-medium">{payment.tenant}</td>
                  <td className="py-3 px-2 text-muted-foreground">{payment.property}</td>
                  <td className="py-3 px-2 text-accent font-semibold">₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-2 text-muted-foreground">{payment.date}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Paid' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
