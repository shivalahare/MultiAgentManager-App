// src/components/Sidebar.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Agent } from '../types';
import CreateAgentModal from './CreateAgentModal';

interface SidebarProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent) => void;
  onClose: () => void;
  onCreateAgent: (name: string, type: 'research' | 'analysis' | 'creative') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  agents, 
  onAgentSelect, 
  onClose, 
  onCreateAgent 
}) => {
  const [createAgentVisible, setCreateAgentVisible] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'busy': return '#FF9800';
      case 'offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'research': return 'search';
      case 'analysis': return 'analytics';
      case 'creative': return 'color-palette';
      default: return 'robot';
    }
  };

  const handleCreateAgent = (name: string, type: 'research' | 'analysis' | 'creative') => {
    onCreateAgent(name, type);
    setCreateAgentVisible(false);
  };

  const renderAgentItem = ({ item }: { item: Agent }) => (
    <TouchableOpacity
      style={styles.agentItem}
      onPress={() => onAgentSelect(item)}
    >
      <View style={styles.agentInfo}>
        <View style={styles.agentIcon}>
          <Ionicons name={getAgentIcon(item.type)} size={20} color="#333" />
        </View>
        <View style={styles.agentDetails}>
          <Text style={styles.agentName}>{item.name}</Text>
          <Text style={styles.agentType}>{item.type} agent</Text>
        </View>
      </View>
      <View style={styles.agentStatus}>
        <View 
          style={[
            styles.statusDot,
            { backgroundColor: getStatusColor(item.status) }
          ]} 
        />
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const EmptyAgentsList = () => (
    <View style={styles.emptyState}>
      <Ionicons name="people-outline" size={48} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No Agents Yet</Text>
      <Text style={styles.emptyStateText}>
        Create your first AI agent to get started with task automation and assistance.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Agents</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      {agents.length === 0 ? (
        <EmptyAgentsList />
      ) : (
        <FlatList
          data={agents}
          keyExtractor={(item) => item.id}
          renderItem={renderAgentItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <TouchableOpacity 
        style={styles.newAgentButton}
        onPress={() => setCreateAgentVisible(true)}
      >
        <Ionicons name="add-circle" size={20} color="#007AFF" />
        <Text style={styles.newAgentText}>Create New Agent</Text>
      </TouchableOpacity>

      <CreateAgentModal
        visible={createAgentVisible}
        onClose={() => setCreateAgentVisible(false)}
        onCreateAgent={handleCreateAgent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 12,
  },
  agentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 6,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  agentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  agentType: {
    fontSize: 13,
    color: '#666',
    marginTop: 1,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#666',
    textTransform: 'capitalize',
  },
  newAgentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 'auto',
  },
  newAgentText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Sidebar;