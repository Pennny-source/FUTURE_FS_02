import { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';
import { FiSearch, FiFilter, FiChevronDown, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export default function Leads() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
useEffect(() => {
  fetchLeads();
}, []);

const fetchLeads = async () => {
  try {
    const res = await leadService.getAll();
    setLeads(res.data);
  } catch (error) {
    console.error(error);
  }
};
const handleEdit = (lead) => {
  setEditingLead({ ...lead });
};

const saveLead = async () => {
  try {
    await leadService.update(
      editingLead._id,
      editingLead
    );

    await fetchLeads();

    setEditingLead(null);
  } catch (err) {
    console.error(err);
  }
};
const deleteLead = async (id) => {
  if (
    !window.confirm(
      'Delete this lead?'
    )
  )
    return;

  try {
    await leadService.delete(id);

    fetchLeads();
  } catch (err) {
    console.error(err);
  }
};
  const filtered = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || lead.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Link to="/add-lead" className="px-4 py-2 bg-gradient-blue-purple rounded-lg font-medium hover:shadow-glow transition">
          + Add Lead
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg w-full text-white placeholder-gray-500 focus:border-electric-blue outline-none"
          />
        </div>
        <div className="relative w-full sm:w-44">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg w-full text-white appearance-none cursor-pointer focus:border-electric-blue outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
<option value="Attempting Contact">
  Attempting Contact
</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Proposal Sent">
  Proposal Sent
</option>
<option value="Negotiation">
  Negotiation
</option>
<option value="Won">Won</option>
<option value="Lost">Lost</option>
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="glass overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Email</th>
              <th className="py-3 px-4 text-left hidden lg:table-cell">Phone</th>
              <th className="py-3 px-4 text-left hidden xl:table-cell">Company</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Agent</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(lead => (
              <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3 px-4 font-medium">{lead.name}</td>
                <td className="py-3 px-4 text-gray-400 hidden md:table-cell">{lead.email}</td>
                <td className="py-3 px-4 text-gray-400 hidden lg:table-cell">{lead.phone}</td>
                <td className="py-3 px-4 text-gray-400 hidden xl:table-cell">{lead.company}</td>
                <td className="py-3 px-4"><StatusBadge status={lead.status} /></td>
                <td className="py-3 px-4 text-gray-300">{lead.assignedTo?.name || '-'}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/leads/${lead._id}`} className="p-1.5 rounded hover:bg-white/10 text-soft-cyan"><FiEye size={16} /></Link>
                    <button onClick={() => handleEdit(lead)} className="p-1.5 rounded hover:bg-white/10 text-electric-blue"><FiEdit2 size={16} /></button>
                  <button onClick={() => deleteLead(lead._id)}className="p-1.5 rounded hover:bg-white/10 text-alert-red"><FiTrash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
           </div>

      {editingLead && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#101826] p-6 rounded-xl w-full max-w-lg">

            <h2 className="text-xl font-bold mb-4">
              Edit Lead
            </h2>

            <input
              value={editingLead.name}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  name: e.target.value
                })
              }
              className="w-full p-3 mb-3 rounded bg-white/5"
            />

            <input
              value={editingLead.email}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  email: e.target.value
                })
              }
              className="w-full p-3 mb-3 rounded bg-white/5"
            />

            <select
              value={editingLead.status}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  status: e.target.value
                })
              }
             className=" w-full p-3 mb-4 rounded-lg bg-[#1a1a2e] border border-white/10 text-white focus:outline-none focus:border-electric-blue">
              <option>New</option>
              <option>Attempting Contact</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Proposal Sent</option>
              <option>Negotiation</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={saveLead}
                className="bg-cyan-500 px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEditingLead(null)
                }
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
  New: 'bg-blue-500/20 text-blue-400',
  'Attempting Contact':
    'bg-yellow-500/20 text-yellow-400',
  Contacted:
    'bg-purple-500/20 text-purple-400',
  Qualified:
    'bg-cyan-500/20 text-cyan-400',
  'Proposal Sent':
    'bg-indigo-500/20 text-indigo-400',
  Negotiation:
    'bg-orange-500/20 text-orange-400',
  Won:
    'bg-green-500/20 text-green-400',
  Lost:
    'bg-red-500/20 text-red-400'
};
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-500/20 text-gray-400'}`}>
      {status}
    </span>
  );
}