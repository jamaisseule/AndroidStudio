import React, { useState } from "react";
import DatePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { RadioButton } from "react-native-paper"; // Import RadioButton from react-native-paper
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";

const EntryScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(false);
  const [parking, setParking] = useState("Yes"); // Initialize parking to "Yes"
  const [length, setLength] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  const handleAddHike = async () => {
    if (!name || !location || !date || !length || !level ) {
      Alert.alert("Error", "Please complete all information!");
      return;
    }

    if (!/^\d+$/.test(length)) {
      Alert.alert("Error", "Please enter a valid integer for Length.");
      return;
    }

    try {
      await Database.addHike(name, location, date, parking, length, level, description);
      Alert.alert("Success", "Hike added successfully", [
        {
          text: "OK",
          onPress: () => {
            // Navigate back to the Home screen or any other desired action
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "An error occurred while adding the hike. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter Location"
      />

        <Text style={styles.label}>Date:</Text>
        <DatePicker
        style={styles.label}
        value={new Date(date)}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          if (event.type === "set") {
            const selectedDateStr = selectedDate.toISOString().split("T")[0];
            setDate(selectedDateStr);
          }
          }}
          />
      <Text style={styles.label}>Parking Available:</Text>
      <View style={styles.radioButton}>
        <RadioButton.Android
          value="Yes"
          status={parking === "Yes" ? "checked" : "unchecked"}
          onPress={() => setParking("Yes")}
          color="#007BFF"
        />
        <Text style={styles.radioLabel}>Yes</Text>
      </View>


      <View style={styles.radioButton}>
        <RadioButton.Android
          value="No"
          status={parking === "No" ? "checked" : "unchecked"}
          onPress={() => setParking("No")}
          color="#007BFF"
        />
        <Text style={styles.radioLabel}>No</Text>
      </View>

       <Text style={styles.label}>Difficulty Level:</Text>
       <RNPickerSelect
       style={{ inputIOS: styles.input }}
       value={level} // Set the value to the current level
       onValueChange={(value) => setLevel(value)}
       items={[
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Easy", value: "Easy" },
        ]}/>

    
      <Text style={styles.label}>Length:</Text>
      <TextInput
        keyboardType="numeric"
        returnKeyType="done"
        style={styles.input}
        value={length}
        onChangeText={setLength}
        placeholder="Enter Length"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddHike}>
        <Text style={styles.addButtonText}>Add New Hike</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
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
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
  },
 
});

export default EntryScreen;