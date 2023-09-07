import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { Dimensions, StyleSheet, View, ScrollView, Text } from "react-native";
import { DailyInternalMedMis } from "../firebase";
import MainButton from "../components/buttons/MainButton";
import LocationButton from "../components/buttons/LocationButton";

//TODO:
// - Outfill input for current date, allow user to change date if needed. Auto format
// - Add a Location scroll wheel listing Chandler AZ, & Maricopa AZ (required)
// - Add a Num of Patients input (required)
// - Add a Num of New Patients input (required)
// - Add a Num of Tele Visits input (required)
// - Add a Hours Scheduled input (required)
// - Add a Reffered By input (Optional)
// - Add a Num of Injections input (required)
// - Add a Num of Trigger or Joint Injections input (required)
// - Add a Num of New Sign ups input (required)
// - Add Num of Patients Contacted input (required)
// - Add a Dollars Collected input (required)
// - Add a Submit Button (required)

// CURRENTLY DATE IN FIREBASE IS SEPERATING INTO 3 FILES. FIX THIS TO ONE DATE!!!
const IntMedMis = () => {
  const date = new Date();
  const formattedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;

  const data = [{ value: "Chandler, AZ" }, { value: "Maricopa, AZ" }];

  // Grab daily data from the database, store in array, loop through array and calculate the average for that month.

  // Changed the year to int(), test tomorrow to see if it works as intended.
  const [currentDate, setCurrentDate] = useState(formattedDate);
  const [requiredDate, setRequiredDate] = useState(false);
  const [provider, setProvider] = useState("");
  const [requiredProvider, setRequiredProvider] = useState(false);
  const [location, setLocation] = useState("");
  const [requiredLocation, setRequiredLocation] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <InputBox
          id={"year"}
          required={true}
          style={styles.inputBox}
          width={300}
          value={currentDate}
          onChangeText={(text) => setCurrentDate(text)}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          value={provider}
          onChangeText={(text) => setProvider(text)}
          placeholder={"Who was the Provider? (Ex: Hailey)"}
        />
        <Text style={styles.locationText}>Select your location</Text>
        <LocationButton
          value={location}
          onSelect={setLocation}
          style={styles.location}
          data={data}
        />

        <MainButton
          text={"Submit"}
          buttonWidth={250}
          onPress={() => {
            if (currentDate === "") {
              alert("Please enter the date. (EX: mm/dd/year)");
              setRequiredDate(true);
            } else if (provider === "") {
              alert("Please enter the current Provider.");
              setRequiredProvider(true);
            } else if (location === "") {
              alert("Please select your location");
              setRequiredLocation(true);
            } else {
              alert("Successful Submission! Thank you!");
              DailyInternalMedMis({
                currentDate: currentDate,
                provider: provider,
                location: location,
              }).then(() => {
                console.log("Submit Successful!");
              });
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputBox: {
    marginLeft: 5,
    height: 60,
  },
  locationText: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
});

export default IntMedMis;
