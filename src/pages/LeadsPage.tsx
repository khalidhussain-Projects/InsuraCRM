import React, { useState } from 'react';
import { Search, Filter, Plus, Phone, Mail, Calendar, User, AlertCircle } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';
import LeadModal from '../components/LeadModal';

const LeadsPage = () => {
  const { leads, updateLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesPriority = !priorityFilter || lead.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      proposal: 'bg-purple-100 text-purple-800',
      closed: 'bg-gray-100 text-gray-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-blue-600'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600';
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    updateLead(leadId, { status: newStatus as any });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
            <p className="text-gray-600 mt-2">Track and manage your insurance leads</p>
          </div>
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            Add New Lead
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="closed">Closed</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="flex items-center text-gray-600">
            <Filter className="h-5 w-5 mr-2" />
            <span>{filteredLeads.length} leads found</span>
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid gap-6">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
                    <p className="text-gray-600">{lead.product}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                  <AlertCircle className={`h-5 w-5 ${getPriorityColor(lead.priority)}`} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">{lead.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Next: {lead.nextFollowUp.toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">${lead.value.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Assigned to: <span className="font-medium">{lead.assignedTo}</span>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="closed">Closed</option>
                    <option value="lost">Lost</option>
                  </select>
                  <button
                    onClick={() => setSelectedLead(lead.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new lead.</p>
        </div>
      )}

      {/* Lead Modal */}
      {(selectedLead || showNewLeadModal) && (
        <LeadModal
          leadId={selectedLead}
          isNew={showNewLeadModal}
          onClose={() => {
            setSelectedLead(null);
            setShowNewLeadModal(false);
          }}
        />
      )}
    </div>
  );
};

export default LeadsPage;