import names from "./name";

export interface IContact {
  id: string;
  name: string;
  imageURL: string;
  company: string;
  phone: string;
  favorite: boolean;
}

export interface IGlobalState {
  contacts: IContact[];
}

export const initState = {
  contacts: names,
};

export interface IAction {
  type: string;
  payload: any;
}
