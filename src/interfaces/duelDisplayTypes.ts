type DisplayActionTypes = "INCREMENT" | "DECREMENT"

export type DisplayStates = {
    lp: number
}

export type DisplayActions = {
    type: DisplayActionTypes;
    payload: number;
  };