import { View, FlatList, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import PatientSearch from "../components/PatientSearch";
import PatientInfo from "../components/PatientInfo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPatientInfo } from "../slices/globalSlice";

const Patients = () => {
  const patientInfo = useSelector(selectAllPatientInfo);
  const [refresh, setRefresh] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, flexDirection: "column" }}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>
        <FlatList
          bounces={true}
          showsHorizontalScrollIndicator={false}
          data={[true]}
          refreshing={refresh}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{ flex: 1, marginVertical: 25, alignItems: "center" }}
              >
                <PatientSearch globalRefresh={refresh} />
                <PatientInfo patientInfo={patientInfo} />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default Patients;
