export const INITIAL_STATE = {
  activationCode: "",
  email: "",
  password: "",
};

export const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};
