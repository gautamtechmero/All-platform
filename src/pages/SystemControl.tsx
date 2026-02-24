import { useState } from 'react';
import { Power, RefreshCw, Play, RotateCcw, Activity, ShieldAlert, Cpu, Database } from 'lucide-react';
import { Card, Button, Badge, cn } from '../components/UI';

export default function SystemControl() {
  const [isMasterOn, setIsMasterOn] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">System Control</h1>
          <p className="text-slate-500 text-sm">Master overrides and infrastructure health monitoring</p>
        </div>
        <div className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-full border transition-all w-full sm:w-auto justify-center",
          isMasterOn ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
        )}>
          <span className={cn("w-2 h-2 rounded-full animate-pulse", isMasterOn ? "bg-emerald-500" : "bg-red-500")} />
          <span className="text-sm font-bold uppercase tracking-wider">
            Automation {isMasterOn ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Master Controls</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary-start/10">
                    <Power className="w-6 h-6 text-primary-start" />
                  </div>
                  <button 
                    onClick={() => setIsMasterOn(!isMasterOn)}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all duration-300",
                      isMasterOn ? "bg-primary-start" : "bg-slate-700"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                      isMasterOn ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
                <div>
                  <h4 className="font-bold">Master Automation Toggle</h4>
                  <p className="text-xs text-slate-500 mt-1">Kill switch for all background workers and publishing jobs.</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-4">
                <div className="p-2 rounded-lg bg-blue-500/10 w-fit">
                  <RefreshCw className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold">Global Drive Scan</h4>
                  <p className="text-xs text-slate-500 mt-1">Force a full scan of all connected Google Drive folders immediately.</p>
                </div>
                <Button variant="outline" className="w-full text-xs py-1.5 min-h-0 h-9">Run Scan Now</Button>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 w-fit">
                  <Play className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold">Process Queue</h4>
                  <p className="text-xs text-slate-500 mt-1">Trigger the publishing worker to process all pending jobs now.</p>
                </div>
                <Button variant="outline" className="w-full text-xs py-1.5 min-h-0 h-9">Process Now</Button>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-4">
                <div className="p-2 rounded-lg bg-red-500/10 w-fit">
                  <RotateCcw className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold">Retry Failed Jobs</h4>
                  <p className="text-xs text-slate-500 mt-1">Automatically attempt to republish all jobs with 'Failed' status.</p>
                </div>
                <Button variant="outline" className="w-full text-xs py-1.5 min-h-0 h-9">Retry All</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">System Health</h3>
            <div className="space-y-4">
              {[
                { label: 'Background Worker', status: 'Online', icon: Cpu, color: 'text-emerald-500' },
                { label: 'Database Connection', status: 'Healthy', icon: Database, color: 'text-emerald-500' },
                { label: 'API Gateway', status: 'Operational', icon: Activity, color: 'text-emerald-500' },
                { label: 'Security Firewall', status: 'Active', icon: ShieldAlert, color: 'text-emerald-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <Badge variant="success">{item.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
            <h3 className="text-lg font-semibold text-red-500 mb-2">Safety Limits</h3>
            <p className="text-xs text-slate-400 mb-6">Automatic protection rules currently active.</p>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-black/20 border border-red-500/10">
                <p className="text-xs font-bold text-slate-300">Quota Protection</p>
                <p className="text-[10px] text-slate-500 mt-1">If YouTube API quota exceeds 90%, all publishing will pause automatically.</p>
              </div>
              <div className="p-3 rounded-lg bg-black/20 border border-red-500/10">
                <p className="text-xs font-bold text-slate-300">Spam Prevention</p>
                <p className="text-[10px] text-slate-500 mt-1">Maximum of 3 posts per hour per platform is enforced globally.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">API Performance</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Google Drive API</span>
                  <span className="text-slate-300">120ms avg</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[15%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">YouTube Data API</span>
                  <span className="text-slate-300">450ms avg</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Instagram Graph API</span>
                  <span className="text-slate-300">820ms avg</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[75%]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
