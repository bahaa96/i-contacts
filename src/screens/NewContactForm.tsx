import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";
import {FormInput, FormLabel} from "react-native-elements";
import {ImagePicker, Permissions} from "expo";
import {connect} from "react-redux";
import {addContact} from "../redux/actions";
import {IContact} from "../redux/IGlobalState";
import {Dispatch} from "redux";
import validate from "validate.js";

const profilePicturePlaceholder = "https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200524/68824656-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = 50;
const os = Platform.OS;

interface IOwnProps {
  navigation: any;
}

interface IFormData {
  name: string;
  company: string;
  phone: string;
  imageURL: string;
}

interface IState {
  formData: IFormData;
}

interface IDispatchProps {
  addContact(contact: IContact): Promise<void>;
}

type IProps = IOwnProps & IDispatchProps;

class NewContactForm extends React.Component<IProps, IState> {
  public static navigationOptions = ({navigation}: IProps) => {
    return {
      header: () => null,
    };
  }
  public state = {
    formData: {
      name: "",
      company: "",
      phone: "",
      imageURL: "",
    },
  };
  public updateForm = (key: string, value: string) => {
    this.setState((state) => ({
      formData: {
          ...state.formData,
          [key]: value,
      },
    }));
  }
  public handleProfilePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      const options = {
        allowsEditing: true,
        base64: false,
      };
      ImagePicker.launchImageLibraryAsync(options)
          .then((image: any) => {
            if (!image.cancelled) {
              this.updateForm("imageURL", image.uri);
            }
          })
          .catch((err) => alert(err.message));

    }
  }
  public validateContact = () => {
    const newContact = this.state.formData;
    const constraints = {
      name: {
        presence: {
          allowEmpty: false,
        },
      },
      company: {
        presence: {
          allowEmpty: false,
        },
      },
      phone: {
        presence: {
          allowEmpty: false,
        },
      },
    };
    const errors = validate(newContact, constraints);
    console.log("errors: ", errors);
    if (!errors) {
      this.props.addContact(newContact);
      this.props.navigation.navigate("Home");
    } else {
      const error = errors[Object.keys(errors)[0]];
      alert(error);
    }
  }
  public render() {
    const {formData: {imageURL}} = this.state;
    const {navigation} = this.props;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={localStyle.container}>
            <View style={localStyle.header}>
              <View style={localStyle.headerLeft}>
                <TouchableOpacity style={localStyle.headerLeft} onPress={() => {navigation.goBack(); }}>
                  <Text style={localStyle.headerLeftText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={localStyle.headerBodyText}>New Contact</Text>
              </View>
              <View style={localStyle.headerRight}>
                <TouchableOpacity style={localStyle.headerRight} onPress={this.validateContact}>
                  <Text style={localStyle.headerRightText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={this.handleProfilePicture}>
              <View style={localStyle.profilePicture}>
                <Image source={{uri: imageURL || profilePicturePlaceholder}} style={localStyle.profilePicture} />
              </View>
            </TouchableOpacity>
            <View style={localStyle.form}>
              <FormLabel containerStyle={localStyle.formLabel}>Name</FormLabel>
              <FormInput
                  inputStyle={os === "android" ? localStyle.input : {}}
                  placeholder={"Name"}
                  placeholderTextColor={"#8E8E93"}
                  onChangeText={(text) => {this.updateForm("name", text); }}/>
              <FormLabel containerStyle={localStyle.formLabel}>Company</FormLabel>
              <FormInput
                  inputStyle={os === "android" ? localStyle.input : {}}
                  placeholder={"Company"}
                  placeholderTextColor={"#8E8E93"}
                  onChangeText={(text) => {this.updateForm("company", text); }}/>
              <FormLabel containerStyle={localStyle.formLabel}>Phone Number</FormLabel>
              <FormInput
                  inputStyle={os === "android" ? localStyle.input : {}}
                  placeholder={"Phone Number"}
                  placeholderTextColor={"#8E8E93"}
                  onChangeText={(text) => {this.updateForm("phone", text); }}/>

            </View>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 25,
  },
  header: {
    width,
    height: HEADER_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  headerBodyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerLeft: {
    position: "absolute",
    left: 10,
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    position: "absolute",
    right: 10,
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeftText: {
    fontSize: 16,
    color: "#3478F6",
  },
  headerRightText: {
    fontSize: 16,
    color: "#3478F6",
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    shadowOffset: {  width: 0,  height: 0  },
    shadowColor: "black",
    shadowOpacity: 0.4,
    elevation: 4,
  },
  form: {
    marginTop: 25,
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  formLabel: {
    width: width * 0.9,
    padding: 0,
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addContact: (contact: IContact) => {
      dispatch(addContact(contact));
    },
});

export const ConnectedNewContactForm = connect(
    null,
    mapDispatchToProps,
)(NewContactForm);
