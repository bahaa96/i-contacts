import React, { Component } from "react";
import Contact from "./Contact";
import AlphabetFlatList from "react-native-alphabetflatlist";
import {IContact, IGlobalState} from "../redux/IGlobalState";
import {connect} from "react-redux";
import {removeContact} from "../redux/actions";
import {Dispatch} from "redux";

const ROW_HEIGHT = 60;

interface IOwnProps {
  navigation: any;
  contacts: IContact[];
}

interface IDispatchProps {
  removeContact(id: string): void;
}

type IProps = IDispatchProps & IOwnProps;

export default class ContactsList extends Component<IProps, never> {
  public viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  public getItemLayout = (data: any, index: number) => ({
    length: ROW_HEIGHT ,
    offset: ROW_HEIGHT * index ,
    index,
  })
  public handleContactRemove = (id: string) => {
    this.props.removeContact(id);
  }
  public handleContactPress = (contact: IContact) => {
    this.props.navigation.navigate("ContactProfile", {contact, transition: "forVertical"});
  }
  public render() {
    return (
        <AlphabetFlatList
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            renderItem={
              ({item, index}: { item: IContact, index: number }) => {
                return (
                    <Contact
                      index={index}
                      item={item}
                      handlePress={() => {this.handleContactPress(item); }}
                      remove={() => {this.handleContactRemove(item.id); }}/>
                );
              }}
            data={this.props.contacts}
            // ListEmptyComponent={}
            getItemLayout={this.getItemLayout}
            mainFlatListContainerStyle={{ flex: 1 }}
            alphabetListProps={alphabetListProps}
            matchFieldName={"name"}
        />
    );
  }
}

const alphabetListProps = {
  selectedAlphabetTextStyle: {
    color: "#5763EE",
  },
  alphabetListContainerStyle: {
    flex: 0.1,
  },
  showsVerticalScrollIndicator: false,
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeContact: (id: string) => {
    dispatch(removeContact(id));
  },
});

export const ConnectedContactsList = connect(
    null,
    mapDispatchToProps,
)(ContactsList);
