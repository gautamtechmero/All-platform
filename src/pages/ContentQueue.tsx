import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronRight,
  Play,
  RotateCcw,
  EyeOff
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/UI';
import { ContentItem, Status } from '../types';

export default function ContentQueue() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    // Mock data for now
    const mockItems: ContentItem[] = [
      {
        id: '1',
        fileId: 'drive_1',
        fileName: 'Product_Launch_V1.mp4',
        groupId: 'group_1',
        title: 'Our new product is finally here!',
        status: 'Scheduled',
        scheduledTime: Date.now() + 86400000,
        publishedLinks: {}
      },
      {
        id: '2',
        fileId: 'drive_2',
        fileName: 'Behind_The_Scenes.mov',
        groupId: 'group_1',
        title: 'How we built the team',
        status: 'Published',
        publishedLinks: {
          'YouTube': 'https://youtube.com/watch?v=123',
          'Instagram': 'https://instagram.com/p/456'
        }
      },
      {
        id: '3',
        fileId: 'drive_3',
        fileName: 'Customer_Testimonial.mp4',
        groupId: 'group_2',
        title: 'What our clients say',
        status: 'Failed',
        publishedLinks: {}
      }
    ];
    setItems(mockItems);
    setLoading(false);
  }, []);

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'Pending': return <Badge variant="warning">Pending</Badge>;
      case 'Scheduled': return <Badge variant="info">Scheduled</Badge>;
      case 'Uploading': return <Badge variant="info">Uploading</Badge>;
      case 'Published': return <Badge variant="success">Published</Badge>;
      case 'Failed': return <Badge variant="error">Failed</Badge>;
      case 'Ignored': return <Badge variant="default">Ignored</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Queue</h1>
          <p className="text-slate-500 text-sm">Manage discovered files and publishing status</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" className="text-[10px] flex-1 sm:flex-none">Bulk Schedule</Button>
          <Button variant="outline" className="text-[10px] flex-1 sm:flex-none">Bulk Publish</Button>
          <Button className="text-[10px] flex-1 sm:flex-none">Bulk Retry</Button>
        </div>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="Search content..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 sm:px-3 py-2">
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="flex-1 sm:px-3 py-2">
            <Calendar className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Date</span>
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        {loading ? (
          [1, 2, 3].map(i => <Card key={i} className="h-20 animate-pulse" />)
        ) : (
          items.map(item => (
            <div key={item.id} className="space-y-1">
              <Card 
                className={cn(
                  "p-0 overflow-hidden group transition-all cursor-pointer",
                  expandedId === item.id && "ring-1 ring-primary-start"
                )}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-4 sm:px-6 py-4 gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="text-slate-600 shrink-0">
                      {expandedId === item.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium truncate max-w-[150px] sm:max-w-none">{item.fileName}</h3>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{item.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-auto">
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="text-[10px] text-slate-400">Marketing Alpha</span>
                      <div className="flex gap-1">
                        <span className="w-4 h-4 rounded bg-red-500/20 text-red-500 flex items-center justify-center text-[8px] font-bold">YT</span>
                        <span className="w-4 h-4 rounded bg-pink-500/20 text-pink-500 flex items-center justify-center text-[8px] font-bold">IG</span>
                      </div>
                    </div>
                    
                    <div className="w-24 sm:w-32 text-right">
                      {item.scheduledTime ? (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] sm:text-xs text-slate-300 font-medium whitespace-nowrap">Tomorrow</span>
                          <span className="text-[8px] sm:text-[10px] text-slate-500">10:30 AM</span>
                        </div>
                      ) : (
                        <span className="text-[10px] sm:text-xs text-slate-500 italic">Not scheduled</span>
                      )}
                    </div>
                    
                    <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
              
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/[0.02] border-x border-b border-white/5 rounded-b-[10px] p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Content Details</h4>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-500 uppercase font-bold">Title</label>
                              <Input defaultValue={item.title} className="bg-white/5" />
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" className="flex-1 text-xs py-1.5">
                                <Calendar className="w-3 h-3" />
                                Schedule
                              </Button>
                              <Button className="flex-1 text-xs py-1.5">
                                <Play className="w-3 h-3" />
                                Publish Now
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Platform Status</h4>
                          <div className="space-y-2">
                            {['YouTube', 'Instagram', 'Facebook', 'LinkedIn'].map(platform => (
                              <div key={platform} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-medium">{platform}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {item.publishedLinks[platform] ? (
                                    <>
                                      <Badge variant="success">Published</Badge>
                                      <a href={item.publishedLinks[platform]} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white">
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </>
                                  ) : item.status === 'Failed' ? (
                                    <>
                                      <Badge variant="error">Failed</Badge>
                                      <button className="text-slate-500 hover:text-white">
                                        <RotateCcw className="w-4 h-4" />
                                      </button>
                                    </>
                                  ) : (
                                    <Badge variant="warning">Pending</Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <Button variant="outline" className="text-xs py-1.5 text-slate-400">
                          <EyeOff className="w-3 h-3" />
                          Ignore File
                        </Button>
                        <Button variant="danger" className="text-xs py-1.5">
                          Delete Record
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { cn } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
