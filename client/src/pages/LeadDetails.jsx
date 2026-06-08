import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

export default function LeadDetails() {
  const { id } = useParams();
  // Dummy data; in real app fetch by id
  const lead = {
    id, name: 'Alice Johnson', email: 'alice@example.com', phone: '(555) 123-4567', company: 'TechCorp',
    industry: 'SaaS', source: 'Website', budget: '$10,000', status: 'New', agent: 'John Doe',
    date: '2026-06-05', notes: 'Interested in our premium plan. Needs follow-up demo.',
    timeline: [
      { date: '2026-06-05', action: 'Lead created', user: 'System' },
      { date: '2026-06-05', action: 'Email sent', user: 'John Doe' },
    ]
  };

  return (
    <div className="space-y-6">
      <Link to="/leads" className="flex items-center gap-2 text-gray-400 hover:text-white">
        <FiArrowLeft /> Back to Leads
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-6">
          <h2 className="text-2xl font-bold">{lead.name}</h2>
          <p className="text-gray-400">{lead.company} · {lead.industry}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2"><FiMail className="text-electric-blue" />{lead.email}</div>
            <div className="flex items-center gap-2"><FiPhone className="text-neon-purple" />{lead.phone}</div>
            <div className="flex items-center gap-2"><FiMapPin className="text-soft-cyan" />{lead.source}</div>
            <div className="flex items-center gap-2"><FiCalendar className="text-alert-red" />{lead.date}</div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-gray-300 bg-white/5 rounded-lg p-3">{lead.notes}</p>
          </div>
        </div>
        <div className="glass p-6">
          <h3 className="font-semibold mb-3">Timeline</h3>
          <div className="space-y-3">
            {lead.timeline.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm border-l-2 border-electric-blue pl-3">
                <div>
                  <p className="text-gray-300">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.date} by {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}