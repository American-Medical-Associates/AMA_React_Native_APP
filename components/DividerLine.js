// THIS IS THE CLEANED UP CODE FROM CHAT GPT 3.5
import React from "react";
import { StyleSheet, View } from "react-native";

export default function DividerLine({ lineColor, lineWidth }) {
  return (
    <View style={styles.container}>
      <View
        style={[styles.line, { backgroundColor: lineColor, width: lineWidth }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  line: {
    height: 6,
    borderRadius: 50,
  },
});

// THIS IS THE ORIGINAL CODE FOR THE DIVIDER LINE COMPONENT

// import React from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// export default function DividerLine({ lineColor, lineWidth }) {
//   return (
//     <View style={{ alignItems: "center", marginBottom: 10 }}>
//       <View
//         style={{
//           backgroundColor: lineColor,
//           width: lineWidth,
//           height: 6,
//           borderRadius: 50,
//         }}
//       />
//     </View>
//   );
// }
