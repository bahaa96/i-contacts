import React, {Component} from "react";
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, Dimensions} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";

import {ConnectedContactsList} from "../components/ContactsList";
import {connect} from "react-redux";
import {IContact, IGlobalState} from "../redux/IGlobalState";

const HEADER_HEIGHT = 100;
const { width, height } = Dimensions.get("window");

interface IOwnProps {
  navigation?: any;
}

interface IStateProps {
  contacts: IContact[];
}

interface IState {
  searchText: string;
}

type IProps = IStateProps & IOwnProps;

class HomeScreen extends Component<IProps, IState> {
  public static navigationOptions = ({navigation}: IProps) => {
    return {
      headerStyle: {
        borderBottomColor: "transparent",
      },
      headerRight: (
          <TouchableOpacity style={localStyle.headerRight}  onPress={() => {
            navigation.navigate("NewContactForm");
          }}>
            <Feather name={"plus"} size={30} color={"#3478F6"}/>
          </TouchableOpacity>
        ),
    };
  }
  public state = {
    searchText: "",
  }
  public handleSearch = (text: string): void => {
    this.setState({
      searchText: text,
    });
  }
  public render() {
    const {searchText} = this.state;
    let {contacts} = this.props;
    contacts = contacts.filter((contact: IContact) => {
      return contact.name.toLowerCase().trim().includes(searchText.toLowerCase().trim());
    })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={localStyle.container}>
            <View style={localStyle.header}>
              <Text style={localStyle.headerTitle}>Contacts</Text>
              <View style={localStyle.searchBox}>
                <Ionicons  name={"ios-search"} size={20} color={"#8E8E93"}/>
                <TextInput
                  style={localStyle.searchInput}
                  placeholderTextColor={"#8E8E93"}
                  underlineColorAndroid={"transparent"}
                  placeholder={"Search"}
                  onChangeText={this.handleSearch}/>
              </View>
            </View>
            <ConnectedContactsList navigation={this.props.navigation} contacts={contacts}/>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
  },
  header: {
    height: HEADER_HEIGHT,
    width,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerRight: {
    marginRight: 20,
  },
  searchBox: {
    backgroundColor: "#E7E7E9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
    paddingVertical: 2,
  },
});

const mapStateToProps = (state: IGlobalState) => ({
  contacts: state.contacts,
});

export default connect(
    mapStateToProps,
)(HomeScreen);
