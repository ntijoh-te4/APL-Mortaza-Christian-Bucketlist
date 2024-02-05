import React from "react";
import { Modal, View, Text, Pressable, Button, StyleSheet } from "react-native";

interface IAction {
  title: string;
  icon: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  actions: IAction[];
  popupTitle: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  actions,
  popupTitle,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popupStyle}>
          <Text style={styles.popupTitle}>{popupTitle}</Text>
          {actions.map((action: IAction) => (
            <Pressable key={action.title}>
              <span className="material-symbols-outlined">{action.icon}</span>
              <Text>{action.title}</Text>
            </Pressable>
          ))}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupTitle: {
    fontSize: 32,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Popup;
