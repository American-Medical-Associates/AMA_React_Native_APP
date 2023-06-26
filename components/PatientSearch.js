import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import InputBox from "./InputBox";
import {
  selectCompany,
  setPatientDOB,
  setPatientFirstName,
  setPatientLastName,
  setAllPatientInfo,
  setPatientEmail,
  setPatientPhoneNumber,
} from "../slices/globalSlice";
import { patientSearchList, addNewPatient } from "../firebase";
import MainButton from "./MainButton";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const PatientSearch = ({ globalRefresh }) => {
  const [showAddNewUser, setShowAddNewUser] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchDob, setSearchDob] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [patientListArray, setPatientListArray] = useState([]);
  const [searched, setSearched] = useState(null);
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    patientSearchList({
      patientArray: setPatientListArray,
      company: company,
    });
    return () => {
      undefined;
    };
  }, [globalRefresh]);
  useEffect(() => {
    var searchedPatient = [];
    if (searchName != "" || searchDob != "") {
      patientListArray.map((item) => {
        const fullName = JSON.stringify(item.fullName);
        const DOB = JSON.stringify(item.DOB);
        setRefresh(!refresh);
        // if (applicationSearch.length > 1) {
        if (
          fullName.toLowerCase().includes(searchName.toLowerCase()) == true &&
          DOB.includes(searchDob)
        ) {
          searchedPatient.push(item);
        }

        // }
      });
      setSearched(searchedPatient);
    } else {
      searchedPatient = [];
      setSearched(null);
    }
    return () => {
      undefined;
    };
  }, [searchName, searchDob]);

  const addNewUser = () => {
    if (showAddNewUser == false) {
      return (
        <View
          style={{
            backgroundColor: "#D9D9D9",
            alignItems: "center",
            padding: 10,
            borderRadius: 25,
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flex: 0.3,
              width: Dimensions.get("window").width / 1.4,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowAddNewUser(!showAddNewUser);
              }}
            >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.7 }}>
            <InputBox
              width={Dimensions.get("screen").width / 1.3}
              color={"#0008ff"}
              placeholder={"Last, First"}
              value={searchName}
              onChangeText={(text) => setSearchName(text)}
            />
            <InputBox
              width={Dimensions.get("screen").width / 1.3}
              color={"#0008ff"}
              placeholder={"DOB"}
              value={searchDob}
              onChangeText={(text) => {
                var textClean = text.replace(/[^0-9]/g, "");
                setSearchDob(text.replace(/[^0-9]/g, ""));
              }}
            />
          </View>
          {searched != null && searchName != null && (
            <View
              style={{
                flex: 1,
                width: Dimensions.get("window").width / 1.4,
                justifyContent: "center",
              }}
            >
              <FlatList
                bounces={false}
                style={{
                  width: Dimensions.get("window").width / 1.4,
                  flex: 1,
                }}
                data={searched}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  var month = item.DOB.slice(0, 2);
                  var day = item.DOB.slice(2, 4);
                  var year = item.DOB.slice(4, 8);
                  return (
                    <View
                      style={{
                        backgroundColor: "#E9E7E7D4",
                        width: Dimensions.get("screen").width / 1.5,
                        margin: 10,
                        borderRadius: 40,
                        padding: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(
                            setPatientDOB(`${month} / ${day} / ${year}`)
                          );
                          dispatch(setPatientFirstName(item.firstName));
                          dispatch(setPatientLastName(item.lastName));
                          dispatch(setAllPatientInfo(item));
                          dispatch(setPatientEmail(item.email));
                          dispatch(setPatientPhoneNumber(item.phoneNumber));
                          setSearched([]);
                          setSearchName("");
                          setSearchDob("");
                        }}
                      >
                        <Text style={{ textAlign: "center", fontSize: 18 }}>
                          {item.fullName}
                        </Text>
                        <Text style={{ textAlign: "center", fontSize: 18 }}>
                          {month}/{day}/{year}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: "#D9D9D9",
            alignItems: "center",
            padding: 10,
            borderRadius: 25,
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flex: 0.3,
              width: Dimensions.get("window").width / 1.4,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowAddNewUser(!showAddNewUser);
              }}
            >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <InputBox
            width={Dimensions.get("screen").width / 1.3}
            color={"#0008ff"}
            placeholder={"First Name"}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <InputBox
            width={Dimensions.get("screen").width / 1.3}
            color={"#0008ff"}
            placeholder={"Last Name"}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <InputBox
            width={Dimensions.get("screen").width / 1.3}
            color={"#0008ff"}
            placeholder={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <InputBox
            width={Dimensions.get("screen").width / 1.3}
            color={"#0008ff"}
            placeholder={"Phone Number"}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <InputBox
            width={Dimensions.get("screen").width / 1.3}
            color={"#0008ff"}
            placeholder={"DOB"}
            value={DOB}
            onChangeText={(text) => setDOB(text)}
          />
          <MainButton
            text={"Add User"}
            onPress={() => {
              if (
                firstName == "" ||
                lastName == "" ||
                DOB == "" ||
                phoneNumber == "" ||
                email == ""
              ) {
                alert("Please fill out all fields");
              } else {
                addNewPatient({
                  email: email,
                  lastName: lastName,
                  firstName: firstName,
                  DOB: DOB,
                  phoneNumber: phoneNumber,
                  address: address,
                  company: company,
                });
                setEmail("");
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setAddress("");
                setAddress("");
                setDOB("");
              }
            }}
            buttonWidth={Dimensions.get("screen").width / 1.5}
          />
        </View>
      );
    }
  };

  return <View style={{ flex: 1 }}>{addNewUser()}</View>;
};

export default PatientSearch;
