import React from 'react';
import { useLeads } from '../context/LeadsContext';
import { TrendingUp, Users, DollarSign, Target, Calendar, Award } from 'lucide-react';

const AnalyticsPage = () => {
  const { leads } = useLeads();

  const getMetrics = () => {
    const totalLeads = leads.length;
    const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
    const closedWon = leads.filter(lead => lead.status === 'closed').length;
    const conversionRate = totalLeads > 0 ? (closedWon / totalLeads * 100).toFixed(1) : '0';
    
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const productCounts = leads.reduce((acc, lead) => {
      acc[lead.product] = (acc[lead.product] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sourceCounts = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLeads,
      totalValue,
      closedWon,
      conversionRate,
      statusCounts,
      productCounts,
      sourceCounts
    };
  };

  const metrics = getMetrics();

  const statCards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads.toString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Pipeline Value',
      value: `$${metrics.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate}%`,
      icon: Target,
      color: 'bg-purple-500',
      change: '+2.5%'
    },
    {
      title: 'Closed Won',
      value: metrics.closedWon.toString(),
      icon: Award,
      color: 'bg-yellow-500',
      change: '+15%'
    }
  ];

  const getBarWidth = (count: number, max: number) => {
    return max > 0 ? (count / max * 100) : 0;
  };

  const maxStatusCount = Math.max(...Object.values(metrics.statusCounts));
  const maxProductCount = Math.max(...Object.values(metrics.productCounts));
  const maxSourceCount = Math.max(...Object.values(metrics.sourceCounts));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor your sales performance and lead generation metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${card.color} p-3 rounded-full`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">{card.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Lead Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Status Distribution</h2>
          <div className="space-y-4">
            {Object.entries(metrics.statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                  {status}
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getBarWidth(count, maxStatusCount)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 text-right">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Interest */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Interest</h2>
          <div className="space-y-4">
            {Object.entries(metrics.productCounts).map(([product, count]) => (
              <div key={product} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {product}
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getBarWidth(count, maxProductCount)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 text-right">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Sources and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lead Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Sources</h2>
          <div className="space-y-4">
            {Object.entries(metrics.sourceCounts).map(([source, count]) => (
              <div key={source} className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-700">
                  {source}
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getBarWidth(count, maxSourceCount)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 text-right">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Pipeline Growth</p>
                <p className="text-xs text-gray-500">15% increase this month</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Follow-up Rate</p>
                <p className="text-xs text-gray-500">92% of leads contacted within 24h</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Lead Quality</p>
                <p className="text-xs text-gray-500">68% qualification rate</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Average Deal Size</p>
                <p className="text-xs text-gray-500">$2,100 per closed lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;