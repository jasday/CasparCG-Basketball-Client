//Context
import {IpcSendProvider} from "./Components/Contexts/ipcSendContext";
import {IpcReceiveProvider} from "./Components/Contexts/ipcReceiveContext";

//Components
import Header from "./Components/Header";
import MainGrid from "./Components/MainGrid";
import Footer from "./Components/Footer";

const App = () => {
  return (
      <IpcReceiveProvider>
        <IpcSendProvider>
          <Header />
          <MainGrid />
          <Footer />
        </IpcSendProvider>
      </IpcReceiveProvider>
  );
};

export default App;
