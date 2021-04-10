import React, { useReducer } from "react";
const { ipcRenderer } = window.require('electron');

export const IPC_ACTIONS = {
    DEFAULT: "default",
    TOGGLE_SCORES: "toggle-scores",
    SET_QUARTER: "set-quarter",
    TIMER_PAUSE: "timer-pause",
    TIMER_PLAY: "timer-play",
    TIMER_SET: "timer-set",
    SCORE_UPDATE: "score-update",
    TEAM_NAME_UPDATE: "team-name-update",
    TEAM_SHORTNAME_UPDATE: "team-shortname-update",
    PLAYER_NAME_UPDATE: "player-name-update",
    PLAYER_NUMBER_UPDATE: "player-number-update"
};


let Data = {
    action: IPC_ACTIONS.DEFAULT,
    payload: {}
};

const ipcReducer = (state, action) => {
    switch (action.type) {
        case IPC_ACTIONS.TOGGLE_SCORES:
            Data.action = IPC_ACTIONS.TOGGLE_SCORES
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.SET_QUARTER:
            Data.action = IPC_ACTIONS.SET_QUARTER;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.TIMER_PAUSE:
            Data.action = IPC_ACTIONS.TIMER_PAUSE;
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.TIMER_PLAY:
            Data.action = IPC_ACTIONS.TIMER_PLAY;
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.TIMER_SET:
            Data.action = IPC_ACTIONS.TIMER_SET;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.SCORE_UPDATE:
            Data.action = IPC_ACTIONS.SCORE_UPDATE;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.TEAM_NAME_UPDATE:
            Data.action = IPC_ACTIONS.TEAM_NAME_UPDATE;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.TEAM_SHORTNAME_UPDATE:
            Data.action = IPC_ACTIONS.TEAM_SHORTNAME_UPDATE;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.PLAYER_NAME_UPDATE:
            Data.action = IPC_ACTIONS.PLAYER_NAME_UPDATE;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        case IPC_ACTIONS.PLAYER_NUMBER_UPDATE:
            Data.action = IPC_ACTIONS.PLAYER_NUMBER_UPDATE;
            Data.payload = action.payload
            ipcRenderer.send('request-mainprocess-action', Data);
            break;
        default:
            break;
    }
}


//ipcRenderer.send('request-mainprocess-action', Data);

ipcRenderer.on('store-data', (event, store) => {
    console.log(event);
    console.log(store)
});

export const IpcSendContext = React.createContext(null);

export const IpcSendProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ipcReducer);
    const contextValue = {
        state,
        dispatch
    };

    return (
        <IpcSendContext.Provider value={contextValue}>
            {children}
        </IpcSendContext.Provider>
    );
};
