import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, Calendar, User, MessageSquare, Clock } from 'lucide-react';
import { useLeads, Lead } from '../context/LeadsContext';

interface LeadModalProps {
  leadId: string | null;
  isNew: boolean;
  onClose: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ leadId, isNew, onClose }) => {
  const { leads, addLead, updateLead } = useLeads();
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  
  const lead = leadId ? leads.find(l => l.id === leadId) : null;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    status: 'new' as const,
    priority: 'medium' as const,
    source: 'Website',
    value: 0,
    assignedTo: 'System',
    notes: [] as string[]
  });

  useEffect(() => {
    if (lead && !isNew) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        product: lead.product,
        status: lead.status,
        priority: lead.priority,
        source: lead.source,
        value: lead.value,
        assignedTo: lead.assignedTo,
        notes: lead.notes
      });
    }
  }, [lead, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNew) {
      addLead({
        ...formData,
        lastContact: new Date(),
        nextFollowUp: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    } else if (leadId) {
      updateLead(leadId, formData);
    }
    
    onClose();
  };

  const handleAddNote = () => {
    if (newNote.trim() && leadId) {
      const updatedNotes = [...(lead?.notes || []), `${new Date().toLocaleString()}: ${newNote.trim()}`];
      updateLead(leadId, { notes: updatedNotes });
      setNewNote('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Add New Lead' : `Lead Details - ${lead?.name}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!isNew && lead && (
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Lead Details
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Notes & Activity
              </button>
            </nav>
          </div>
        )}

        <div className="p-6 max-h-96 overflow-y-auto">
          {(isNew || activeTab === 'details') && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Interest
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Product</option>
                    <option value="Auto Insurance">Auto Insurance</option>
                    <option value="Home Insurance">Home Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Business Insurance">Business Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="closed">Closed</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Source
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email Campaign">Email Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isNew ? 'Add Lead' : 'Update Lead'}
                </button>
              </div>
            </form>
          )}

          {!isNew && activeTab === 'notes' && lead && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Note</h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this lead..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Activity History</h3>
                <div className="space-y-3">
                  {lead.notes.map((note, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-gray-700">{note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {lead.notes.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No notes added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;