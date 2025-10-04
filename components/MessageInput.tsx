// src/components/MessageInput.tsx
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Attachment } from '../types';

interface MessageInputProps {
  onSendMessage: (message: string, attachments?: Attachment[]) => void;
  onAttachFile: (attachment: Attachment) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onAttachFile,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const attachment: Attachment = {
          id: Date.now().toString(),
          name: file.name || 'Unknown file',
          type: 'document',
          uri: file.uri,
          size: file.size || 0,
        };
        onAttachFile(attachment);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        const attachment: Attachment = {
          id: Date.now().toString(),
          name: 'image.jpg',
          type: 'image',
          uri: image.uri,
          size: 0,
        };
        onAttachFile(attachment);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={pickDocument}
          disabled={disabled}
        >
          <Ionicons 
            name="attach" 
            size={22} 
            color={disabled ? '#ccc' : '#666'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={pickImage}
          disabled={disabled}
        >
          <Ionicons 
            name="image" 
            size={22} 
            color={disabled ? '#ccc' : '#666'} 
          />
        </TouchableOpacity>
        
        <TextInput
          style={[
            styles.textInput,
            disabled && styles.disabledInput
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder={disabled ? "Select an agent to start chatting" : "Type your message..."}
          placeholderTextColor="#999"
          multiline
          maxLength={1000}
          editable={!disabled}
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!message.trim() || disabled) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!message.trim() || disabled}
        >
          <Ionicons 
            name="send" 
            size={18} 
            color={(!message.trim() || disabled) ? '#ccc' : '#fff'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 44,
  },
  attachButton: {
    padding: 6,
    marginRight: 4,
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 80,
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlignVertical: 'center',
    marginHorizontal: 4,
  },
  disabledInput: {
    color: '#999',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

export default MessageInput;