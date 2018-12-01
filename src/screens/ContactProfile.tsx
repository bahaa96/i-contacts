import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar} from "react-native";
import {IContact} from "../redux/IGlobalState";
import {MaterialIcons, Ionicons} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface IProps {
  navigation: any;
  contact: IContact;
}

const profilePicturePlaceholder = "https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200524/68824656-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6";

const covers = [
  require("../../assets/covers/cover1-min.jpg"),
  require("../../assets/covers/cover2-min.jpg"),
  require("../../assets/covers/cover3-min.jpg"),
  require("../../assets/covers/cover4-min.jpg"),
];

const cover = () => covers[Math.floor(Math.random() * 4)];

export default class ContactProfile extends React.Component<IProps, never> {
  public static navigationOptions = ({navigation}: IProps) => {
    return {
      headerStyle: {
        height: 5,
        borderBottomColor: "transparent",
      },
    };
  }
  public render() {
    const {navigation} = this.props
    const contact = navigation.getParam("contact", {});
    return (
      <View style={localStyle.container}>
        <StatusBar backgroundColor={"#eaecee"} barStyle={"dark-content"}/>
        <View style={localStyle.card}>
          <View style={localStyle.cardCover}>
            <Image source={cover()} style={localStyle.coverImage}/>
          </View>
          <View style={localStyle.ProfilePictureWrapper}>
            <Image source={{ uri: contact.imageURL || profilePicturePlaceholder }} style={localStyle.ProfilePicture}/>
          </View>
          <View style={localStyle.cardContent}>
            <View style={localStyle.cardTitle}>
              <Text style={localStyle.cardName}>
                {contact.name || "Ahmed Bahaa"}
              </Text>
              <Text style={localStyle.cardCompany}>
                {contact.company || "Hooli inc."}
              </Text>
            </View>
            <View style={localStyle.cardData}>
              <View style={localStyle.cardRow}>
                <MaterialIcons name={"phone-iphone"} size={25} color={"#99A7B9"}/>
                <View style={localStyle.cardRowData}>
                  <Text style={localStyle.cardRowLabel}>Phone Number</Text>
                  <Text style={localStyle.cardRowText}>{contact.phone || "01555550425"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => {navigation.goBack(); }} style={localStyle.backButton}>
          <Ionicons name={"ios-close"} size={50} style={localStyle.backButtonIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const COVER_HEIGHT = 200;
const CARD_WIDTH = 0.9 * width;
const PROFILE_PICTURE_HEIGHT = 65;
const PROFILE_PICTURE_WIDTH = 65;

const localStyle = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(0,0,0,0.45)",
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    shadowOffset: {  width: 0,  height: 1  },
    shadowColor: "black",
    shadowOpacity: 0.65,
    marginTop: 100,
  },
  cardCover: {
    height: COVER_HEIGHT,
    width: CARD_WIDTH,
  },
  coverImage: {
    height: COVER_HEIGHT,
    width: CARD_WIDTH,
    resizeMode: "cover",
  },
  ProfilePictureWrapper: {
    height: PROFILE_PICTURE_HEIGHT,
    width: PROFILE_PICTURE_WIDTH,
    borderRadius: PROFILE_PICTURE_HEIGHT / 2,
    borderColor: "#fff",
    borderWidth: 2,
    overflow: "hidden",
    position: "absolute",
    top: COVER_HEIGHT - (PROFILE_PICTURE_HEIGHT / 2),
    left: (CARD_WIDTH - PROFILE_PICTURE_WIDTH) / 2,
  },
  ProfilePicture: {
    flex: 1,
  },
  cardContent: {
    paddingTop: 25,
  },
  cardTitle: {
    marginVertical: 15,
    alignItems: "center",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardCompany: {
    textAlign: "center",
  },
  cardData: {
    marginVertical: 15,
  },
  cardRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  cardRowData: {
    marginLeft: 10,
  },
  cardRowLabel: {
    fontWeight: "bold",
    color: "#99A7B9",
  },
  cardRowText: {
    letterSpacing: 2,
    fontSize: 16,
  },
  backButton: {
    height: 75,
    width: 75,
    backgroundColor: "#fff",
    borderRadius: 75 / 2,
    shadowOffset: {  width: 0,  height: 1  },
    shadowColor: "black",
    shadowOpacity: 0.65,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
  },
  backButtonIcon: {
    transform: [
      {translateY: 2}
    ]
  }
});
