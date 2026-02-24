import { RefreshCw } from 'lucide-react';
import { cn } from '../components/UI';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Groups', value: '4', color: 'text-purple-400' },
          { label: 'Connected Channels', value: '12', color: 'text-blue-400' },
          { label: 'Pending Files', value: '28', color: 'text-orange-400' },
          { label: 'Scheduled Today', value: '8', color: 'text-indigo-400' },
          { label: 'Published Today', value: '15', color: 'text-emerald-400' },
          { label: 'Failed Jobs', value: '2', color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="card p-4 flex flex-col items-center justify-center text-center col-span-1 sm:col-span-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{stat.label}</span>
            <span className={cn("text-xl md:text-2xl font-bold", stat.color)}>{stat.value}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-xs text-slate-500 hover:text-white">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500">
                  <th className="pb-3 font-medium">File Name</th>
                  <th className="pb-3 font-medium">Group</th>
                  <th className="pb-3 font-medium">Platform</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02]">
                    <td className="py-4 font-medium">Video_Short_0{i+1}.mp4</td>
                    <td className="py-4 text-slate-400">Marketing Alpha</td>
                    <td className="py-4">
                      <div className="flex gap-1">
                        <span className="w-5 h-5 rounded bg-red-500/20 text-red-500 flex items-center justify-center text-[10px] font-bold">YT</span>
                        <span className="w-5 h-5 rounded bg-pink-500/20 text-pink-500 flex items-center justify-center text-[10px] font-bold">IG</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">Published</span>
                    </td>
                    <td className="py-4 text-slate-500">2h ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Run Global Drive Scan
              </button>
              <button className="w-full py-2 rounded-[10px] border border-white/10 text-slate-300 hover:bg-white/5 transition-all">
                Pause Automation
              </button>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <h2 className="text-lg font-semibold mb-2">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Automation Status</span>
                <span className="flex items-center gap-1.5 text-emerald-500 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Worker Status</span>
                <span className="text-sm text-slate-200">Idle</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">API Quota</span>
                <span className="text-sm text-slate-200">82% remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
