// src/components/CreateAgentModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

interface CreateAgentModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateAgent: (name: string, type: 'research' | 'analysis' | 'creative') => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  visible,
  onClose,
  onCreateAgent
}) => {
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentType, setNewAgentType] = useState<'research' | 'analysis' | 'creative'>('research');

  // src/components/CreateAgentModal.tsx - Just update the handleCreate function
  const handleCreate = () => {
    if (newAgentName.trim()) {
      onCreateAgent(newAgentName.trim(), newAgentType);
      setNewAgentName('');
      setNewAgentType('research');
      Keyboard.dismiss();
    }
  };

  const handleClose = () => {
    setNewAgentName('');
    setNewAgentType('research');
    onClose();
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Create New Agent</Text>
                  <TouchableOpacity 
                    onPress={handleClose}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Text style={styles.inputLabel}>Agent Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newAgentName}
                    onChangeText={setNewAgentName}
                    placeholder="Enter agent name"
                    placeholderTextColor="#999"
                    autoFocus={true}
                    onSubmitEditing={handleCreate}
                    returnKeyType="done"
                    blurOnSubmit={false}
                  />

                  <Text style={styles.inputLabel}>Agent Type</Text>
                  <View style={styles.typeOptions}>
                    <TouchableOpacity 
                      style={[
                        styles.typeOption,
                        newAgentType === 'research' && styles.typeOptionActive
                      ]}
                      onPress={() => setNewAgentType('research')}
                    >
                      <Ionicons 
                        name="search" 
                        size={20} 
                        color={newAgentType === 'research' ? '#fff' : '#666'} 
                      />
                      <Text style={[
                        styles.typeOptionText,
                        newAgentType === 'research' && styles.typeOptionTextActive
                      ]}>
                        Research
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[
                        styles.typeOption,
                        newAgentType === 'analysis' && styles.typeOptionActive
                      ]}
                      onPress={() => setNewAgentType('analysis')}
                    >
                      <Ionicons 
                        name="analytics" 
                        size={20} 
                        color={newAgentType === 'analysis' ? '#fff' : '#666'} 
                      />
                      <Text style={[
                        styles.typeOptionText,
                        newAgentType === 'analysis' && styles.typeOptionTextActive
                      ]}>
                        Analysis
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[
                        styles.typeOption,
                        newAgentType === 'creative' && styles.typeOptionActive
                      ]}
                      onPress={() => setNewAgentType('creative')}
                    >
                      <Ionicons 
                        name="color-palette" 
                        size={20} 
                        color={newAgentType === 'creative' ? '#fff' : '#666'} 
                      />
                      <Text style={[
                        styles.typeOptionText,
                        newAgentType === 'creative' && styles.typeOptionTextActive
                      ]}>
                        Creative
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity 
                    style={[
                      styles.createButton,
                      !newAgentName.trim() && styles.createButtonDisabled
                    ]}
                    onPress={handleCreate}
                    disabled={!newAgentName.trim()}
                  >
                    <Text style={styles.createButtonText}>Create Agent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    // Modal body styles
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  typeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  typeOptionActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeOptionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  typeOptionTextActive: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateAgentModal;