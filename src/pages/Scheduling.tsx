import { useState } from 'react';
import { Calendar, Clock, Globe, Zap, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Button, Input } from '../components/UI';

export default function Scheduling() {
  const [maxUploads, setMaxUploads] = useState(5);
  const [timeGap, setTimeGap] = useState(60);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Scheduling</h1>
          <p className="text-slate-500 text-sm">Configure automation timing and distribution rules</p>
        </div>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Zap className="w-4 h-4" />
          Smart Scheduler
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Automation Rules</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Uploads Per Day</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={maxUploads} 
                    onChange={(e) => setMaxUploads(parseInt(e.target.value))}
                    className="flex-1 accent-primary-start"
                  />
                  <span className="w-8 text-center font-bold text-primary-start">{maxUploads}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Time Gap (Minutes)</label>
                <Input 
                  type="number" 
                  value={timeGap} 
                  onChange={(e) => setTimeGap(parseInt(e.target.value))}
                  className="bg-white/5"
                />
                <p className="text-[10px] text-slate-500">Minimum delay between posts to avoid spam filters.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Posting Hours</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="time" defaultValue="09:00" className="bg-white/5" />
                  <Input type="time" defaultValue="21:00" className="bg-white/5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Timezone</label>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <select className="bg-transparent text-sm w-full focus:outline-none">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                  </select>
                </div>
              </div>

              <Button className="w-full mt-4">Save Settings</Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">Preview Timeline</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500"><ChevronLeft className="w-5 h-5" /></button>
                <span className="text-xs sm:text-sm font-medium">Feb 24 - Feb 26, 2026</span>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                {[
                  { day: 'Tomorrow', date: 'Feb 24', posts: [
                    { time: '10:30 AM', title: 'Product Launch V1', group: 'Marketing Alpha' },
                    { time: '02:15 PM', title: 'Behind The Scenes', group: 'Marketing Alpha' }
                  ]},
                  { day: 'Wednesday', date: 'Feb 25', posts: [
                    { time: '09:00 AM', title: 'Customer Testimonial', group: 'Client Beta' }
                  ]},
                  { day: 'Thursday', date: 'Feb 26', posts: [] }
                ].map((day, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0a0a0c] border-2 border-primary-start flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-start" />
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-sm">{day.day}</h4>
                      <p className="text-xs text-slate-500">{day.date}</p>
                    </div>
                    
                    <div className="space-y-3">
                      {day.posts.length > 0 ? (
                        day.posts.map((post, j) => (
                          <div key={j} className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-primary-start/30 transition-all gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col items-center justify-center w-12 text-center shrink-0">
                                <Clock className="w-3 h-3 text-slate-500 mb-1" />
                                <span className="text-[10px] font-bold text-slate-300">{post.time.split(' ')[0]}</span>
                                <span className="text-[8px] text-slate-500 uppercase">{post.time.split(' ')[1]}</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{post.title}</p>
                                <p className="text-[10px] text-slate-500">{post.group}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-all w-full sm:w-auto justify-end">
                              <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400"><Calendar className="w-4 h-4" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400"><List className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 border border-dashed border-white/10 rounded-lg text-center">
                          <p className="text-xs text-slate-600 italic">No posts scheduled</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
