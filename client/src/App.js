//Context
import {IpcProvider} from "./Components/ipcContext";

//Components
import Header from "./Components/Header";
import MainGrid from "./Components/MainGrid";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <IpcProvider>
      <Header />
      <MainGrid />
      <Footer />
    </IpcProvider>
  );
};

export default App;
