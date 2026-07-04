import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, Plus, Trash2, Search, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
  id: number;
  tenant: string;
  property: string;
  amount: number;
  date: string;
  method: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  receiptNo: string;
}

const mockPayments: Payment[] = [
  { id: 1, tenant: 'Ahmed Khan', property: 'Apartment 101', amount: 5000, date: '2024-06-28', method: 'Bank Transfer', status: 'Paid', receiptNo: 'RCP-001' },
  { id: 2, tenant: 'Fatima Ali', property: 'Shop 5', amount: 8000, date: '2024-06-27', method: 'Cash', status: 'Paid', receiptNo: 'RCP-002' },
  { id: 3, tenant: 'Hassan Omar', property: 'Office 12', amount: 6000, date: '2024-06-01', method: 'Cheque', status: 'Pending', receiptNo: 'RCP-003' },
  { id: 4, tenant: 'Zainab Malik', property: 'Room 8', amount: 3500, date: '2024-05-15', method: 'Bank Transfer', status: 'Overdue', receiptNo: 'RCP-004' },
  { id: 5, tenant: 'Ali Hassan', property: 'Apartment 205', amount: 5500, date: '2024-06-25', method: 'Cash', status: 'Paid', receiptNo: 'RCP-005' },
];

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<{
    tenant: string;
    property: string;
    amount: string;
    date: string;
    method: string;
    status: 'Paid' | 'Pending' | 'Overdue';
  }>({
    tenant: '',
    property: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'Bank Transfer',
    status: 'Paid',
  });

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddPayment = () => {
    if (!formData.tenant || !formData.property || !formData.amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const newPayment: Payment = {
      id: Math.max(...payments.map(p => p.id), 0) + 1,
      tenant: formData.tenant,
      property: formData.property,
      amount: parseFloat(formData.amount),
      date: formData.date,
      method: formData.method,
      status: formData.status,
      receiptNo: `RCP-${String(Math.max(...payments.map(p => parseInt(p.receiptNo.split('-')[1])), 0) + 1).padStart(3, '0')}`,
    };

    setPayments([...payments, newPayment]);
    toast.success('Payment recorded successfully!');
    setFormData({
      tenant: '',
      property: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      method: 'Bank Transfer',
      status: 'Paid' as const,
    });
    setIsOpen(false);
  };

  const handleDelete = (id: number) => {
    setPayments(payments.filter(p => p.id !== id));
    toast.success('Payment deleted successfully!');
  };

  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Payments & Rent Tracking</h1>
        <p className="text-muted-foreground">Manage and track all rental payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
          <p className="text-3xl font-bold text-accent">₹{totalCollected.toLocaleString()}</p>
          <p className="text-xs text-accent mt-2">{payments.filter(p => p.status === 'Paid').length} payments</p>
        </Card>
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Pending Payments</p>
          <p className="text-3xl font-bold text-foreground">₹{totalPending.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{payments.filter(p => p.status === 'Pending').length} payments</p>
        </Card>
        <Card className="p-6 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Overdue Amount</p>
          <p className="text-3xl font-bold text-destructive">₹{totalOverdue.toLocaleString()}</p>
          <p className="text-xs text-destructive mt-2">{payments.filter(p => p.status === 'Overdue').length} payments</p>
        </Card>
      </div>

      {/* Search, Filter, and Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-muted-foreground/20"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Paid' | 'Pending' | 'Overdue')}
            className="px-4 py-2 bg-muted border border-muted-foreground/20 rounded-md text-foreground text-sm"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-accent/20">
              <DialogHeader>
                <DialogTitle className="text-foreground">Record Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tenant Name</label>
                  <Input
                    placeholder="e.g., Ahmed Khan"
                    value={formData.tenant}
                    onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
                    className="bg-muted border-muted-foreground/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Property</label>
                  <Input
                    placeholder="e.g., Apartment 101"
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    className="bg-muted border-muted-foreground/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="5000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="bg-muted border-muted-foreground/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Payment Date</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-muted border-muted-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
                    <select
                      value={formData.method}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                      className="w-full px-3 py-2 bg-muted border border-muted-foreground/20 rounded-md text-foreground"
                    >
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                      <option>Cheque</option>
                      <option>UPI</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: (e.target.value as any) })}
                    className="w-full px-3 py-2 bg-muted border border-muted-foreground/20 rounded-md text-foreground"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleAddPayment}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Record Payment
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="flex-1 border-accent/20 text-accent"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Payments Table */}
      <Card className="border-accent/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-muted-foreground/10 bg-muted/50">
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Receipt No</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Tenant</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Property</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Method</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-muted-foreground/5 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-accent font-semibold">{payment.receiptNo}</td>
                    <td className="py-4 px-4 text-foreground font-medium">{payment.tenant}</td>
                    <td className="py-4 px-4 text-muted-foreground">{payment.property}</td>
                    <td className="py-4 px-4 text-accent font-semibold">₹{payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-muted-foreground">{payment.date}</td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">{payment.method}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Paid'
                          ? 'bg-accent/10 text-accent'
                          : payment.status === 'Pending'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDelete(payment.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No payments found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
