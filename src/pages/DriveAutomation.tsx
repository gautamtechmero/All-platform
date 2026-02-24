import { useState, useEffect } from 'react';
import { HardDrive, RefreshCw, CheckCircle2, AlertCircle, Clock, Search, Play } from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/UI';

export default function DriveAutomation() {
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setScans([
      {
        id: '1',
        groupName: 'Marketing Alpha',
        folderName: 'Social_Media_Assets',
        lastScan: '10 minutes ago',
        filesFound: 142,
        newFiles: 3,
        status: 'Scanning'
      },
      {
        id: '2',
        groupName: 'Client Beta',
        folderName: 'Client_Uploads',
        lastScan: '2 hours ago',
        filesFound: 56,
        newFiles: 0,
        status: 'Idle'
      }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Drive Automation</h1>
          <p className="text-slate-500 text-sm">Monitor and trigger Google Drive folder scans</p>
        </div>
        <Button className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Global Scan
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Desktop Table View */}
        <Card className="p-0 overflow-hidden hidden md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 bg-white/[0.02]">
                <th className="px-6 py-4 font-medium">Profile Group</th>
                <th className="px-6 py-4 font-medium">Drive Folder</th>
                <th className="px-6 py-4 font-medium">Last Scan</th>
                <th className="px-6 py-4 font-medium">Files Found</th>
                <th className="px-6 py-4 font-medium">New Files</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [1, 2].map(i => <tr key={i} className="animate-pulse"><td colSpan={7} className="px-6 py-8"><div className="h-4 bg-white/5 rounded w-full" /></td></tr>)
              ) : (
                scans.map(scan => (
                  <tr key={scan.id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-6 py-4 font-medium">{scan.groupName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <HardDrive className="w-4 h-4" />
                        <span>{scan.folderName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{scan.lastScan}</td>
                    <td className="px-6 py-4 text-slate-400">{scan.filesFound}</td>
                    <td className="px-6 py-4">
                      {scan.newFiles > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-primary-start/20 text-primary-start text-[10px] font-bold">
                          +{scan.newFiles} NEW
                        </span>
                      ) : (
                        <span className="text-slate-600">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {scan.status === 'Scanning' ? (
                          <div className="flex items-center gap-2 text-blue-400">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span className="text-xs font-medium">Scanning...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">Idle</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" className="text-xs py-1 px-3">
                        <Play className="w-3 h-3 mr-1" />
                        Scan Now
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {loading ? (
            [1, 2].map(i => <Card key={i} className="h-32 animate-pulse bg-white/5" />)
          ) : (
            scans.map(scan => (
              <Card key={scan.id} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{scan.groupName}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                      <HardDrive className="w-3 h-3" />
                      <span>{scan.folderName}</span>
                    </div>
                  </div>
                  {scan.status === 'Scanning' ? (
                    <Badge variant="info">Scanning</Badge>
                  ) : (
                    <Badge variant="default">Idle</Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Files Found</p>
                    <p className="text-xs text-slate-300 mt-1">{scan.filesFound}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">New Files</p>
                    <p className="text-xs text-slate-300 mt-1">
                      {scan.newFiles > 0 ? (
                        <span className="text-primary-start font-bold">+{scan.newFiles}</span>
                      ) : "0"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Last Scan: {scan.lastScan}</span>
                  <Button variant="outline" className="text-xs py-1 px-3 min-h-0 h-8">
                    <Play className="w-3 h-3 mr-1" />
                    Scan Now
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Scan Behavior</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-400">Automatically discover new media files (MP4, MOV, JPG, PNG).</p>
            </li>
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-400">Deduplication based on Google Drive File ID to prevent double posting.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-400">Auto-assignment to the linked Profile Group for immediate queueing.</p>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Common Errors</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-500">Folder Not Found</p>
                <p className="text-xs text-slate-500">Ensure the Folder ID is correct and the service account has access.</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-500">OAuth Expired</p>
                <p className="text-xs text-slate-500">Reconnect your Google account in the Channels page.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
