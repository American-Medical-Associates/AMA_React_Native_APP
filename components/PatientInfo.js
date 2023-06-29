// THIS IS THE CLEANED UP PATIENT INFO COMPONENT FROM GPT 3.5
import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, Alert } from "react-native";
import MainButton from "./buttons/MainButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import { selectCompany, setAllPatientInfo } from "../slices/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addGiftCardToPatient,
  removeGiftCardFromPatient,
  getOnePatient,
} from "../firebase";
import InputBox from "./InputBox";
import * as Haptics from "expo-haptics";

export default function PatientInfo({ patientInfo }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [addGiftCard, setAddGiftCard] = useState(false);
  const company = useSelector(selectCompany);
  const [totalOnGiftCard, setTotalOnGiftCard] = useState(0);
  const [addGiftCardTotal, setAddGiftCardTotal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [patientInfo2, setPatientInfo2] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (patientInfo != null) {
      getOnePatient({
        email: patientInfo.email,
        company: company,
        patientArray: setPatientInfo2,
      });

      console.log("patientInfo24", patientInfo2);
    }
  }, [patientInfo, refresh]);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      if (company !== null) {
        addGiftCardToPatient({
          company: company,
          giftCardNumber: data,
          totalOnGiftCard: totalOnGiftCard,
          email: patientInfo2.email,
          currentAmountOnGiftCard: totalOnGiftCard,
          firstName: patientInfo2.firstName,
          lastName: patientInfo2.lastName,
          phoneNumber: patientInfo2.phoneNumber,
          DOB: patientInfo2.DOB,
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setRefresh(!refresh);
      } else {
        Alert.alert("No company");
      }
    } catch (e) {
      Alert.alert(e);
    }
  };

  const renderGiftCardInfo = () => {
    if (patientInfo2.giftCardNumber) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text style={styles.title}>Gift Card Number:</Text>
          <Text style={styles.text}>{patientInfo2.giftCardNumber}</Text>
          <Text style={styles.title}>Gift Card Amount:</Text>
          <Text style={styles.text}>{patientInfo2.totalOnGiftCard}</Text>
          <Text style={styles.title}>Current Balance:</Text>
          <Text style={styles.text}>
            {patientInfo2.currentAmountOnGiftCard}
          </Text>
          <MainButton
            text={"Remove Gift Card"}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              Alert.alert(
                "Remove Gift Card",
                "Are you sure you want to remove this gift card?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      removeGiftCard;
                      removeGiftCardFromPatient({
                        company: company,
                        giftCardNumber: patientInfo2.giftCardNumber,
                        email: patientInfo2.email,
                      });
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      setRefresh(!refresh);
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      );
    } else if (addGiftCard && !addGiftCardTotal) {
      return (
        <View style={{ marginBottom: 50 }}>
          <InputBox
            placeholder={"Total on Gift Card"}
            width={Dimensions.get("screen").width / 1.8}
            color={"#0008ff"}
            onChangeText={(text) => {
              setTotalOnGiftCard(text);
            }}
            keyboardType={"numeric"}
          />
          <MainButton
            text={"Add Total"}
            onPress={() => {
              setAddGiftCardTotal(true);
            }}
          />
        </View>
      );
    } else if (addGiftCard && totalOnGiftCard != 0 && addGiftCardTotal) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      return (
        <View
          style={{
            height: 100,
            width: Dimensions.get("screen").width / 1.5,
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            marginBottom: 120,
          }}
        >
          <MainButton
            text={"Add GiftCard"}
            onPress={() => {
              setAddGiftCard(true);
            }}
          />
        </View>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 30,
        marginVertical: 10,
        width: Dimensions.get("window").width / 1.3,
      }}
    >
      {patientInfo2 && (
        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>PATIENT INFO</Text>
            <Text style={styles.infoSubtitle}>First Name:</Text>
            <Text style={styles.infoText}>{patientInfo2.firstName}</Text>
            <Text style={styles.infoSubtitle}>Last Name:</Text>
            <Text style={styles.infoText}>{patientInfo2.lastName}</Text>
            <Text style={styles.infoSubtitle}>Date of Birth:</Text>
            <Text style={styles.infoText}>{patientInfo2.DOB}</Text>
            <Text style={styles.infoSubtitle}>Email:</Text>
            <Text style={styles.infoText}>{patientInfo2.email}</Text>
            <Text style={styles.infoSubtitle}>Phone Number:</Text>
            <Text style={styles.infoText}>{patientInfo2.phoneNumber}</Text>
            <Text style={styles.infoSubtitle}>Sign up date:</Text>
            <Text style={styles.infoText}>
              {patientInfo2.timestamp?.toDate().toDateString()}
            </Text>
          </View>
          <View style={styles.giftCardContainer}>
            <Text style={styles.title}>Gift Card</Text>
            {renderGiftCardInfo()}
            {addGiftCard && !patientInfo2.giftCardNumber && (
              <View style={{ marginVertical: 20 }}>
                <MainButton
                  text={"Cancel"}
                  onPress={() => {
                    setAddGiftCard(false);
                    setAddGiftCardTotal(false);
                    setTotalOnGiftCard(0);
                  }}
                />
              </View>
            )}
            {addGiftCardTotal && !patientInfo2.giftCardNumber && (
              <Text style={styles.totalText}>Total: {totalOnGiftCard}</Text>
            )}
            {patientInfo2.giftCardNumber && (
              <View style={styles.giftCardInfoContainer}>
                <Text style={styles.infoSubtitle}>Gift Card Number:</Text>
                <Text style={styles.infoText}>
                  {patientInfo2.giftCardNumber}
                </Text>
                <Text style={styles.infoSubtitle}>Gift Card Amount:</Text>
                <Text style={styles.infoText}>
                  {patientInfo2.totalOnGiftCard}
                </Text>
                <Text style={styles.infoSubtitle}>Current Balance:</Text>
                <Text style={styles.infoText}>
                  {patientInfo2.currentAmountOnGiftCard}
                </Text>
                <MainButton
                  text={"Remove Gift Card"}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    Alert.alert(
                      "Remove Gift Card",
                      "Are you sure you want to remove this gift card?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            removeGiftCardFromPatient({
                              company: company,
                              giftCardNumber: patientInfo2.giftCardNumber,
                              email: patientInfo2.email,
                            });
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Medium
                            );
                            setRefresh(!refresh);
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 10,
    marginVertical: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#E2E2E2C2",
  },
  infoTitle: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#1080F1BC",
  },
  infoSubtitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F52ED",
  },
  infoText: {
    fontSize: 30,
  },
  giftCardContainer: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#E2E2E2C2",
  },
  title: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#1080F1BC",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#30303091",
  },
  giftCardInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

// THIS IS THE OLD PATIENT INFO COMPONENT

// import { View, Text, Dimensions, StyleSheet, Alert } from "react-native";
// import React, { useState, useEffect } from "react";
// import MainButton from "./MainButton";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { selectCompany, setAllPatientInfo } from "../slices/globalSlice";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addGiftCardToPatient,
//   removeGiftCardFromPatient,
//   getOnePatient,
// } from "../firebase";
// import InputBox from "./InputBox";
// import * as Haptics from "expo-haptics";

// export default function PatientInfo({ patientInfo }) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [addGiftCard, setAddGiftCard] = useState(false);
//   const company = useSelector(selectCompany);
//   const [totalOnGiftCard, setTotalOnGiftCard] = useState(0);
//   const [addGiftCardTotal, setAddGiftCardTotal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   //   const [patientInfo, setPatientInfo] = useState(patientInfoGlobal);
//   const [patientInfo2, setPatientInfo2] = useState(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (patientInfo != null) {
//       getOnePatient({
//         email: patientInfo.email,
//         company: company,
//         patientArray: setPatientInfo2,
//       });

//       console.log("patientInfo24", patientInfo2);
//     }
//   }, [patientInfo, refresh]);

//   const handleBarCodeScanned = async ({ type, data }) => {
//     try {
//       if (company !== null) {
//         // await setScanned(true);
//         addGiftCardToPatient({
//           company: company,
//           giftCardNumber: data,
//           totalOnGiftCard: totalOnGiftCard,
//           email: patientInfo2.email,
//           currentAmountOnGiftCard: totalOnGiftCard,
//           firstName: patientInfo2.firstName,
//           lastName: patientInfo2.lastName,
//           phoneNumber: patientInfo2.phoneNumber,
//           DOB: patientInfo2.DOB,
//         });
//         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//         setRefresh(!refresh);
//       } else {
//         alert("no company");
//       }
//     } catch (e) {
//       alert(e);
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         borderRadius: 30,
//         marginVertical: 10,

//         width: Dimensions.get("window").width / 1.3,
//       }}
//     >
//       {patientInfo2 != null && (
//         <View>
//           <View
//             style={{
//               padding: 10,
//               marginVertical: 20,
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 30,
//               backgroundColor: "#E2E2E2C2",
//             }}
//           >
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 30,
//                 fontWeight: "bold",
//                 color: "#1080F1BC",
//               }}
//             >
//               PATIENT INFO
//             </Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#1F52ED",
//               }}
//             >
//               First Name:
//             </Text>
//             <Text style={{ fontSize: 30 }}>{patientInfo2.firstName}</Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#1F52ED",
//               }}
//             >
//               Last Name:
//             </Text>

//             <Text style={{ fontSize: 30 }}>{patientInfo2.lastName}</Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#1F52ED",
//               }}
//             >
//               Date of Birth:
//             </Text>

//             <Text style={{ fontSize: 30 }}>{patientInfo2.DOB}</Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#1F52ED",
//               }}
//             >
//               Email:
//             </Text>
//             <Text style={{ fontSize: 30 }}>{patientInfo2.email}</Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#1F52ED",
//               }}
//             >
//               phoneNumber:
//             </Text>
//             <Text style={{ fontSize: 30 }}>{patientInfo2.phoneNumber}</Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#1F52ED",
//               }}
//             >
//               Sign up date:
//             </Text>
//             <Text style={{ fontSize: 30 }}>
//               {patientInfo2?.timestamp?.toDate().toDateString()}
//             </Text>
//           </View>
//           <View
//             style={{
//               padding: 10,
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 30,
//               backgroundColor: "#E2E2E2C2",
//             }}
//           >
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 30,
//                 fontWeight: "bold",
//                 color: "#1080F1BC",
//               }}
//             >
//               Gift Card
//             </Text>

//             {!patientInfo2.giftCardNumber && (
//               <View
//                 style={{
//                   height: 100,
//                   width: Dimensions.get("screen").width / 1.5,
//                   alignItems: "center",
//                   flex: 1,
//                   flexDirection: "column",
//                   marginBottom: 120,
//                 }}
//               >
//                 <MainButton
//                   text={"Add GiftCard"}
//                   onPress={() => {
//                     setAddGiftCard(true);
//                   }}
//                 />
//                 {addGiftCard && !addGiftCardTotal && (
//                   <View style={{ marginBottom: 50 }}>
//                     <InputBox
//                       placeholder={"Total on Gift Card"}
//                       width={Dimensions.get("screen").width / 1.8}
//                       color={"#0008ff"}
//                       onChangeText={(text) => {
//                         setTotalOnGiftCard(text);
//                       }}
//                       keyboardType={"numeric"}
//                     />
//                     <MainButton
//                       text={"Add Total"}
//                       onPress={() => {
//                         setAddGiftCardTotal(true);
//                       }}
//                     />
//                   </View>
//                 )}
//                 {addGiftCard && totalOnGiftCard != 0 && addGiftCardTotal && (
//                   <BarCodeScanner
//                     onBarCodeScanned={
//                       scanned ? undefined : handleBarCodeScanned
//                     }
//                     style={StyleSheet.absoluteFillObject}
//                   />
//                 )}
//               </View>
//             )}
//             {addGiftCard && !patientInfo2.giftCardNumber && (
//               <View style={{ marginVertical: 20 }}>
//                 <MainButton
//                   text={"Cancel"}
//                   onPress={() => {
//                     setAddGiftCard(false);
//                     setAddGiftCardTotal(false);
//                     setTotalOnGiftCard(0);
//                   }}
//                 />
//               </View>
//             )}
//             {addGiftCardTotal && !patientInfo2.giftCardNumber && (
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "800",
//                   color: "#30303091",
//                 }}
//               >
//                 Total:{totalOnGiftCard}
//               </Text>
//             )}
//             {patientInfo2.giftCardNumber && (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginVertical: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     marginVertical: 10,
//                     fontSize: 20,
//                     fontWeight: "bold",
//                     color: "#1F52ED",
//                   }}
//                 >
//                   Gift Card Number:
//                 </Text>
//                 <Text style={{ fontSize: 30 }}>
//                   {patientInfo2.giftCardNumber}
//                 </Text>
//                 <Text
//                   style={{
//                     marginVertical: 10,
//                     fontSize: 20,
//                     fontWeight: "bold",
//                     color: "#1F52ED",
//                   }}
//                 >
//                   Gift Card Amount:
//                 </Text>
//                 <Text style={{ fontSize: 30 }}>
//                   {patientInfo2.totalOnGiftCard}
//                 </Text>
//                 <Text
//                   style={{
//                     marginVertical: 10,
//                     fontSize: 20,
//                     fontWeight: "bold",
//                     color: "#1F52ED",
//                   }}
//                 >
//                   Current Balance:
//                 </Text>
//                 <Text style={{ fontSize: 30 }}>
//                   {patientInfo2.currentAmountOnGiftCard}
//                 </Text>
//                 <MainButton
//                   text={"Remove Gift Card"}
//                   onPress={() => {
//                     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//                     //confirm remove gift card
//                     Alert.alert(
//                       "Remove Gift Card",
//                       "Are you sure you want to remove this gift card?",
//                       [
//                         {
//                           text: "Cancel",
//                           onPress: () => console.log("Cancel Pressed"),
//                           style: "cancel",
//                         },
//                         {
//                           text: "OK",
//                           onPress: () => {
//                             removeGiftCardFromPatient({
//                               company: company,
//                               giftCardNumber: patientInfo2.giftCardNumber,

//                               email: patientInfo2.email,
//                             });
//                             Haptics.impactAsync(
//                               Haptics.ImpactFeedbackStyle.Medium
//                             );
//                             setRefresh(!refresh);
//                           },
//                         },
//                       ],
//                       { cancelable: false }
//                     );
//                   }}
//                 />
//               </View>
//             )}
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }
