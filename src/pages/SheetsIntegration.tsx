import { useState } from 'react';
import { Table, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, Settings2, FileSpreadsheet } from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/UI';

export default function SheetsIntegration() {
  const [sheetId, setSheetId] = useState('1A2B3C4D5E6F7G8H9I0J');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sheets Integration</h1>
          <p className="text-slate-500 text-sm">Sync automation data with external Google Sheets</p>
        </div>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <RefreshCw className="w-4 h-4" />
          Sync Now
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Connection Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Google Sheet ID</label>
                <Input 
                  value={sheetId} 
                  onChange={(e) => setSheetId(e.target.value)}
                  className="bg-white/5 font-mono text-xs"
                />
                <p className="text-[10px] text-slate-500">Found in the URL of your Google Sheet.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Tab Name</label>
                <Input defaultValue="Automation_Logs" className="bg-white/5" />
              </div>

              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full text-xs h-9 min-h-0">
                  <Settings2 className="w-3 h-3" />
                  Auto Fix Structure
                </Button>
                <Button className="w-full">Save Configuration</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-emerald-500/5 border-emerald-500/10">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-500">Sheet Connected</h4>
                <p className="text-xs text-slate-400 mt-1">Latest sync was successful. 154 rows detected.</p>
                <button className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-3 hover:underline">
                  Open Sheet
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sheet Structure</h3>
            <p className="text-sm text-slate-400 mb-6">The system expects the following columns in your sheet. If they are missing, use the "Auto Fix Structure" button.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Date', desc: 'Timestamp of the action' },
                { name: 'File Name', desc: 'Original name from Drive' },
                { name: 'Title', desc: 'Published post title' },
                { name: 'Group', desc: 'Profile Group name' },
                { name: 'Platform', desc: 'Social media platform' },
                { name: 'Status', desc: 'Current publishing status' },
                { name: 'Link', desc: 'Direct URL to the post' }
              ].map((col, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-200">{col.name}</p>
                    <p className="text-[10px] text-slate-500">{col.desc}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Conflict Resolution</h3>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 flex gap-4">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300">Latest Edited Value Wins</p>
                <p className="text-xs text-slate-500 mt-1">If you edit a title in the Google Sheet, it will automatically update in the system queue during the next sync.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
