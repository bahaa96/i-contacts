import {IAction, IContact, initState} from "../IGlobalState";

export default (state: IContact[] = initState.contacts, action: IAction) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [
        ...state,
        action.payload,
      ];
    case "SET_CONTACTS":
      return action.payload;
    case "REMOVE_CONTACT":
      return state.filter((contact: IContact) => contact.id !== action.payload);
    default:
      return state;
  }
};
