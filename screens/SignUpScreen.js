import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { use } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useDrawerStatus } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import MainButton from "../components/MainButton";
import InputBox from "../components/InputBox";
const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [companyEmail, setCompanyEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [company, setCompany] = useState(null);
  const [numberOfEmployees, setNumberOfEmployees] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState(null);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [companyAdress1, setCompanyAddress1] = useState(null);
  const [companyAdress2, setCompanyAddress2] = useState(null);
  const [companyAdressCity, setCompanyAddressCity] = useState(null);
  const [companyAdressState, setCompanyAddressState] = useState(null);
  const [companyAdressZipCode, setCompanyAddressZipCode] = useState(null);
  const dateInMM = Date.now();
  const [selectedCompany, setSelectedCompany] = useState("AMA");
  const auth = getAuth();
  const PassordCheck = () => {
    if (password != password2) {
      return <Text style={{ color: "red" }}>The passwords dont match!</Text>;
    } else return null;
  };
  const randomNumberCompanyId = Math.random() * 1000000 + 1;
  const randomnumberString = randomNumberCompanyId.toString();
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user.uid;
        try {
          await setDoc(
            doc(db, "users", auth.currentUser.email),
            {
              fullName: fullName,
              company: selectedCompany,
              email: email.toLowerCase(),
              phoneNumber: phoneNumber,
              companyAdress1: companyAdress1,
              uid: user,
              isAuthUser: false,
              companyID: randomnumberString,
              dateOfSignUpInMM: dateInMM,
            },
            { merge: true }
          );
        } catch (error) {
          alert(error);
          console.log("i got an error ${error}");
        }

        // user.displayName(company);
        // user.phoneNumber(phoneNumber);
      })

      .then(async () => {
        try {
          await setDoc(
            doc(db, "companys", selectedCompany),
            {
              company: selectedCompany,
              // companyEmail: companyEmail.toLowerCase(),
              phoneNumber: phoneNumber,
              numberOfEmployees: numberOfEmployees,
              numberOfEmployeesCurrentlySignedUp: 1,
              companyAdress1: companyAdress1,

              //   adminUsers: arrayUnion(email.toLowerCase()),
              companyID: randomnumberString,
              dateOfSignUp: serverTimestamp(),
              dateOfSignUpInMM: dateInMM,
            },
            { merge: true }
          );
        } catch (error) {
          alert(error);
          console.log("i got an error ${error}");
        }
      })
      .then(async () => {
        try {
          await setDoc(
            doc(db, "companys", selectedCompany, "address", companyAdress1),
            {
              address: companyAdress1,
              timestamp: serverTimestamp(),
            },

            { merge: true }
          );
        } catch (e) {
          alert(e);
        }
      })
      .catch((error) => {
        alert(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    //   Alert.alert('Passwods did not match', "Passwords need to match"),[{ text: "Ok", onPress: () => setPassword(0),setPassword(0) }]
  };

  // const verifiyFeildsAndSignUp = async () => {
  //   if (!company) {
  //     Alert.alert("Please enter Company name");
  //   }
  //   if (!email) {
  //     Alert.alert("Plaese enter Email");
  //   }
  //   if (!phoneNumber) {
  //     Alert.alert("Please enter Password");
  //   }
  //   if (!password) {
  //     Alert.alert("Please enter Password");
  //   }
  //   if (!password2) {
  //     Alert.alert("Please enter Phone Number");
  //   }

  //   await signup();

  //   // addToDb();
  // };
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={10}
        style={{ flex: 1, alignItems: "center" }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 30,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Choose A Company
          </Text>
          <Picker
            style={{
              height: 100,
              width: Dimensions.get("screen").width / 2,

              marginBottom: 100,
            }}
            selectedValue={selectedCompany}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCompany(itemValue)
            }
          >
            <Picker.Item label="AMA" value="AMA" />
            <Picker.Item label="Vitalize Nation" value="Vitalize Nation" />
          </Picker>
          {/* <InputBox
            style={styles.inputTitle}
            placeholder={"Name of Company"}
            type={"description"}
            width={Dimensions.get("window").width / 1.3}
            color={"#0008ff"}
            onChangeText={(text) => {
              setCompany(text);
            }}
          ></InputBox> */}
          <View
            style={{
              width: Dimensions.get("window").width / 1.2,
              backgroundColor: "#B9B9B99D",
              borderRadius: 35,
              padding: 20,
            }}
          >
            <TextInput
              placeholderTextColor="#595959"
              style={styles.inputTitle}
              placeholder={"Work Location Address"}
              type={"description"}
              // color={"#0008ff"}
              width={Dimensions.get("window").width / 1.3}
              onChangeText={(text) => {
                setCompanyAddress1(text);
              }}
            ></TextInput>
          </View>

          <TextInput
            placeholderTextColor="#595959"
            style={styles.inputTitle}
            placeholder=" Full Name of User"
            type="description"
            onChangeText={(text) => {
              setFullName(text);
            }}
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            placeholderTextColor="#595959"
            style={styles.inputTitle}
            placeholder=" Work Email"
            type="description"
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCapitalize="none"
          ></TextInput>

          <TextInput
            placeholderTextColor="#595959"
            style={styles.inputTitle}
            placeholder="Phone Number"
            type="description"
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            placeholderTextColor="#595959"
            style={styles.inputTitle}
            placeholder="Password"
            type="description"
            onChangeText={(text) => {
              setPassword(text);
            }}
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            style={styles.inputTitle}
            placeholderTextColor="#595959"
            placeholder="Re-type Password"
            type="description"
            onChangeText={(text) => {
              setPassword2(text);
            }}
            autoCapitalize="none"
          ></TextInput>
          {PassordCheck()}
          <View style={{ flex: 1, marginBottom: 50 }}>
            <MainButton
              buttonWidth={250}
              text="Sign Up"
              onPress={signup}
            ></MainButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputTitle: {
    borderRadius: 50,
    height: 60,
    width: Dimensions.get("window").width / 1.3,
    borderColor: "#0008ff",
    borderWidth: 2,
    marginBottom: 15,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#D8D8D84D",
    marginHorizontal: 300,
    alignSelf: "center",
  },
});
