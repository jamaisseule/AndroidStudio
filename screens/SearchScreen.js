import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import Database from "../Database";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Load initial search results when the component mounts
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      // Perform a search using the searchQuery
      const results = await Database.searchHikes(searchQuery);

      // Update the searchResults state with the results
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for hikes:", error);
    }
  };

  const navigateToEdit = (hike) => {
    navigation.navigate("Edit", { hike });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by hike name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSearch}>
        <Text style={styles.addButtonText}>Search</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Results</Text>
      {searchResults.map((hike) => (
        <TouchableOpacity
          key={hike.id}
          style={styles.resultItem}
          onPress={() => navigateToEdit(hike)}
        >
          <Text>{hike.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    marginTop: 60,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 20,
    padding: 10,
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
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default SearchScreen;
