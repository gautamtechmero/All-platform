import { useState, useEffect } from 'react';
import { Search, Filter, Download, Trash2, AlertCircle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/UI';
import { LogEntry } from '../types';

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockLogs: LogEntry[] = [
      { id: 1, timestamp: Date.now() - 300000, groupId: 'group_1', platform: 'YouTube', fileName: 'Launch.mp4', action: 'Publish', status: 'Success', message: 'Successfully uploaded to YouTube' },
      { id: 2, timestamp: Date.now() - 600000, groupId: 'group_1', platform: 'Instagram', fileName: 'Launch.mp4', action: 'Publish', status: 'Error', message: 'API Rate limit exceeded' },
      { id: 3, timestamp: Date.now() - 900000, groupId: 'group_2', platform: 'LinkedIn', fileName: 'Post.png', action: 'Scan', status: 'Success', message: 'New file discovered in Drive' },
    ];
    setLogs(mockLogs);
    setLoading(false);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Warning': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">System Logs</h1>
          <p className="text-slate-500 text-sm">Detailed history of all automation actions and errors</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 text-xs">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="danger" className="flex-1 sm:flex-none items-center gap-2 text-xs">
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="Search logs..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 sm:px-3 py-2 text-xs">
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">All Events</span>
            <span className="sm:hidden">Filter</span>
          </Button>
          <Button variant="outline" className="flex-1 sm:px-3 py-2 text-xs">
            <AlertCircle className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Errors Only</span>
            <span className="sm:hidden">Errors</span>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {/* Desktop Table View */}
        <Card className="p-0 overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 bg-white/[0.02]">
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                  <th className="px-6 py-4 font-medium">Group</th>
                  <th className="px-6 py-4 font-medium">Platform</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={6} className="px-6 py-6"><div className="h-4 bg-white/5 rounded w-full" /></td></tr>)
                ) : (
                  logs.map(log => (
                    <tr key={log.id} className="hover:bg-white/[0.01] transition-all">
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-300">{log.groupId || '-'}</td>
                      <td className="px-6 py-4">
                        {log.platform ? (
                          <Badge variant="info">{log.platform}</Badge>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 font-medium">{log.action}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className={cn(
                            "text-xs font-bold uppercase",
                            log.status === 'Success' ? 'text-emerald-500' : 'text-red-500'
                          )}>
                            {log.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 max-w-md truncate">
                        {log.message}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {loading ? (
            [1, 2].map(i => <Card key={i} className="h-24 animate-pulse bg-white/5" />)
          ) : (
            logs.map(log => (
              <Card key={log.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(log.status)}
                    <span className={cn(
                      "text-[10px] font-bold uppercase",
                      log.status === 'Success' ? 'text-emerald-500' : 'text-red-500'
                    )}>
                      {log.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-sm text-slate-300 leading-relaxed">{log.message}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Group:</span>
                    <span className="text-[10px] text-slate-400">{log.groupId || '-'}</span>
                  </div>
                  {log.platform && <Badge variant="info">{log.platform}</Badge>}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import { cn } from '../components/UI';
import { Badge as UIBadge } from '../components/UI';
