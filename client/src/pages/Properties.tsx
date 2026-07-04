import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, Plus, Edit2, Trash2, Search, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Property {
  id: number;
  name: string;
  type: string;
  address: string;
  rentAmount: number;
  status: 'Active' | 'Inactive';
}

const mockProperties: Property[] = [
  { id: 1, name: 'Apartment 101', type: 'Apartment', address: '123 Main St, Downtown', rentAmount: 5000, status: 'Active' },
  { id: 2, name: 'Shop 5', type: 'Shop', address: '456 Market Ave, Commercial Zone', rentAmount: 8000, status: 'Active' },
  { id: 3, name: 'Office 12', type: 'Office', address: '789 Business Park, Tech Hub', rentAmount: 12000, status: 'Active' },
  { id: 4, name: 'Room 8', type: 'Room', address: '321 Residential Ln, Suburbs', rentAmount: 3500, status: 'Inactive' },
];

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    address: string;
    rentAmount: string;
    status: 'Active' | 'Inactive';
  }>({
    name: '',
    type: 'Apartment',
    address: '',
    rentAmount: '',
    status: 'Active',
  });

  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    if (!formData.name || !formData.address || !formData.rentAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingId) {
      setProperties(properties.map(p =>
        p.id === editingId
          ? { ...p, ...formData, rentAmount: parseFloat(formData.rentAmount) }
          : p
      ));
      toast.success('Property updated successfully!');
      setEditingId(null);
    } else {
      const newProperty: Property = {
        id: Math.max(...properties.map(p => p.id), 0) + 1,
        ...formData,
        rentAmount: parseFloat(formData.rentAmount),
      };
      setProperties([...properties, newProperty]);
      toast.success('Property added successfully!');
    }

    setFormData({ name: '', type: 'Apartment', address: '', rentAmount: '', status: 'Active' as const });
    setIsOpen(false);
  };

  const handleEdit = (property: Property) => {
    setFormData({
      name: property.name,
      type: property.type,
      address: property.address,
      rentAmount: property.rentAmount.toString(),
      status: property.status,
    });
    setEditingId(property.id);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
    toast.success('Property deleted successfully!');
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({ name: '', type: 'Apartment', address: '', rentAmount: '', status: 'Active' as const });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Properties</h1>
        <p className="text-muted-foreground">Manage your rental properties</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-muted-foreground/20"
          />
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-accent/20">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingId ? 'Edit Property' : 'Add New Property'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Name</label>
                <Input
                  placeholder="e.g., Apartment 101"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-muted-foreground/20 rounded-md text-foreground"
                >
                  <option>Apartment</option>
                  <option>Shop</option>
                  <option>Office</option>
                  <option>Room</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <Input
                  placeholder="Full address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly Rent (₹)</label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={formData.rentAmount}
                  onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
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
                  onClick={handleAddProperty}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {editingId ? 'Update' : 'Add'} Property
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

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Card key={property.id} className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(property)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-1">{property.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{property.type}</p>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{property.address}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-muted-foreground/10">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Rent</p>
                  <p className="text-xl font-bold text-accent">₹{property.rentAmount.toLocaleString()}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  property.status === 'Active'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {property.status}
                </span>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
}
