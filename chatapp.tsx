// chatapp.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ChatMessageType = {
  id: string;
  text: string;
  createdAt: string;
  isOwn: boolean;
};

export default function ChatApp() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [text, setText] = useState("");

  // ✅ Load saved messages on app start
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const stored = await AsyncStorage.getItem("messages");
        if (stored) {
          setMessages(JSON.parse(stored));
        }
      } catch (e) {
        console.log("Failed to load messages", e);
      }
    };
    loadMessages();
  }, []);

  // ✅ Save messages to AsyncStorage
  const saveMessages = async (msgs: ChatMessageType[]) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(msgs));
    } catch (e) {
      console.log("Failed to save messages", e);
    }
  };

  // ✅ Send a message
  const send = async () => {
    if (!text.trim()) return;

    const msg: ChatMessageType = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      isOwn: true,
    };

    const next = [...messages, msg];
    setMessages(next);
    setText("");
    await saveMessages(next);
  };

  // ✅ Clear chat history
  const handleClear = async () => {
    await AsyncStorage.removeItem("messages");
    setMessages([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.isOwn ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
        />

        <Pressable style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>

        <Pressable style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: "80%",
  },

  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },

  otherMessage: {
    backgroundColor: "#EEE",
    alignSelf: "flex-start",
  },

  messageText: { fontSize: 16 },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },

  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  sendText: { color: "#fff", fontWeight: "bold" },

  clearBtn: {
    marginLeft: 8,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  clearText: { color: "#fff", fontWeight: "bold" },
});
