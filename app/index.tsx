// src/App.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Sidebar from '../components/Sidebar';
import { useAIAgent } from '../hooks/useAIAgent';
import { Agent } from '../types';

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  
  const {
    messages,
    agents,
    createAgent,
    sendMessage,
    executeTask,
    pauseAgent,
    stopTask,
    attachFile
  } = useAIAgent();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAgentSelect = (agent: Agent) => {
    setActiveAgent(agent);
    setSidebarVisible(false);
  };

  const handleCreateAgent = (name: string, type: 'research' | 'analysis' | 'creative') => {
    const newAgent = createAgent(name, type);
    setActiveAgent(newAgent);
    setSidebarVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#fff" />
      
      <Header 
        onMenuPress={toggleSidebar}
        activeAgent={activeAgent}
      />
      
      <View style={styles.mainContent}>
        {sidebarVisible ? (
          <Sidebar
            agents={agents}
            onAgentSelect={handleAgentSelect}
            onClose={toggleSidebar}
            onCreateAgent={handleCreateAgent}
          />
        ) : (
          <View style={styles.chatSection}>
            <ChatInterface 
              messages={messages}
              activeAgent={activeAgent}
              onExecuteTask={executeTask}
              onPauseAgent={pauseAgent}
              onStopTask={stopTask}
            />
            
            <MessageInput
              onSendMessage={sendMessage}
              onAttachFile={attachFile}
              disabled={!activeAgent}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
  },
  chatSection: {
    flex: 1,
  },
});