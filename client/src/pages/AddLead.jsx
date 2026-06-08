import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';

export default function AddLead() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    source: '',
    budget: '',
    dealValue: '',
    message: '',
    status: 'New',
    agent: '',
    leadScore: 50
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await leadService.create(form);

      toast.success('Lead added successfully!');
      navigate('/leads');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add lead');
    }
  };

  return (
    <div className="max-w-3xl mx-auto glass p-6">
      <h2 className="text-2xl font-bold mb-6">
        Add New Lead
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <InputField
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Industry
            </label>

            <input
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Source
            </label>

            <select
              required
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            >
              <option value="" className="bg-[#101826] text-white">
                Select Source
              </option>

              <option value="Facebook" className="bg-[#101826] text-white">
                Facebook
              </option>

              <option value="Instagram" className="bg-[#101826] text-white">
                Instagram
              </option>

              <option value="Google" className="bg-[#101826] text-white">
                Google
              </option>

              <option value="LinkedIn" className="bg-[#101826] text-white">
                LinkedIn
              </option>

              <option value="Website" className="bg-[#101826] text-white">
                Website
              </option>

              <option value="Referral" className="bg-[#101826] text-white">
                Referral
              </option>

              <option value="Other" className="bg-[#101826] text-white">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            >
              <option value="New" className="bg-[#101826] text-white">
                New
              </option>

              <option value="Attempting Contact" className="bg-[#101826] text-white">
                Attempting Contact
              </option>

              <option value="Contacted" className="bg-[#101826] text-white">
                Contacted
              </option>

              <option value="Qualified" className="bg-[#101826] text-white">
                Qualified
              </option>

              <option value="Proposal Sent" className="bg-[#101826] text-white">
                Proposal Sent
              </option>

              <option value="Negotiation" className="bg-[#101826] text-white">
                Negotiation
              </option>

              <option value="Won" className="bg-[#101826] text-white">
                Won
              </option>

              <option value="Lost" className="bg-[#101826] text-white">
                Lost
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Budget
            </label>

            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Deal Value
            </label>

            <input
              type="number"
              min="0"
              name="dealValue"
              value={form.dealValue}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Assigned Agent
            </label>

            <input
              name="agent"
              value={form.agent}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Lead Score
          </label>

          <input
            type="range"
            min="0"
            max="100"
            name="leadScore"
            value={form.leadScore}
            onChange={handleChange}
            className="w-full"
          />

          <div className="text-center text-cyan-400 font-semibold mt-2">
            {form.leadScore}/100
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Notes / Message
          </label>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-blue-purple rounded-lg font-semibold hover:shadow-glow transition"
        >
          Add Lead
        </button>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition"
      />
    </div>
  );
}