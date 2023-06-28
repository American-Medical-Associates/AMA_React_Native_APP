// THIS IS THE CLEANED UP CODE FROM GPT 3.5

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { GetAllGiftCards } from "../firebase";
import { useSelector } from "react-redux";
import DividerLine from "../components/DividerLine";

const AllGiftCards = () => {
  const company = useSelector((state) => state.global.company);
  const [giftCards, setGiftCards] = useState([]);
  const [totalNumberOfGiftCardsOut, setTotalNumberOfGiftCardsOut] = useState(0);
  const [totalMoneyOnGiftCards, setTotalMoneyOnGiftCards] = useState(0);

  useEffect(() => {
    GetAllGiftCards({
      giftCardArray: setGiftCards,
      company: company,
    });
  }, [company]);

  useEffect(() => {
    let total = 0;
    let totalMoney = 0;
    giftCards.forEach((item) => {
      total += 1;
      totalMoney += parseInt(item.currentAmountOnGiftCard);
    });
    setTotalNumberOfGiftCardsOut(total);
    setTotalMoneyOnGiftCards(totalMoney);
  }, [giftCards]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[true]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <View style={styles.giftCardsContainer}>
            <View style={styles.totalGiftCardsContainer}>
              <Text style={styles.totalGiftCardsText}>
                Total Number of Gift Cards Out:{"\n"}
                <Text style={styles.totalGiftCardsNumber}>
                  {totalNumberOfGiftCardsOut}
                </Text>
              </Text>
              <Text style={styles.totalMoneyText}>
                Total Amount of Money on Gift Cards:{"\n"}
                <Text style={styles.totalMoneyNumber}>
                  ${totalMoneyOnGiftCards}
                </Text>
              </Text>
            </View>
            <DividerLine
              lineColor={"#087FEE"}
              lineWidth={Dimensions.get("screen").width / 1.2}
            />
            <FlatList
              data={giftCards}
              keyExtractor={(item) => item.giftCardNumber.toString()}
              renderItem={({ item }) => {
                if (
                  item.giftCardNumber !== "1500" &&
                  item.giftCardNumber !== "1499"
                ) {
                  return (
                    <View style={styles.giftCardItemContainer}>
                      <Text style={styles.giftCardNumberText}>
                        {item.giftCardNumber}
                      </Text>
                      <Text style={styles.amountOnCardText}>
                        Amount On Card:{" "}
                        <Text style={styles.amountOnCardNumber}>
                          ${item.currentAmountOnGiftCard}
                        </Text>
                      </Text>
                      <Text style={styles.originalAmountText}>
                        Original Amount: ${item.totalOnGiftCard}
                      </Text>
                      {item.email && (
                        <View style={styles.cardOwnerContainer}>
                          <Text style={styles.cardOwnerTitle}>Card Owner</Text>
                          <Text style={styles.cardOwnerInfo}>
                            First Name: {item.firstName}
                          </Text>
                          <Text style={styles.cardOwnerInfo}>
                            Last Name: {item.lastName}
                          </Text>
                          <Text style={styles.cardOwnerInfo}>
                            Email: {item.email}
                          </Text>
                          <Text style={styles.cardOwnerInfo}>
                            Phone Number: {item.phoneNumber}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.datePurchasedText}>
                        Date Purchased:{" "}
                        {item.dateGiftCardWasAdded.toDate().toDateString()}
                      </Text>
                    </View>
                  );
                }
                return null;
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  giftCardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalGiftCardsContainer: {
    marginVertical: 30,
    backgroundColor: "#DBDBDBB4",
    padding: 20,
    borderRadius: 25,
  },
  totalGiftCardsText: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
  },
  totalGiftCardsNumber: {
    fontWeight: "600",
    color: "#087FEE",
  },
  totalMoneyText: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
  },
  totalMoneyNumber: {
    color: "#F10000E2",
  },
  giftCardItemContainer: {
    backgroundColor: "#DBDBDBB4",
    padding: 10,
    marginVertical: 10,
    width: Dimensions.get("screen").width / 1.2,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    //add shadow
  },
  giftCardNumberText: {
    fontSize: 19,
    margin: 5,
    color: "#087FEE",
  },
  amountOnCardText: {
    margin: 10,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  amountOnCardNumber: {
    color: "#F10000E2",
  },
  originalAmountText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  cardOwnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFFB4",
    padding: 10,
    borderRadius: 20,
    marginVertical: 15,
  },
  cardOwnerTitle: {
    fontSize: 20,
    color: "#496DE6",
  },
  cardOwnerInfo: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 10,
  },
  datePurchasedText: {
    marginVertical: 20,
  },
});

export default AllGiftCards;

// THIS IS THE ORIGINAL CODE FOR ALLGIFTCARDS

// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, SafeAreaView, Dimensions } from "react-native";
// import { GetAllGiftCards } from "../firebase";
// import { useSelector } from "react-redux";
// import DividerLine from "../components/DividerLine";

// const AllGiftCards = () => {
//   const company = useSelector((state) => state.global.company);
//   const [giftCards, setGiftCards] = useState([]);
//   const [totalNumberOfGiftCardsOut, setTotalNumberOfGiftCardsOut] = useState(0);
//   const [totalMoneyOnGiftCards, setTotalMoneyOnGiftCards] = useState(0);

//   useEffect(() => {
//     GetAllGiftCards({
//       giftCardArray: setGiftCards,
//       company: company,
//     });
//   }, [company]);

//   useEffect(() => {
//     let total = 0;
//     let totalMoney = 0;
//     giftCards.forEach((item) => {
//       total += 1;
//       totalMoney += parseInt(item.currentAmountOnGiftCard);
//     });
//     setTotalNumberOfGiftCardsOut(total);
//     setTotalMoneyOnGiftCards(totalMoney);
//   }, [giftCards]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 50,
//       }}
//     >
//       <FlatList
//         data={[true]}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={() => (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <View
//               style={{
//                 marginVertical: 30,
//                 backgroundColor: "#DBDBDBB4",
//                 padding: 20,
//                 borderRadius: 25,
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontSize: 19,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Total Number of Gift Cards Out:{"\n"}
//                 <Text style={{ fontWeight: "600", color: "#087FEE" }}>
//                   {totalNumberOfGiftCardsOut}
//                 </Text>
//               </Text>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontSize: 19,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Total Amount of Money on Gift Cards:{"\n"}
//                 <Text style={{ color: "#F10000E2" }}>
//                   ${totalMoneyOnGiftCards}
//                 </Text>
//               </Text>
//             </View>
//             <DividerLine
//               lineColor={"#087FEE"}
//               lineWidth={Dimensions.get("screen").width / 1.2}
//             />
//             <FlatList
//               data={giftCards}
//               keyExtractor={(item) => item.giftCardNumber.toString()}
//               renderItem={({ item }) => {
//                 if (
//                   item.giftCardNumber !== "1500" &&
//                   item.giftCardNumber !== "1499"
//                 ) {
//                   return (
//                     <View
//                       style={{
//                         backgroundColor: "#DBDBDBB4",
//                         padding: 10,
//                         marginVertical: 10,
//                         width: Dimensions.get("screen").width / 1.2,
//                         borderRadius: 40,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         //add shadow
//                       }}
//                     >
//                       <Text
//                         style={{ fontSize: 19, margin: 5, color: "#087FEE" }}
//                       >
//                         {item.giftCardNumber}
//                       </Text>
//                       <Text
//                         style={{
//                           margin: 10,
//                           fontSize: 15,
//                           textAlign: "center",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Amount On Card:{" "}
//                         <Text style={{ color: "#F10000E2" }}>
//                           ${item.currentAmountOnGiftCard}
//                         </Text>
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 15,
//                           textAlign: "center",
//                           fontWeight: "600",
//                         }}
//                       >
//                         Original Amount: ${item.totalOnGiftCard}
//                       </Text>
//                       {item.email && (
//                         <View
//                           style={{
//                             justifyContent: "center",
//                             alignItems: "center",
//                             backgroundColor: "#FFFFFFB4",
//                             padding: 10,
//                             borderRadius: 20,
//                             marginVertical: 15,
//                           }}
//                         >
//                           <Text style={{ fontSize: 20, color: "#496DE6" }}>
//                             Card Owner
//                           </Text>
//                           <Text
//                             style={{
//                               fontSize: 15,
//                               textAlign: "center",
//                               fontWeight: "600",
//                               marginVertical: 10,
//                             }}
//                           >
//                             First Name: {item.firstName}
//                           </Text>
//                           <Text
//                             style={{
//                               fontSize: 15,
//                               textAlign: "center",
//                               fontWeight: "600",
//                               marginVertical: 10,
//                             }}
//                           >
//                             Last Name: {item.lastName}
//                           </Text>
//                           <Text
//                             style={{
//                               fontSize: 15,
//                               textAlign: "center",
//                               fontWeight: "600",
//                               marginVertical: 10,
//                             }}
//                           >
//                             Email: {item.email}
//                           </Text>
//                           <Text
//                             style={{
//                               fontSize: 15,
//                               textAlign: "center",
//                               fontWeight: "600",
//                               marginVertical: 10,
//                             }}
//                           >
//                             Phone Number: {item.phoneNumber}
//                           </Text>
//                         </View>
//                       )}
//                       <Text style={{ marginVertical: 20 }}>
//                         Date Purchased:{" "}
//                         {item.dateGiftCardWasAdded.toDate().toDateString()}
//                       </Text>
//                     </View>
//                   );
//                 }
//                 return null;
//               }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default AllGiftCards;
