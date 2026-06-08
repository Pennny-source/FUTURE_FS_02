import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

import { leadService } from '../services/leadService';

import {
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';

export default function Dashboard() {
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

  const totalLeads = leads.length;

  const contacted = leads.filter(
    lead => lead.status === 'Contacted'
  ).length;

  const won = leads.filter(
    lead => lead.status === 'Won'
  ).length;

  const pending = leads.filter(
    lead => !['Won', 'Lost'].includes(lead.status)
  ).length;

  const now = new Date();

  const currentMonthLeads = leads.filter(lead => {
    const d = new Date(lead.createdAt);

    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  const previousMonthLeads = leads.filter(lead => {
    const d = new Date(lead.createdAt);

    const prevMonth =
      now.getMonth() === 0
        ? 11
        : now.getMonth() - 1;

    const prevYear =
      now.getMonth() === 0
        ? now.getFullYear() - 1
        : now.getFullYear();

    return (
      d.getMonth() === prevMonth &&
      d.getFullYear() === prevYear
    );
  }).length;

  const growth =
    previousMonthLeads === 0
      ? 100
      : (
          (
            currentMonthLeads -
            previousMonthLeads
          ) /
          previousMonthLeads
        ) *
        100;

  const pieData = [
    {
      name: 'New',
      value: leads.filter(l => l.status === 'New').length,
      color: '#3B82F6'
    },
    {
      name: 'Contacted',
      value: leads.filter(l => l.status === 'Contacted').length,
      color: '#06B6D4'
    },
    {
      name: 'Qualified',
      value: leads.filter(l => l.status === 'Qualified').length,
      color: '#8B5CF6'
    },
    {
      name: 'Won',
      value: leads.filter(l => l.status === 'Won').length,
      color: '#10B981'
    },
    {
      name: 'Lost',
      value: leads.filter(l => l.status === 'Lost').length,
      color: '#EF4444'
    }
  ].filter(item => item.value > 0);

  const monthlyMap = {};

  leads.forEach((lead) => {
    const date = new Date(lead.createdAt);

    const key =
      date.toLocaleString('default', {
        month: 'short'
      }) +
      ' ' +
      date.getFullYear();

    monthlyMap[key] =
      (monthlyMap[key] || 0) + 1;
  });

  const lineData = Object.entries(
    monthlyMap
  ).map(([month, leads]) => ({
    month,
    leads
  }));

  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Dashboard
      </h1>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={FiUsers}
          title="Total Leads"
          value={totalLeads}
          trend={`${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`}
        />

        <StatCard
          icon={FiCheckCircle}
          title="Contacted"
          value={contacted}
          trend={`+${(
            (contacted / Math.max(totalLeads, 1))
            * 100
          ).toFixed(1)}%`}
        />

        <StatCard
          icon={FiTrendingUp}
          title="Won"
          value={won}
          trend={`+${(
            (won / Math.max(totalLeads, 1))
            * 100
          ).toFixed(1)}%`}
        />

        <StatCard
          icon={FiClock}
          title="Pending"
          value={pending}
          trend={`+${(
            (pending / Math.max(totalLeads, 1))
            * 100
          ).toFixed(1)}%`}
        />

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AREA CHART */}

        <div className="lg:col-span-2 bg-[#101826] border border-white/10 rounded-[24px] p-6">

          <h3 className="text-xl font-semibold mb-4">
            Monthly Leads
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <AreaChart data={lineData}>

              <defs>
                <linearGradient
                  id="leadGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#36D7FF"
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="95%"
                    stopColor="#36D7FF"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#1f2937"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
              />

              <Tooltip
                contentStyle={{
                  background: '#101826',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px'
                }}
              />

              <Area
                type="monotone"
                dataKey="leads"
                stroke="#36D7FF"
                strokeWidth={4}
                fill="url(#leadGradient)"
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}

        <div className="bg-[#101826] border border-white/10 rounded-[24px] p-6">

          <h3 className="text-xl font-semibold mb-4 text-center">
            Lead Status
          </h3>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 flex flex-wrap justify-center gap-3">

            {pieData.map((item) => (
              <span
                key={item.name}
                className="text-sm font-medium"
                style={{
                  color: item.color
                }}
              >
                {item.name}{' '}
                (
                {(
                  (item.value /
                    Math.max(totalLeads, 1)) *
                  100
                ).toFixed(0)}
                %)
              </span>
            ))}

          </div>

        </div>

      </div>

      {/* RECENT LEADS */}

      <div className="bg-[#101826] border border-white/10 rounded-[24px] p-6">

        <h3 className="text-lg font-semibold mb-4">
          Recent Leads
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="text-slate-500 border-b border-white/10">
              <tr>
                <th className="py-2 text-left">
                  Name
                </th>
                <th className="py-2 text-left">
                  Email
                </th>
                <th className="py-2 text-left">
                  Status
                </th>
                <th className="py-2 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>

              {recentLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-white/5 hover:bg-cyan-500/5 transition"
                >
                  <td className="py-3">
                    {lead.name}
                  </td>

                  <td className="py-3 text-gray-400">
                    {lead.email}
                  </td>

                  <td className="py-3">
                    <StatusBadge
                      status={lead.status}
                    />
                  </td>

                  <td className="py-3 text-gray-400">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  trend
}) {
  return (
    <div className="bg-[#101826] border border-white/10 rounded-[24px] p-6">

      <div className="flex justify-between items-start">

        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
          <Icon
            className="text-cyan-400"
            size={24}
          />
        </div>

        <span className="text-green-400 font-semibold">
          {trend}
        </span>

      </div>

      <p className="mt-6 text-xs uppercase tracking-[3px] text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-5xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    New: 'bg-blue-500/10 text-blue-300',
    'Attempting Contact':
      'bg-yellow-500/10 text-yellow-300',
    Contacted:
      'bg-cyan-500/10 text-cyan-300',
    Qualified:
      'bg-purple-500/10 text-purple-300',
    'Proposal Sent':
      'bg-indigo-500/10 text-indigo-300',
    Negotiation:
      'bg-pink-500/10 text-pink-300',
    Won:
      'bg-green-500/10 text-green-300',
    Lost:
      'bg-red-500/10 text-red-300'
  };

  return (
    <span
      className={`px-3 py-1 rounded-xl text-xs font-medium ${
        colors[status] ||
        'bg-gray-500/10 text-gray-300'
      }`}
    >
      {status}
    </span>
  );
}