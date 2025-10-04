// src/components/MessageBubble.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  const getBubbleStyle = () => {
    if (isSystem) return styles.systemBubble;
    return isUser ? styles.userBubble : styles.agentBubble;
  };

  const getTextStyle = () => {
    if (isSystem) return styles.systemText;
    return isUser ? styles.userText : styles.agentText;
  };

  const getIcon = () => {
    switch (message.type) {
      case 'user': return 'person';
      case 'agent': return 'person-circle'; // changed from 'robot' to a valid Ionicons name
      case 'system': return 'information';
      default: return 'chatbubble';
    }
  };

  if (isSystem) {
    return (
      <View style={styles.systemContainer}>
        <Ionicons name={getIcon()} size={14} color="#666" />
        <Text style={styles.systemText}>{message.content}</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.bubbleContainer,
      isUser ? styles.userContainer : styles.agentContainer
    ]}>
      <View style={styles.avatar}>
        <Ionicons 
          name={getIcon()} 
          size={16} 
          color={isUser ? '#007AFF' : '#4CAF50'} 
        />
      </View>
      <View style={[styles.bubble, getBubbleStyle()]}>
        <Text style={getTextStyle()}>{message.content}</Text>
        {message.attachments && message.attachments.length > 0 && (
          <View style={styles.attachments}>
            {message.attachments.map(attachment => (
              <View key={attachment.id} style={styles.attachment}>
                <Ionicons name="document-attach" size={14} color="#666" />
                <Text style={styles.attachmentText}>{attachment.name}</Text>
              </View>
            ))}
          </View>
        )}
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );
};

// src/components/MessageBubble.tsx - Updated styles
const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  agentContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 16,
    marginHorizontal: 6,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  systemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 12,
  },
  userText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  agentText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 20,
  },
  systemText: {
    color: '#666',
    fontSize: 13,
    marginLeft: 4,
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  attachments: {
    marginTop: 6,
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 5,
    borderRadius: 6,
    marginTop: 3,
  },
  attachmentText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  systemBubble: {
    backgroundColor: '#f5f5f5',
  },
});
export default MessageBubble;