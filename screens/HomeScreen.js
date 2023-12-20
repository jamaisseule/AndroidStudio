import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
      } catch (error) {
        console.log("Error fetching hikes", error);
      }
    };

    fetchData();
  }, [isFocused]);


const handleDeleteHike = (id) => {
    // Show a confirmation dialog
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this hike?",
      [
        {
          text: "Cancel",
          style: "cancel", // Cancel button style
        },
        {
          text: "Delete",
          onPress: async () => {
            await Database.deleteHike(id);
            const data = await Database.getHikes();
            setHikes(data);
          },
          style: "destructive", // Delete button style
        },
      ],
      { cancelable: false } // Prevent dismissing the dialog by tapping outside
    );
  };

  //delete all
  const handleDeleteAllHikes = async () => {
    Alert.alert(
      "Delete All Hikes",
      "Are you sure you want to delete all hikes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // Perform the delete operation to delete all hikes
              await Database.deleteAllHikes();
  
              // Update your local state to remove all items
              setHikes([]); // Assuming you have a state variable named "hikes"
  
              // Show a success message using Alert
              Alert.alert("Success", "All hikes have been deleted.");
            } catch (error) {
              console.error("Error deleting hikes:", error);
              Alert.alert("Error", "An error occurred while deleting hikes.");
            }
          },
        },
      ]
    );
  };


  const renderHikeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hikeItem}
      onPress={() => navigation.navigate("Edit", { hike: item })}
    >
      <Text>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Entry")}
      >
        <Text style={styles.addButtonText}>Add New Hike</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAllHikes}>
        <Text style={styles.deleteAllButtonText}>Delete All Hikes</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  hikeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
  },
  updateButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  updateButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteAllButton: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 4,
    marginTop: 5,
    alignItems: "center",
  },
  deleteAllButtonText:{
    color: "white",
    fontWeight: "bold",
  }
});

export default HomeScreen;