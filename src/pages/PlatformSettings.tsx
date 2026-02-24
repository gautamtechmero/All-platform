import { useState } from 'react';
import { Youtube, Instagram, Facebook, Linkedin, Save, AlertCircle, Info } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';

export default function PlatformSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Platform Settings</h1>
          <p className="text-slate-500 text-sm">Configure global defaults and API behavior for each platform</p>
        </div>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Save className="w-4 h-4" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YouTube Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold">YouTube</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Default Privacy</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-primary-start">
                <option>Public</option>
                <option>Unlisted</option>
                <option>Private</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Video Category</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-primary-start">
                <option>Entertainment</option>
                <option>Education</option>
                <option>Gaming</option>
                <option>How-to & Style</option>
              </select>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 flex gap-3">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400">YouTube Shorts are automatically detected if the aspect ratio is 9:16 and duration is under 60s.</p>
            </div>
          </div>
        </Card>

        {/* Instagram Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-pink-500/10">
              <Instagram className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold">Instagram</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Default Post Type</label>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-primary-start/20 border border-primary-start/30 text-primary-start text-xs font-bold">REEL</button>
                <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold">POST</button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Account Status</label>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-sm text-slate-300">API Access Verified</span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 flex gap-3">
              <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400">Instagram requires a Facebook Business Page connection for API-based publishing.</p>
            </div>
          </div>
        </Card>

        {/* Facebook Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-600/10">
              <Facebook className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Facebook</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Default Page</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-primary-start">
                <option>Main Agency Page</option>
                <option>Client X Marketing</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary-start" defaultChecked />
              <span className="text-xs text-slate-400">Enable cross-posting from Instagram</span>
            </div>
          </div>
        </Card>

        {/* LinkedIn Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-400/10">
              <Linkedin className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">LinkedIn</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Post Visibility</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-primary-start">
                <option>Anyone</option>
                <option>Connections Only</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Organization Page</label>
              <Input placeholder="urn:li:organization:123456" className="bg-white/5" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
