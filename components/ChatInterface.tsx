// src/components/ChatInterface.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Agent, Message } from '../types';
import MessageBubble from './MessageBubble';

interface ChatInterfaceProps {
  messages: Message[];
  activeAgent: Agent | null;
  onExecuteTask: (task: string) => void;
  onPauseAgent: () => void;
  onStopTask: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  activeAgent,
  onExecuteTask,
  onPauseAgent,
  onStopTask,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const QuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => onExecuteTask('Analyze current conversation')}
      >
        <Ionicons name="rocket-outline" size={16} color="#fff" />
        <Text style={styles.actionText}>Execute Task</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.secondaryButton]}
        onPress={onPauseAgent}
      >
        <Ionicons name="pause-outline" size={16} color="#666" />
        <Text style={styles.secondaryActionText}>Pause</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.secondaryButton]}
        onPress={onStopTask}
      >
        <Ionicons name="stop-outline" size={16} color="#666" />
        <Text style={styles.secondaryActionText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {!activeAgent ? (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubble-ellipses-outline" size={56} color="#ccc" />
          <Text style={styles.emptyStateText}>
            Select an agent from the menu to start chatting
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
          />
          <QuickActions />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    flex: 1,
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    flex: 0.7,
  },
  actionText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  secondaryActionText: {
    color: '#666',
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ChatInterface;