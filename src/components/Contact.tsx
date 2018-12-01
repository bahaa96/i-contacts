import React from "react";
import {Dimensions, Platform, Text, TouchableOpacity, View, Image, StyleSheet} from "react-native";
import Swipeout from "react-native-swipeout";

import {Ionicons} from "@expo/vector-icons";
import {IContact} from "../redux/IGlobalState";

const { width, height } = Dimensions.get("window");
const ROW_HEIGHT = 60;
const APP_FONT_FAMILY = Platform.select({
  ios: "Gill Sans",
  android: "sans-serif",
});

const profilePicturePlaceholder = "https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200524/68824656-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6";

const SwipeButton = (props: {icon: string}) => (
    <View style={localStyle.swipeButton}>
      <Ionicons name={props.icon} size={25} color={"#fff"}/>
    </View>
);

interface IProps {
  item: IContact;
  index: number;
  handlePress: (name: string, index: number) => void;
  remove: (id: string) => void;
}

export default ({ item, index, handlePress, remove}: IProps) => {
  const swipeoutBtns = [
    {
      component: <SwipeButton icon={"md-remove-circle"} />,
      onPress: () => {
        remove(item.id);
      },
    },
  ];
  return (
      <Swipeout right={swipeoutBtns} style={localStyle.swiper} autoClose={true}>
        <View style={localStyle.rowContainer}>
          <TouchableOpacity
              onPress={() => {handlePress(item.name, index); }}
              style={localStyle.rowButton}
          >
            <Image source={{uri: item.imageURL || profilePicturePlaceholder}} style={localStyle.profilePicture} />
            <View style={localStyle.titleTextContainer}>
              <Text style={localStyle.titleText}>{item.name}</Text>
              <Text style={localStyle.company}>{item.company}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeout>
  );
};

const localStyle = StyleSheet.create({
  swiper: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
  },
  rowContainer: {
    height: ROW_HEIGHT,
    // width: "90%",
    backgroundColor: "white",
    shadowColor: "#707070",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
  },
  rowButton: {
    flex: 1,
    flexDirection: "row",
  },
  iconWrapper: {
    justifyContent: "center",
    marginRight: 5,
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  titleTextContainer: {
    flex: 4,
    marginLeft: 15,
    paddingTop: 5,
  },
  titleText: {
    fontFamily: APP_FONT_FAMILY,
    fontSize: height * 0.027,
  },
  company: {
    color: "gray",
  },
  swipeButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#EB4E3D",
  },
});
