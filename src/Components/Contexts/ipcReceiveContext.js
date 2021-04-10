import React, {useState} from "react";
const { ipcRenderer } = window.require('electron');


//ipcRenderer.send('request-mainprocess-action', Data);

export const IpcReceiveContext = React.createContext(null);

export const IpcReceiveProvider = ({ children }) => {
    const [casparColour, setCasparColour] = useState("#ff0000");
    const [templateColour, setTemplateColour] = useState("#ff0000");
    const [statusMessage, setStatusMessage] = useState();

    ipcRenderer.on('store-data', (event, store) => {
        switch (store.header){
            case ("CG-CONNECTED"):
                setCasparColour("#5af63b");
                break;
            case ("CG-CONNECTING"):
                setCasparColour("#ffd909");
                break;
            case ("CG-CONNECTION-ERROR"):
                setCasparColour("#ff0000");
                break;
            case ("TEMPLATE-CONNECTED"):
                setTemplateColour("#5af63b");
                break;
            case ("TEMPLATE-CONNECTING"):
                setTemplateColour("#ffd909");
                break;
            case ("TEMPLATE-CONNECTION-ERROR"):
                setTemplateColour("#ff0000");
                break;
            case ("CG-RECEIVED-DATA"):
                setStatusMessage(store.value);
                break;
            default:
                break;
        }
    });

    const contextValue = {
        casparColour,
        templateColour,
        statusMessage
    };

    return (
        <IpcReceiveContext.Provider value={contextValue}>
            {children}
        </IpcReceiveContext.Provider>
    );
};
