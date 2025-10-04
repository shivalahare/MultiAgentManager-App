// src/components/Header.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Agent } from '../types';

interface HeaderProps {
  onMenuPress: () => void;
  activeAgent: Agent | null;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress, activeAgent }) => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'busy': return '#FF9800';
      case 'offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const SettingsModal = () => (
    <Modal
      visible={settingsVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSettingsVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Settings</Text>
            <TouchableOpacity 
              onPress={() => setSettingsVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <TouchableOpacity style={styles.toggle}>
                <View style={styles.toggleThumb} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Auto-save Conversations</Text>
              <TouchableOpacity style={[styles.toggle, styles.toggleActive]}>
                <View style={[styles.toggleThumb, styles.toggleThumbActive]} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Voice Commands</Text>
              <TouchableOpacity style={styles.toggle}>
                <View style={styles.toggleThumb} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <TouchableOpacity style={styles.toggle}>
                <View style={styles.toggleThumb} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsButtonText}>Agent Preferences</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsButtonText}>Privacy & Security</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsButtonText}>About</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const ProfileModal = () => (
    <Modal
      visible={profileVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setProfileVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Profile</Text>
            <TouchableOpacity 
              onPress={() => setProfileVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.profileSection}>
              <View style={styles.avatarLarge}>
                <Ionicons name="person" size={40} color="#666" />
              </View>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@example.com</Text>
            </View>

            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.profileButtonText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="key-outline" size={20} color="#333" />
              <Text style={styles.profileButtonText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="notifications-outline" size={20} color="#333" />
              <Text style={styles.profileButtonText}>Notification Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="card-outline" size={20} color="#333" />
              <Text style={styles.profileButtonText}>Billing & Subscription</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.profileButton, styles.logoutButton]}>
              <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
              <Text style={[styles.profileButtonText, styles.logoutText]}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.headerContent}>
        <Text style={styles.title}>AI Agent Manager</Text>
        {activeAgent && (
          <View style={styles.agentStatus}>
            <View 
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(activeAgent.status) }
              ]} 
            />
            <Text style={styles.agentName}>{activeAgent.name}</Text>
            <Text style={styles.agentType}>({activeAgent.type})</Text>
          </View>
        )}
      </View>
      
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Ionicons name="settings-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setProfileVisible(true)}
        >
          <Ionicons name="person-circle-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <SettingsModal />
      <ProfileModal />
    </View>
  );
};

// src/components/Header.tsx - Updated styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  agentName: {
    fontSize: 11,
    color: '#666',
    marginRight: 3,
  },
  agentType: {
    fontSize: 11,
    color: '#999',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 6,
  },
  // ... rest of modal styles remain the same
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    padding: 20,
  },
  // Settings Styles
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#007AFF',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#333',
  },
  // Profile Styles
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ff3b30',
  },
});

export default Header;