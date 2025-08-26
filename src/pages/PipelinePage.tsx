import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useLeads } from '../context/LeadsContext';
import { User, Phone, Mail, DollarSign } from 'lucide-react';

const PipelinePage = () => {
  const { leads, updateLead } = useLeads();
  
  const stages = [
    { id: 'new', title: 'New Leads', color: 'bg-blue-500' },
    { id: 'contacted', title: 'Contacted', color: 'bg-yellow-500' },
    { id: 'qualified', title: 'Qualified', color: 'bg-green-500' },
    { id: 'proposal', title: 'Proposal Sent', color: 'bg-purple-500' },
    { id: 'closed', title: 'Closed Won', color: 'bg-gray-500' },
    { id: 'lost', title: 'Closed Lost', color: 'bg-red-500' }
  ];

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      updateLead(draggableId, { status: destination.droppableId as any });
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'border-l-4 border-l-red-500',
      medium: 'border-l-4 border-l-yellow-500',
      low: 'border-l-4 border-l-blue-500'
    };
    return colors[priority as keyof typeof colors] || 'border-l-4 border-l-gray-500';
  };

  const getTotalValue = (status: string) => {
    return getLeadsByStatus(status).reduce((total, lead) => total + lead.value, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Pipeline</h1>
        <p className="text-gray-600">Track leads through your sales process</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stages.map(stage => {
            const stageLeads = getLeadsByStatus(stage.id);
            const stageValue = getTotalValue(stage.id);
            
            return (
              <div key={stage.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className={`${stage.color} text-white p-4 rounded-t-lg`}>
                  <h3 className="font-semibold text-sm mb-1">{stage.title}</h3>
                  <div className="flex justify-between text-xs opacity-90">
                    <span>{stageLeads.length} leads</span>
                    <span>${stageValue.toLocaleString()}</span>
                  </div>
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-2 min-h-96 ${
                        snapshot.isDraggingOver ? 'bg-blue-50' : ''
                      }`}
                    >
                      {stageLeads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-move ${
                                getPriorityColor(lead.priority)
                              } ${
                                snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                              }`}
                            >
                              <div className="flex items-center mb-3">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                                    {lead.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 truncate">{lead.product}</p>
                                </div>
                              </div>

                              <div className="space-y-2 mb-3">
                                <div className="flex items-center text-xs text-gray-600">
                                  <Mail className="h-3 w-3 mr-2" />
                                  <span className="truncate">{lead.email}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Phone className="h-3 w-3 mr-2" />
                                  <span>{lead.phone}</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <div className="flex items-center text-xs text-green-600">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  <span className="font-semibold">{lead.value.toLocaleString()}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {lead.assignedTo}
                                </div>
                              </div>

                              <div className="mt-2 text-xs text-gray-500">
                                Next: {lead.nextFollowUp.toLocaleDateString()}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {stageLeads.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-xs">No leads in this stage</div>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Pipeline Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {stages.map(stage => {
            const stageLeads = getLeadsByStatus(stage.id);
            const stageValue = getTotalValue(stage.id);
            
            return (
              <div key={stage.id} className="text-center">
                <div className={`inline-block w-4 h-4 rounded-full ${stage.color.replace('bg-', 'bg-')} mb-2`}></div>
                <div className="text-sm font-medium text-gray-900">{stageLeads.length}</div>
                <div className="text-xs text-gray-500 mb-1">{stage.title}</div>
                <div className="text-sm font-semibold text-green-600">
                  ${stageValue.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PipelinePage;