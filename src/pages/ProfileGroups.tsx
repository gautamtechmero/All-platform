import { useState, useEffect } from 'react';
import { Plus, MoreVertical, HardDrive, Share2, AlertCircle, CheckCircle2, Pause, Play, Users, ExternalLink } from 'lucide-react';
import { Card, Button, Badge, cn } from '../components/UI';
import { ProfileGroup } from '../types';

export default function ProfileGroups() {
  const [groups, setGroups] = useState<ProfileGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/groups')
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Profile Groups</h1>
          <p className="text-slate-500 text-sm">Manage sets of social media accounts and their Drive sources</p>
        </div>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          New Group
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search groups..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-start"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none text-xs h-9 min-h-0">Filter</Button>
            <Button variant="outline" className="flex-1 sm:flex-none text-xs h-9 min-h-0">Export</Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-bold">Group Name</th>
                <th className="px-6 py-4 font-bold">Drive Source</th>
                <th className="px-6 py-4 font-bold">Platforms</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Last Sync</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">Loading groups...</td>
                </tr>
              ) : groups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">No groups found. Create one to get started.</td>
                </tr>
              ) : (
                groups.map((group) => (
                  <tr key={group.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-start/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary-start" />
                        </div>
                        <span className="font-medium">{group.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <HardDrive className="w-3 h-3" />
                        <span className="text-xs truncate max-w-[150px]">{group.driveFolderId}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 cursor-pointer" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0c] bg-slate-800 flex items-center justify-center overflow-hidden">
                            <Share2 className="w-3 h-3 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={group.isActive ? 'success' : 'warning'}>
                        {group.isActive ? 'Active' : 'Paused'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {group.lastSyncedAt ? new Date(group.lastSyncedAt).toLocaleString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-white/5">
          {loading ? (
            <div className="p-8 text-center text-slate-500 italic">Loading groups...</div>
          ) : groups.length === 0 ? (
            <div className="p-8 text-center text-slate-500 italic">No groups found.</div>
          ) : (
            groups.map((group) => (
              <div key={group.id} className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-start/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-start" />
                    </div>
                    <div>
                      <h4 className="font-bold">{group.name}</h4>
                      <p className="text-[10px] text-slate-500">Last sync: {group.lastSyncedAt ? new Date(group.lastSyncedAt).toLocaleDateString() : 'Never'}</p>
                    </div>
                  </div>
                  <Badge variant={group.isActive ? 'success' : 'warning'}>
                    {group.isActive ? 'Active' : 'Paused'}
                  </Badge>
                </div>
                
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 uppercase font-bold">Drive Source</span>
                    <span className="text-slate-300 truncate max-w-[150px]">{group.driveFolderId}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 uppercase font-bold">Platforms</span>
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-[#0a0a0c] bg-slate-800 flex items-center justify-center overflow-hidden">
                          <Share2 className="w-2.5 h-2.5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex-1 h-10 min-h-0 text-xs gap-2">
                    {group.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {group.isActive ? 'Pause' : 'Resume'}
                  </Button>
                  <Button variant="outline" className="w-10 h-10 min-h-0 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
