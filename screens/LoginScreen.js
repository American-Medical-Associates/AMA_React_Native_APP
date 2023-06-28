// THIS IS THE CLEANED UP CODE FROM GPT 3.5
import React, { useEffect, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import MainButton from "../components/MainButton";
import InputBox from "../components/InputBox";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        navigation.replace("Home Drawer");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        alert(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Text style={styles.title}>AMA</Text>
        <View style={styles.inputView}>
          <View style={styles.inputMargin}>
            <InputBox
              width={Dimensions.get("screen").width / 1.3}
              color="#0008ff"
              placeholder="Email"
              type="email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputMargin}>
            <InputBox
              width={Dimensions.get("screen").width / 1.3}
              color="#0008ff"
              placeholder="Password"
              type="password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <MainButton
            buttonWidth={Dimensions.get("screen").width / 1.2}
            text="Sign In"
            onPress={signIn}
          />
          <View style={styles.margin15}>
            <MainButton
              buttonWidth={Dimensions.get("screen").width / 1.2}
              text="Sign Up"
              onPress={() => {
                navigation.navigate("Sign Up Screen");
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  inputMargin: {
    marginVertical: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 50,
  },
  buttonView: {
    marginTop: 200,
  },
  margin15: {
    marginVertical: 15,
  },
});

// THIS IS THE ORIGINAL CODE FOR THE LOGIN SCREEN

// import React from "react";
// import {
//   Button,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Dimensions,
// } from "react-native";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";

// import { useNavigation } from "@react-navigation/native";
// import { auth } from "../firebase";
// import { useState, useEffect } from "react";
// import MainButton from "../components/MainButton";
// import InputBox from "../components/InputBox";
// export default function LoginScreen() {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const navigation = useNavigation();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       // console.log(user);
//       if (user != null) {
//         navigation.replace("Home Drawer");
//       }
//     });
//     return () => {
//       unsubscribe;
//     };
//   }, []);
//   const SignIn = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         // console.log("it worked");
//         const user = userCredential.user;
//         // ...
//       })
//       .catch((error) => {
//         alert(error);
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//   };
//   //   const createUser = createUserWithEmailAndPassword(auth, email, password)
//   //     .then((userCredential) => {
//   //       // Signed in
//   //       const user = userCredential.user;
//   //       // ...
//   //     })
//   //     .catch((error) => {
//   //       const errorCode = error.code;
//   //       const errorMessage = error.message;
//   //       // ..
//   //     });
//   return (
//     <KeyboardAvoidingView>
//       <View>
//         <Text style={styles.title}>AMA</Text>
//         <View style={styles.inputView}>
//           <View style={{ margin: 60 }}>
//             <InputBox
//               width={Dimensions.get("screen").width / 1.3}
//               color={"#0008ff"}
//               placeholder={"Email"}
//               type={"email"}
//               onChangeText={(text) => setEmail(text)}
//             ></InputBox>
//           </View>
//           <View style={{ margin: 60 }}>
//             <InputBox
//               width={Dimensions.get("screen").width / 1.3}
//               color={"#0008ff"}
//               placeholder={"Password"}
//               type={"password"}
//               onChangeText={(text) => setPassword(text)}
//             ></InputBox>
//           </View>
//         </View>
//         <View style={styles.buttonView}>
//           <MainButton
//             buttonWidth={Dimensions.get("screen").width / 1.2}
//             text="Sign In"
//             onPress={SignIn}
//           ></MainButton>
//           <View style={{ margin: 15 }}>
//             <MainButton
//               buttonWidth={Dimensions.get("screen").width / 1.2}
//               text="Sign Up"
//               onPress={() => {
//                 navigation.navigate("Sign Up Screen");
//               }}
//             ></MainButton>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   inputView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 200,
//   },
//   inputfeild: {
//     borderRadius: 50,
//     height: 65,
//     width: 600,
//     borderColor: "#0008ff",
//     borderWidth: 2,
//     marginVertical: 40,
//     padding: 20,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 50,
//     fontWeight: "bold",
//     marginTop: 50,
//   },

//   buttonView: {
//     marginTop: 200,
//   },
// });
