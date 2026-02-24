export type Platform = 'YouTube' | 'Instagram' | 'Facebook' | 'LinkedIn';

export type Status = 'Pending' | 'Scheduled' | 'Uploading' | 'Published' | 'Failed' | 'Ignored';

export interface Channel {
  id: string;
  name: string;
  platform: Platform;
  status: 'Connected' | 'Expired' | 'Error';
}

export interface ProfileGroup {
  id: string;
  name: string;
  driveFolderId: string;
  recursiveScan: boolean;
  sheetId?: string;
  scheduleRule: string;
  uploadLimit: number;
  status: 'Active' | 'Error' | 'Paused' | 'Incomplete';
  channelIds: string[];
}

export interface ContentItem {
  id: string;
  fileId: string;
  fileName: string;
  groupId: string;
  title: string;
  status: Status;
  scheduledTime?: number;
  publishedLinks: Record<string, string>;
}

export interface DashboardStats {
  totalGroups: number;
  totalChannels: number;
  pendingFiles: number;
  scheduledToday: number;
  publishedToday: number;
  failedJobs: number;
}

export interface LogEntry {
  id: number;
  timestamp: number;
  groupId?: string;
  platform?: string;
  fileName?: string;
  action: string;
  status: string;
  message: string;
}
