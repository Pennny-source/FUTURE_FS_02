
import { useAuth } from '../hooks/useAuth';

export default function Settings() {
  const { user } = useAuth();
 
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input defaultValue={user?.name || ''} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white mt-1" />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input defaultValue={user?.email || ''} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white mt-1" />
          </div>
          <button className="px-4 py-2 bg-gradient-blue-purple rounded-lg font-medium">Save Changes</button>
        </div>
      </div>

      <div className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">API Keys</h2>
        <p className="text-gray-400">No API keys generated yet.</p>
        <button className="mt-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Generate Key</button>
      </div>
    </div>
  );
}