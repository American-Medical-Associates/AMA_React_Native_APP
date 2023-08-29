import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import { DailyInternalMedMis } from "../firebase";
import MainButton from "../components/buttons/MainButton";

//TODO:
// - Connect to firebase and make sure it works
// - Add a Provider scroll wheel (required)
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

const IntMedMis = () => {
  const [year, setYear] = useState("");
  const [requiredYear, setRequiredYear] = useState(false);
  const [month, setMonth] = useState("");
  const [requiredMonth, setRequiredMonth] = useState(false);
  const [day, setDay] = useState("");
  const [requiredDay, setRequiredDay] = useState(false);
  const [provider, setProvider] = useState("");
  const [requiredProvider, setRequiredProvider] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <InputBox
          id={"year"}
          required={true}
          style={styles.inputBox}
          width={300}
          value={year}
          onChangeText={(text) => setYear(text)}
          placeholder={"Please Enter the Year"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          value={month}
          onChangeText={(text) => setMonth(text)}
          placeholder={"Please Enter the Month"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          value={day}
          onChangeText={(text) => setDay(text)}
          placeholder={"Please Enter the Day"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          value={provider}
          onChangeText={(text) => setProvider(text)}
          placeholder={"Who was the Provider?"}
        />
        <MainButton
          text={"Submit"}
          buttonWidth={250}
          onPress={() => {
            if (year === "") {
              alert("Please enter the current Year.");
              setRequiredYear(true);
            } else if (month === "") {
              alert("Please enter the current Month.");
              setRequiredMonth(true);
            } else if (day === "") {
              alert("Please enter the current Day.");
              setRequiredDay(true);
            } else if (provider === "") {
              alert("Please enter the current Provider.");
              setRequiredProvider(true);
            } else {
              alert("Works Correctly!");
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
});

export default IntMedMis;
