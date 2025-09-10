import React from 'react';
import { TouchableOpacity, StyleSheet, Modal, ViewStyle } from 'react-native';
import { colors } from '../styles';

export interface ModalOverlayProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: 'none' | 'slide' | 'fade';
  presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  visible,
  onClose,
  children,
  style,
  animationType = 'none',
  presentationStyle = 'overFullScreen',
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}
      presentationStyle={presentationStyle}
    >
      <TouchableOpacity 
        style={[styles.overlay, style]} 
        activeOpacity={1} 
        onPress={onClose}
      >
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ModalOverlay;
