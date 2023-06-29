// THIS IS THE CLEANED UP CODE FROM GPT 3.5
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import MainButton from "../components/buttons/MainButton";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectCompany, selectIsAuthUser } from "../slices/globalSlice";

const UserOptionsScreen = () => {
  const isAuth = useSelector(selectIsAuthUser);
  const company = useSelector(selectCompany);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "User Settings",
      headerShown: true,
      headerBackTitle: "Home",
      headerTitleStyle: {},
    });
  });

  const handleLogout = () => {
    const authInstance = getAuth();
    authInstance.signOut().then(() => {
      navigation.replace("Login Screen");
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.text}>{`${isAuth} ${company}`}</Text>
      <Text style={styles.text}>{auth.currentUser.email}</Text>
      <MainButton
        buttonWidth={Dimensions.get("screen").width / 1.2}
        text="Sign Out"
        onPress={handleLogout}
      />
    </ScrollView>
  );
};

export default UserOptionsScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 40,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
  },
});

// THIS IS THE ORIGINAL CODE FOR THE USER OPTIONS SCREEN

// import React, { useLayoutEffect } from "react";
// import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
// import MainButton from "../components/MainButton";
// import { useNavigation } from "@react-navigation/native";
// import { getAuth, signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useSelector } from "react-redux";
// import { selectCompany, selectIsAuthUser } from "../slices/globalSlice";

// const UserOptionsScreen = () => {
//   const isAuth = useSelector(selectIsAuthUser);
//   const company = useSelector(selectCompany);
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: "User Settings",
//       headerShown: true,
//       headerBackTitle: "Home",
//       headerTitleStyle: {},
//     });
//   });

//   const navigation = useNavigation();
//   const Logout = () => {
//     const auth = getAuth();
//     auth.signOut().then(() => {
//       navigation.replace("Login Screen");
//     });
//   };
//   return (
//     <ScrollView style={styles.scrollview}>
//       <Text style={{ alignSelf: "center", fontSize: 20 }}>
//         {isAuth} {company}
//       </Text>
//       <Text style={{ alignSelf: "center", fontSize: 20 }}>
//         {auth.currentUser.email}
//       </Text>
//       <MainButton
//         buttonWidth={Dimensions.get("screen").width / 1.2}
//         text="sign out"
//         onPress={Logout}
//       ></MainButton>
//     </ScrollView>
//   );
// };

// export default UserOptionsScreen;

// const styles = StyleSheet.create({
//   scrollview: {
//     paddingTop: 40,
//   },
// });
