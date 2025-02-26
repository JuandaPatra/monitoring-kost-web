export type FormState = {
    openModal : boolean;
    formData : {
        name : string;
        email : string;
        telephone : string;
        properti : string;
        status : string;
    };
    listProperties : Property[];
    showToast : boolean;

}

export type FormAction =
  | { type: "TOGGLE_MODAL" }
  | { type: "SET_FORM_DATA"; payload: { field: string; value: string } }
  | { type: "RESET_FORM" }
  | { type: "SET_LIST_PROPERTIES"; payload: Property[] }
  | { type: "SET_TOAST"};

export const initialState: FormState = {
  openModal: false,
  formData: {
    name: "",
    email: "",
    telephone: "",
    properti: "",
    status: "",
  },
  listProperties: [],
  showToast : false
};

export interface Property {
    id : number;
    name : string;
  } 

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, openModal: !state.openModal };
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, [action.payload.field]: action.payload.value },
      };
    case "RESET_FORM":
      return { ...state, formData: initialState.formData };
    case "SET_LIST_PROPERTIES":
      return { ...state, listProperties: action.payload };
    case "SET_TOAST":
      return {...state, showToast: !state.showToast}
    default:
      return state;
  }
}