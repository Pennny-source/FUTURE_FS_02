import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';


export default function Analytics() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await leadService.getAll();
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };
const sourceColors = {
  Facebook: '#1877F2',
  Instagram: '#E4405F',
  LinkedIn: '#0A66C2',
  Google: '#34A853',
  Website: '#F59E0B',
  Referral: '#8B5CF6'
};

const sourceMap = {};

leads.forEach((lead) => {
  const source =
    lead.source || 'Unknown';

  sourceMap[source] =
    (sourceMap[source] || 0) + 1;
});

const pieData = Object.keys(sourceMap)
  .map((source) => ({
    name: source,
    value: sourceMap[source],
    color:
      sourceColors[source] ||
      '#64748B'
  }));

const barData = Object.keys(
  sourceMap
).map((source) => ({
  source,
  leads: sourceMap[source]
}));
const totalLeads = leads.length;

const convertedLeads = leads.filter(
  l => l.status === 'Won'
).length;

const conversionRate =
  totalLeads > 0
    ? ((convertedLeads / totalLeads) * 100).toFixed(1)
    : 0;

const totalRevenue = leads.reduce(
  (sum, lead) => sum + (lead.dealValue || 0),
  0
);
const lostLeads = leads.filter(
  l => l.status === 'Lost'
).length;

const revenueData = [
  {
    month: 'Current',
    revenue: totalRevenue
  }
];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  <div className="crm-card p-6">
  <p className="text-xs uppercase tracking-[3px] text-slate-500">
    TOTAL LEADS
  </p>

  <h2 className="text-5xl font-bold mt-4">
    {totalLeads}
  </h2>
</div>

  <div className="crm-card p-6">
    <p className="text-sm text-slate-500">
      CONVERSIONS
    </p>

    <h2 className="text-5xl font-bold mt-4">
      {convertedLeads}
    </h2>
  </div>

  <div className="crm-card p-6">
    <p className="text-sm text-slate-500">
      CONVERSION RATE
    </p>

    <h2 className="text-5xl font-bold mt-4">
      {conversionRate}%
    </h2>
  </div>

  <div className="crm-card p-6">
    <p className="text-sm text-slate-500">
      TOTAL REVENUE
    </p>

    <h2 className="text-5xl font-bold mt-4">
      ${totalRevenue.toLocaleString()}
    </h2>
  </div>

</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="crm-card p-6">
          <h3 className="text-2xl font-semibold mb-6">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3"stroke="rgba(255,255,255,0.08)"/>
              <XAxis dataKey="source" stroke="#94A3B8"/>
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{background:'#101826',border:'1px solid rgba(255,255,255,.08)',borderRadius:'16px' }}/>
              <Bar dataKey="leads" fill="#36D7FF" radius={[12,12,0,0]} />
             
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="crm-card p-6">
          <h3 className="text-2xl font-semibold mb-6">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
      </div>
    </div>
  );
}