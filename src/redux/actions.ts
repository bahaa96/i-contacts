import {AsyncStorage} from "react-native";
import {Dispatch} from "redux";
import {IContact, IGlobalState} from "./IGlobalState";
import shortId from "shortid";

export function addContact(contact: IContact) {
  return async (dispatch: Dispatch, getState: () => IGlobalState) => {
    contact = {
        ...contact,
        id: shortId.generate(),
    };
    try {
      dispatch({
        type: "ADD_CONTACT",
        payload: contact,
      });
      await AsyncStorage.setItem("contacts", JSON.stringify(getState().contacts));
    } catch (e) {
      alert(e.message);
    }
  };
}

export function getContacts() {
  return async (dispatch: Dispatch, getState: () => IGlobalState) => {
    try {
      const contacts = JSON.parse((await AsyncStorage.getItem("contacts")) || "{}");
      dispatch({
        type: "SET_CONTACTS",
        payload: contacts,
      });
    } catch (e) {
      alert(e.message);
    }
  };
}

export function removeContact(contactId: string) {
  return async (dispatch: Dispatch, getState: () => IGlobalState) => {
    try {
      dispatch({
        type: "REMOVE_CONTACT",
        payload: contactId,
      });
      await AsyncStorage.setItem("contacts", JSON.stringify(getState().contacts));
    } catch (e) {
      alert(e.message);
    }
  };
}
