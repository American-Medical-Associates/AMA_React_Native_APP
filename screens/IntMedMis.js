import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { Dimensions, StyleSheet, View, ScrollView, Text } from "react-native";
import { DailyInternalMedMis } from "../firebase";
import MainButton from "../components/buttons/MainButton";
import LocationButton from "../components/buttons/LocationButton";

const IntMedMis = () => {
  const date = new Date();
  const formattedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;

  const data = [{ value: "Chandler, AZ" }, { value: "Maricopa, AZ" }];

  const [currentDate, setCurrentDate] = useState(formattedDate);
  const [requiredDate, setRequiredDate] = useState(false);
  const [provider, setProvider] = useState("");
  const [requiredProvider, setRequiredProvider] = useState(false);
  const [location, setLocation] = useState("");
  const [requiredLocation, setRequiredLocation] = useState(false);
  const [numOfPatients, setNumOfPatients] = useState("");
  const [requiredNumOfPatients, setRequiredNumOfPatients] = useState(false);
  const [numOfNewPatients, setNumOfNewPatients] = useState("");
  const [requiredNumOfNewPatients, setRequiredNumOfNewPatients] =
    useState(false);
  const [numOfTeleVisits, setNumOfTeleVisits] = useState("");
  const [requiredNumOfTeleVisits, setRequiredNumOfTeleVisits] = useState(false);
  const [hoursScheduled, setHoursScheduled] = useState("");
  const [requiredHoursScheduled, setRequiredHoursScheduled] = useState(false);
  const [refferedBy, setRefferedBy] = useState("");
  const [numOfInjections, setNumOfInjections] = useState("");
  const [requiredNumOfInjections, setRequiredNumOfInjections] = useState(false);
  const [numOfTriggerOrJointInjections, setNumOfTriggerOrJointInjections] =
    useState("");
  const [
    requiredNumOfTriggerOrJointInjections,
    setRequiredNumOfTriggerOrJointInjections,
  ] = useState(false);
  const [numOfNewSignUp, setNumOfNewSignUp] = useState("");
  const [requiredNumOfNewSignUp, setRequiredNumOfNewSignUp] = useState(false);
  const [numOfPatientsContacted, setNumOfPatientsContacted] = useState("");
  const [requiredNumOfPatientsContacted, setRequiredNumOfPatientsContacted] =
    useState(false);
  const [dollarsCollected, setDollarsCollected] = useState("");
  const [requiredDollarsCollected, setRequiredDollarsCollected] =
    useState(false);

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
          placeholder={"Who was the Provider? (Ex: Dr. Nadir)"}
        />
        <Text style={styles.locationText}>Select your location</Text>
        <LocationButton
          value={location}
          onSelect={setLocation}
          style={styles.location}
          data={data}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfPatients.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfPatients(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfPatients(value);
              }
            }
          }}
          placeholder={"Number of patients seen?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfNewPatients.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfNewPatients(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfNewPatients(value);
              }
            }
          }}
          placeholder={"Number of new patients seen?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfTeleVisits.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfTeleVisits(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfTeleVisits(value);
              }
            }
          }}
          placeholder={"Number of Tele-Visits?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={hoursScheduled.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setHoursScheduled(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setHoursScheduled(value);
              }
            }
          }}
          placeholder={"Hours Scheduled"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          value={refferedBy}
          onChangeText={(text) => setRefferedBy(text)}
          placeholder={"Who were they referred by? (Optional)"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfInjections.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfInjections(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfInjections(value);
              }
            }
          }}
          placeholder={"Number of injections?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfTriggerOrJointInjections.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfTriggerOrJointInjections(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfTriggerOrJointInjections(value);
              }
            }
          }}
          placeholder={"Number of trigger or joint injections?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfNewSignUp.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfNewSignUp(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfNewSignUp(value);
              }
            }
          }}
          placeholder={"Number of new sign ups?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={numOfPatientsContacted.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNumOfPatientsContacted(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNumOfPatientsContacted(value);
              }
            }
          }}
          placeholder={"Number of patients contacted?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={dollarsCollected.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setDollarsCollected(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setDollarsCollected(value);
              }
            }
          }}
          placeholder={"Dollars collected?"}
        />
        <MainButton
          text={"Submit"}
          style={styles.MainButton}
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
            } else if (numOfPatients === "") {
              alert("Please enter the number of patients seen.");
              setRequiredNumOfPatients(true);
            } else if (numOfNewPatients === "") {
              alert(
                "Please enter the number of New Patients. If 0 please enter 0."
              );
            } else if (numOfTeleVisits === "") {
              alert(
                "Please enter the number of Tele-Visits. If 0 please enter 0."
              );
              setRequiredNumOfTeleVisits(true);
            } else if (hoursScheduled === "") {
              alert("Please enter the hours scheduled. If 0 please enter 0.");
              setRequiredHoursScheduled(true);
            } else if (numOfInjections === "") {
              alert(
                "Please enter the number of injections. If 0 please enter 0."
              );
              setRequiredNumOfInjections(true);
            } else if (numOfTriggerOrJointInjections === "") {
              alert(
                "Please enter the number of trigger or joint injections. If 0 please enter 0."
              );
              setRequiredNumOfTriggerOrJointInjections(true);
            } else if (numOfNewSignUp === "") {
              alert(
                "Please enter number of new sign ups. If 0 please enter 0."
              );
              setRequiredNumOfNewSignUp(true);
            } else if (numOfPatientsContacted === "") {
              alert(
                "Please enter number of new sign ups. If 0 please enter 0."
              );
              setRequiredNumOfPatientsContacted(true);
            } else if (dollarsCollected === "") {
              alert(
                "Please enter the amount of dollars collected. If 0 please enter 0."
              );
            } else {
              alert("Successful Submission! Thank you!");
              DailyInternalMedMis({
                currentDate: currentDate,
                provider: provider,
                location: location,
                NumOfPatients: numOfPatients,
                NumOfNewPatients: numOfNewPatients,
                NumOfTeleVisits: numOfTeleVisits,
                HoursScheduled: hoursScheduled,
                RefferedBy: refferedBy,
                NumOfInjections: numOfInjections,
                NumOfTriggerOrJointInjections: numOfTriggerOrJointInjections,
                NumOfNewSignUp: numOfNewSignUp,
                NumOfPatientsContacted: numOfPatientsContacted,
                DollarsCollected: dollarsCollected,
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
  MainButton: {
    marginBottom: 20,
  },
});

export default IntMedMis;
