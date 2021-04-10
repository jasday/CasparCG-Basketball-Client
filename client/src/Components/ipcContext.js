import React, { useReducer } from "react";
const { ipcRenderer } = require('electron');

export const IPC_ACTIONS = {
    DEFAULT: "default",
    TOGGLE_SCORES: "toggle-scores",
    SET_QUARTER: "set-quarter",
    TIMER_PAUSE: "timer-pause",
    TIMER_PLAY: "timer-play",
    TIMER_SET: "timer-set"
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
        case IPC_ACTIONS.TIMER_set:
            Data.action = IPC_ACTIONS.TIMER_SET;
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

export const IpcContext = React.createContext(null);

export const IpcProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ipcReducer);
    const contextValue = {
        state,
        dispatch
    };

    return (
        <IpcContext.Provider value={contextValue}>
            {children}
        </IpcContext.Provider>
    );
};
