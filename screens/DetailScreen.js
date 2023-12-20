import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DetailScreen = ({ route }) => {
  const { hike } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {hike.name}</Text>
      <Text style={styles.title}>Location: {hike.location}</Text>
      <Text style={styles.title}>Date: {hike.date}</Text>
      <Text style={styles.title}>Parking: {hike.parking}</Text>
      <Text style={styles.title}>Length: {hike.length}</Text>
      <Text style={styles.title}>Level: {hike.level}</Text>
      <Text style={styles.description}>Description: {hike.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default DetailScreen;