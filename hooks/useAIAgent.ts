// src/hooks/useAIAgent.ts
import { useCallback, useState } from 'react';
import { Agent, Attachment, Message } from '../types';

export const useAIAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to AI Agent Manager! Select an agent to start.',
      timestamp: new Date(),
    },
  ]);

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Research Assistant',
      status: 'online',
      type: 'research',
      lastActive: new Date(),
    },
    {
      id: '2',
      name: 'Data Analyst',
      status: 'busy',
      type: 'analysis',
      lastActive: new Date(),
    },
    {
      id: '3',
      name: 'Creative Writer',
      status: 'online',
      type: 'creative',
      lastActive: new Date(),
    },
  ]);

  const createAgent = useCallback((name: string, type: 'research' | 'analysis' | 'creative') => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name,
      status: 'online',
      type,
      lastActive: new Date(),
    };
    
    setAgents(prev => [...prev, newAgent]);
    
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `New agent "${name}" created successfully!`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, systemMessage]);
    
    return newAgent;
  }, []);

  const sendMessage = useCallback((content: string, attachments?: Attachment[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate agent response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `I received your message: "${content}". I'm processing your request...`,
        timestamp: new Date(),
        agentId: '1',
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  }, []);

  const executeTask = useCallback((task: string) => {
    const taskMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `Executing task: ${task}`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, taskMessage]);
  }, []);

  const pauseAgent = useCallback(() => {
    const pauseMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: 'Agent paused',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, pauseMessage]);
  }, []);

  const stopTask = useCallback(() => {
    const stopMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: 'Task stopped',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, stopMessage]);
  }, []);

  const attachFile = useCallback((attachment: Attachment) => {
    const attachMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `Attached file: ${attachment.name}`,
      timestamp: new Date(),
      attachments: [attachment],
    };
    setMessages(prev => [...prev, attachMessage]);
  }, []);

  return {
    messages,
    agents,
    createAgent,
    sendMessage,
    executeTask,
    pauseAgent,
    stopTask,
    attachFile,
  };
};