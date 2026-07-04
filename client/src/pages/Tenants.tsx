import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Edit2, Trash2, Search, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface Tenant {
  id: number;
  name: string;
  phone: string;
  property: string;
  leaseStart: string;
  leaseEnd: string;
  status: 'Active' | 'Inactive';
}

const mockTenants: Tenant[] = [
  { id: 1, name: 'Ahmed Khan', phone: '+92-300-1234567', property: 'Apartment 101', leaseStart: '2023-01-15', leaseEnd: '2025-01-15', status: 'Active' },
  { id: 2, name: 'Fatima Ali', phone: '+92-300-2345678', property: 'Shop 5', leaseStart: '2022-06-01', leaseEnd: '2025-06-01', status: 'Active' },
  { id: 3, name: 'Hassan Omar', phone: '+92-300-3456789', property: 'Office 12', leaseStart: '2023-03-20', leaseEnd: '2024-03-20', status: 'Active' },
  { id: 4, name: 'Zainab Malik', phone: '+92-300-4567890', property: 'Room 8', leaseStart: '2024-01-01', leaseEnd: '2024-12-31', status: 'Inactive' },
];

export default function Tenants() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    property: string;
    leaseStart: string;
    leaseEnd: string;
    status: 'Active' | 'Inactive';
  }>({
    name: '',
    phone: '',
    property: '',
    leaseStart: '',
    leaseEnd: '',
    status: 'Active',
  });

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone.includes(searchTerm) ||
    t.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTenant = () => {
    if (!formData.name || !formData.phone || !formData.property || !formData.leaseStart || !formData.leaseEnd) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingId) {
      setTenants(tenants.map(t =>
        t.id === editingId
          ? { ...t, ...formData }
          : t
      ));
      toast.success('Tenant updated successfully!');
      setEditingId(null);
    } else {
      const newTenant: Tenant = {
        id: Math.max(...tenants.map(t => t.id), 0) + 1,
        ...formData,
      };
      setTenants([...tenants, newTenant]);
      toast.success('Tenant added successfully!');
    }

    setFormData({ name: '', phone: '', property: '', leaseStart: '', leaseEnd: '', status: 'Active' as const });
    setIsOpen(false);
  };

  const handleEdit = (tenant: Tenant) => {
    setFormData({
      name: tenant.name,
      phone: tenant.phone,
      property: tenant.property,
      leaseStart: tenant.leaseStart,
      leaseEnd: tenant.leaseEnd,
      status: tenant.status,
    });
    setEditingId(tenant.id);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setTenants(tenants.filter(t => t.id !== id));
    toast.success('Tenant deleted successfully!');
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({ name: '', phone: '', property: '', leaseStart: '', leaseEnd: '', status: 'Active' as const });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Tenants</h1>
        <p className="text-muted-foreground">Manage your rental tenants</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-muted-foreground/20"
          />
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-accent/20 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingId ? 'Edit Tenant' : 'Add New Tenant'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <Input
                  placeholder="e.g., Ahmed Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <Input
                  placeholder="+92-300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assigned Property</label>
                <Input
                  placeholder="e.g., Apartment 101"
                  value={formData.property}
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Lease Start</label>
                  <Input
                    type="date"
                    value={formData.leaseStart}
                    onChange={(e) => setFormData({ ...formData, leaseStart: e.target.value })}
                    className="bg-muted border-muted-foreground/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Lease End</label>
                  <Input
                    type="date"
                    value={formData.leaseEnd}
                    onChange={(e) => setFormData({ ...formData, leaseEnd: e.target.value })}
                    className="bg-muted border-muted-foreground/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: (e.target.value as 'Active' | 'Inactive') })}
                  className="w-full px-3 py-2 bg-muted border border-muted-foreground/20 rounded-md text-foreground"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleAddTenant}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {editingId ? 'Update' : 'Add'} Tenant
                </Button>
                <Button
                  onClick={handleCloseDialog}
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

      {/* Tenants Table */}
      <Card className="border-accent/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-muted-foreground/10 bg-muted/50">
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Phone</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Property</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Lease Period</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-muted-foreground/5 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{tenant.name}</td>
                    <td className="py-4 px-4 text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent" />
                      {tenant.phone}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{tenant.property}</td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">
                      {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tenant.status === 'Active'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(tenant)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
                        </button>
                        <button
                          onClick={() => handleDelete(tenant.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No tenants found</p>
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
