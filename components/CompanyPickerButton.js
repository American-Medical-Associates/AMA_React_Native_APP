// THIS IS THE CLEANED UP CODE FROM CHAT GPT 3.5
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CompanyButton({
  companyTextLong,
  selectedCompany,
  onPressNull,
  onPress,
  companyTextShort,
}) {
  const isCompanySelected = selectedCompany === companyTextLong;

  const handlePress = () => {
    if (isCompanySelected) {
      onPressNull();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isCompanySelected ? "#0008ff" : "#A9A9A9",
          },
        ]}
      >
        <Text style={styles.companyText}>{companyTextShort}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 20,
    width: 80,
  },
  companyText: {
    textAlign: "center",
    fontSize: 20,
    padding: 2,
    color: "#ffffff",
  },
});

// THIS IS THE OLD CODE FOR THE COMPANY PICKER BUTTON

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   Button,
//   View,
//   FlatList,
//   Animated,
//   TextInput,
//   Switch,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Dimensions,
// } from "react-native";
// export default function CompanyButton({
//   companyTextLong,
//   selectedCompany,
//   onPressNull,
//   onPress,
//   companyTextShort,
// }) {
//   //
//   if (selectedCompany == companyTextLong) {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           onPressNull;
//         }}
//       >
//         <View
//           style={{
//             marginVertical: 5,
//             marginHorizontal: 20,
//             borderRadius: 20,
//             width: 80,
//             backgroundColor: "#0008ff",
//           }}
//         >
//           <Text
//             style={{
//               textAlign: "center",
//               fontSize: 20,
//               padding: 2,
//               color: "#ffffff",
//             }}
//           >
//             {companyTextShort}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   } else {
//     return (
//       <TouchableOpacity onPress={onPress}>
//         <View
//           style={{
//             marginVertical: 5,
//             marginHorizontal: 20,
//             borderRadius: 20,
//             width: 80,
//             backgroundColor: "#A9A9A9",
//           }}
//         >
//           <Text style={{ textAlign: "center", fontSize: 20, padding: 2 }}>
//             {companyTextShort}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }
