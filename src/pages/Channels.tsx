import { useState, useEffect } from 'react';
import { Plus, Youtube, Instagram, Facebook, Linkedin, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { Channel } from '../types';

export default function Channels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/channels')
      .then(res => res.json())
      .then(data => {
        setChannels(data);
        setLoading(false);
      });
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube': return <Youtube className="w-5 h-5 text-red-500" />;
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'Facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'LinkedIn': return <Linkedin className="w-5 h-5 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Channels</h1>
          <p className="text-slate-500 text-sm">Manage your social media account connections</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Channel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loading ? (
          [1, 2, 3].map(i => <Card key={i} className="h-40 animate-pulse bg-white/5" />)
        ) : channels.length === 0 ? (
          <div className="col-span-full py-20 text-center card">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Share2 className="w-8 h-8 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No Channels Connected</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-1">Connect your social media accounts to start automating your content delivery.</p>
              </div>
              <Button className="mt-2">Connect Your First Channel</Button>
            </div>
          </div>
        ) : (
          channels.map(channel => (
            <Card key={channel.id} className="group relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    {getPlatformIcon(channel.platform)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{channel.name}</h3>
                    <p className="text-xs text-slate-500">{channel.platform}</p>
                  </div>
                </div>
                <Badge variant={channel.status === 'Connected' ? 'success' : 'error'}>
                  {channel.status}
                </Badge>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Token Status</span>
                  <span className="text-emerald-500 font-medium">Valid</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Last Used</span>
                  <span className="text-slate-300">2 hours ago</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all">
                <Button variant="outline" className="flex-1 py-1.5 text-xs">
                  <RefreshCw className="w-3 h-3" />
                  Reconnect
                </Button>
                <Button variant="danger" className="p-1.5">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
      
      {channels.some(c => c.status === 'Expired') && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm font-medium">Some channels have expired tokens. Please reconnect them to resume automation.</p>
        </div>
      )}
    </div>
  );
}

import { Share2 } from 'lucide-react';
