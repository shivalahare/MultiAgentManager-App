// src/types/index.ts
export interface Agent {
  id: string;
  name: string;
  status: 'online' | 'busy' | 'offline';
  type: 'research' | 'analysis' | 'creative';
  lastActive: Date;
}

export interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'document' | 'image' | 'data' | 'video';
  uri: string;
  size: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedAgent: string;
  createdAt: Date;
}