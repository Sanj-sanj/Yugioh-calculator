type DisplayActionTypes = "INCREMENT" | "DECREMENT"

export type PlayerData = {
    lp: number
    playerName: PlayerNames
}
export type PlayerNames = "player1" | "player2"

export type DisplayStates = {
    player1: PlayerData,
    player2: PlayerData
}
/**
 * @param {number} payload.operand2 - is like bro
 */
export type DisplayActions = {
    type: DisplayActionTypes;
    payload: {
        operand2: number,
        player: PlayerNames
    };
  };