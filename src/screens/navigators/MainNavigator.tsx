import {Animated, Easing} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import HomeScreen from "../HomeScreen";
import {ConnectedNewContactForm} from "../NewContactForm";
import ContactProfile from "../ContactProfile";

// create custom transitioner without the opacity animation, ie. for iOS
function forVertical(props: any) {
  const { layout, position, scene } = props;

  const index: number = scene.index;
  const height: number = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]),
    outputRange: ([height, 0, 0]),
  });

  return {
    transform: [{ translateX }, { translateY }],
  };
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 350,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: forVertical,
    containerStyle: {
      backgroundColor: "transparent",
    },
  };
};

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  NewContactForm: {
    screen: ConnectedNewContactForm,
  },
},
{
  initialRouteName: "Home",
});

const AppNavigator = createStackNavigator({
    HomeStack,
    ContactProfile: {
      screen: ContactProfile,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
  },
  {
    initialRouteName: "HomeStack",
    mode: "card",
    headerMode: "none",
    cardStyle: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      opacity: 1,
    },
    transitionConfig: TransitionConfiguration,
  },
);

export default createAppContainer(AppNavigator);
