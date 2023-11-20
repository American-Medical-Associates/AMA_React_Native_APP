import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { Dimensions, StyleSheet, View, ScrollView, Text } from "react-native";
import { DailyInternalMedMis } from "../firebase";
import MainButton from "../components/buttons/MainButton";
import LocationButton from "../components/buttons/LocationButton";
import { padStart } from "lodash";

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
  // Start Here!
  const [noShows, setNoShows] = useState("");
  const [requiredNoShows, setRequiredNoShows] = useState(false);
  const [EKG, setEKG] = useState("");
  const [requiredEKG, setRequiredEKG] = useState(false);
  const [skinTagRemoval, setSkinTagRemoval] = useState("");
  const [requiredSkinTagRemoval, setRequiredSkinTagRemoval] = useState(false);
  const [noShowFDCollections, setNoShowFDCollections] = useState("");
  const [requiredNoShowFDCollections, setRequiredNoShowFDCollections] = useState(false);
  const [paps, setPaps] = useState("");
  const [requiredPaps, setRequiredPaps] = useState(false);
  const [annualPhysicals, setAnnualPhysicals] = useState("");
  const [requiredAnnualPhysicals, setRequiredAnnualPhysicals] = useState(false);
  const [psychiatricServices, setPsychiatricServices] = useState("");
  const [requiredPsychiatricServices, setRequiredPsychiatricServices] = useState(false);
  const [counseling, setCounseling] = useState("");
  const [requiredCounseling, setRequiredCounseling] = useState(false);
  const [chronicCareManagement, setChronicCareManagement] = useState("");
  const [requiredChronicCareManagement, setRequiredChronicCareManagement] = useState(false);
  const [weightLoss, setWeightLoss] = useState("");
  const [requiredWeightLoss, setRequiredWeightLoss] = useState(false);
  const [ivyInfusions, setIvyInfusions] = useState("");
  const [requiredIvyInfusions, setRequiredIvyInfusions] = useState(false);
  const [hormoneReplacementTherapy, setHormoneReplacementTherapy] = useState("");
  const [requiredHormoneReplacementTherapy, setRequiredHormoneReplacementTherapy] = useState(false);
  const [aestheticTreatments, setAestheticTreatments] = useState("");
  const [requiredAestheticTreatments, setRequiredAestheticTreatments] = useState(false);
  const [levelCoding, setLevelCoding] = useState("");
  const [requiredLevelCoding, setRequiredLevelCoding] = useState(false);
  const [ccmNumOfPatientsContacted, setCcmNumOfPatientsContacted] = useState("");
  const [requiredCcmNumOfPatientsContacted, setRequiredCcmNumOfPatientsContacted] = useState(false);
  // End Here!
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
          value={noShows.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNoShows(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNoShows(value);
              }
            }
          }}
          placeholder={"Number of No Shows?"}
        />
        <InputBox
        required={true}
        style={styles.inputBox}
        width={300}
        keyboardType="numeric"
        value={EKG.toString()}
        onChangeText={(text) => {
          if (text === "") {
            setEKG(0);
          } else {
            const value = parseInt(text, 10);
            if (!isNaN(value)) {
              setEKG(value);
            }
          }
        }}
        placeholder={"Number of EKG's?"}
      />
      <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={skinTagRemoval.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setSkinTagRemoval(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setSkinTagRemoval(value);
              }
            }
          }}
          placeholder={"Number of Skin Tag Removals?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={noShowFDCollections.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setNoShowFDCollections(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setNoShowFDCollections(value);
              }
            }
          }}
          placeholder={"No Show Front Desk Collections?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={paps.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setPaps(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setPaps(value);
              }
            }
          }}
          placeholder={"Number of Paps?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={annualPhysicals.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setAnnualPhysicals(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setAnnualPhysicals(value);
              }
            }
          }}
          placeholder={"Number of Annual Physicals?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={psychiatricServices.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setPsychiatricServices(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setPsychiatricServices(value);
              }
            }
          }}
          placeholder={"Number of Psychiatric Services?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={counseling.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setCounseling(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setCounseling(value);
              }
            }
          }}
          placeholder={"How many Counseling sessions?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={chronicCareManagement.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setChronicCareManagement(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setChronicCareManagement(value);
              }
            }
          }}
          placeholder={"Number of Chronic Care Management?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={weightLoss.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setWeightLoss(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setWeightLoss(value);
              }
            }
          }}
          placeholder={"How many patients do Weight Loss?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={ivyInfusions.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setIvyInfusions(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setIvyInfusions(value);
              }
            }
          }}
          placeholder={"Number of IVY Infusions?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={hormoneReplacementTherapy.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setHormoneReplacementTherapy(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setHormoneReplacementTherapy(value);
              }
            }
          }}
          placeholder={"# of Hormone Replacement Therapies?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={aestheticTreatments.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setAestheticTreatments(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setAestheticTreatments(value);
              }
            }
          }}
          placeholder={"Number of Aesthetic Treatments?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={levelCoding.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setLevelCoding(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setLevelCoding(value);
              }
            }
          }}
          placeholder={"Level Coding?"}
        />
        <InputBox
          required={true}
          style={styles.inputBox}
          width={300}
          keyboardType="numeric"
          value={ccmNumOfPatientsContacted.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setCcmNumOfPatientsContacted(0);
            } else {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setCcmNumOfPatientsContacted(value);
              }
            }
          }}
          placeholder={"Number of Patients Contacted?"}
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
            } else if (noShows === "") {
              alert(
                "Please enter the amount of No Shows. If 0 please enter 0."
              );
              setRequiredNoShows(true);
            }  else if (EKG === "") {
              alert(
                "Please enter the amount of EKG's. If 0 please enter 0."
              );
              setRequiredEKG(true);
            } else if (skinTagRemoval === "") {
              alert(
                "Please enter the amount of Skin Tag Removals. If 0 please enter 0."
              );
              setRequiredSkinTagRemoval(true);
            } else if (noShowFDCollections === "") {
              alert(
                "Please enter the amount of No Show Front Desk Collections. If 0 please enter 0."
              );
              setRequiredNoShowFDCollections(true);
            } else if (paps === "") {
              alert(
                "Please enter paps. If 0 please enter 0."
              );
              setRequiredPaps(true);
            } else if (annualPhysicals === "") {
              alert(
                "Please enter the amount of Annual Physicals. If 0 please enter 0."
              );
              setRequiredAnnualPhysicals(true);
            } else if (psychiatricServices === "") {
              alert(
                "Please enter the amount of Psychiatric Services. If 0 please enter 0."
              );
              setRequiredPsychiatricServices(true);
            } else if (counseling === "") {
              alert(
                "Please enter the amount of patients that signed up for Counseling. If 0 please enter 0."
              );
              setRequiredCounseling(true);
            } else if (chronicCareManagement === "") {
              alert(
                "Please enter the amount for Chronic Care Management. If 0 please enter 0."
              );
              setRequiredChronicCareManagement(true);
            } else if (weightLoss === "") {
              alert(
                "Please enter the amount of patients that signed up for Weight Loss. If 0 please enter 0."
              );
              setRequiredWeightLoss(true);
            } else if (ivyInfusions === "") {
              alert(
                "Please enter the amount of IVY Infusions. If 0 please enter 0."
              );
              setRequiredIvyInfusions(true);
            } else if (hormoneReplacementTherapy === "") {
              alert(
                "Please enter the amount of Hormone Replacement Therapies. If 0 please enter 0."
              );
              setRequiredHormoneReplacementTherapy(true);
            } else if (aestheticTreatments === "") {
              alert(
                "Please enter the amount of Aesthetic Treatments. If 0 please enter 0."
              );
              setRequiredAestheticTreatments(true);
            } else if (levelCoding === "") {
              alert(
                "Please enter Level Coding."
              );
              setRequiredLevelCoding(true);
            } else if (ccmNumOfPatientsContacted === "") {
              alert(
                "Please enter the number of Patients Contacted. If 0 please enter 0."
              );
              setRequiredCcmNumOfPatientsContacted(true);
            } else if (dollarsCollected === "") {
              alert(
                "Please enter the amount of dollars collected. If 0 please enter 0."
              );
              setRequiredDollarsCollected(true);
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
                NoShows: noShows,
                EKG: EKG,
                SkinTagRemovals: skinTagRemoval,
                NoShowFDCollections: noShowFDCollections,
                Paps: paps,
                AnnualPhysicals: annualPhysicals,
                PsychiatricServices: psychiatricServices,
                Counseling: counseling,
                ChronicCareManagement: chronicCareManagement,
                WeightLoss: weightLoss,
                IvyInfusions: ivyInfusions,
                HormoneReplacementTherapy: hormoneReplacementTherapy,
                AestheticTreatments: aestheticTreatments,
                LevelCoding: levelCoding,
                CcmNumberOfPatientsContacted: ccmNumOfPatientsContacted,
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
