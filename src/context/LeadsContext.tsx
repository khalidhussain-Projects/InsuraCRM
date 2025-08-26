import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  priority: 'high' | 'medium' | 'low';
  source: string;
  value: number;
  createdAt: Date;
  lastContact: Date;
  nextFollowUp: Date;
  notes: string[];
  assignedTo: string;
}

interface LeadsContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
};

export const LeadsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555-0123',
      product: 'Auto Insurance',
      status: 'qualified',
      priority: 'high',
      source: 'Website',
      value: 1200,
      createdAt: new Date('2024-01-15'),
      lastContact: new Date('2024-01-18'),
      nextFollowUp: new Date('2024-01-22'),
      notes: ['Interested in comprehensive coverage', 'Has existing policy expiring next month'],
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 555-0124',
      product: 'Home Insurance',
      status: 'proposal',
      priority: 'medium',
      source: 'Referral',
      value: 2400,
      createdAt: new Date('2024-01-10'),
      lastContact: new Date('2024-01-20'),
      nextFollowUp: new Date('2024-01-25'),
      notes: ['New homeowner', 'Looking for competitive rates'],
      assignedTo: 'Mike Chen'
    },
    {
      id: '3',
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '+1 555-0125',
      product: 'Life Insurance',
      status: 'new',
      priority: 'high',
      source: 'Social Media',
      value: 3600,
      createdAt: new Date('2024-01-21'),
      lastContact: new Date('2024-01-21'),
      nextFollowUp: new Date('2024-01-23'),
      notes: ['Family coverage needed'],
      assignedTo: 'Sarah Johnson'
    }
  ]);

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadsContext.Provider>
  );
};