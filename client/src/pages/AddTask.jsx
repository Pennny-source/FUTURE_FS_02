import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { taskService } from '../services/taskService';

export default function AddTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'todo'
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
      await taskService.create(form);

      toast.success('Task created');

      navigate('/tasks');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create task');
    }
  };

  return (
   <div className="max-w-2xl mx-auto crm-card p-8 relative">
<button
  type="button"
  onClick={() => navigate('/tasks')}
  className="
    absolute
    top-6
    right-6
    w-12
    h-12
    flex
    items-center
    justify-center
    rounded-2xl
    bg-[#0B1220]
    border
    border-white/10
    text-slate-400
    hover:text-white
    hover:border-cyan-400/20
    transition
  "
>
  <FiX size={20} />
</button>
      
     <h2 className="text-4xl font-black mb-10">
        Add Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
         className="w-full h-14 bg-[#0B1220] border border-white/10 rounded-2xl px-4"
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full bg-[#1a1a2e] border border-white/10 rounded-2xl px-4 py-3"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
         className=" w-full h-14 bg-cyan-400 text-[#041019] rounded-2xl font-semibold shadow-[0_0_25px_rgba(54,215,255,.25)] hover:scale-[1.01] transition">
          Create Task
        </button>
      </form>
    </div>
  );
}