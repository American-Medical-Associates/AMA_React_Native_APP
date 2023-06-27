// THIS IS THE CLEANED UP CODE FOR THE MAIN BUTTON FROM GPT 3.5
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function MainButton({
  buttonColor,
  text,
  onPress,
  buttonWidth,
}) {
  const defaultButtonColor = "#0008ff";

  const buttonStyle = {
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: buttonColor || defaultButtonColor,
    alignSelf: "center",
    marginTop: 12,
    height: 50,
    width: buttonWidth,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

// THIS IS THE ORIGINAL CODE FOR THE MAIN BUTTON

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// export default function MainButton({
//   buttonColor,
//   text,
//   onPress,
//   buttonWidth,
// }) {
//   const [defaultButtonColor, setDefaultButtonColor] = useState("#0008ff");

//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View
//         style={{
//           borderRadius: 40,
//           paddingVertical: 14,
//           paddingHorizontal: 20,
//           backgroundColor: buttonColor ? buttonColor : defaultButtonColor,
//           alignSelf: "center",
//           marginTop: 12,
//           height: 50,
//           width: buttonWidth,
//           shadowColor: "#000",
//           shadowOffset: {
//             width: 0,
//             height: 8,
//           },
//           shadowOpacity: 0.44,
//           shadowRadius: 10.32,

//           elevation: 16,
//         }}
//       >
//         <Text style={styles.buttonText}>{text}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 40,
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     backgroundColor: "#0008ff",
//     alignSelf: "center",
//     marginTop: 12,
//     width: 450,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 10.32,

//     elevation: 16,
//   },

//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });
