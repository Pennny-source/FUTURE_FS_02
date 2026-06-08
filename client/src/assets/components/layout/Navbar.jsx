import { FiSearch, FiBell, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
   <header className="h-20 bg-[#050B14] border-b border-white/5 flex items-center justify-between px-8">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search leads, tasks..."
          className="bg-[#101826] h-12 rounded-2xl px-4 outline-none text-white placeholder-slate-500 w-full"
        />
      </div>
      <div className="flex items-center gap-4">
      <button
     onClick={() => navigate('/add-lead')}
        className="
      h-12
      px-5
        flex
      items-center
      gap-2
       rounded-2xl
      bg-cyan-400
      text-[#041019]
     font-semibold
    shadow-[0_0_25px_rgba(54,215,255,.25)]
    hover:scale-[1.02]
    transition
  "
>
  <FiPlus size={20} className="relative top-[1px]" />
  <span>Add Lead</span>
</button>
        <button className="relative p-2 text-gray-400 hover:text-white">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-alert-red rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-cyan-400 text-[#041019] bg-gradient-blue-purple flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}