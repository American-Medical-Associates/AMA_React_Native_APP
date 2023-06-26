import { View, Text, Animated, Dimensions } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
// import {
//   Animated,
//   interpolate,
//   Extrapolate,
//   multiply,
//   cos,
//   sub,
//   asin,
//   divide,

// } from "react-native-reanimated";
import { isTranslateY, useValue } from "react-native-redash";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
const Picker = ({ PickerItems }) => {
  const ITEM_SIZE = 10 + 18 * 5;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();
  const width = Dimensions.get("window").width;
  const setActiveindex = async (index) => {
    setActiveIndex(index);
    console.log(index.toString());
    if (index != activeIndex) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    //if the index is not in the middle of the screen, scroll to it
    // if (
    //   index * ITEM_SIZE - ITEM_SIZE / 2 > width / 2 ||
    //   index * ITEM_SIZE - ITEM_SIZE / 2 < width / 2
    // ) {
    if (index > activeIndex || index < activeIndex) {
      await flatListRef.current.scrollToOffset({
        animated: true,
        // index: index,

        offset: index * ITEM_SIZE - width / 2 + ITEM_SIZE / 2,
        // animated: true,
      });
    }
    // }
  };

  return (
    <View
      style={{
        width: "70%",
        marginVertical: 10,
        backgroundColor: "#D5D2D253",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 30,

        height: 100,
        overflow: "hidden",
      }}
    >
      <Animated.FlatList
        data={PickerItems}
        bounces={false}
        ref={flatListRef}
        //creat happtics as each index passes
        onViewableItemsChanged={useCallback(({ viewableItems }) => {
          if (
            viewableItems.length > 0 &&
            activeIndex != viewableItems[0].index
          ) {
            //place the active index in the middle of the screen
            setActiveindex(viewableItems[0].index);
          }
        }, [])}
        viewabilityConfig={{
          itemVisiblePercentThreshold: ITEM_SIZE,
        }}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={activeIndex}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        horizontal
        onMomentumScrollEnd={(ev) => {
          //place the active index in the middle of the screen
          // const newIndex = Math.round(
          //   ev.nativeEvent.contentOffset.x / ITEM_SIZE
          // );
          // setActiveindex(newIndex);
        }}
        style={{
          width: "100%",
        }}
        //scroll to the active index and place it in the middle of the screen

        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                // marginHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                //backgroundColor: "#D5D2D253",
                borderBottomEndRadius: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",

                  color: activeIndex === index ? "#1F52ED" : "#74747476",
                }}
              >
                {item.text}
              </Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default Picker;
