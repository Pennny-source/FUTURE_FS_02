import { useState, useEffect } from 'react';
import { FiPlus, FiClock, FiCheck } from 'react-icons/fi';
import { taskService } from '../services/taskService';
import { useNavigate } from 'react-router-dom';


const columns = ['todo', 'inProgress', 'done'];
const columnTitles = { todo: 'To Do', inProgress: 'In Progress', done: 'Done' };

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: []});
      const updateTaskStatus = async (taskId, newStatus) => {
  try {
    await taskService.update(taskId, {
      status: newStatus
    });

    loadTasks();
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
  loadTasks();
}, []);

const loadTasks = async () => {
  try {

    const res = await taskService.getAll();

    console.log('TASKS FROM API:', res.data);

    const grouped = {
      todo: [],
      inProgress: [],
      done: []
    };
    

    res.data.forEach(task => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    setTasks(grouped);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <button onClick={() => navigate('/add-task')}className=" px-6 h-12 bg-cyan-400 text-[#041019] rounded-2xl font-semibold shadow-[0_0_25px_rgba(54,215,255,.25)] transition"> + Add Task</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col} className="crm-card p-6 rounded-[32px]">
            <div className="mb-6">
               <span className="  px-4  py-2 rounded-2xl  bg-cyan-500/10 border  border-cyan-400/20 text-cyan-300  text-sm  font-medium  " > {columnTitles[col]} </span>
                        </div>
            <div className="space-y-3">
              {tasks[col].map(task => (
            <div key={task._id} className="  bg-[#0B1220]  p-4  rounded-[24px]  border  border-white/10  hover:border-cyan-400/20  transition ">
                
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="mt-3">
                 <select
                    value={task.status}
                     onChange={(e) =>
                       updateTaskStatus(task._id, e.target.value)
                       }
                        className=" w-full h-11 bg-[#101826] border border-white/10 rounded-2xl px-3 text-sm text-white">
                           <option value="todo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                           </select>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <FiClock size={14} />
                    <span>
                   {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : 'No deadline'}
                   </span>
                    <span className={`ml-auto px-1.5 py-0.5 rounded-full text-xs ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>{task.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}