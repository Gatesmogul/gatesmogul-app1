// components/UserCard.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export interface User {
  picture?: { large: string };
  name?: { first: string; last: string };
  email?: string;
  phone?: string;
}

export default function UserCard({ user }: { user: User }) {
  const avatarUrl =
    user?.picture?.large || "https://via.placeholder.com/80";

  const fullName =
    user?.name
      ? `${user.name.first} ${user.name.last}`
      : "Loading name...";

  return (
    <View style={styles.card}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{user?.email || "Elon Musk"}</Text>
        <Text style={styles.phone}>{user?.phone || "+1864539089"}</Text>
      </View>
    </View>
  );
}





const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: "#eee",
  },

  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#222",
  },

  email: {
    fontSize: 14,
    color: "#555",
  },

  phone: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});
