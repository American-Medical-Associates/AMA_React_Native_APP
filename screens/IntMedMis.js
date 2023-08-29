import React from "react";
import InputBox from "../components/InputBox";
import { StyleSheet, View } from "react-native";
import { DailyInternalMedMis } from "../firebase";
import Picker from "../components/Picker";

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

function IntMedMis() {
  return (
    <View style={styles.container}>
      <InputBox
        required={true}
        style={styles.inputBox}
        width={300}
        placeholder={"Please Enter the Year"}
      />
      <InputBox
        required={true}
        style={styles.inputBox}
        width={300}
        placeholder={"Please Enter the Month"}
      />
      <InputBox
        required={true}
        style={styles.inputBox}
        width={300}
        placeholder={"Please Enter the Day"}
      />

      {/* THIS IS WHERE YOU LEFT OFF! */}
      <Picker>
        <Picker.Item label="Ashlee" value="Ashlee" />
      </Picker>
    </View>
  );
}

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
