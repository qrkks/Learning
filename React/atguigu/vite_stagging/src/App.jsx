import PostsList from "./components/PostsList";
// import Mobx from "./components/Mobx";
import MainHeader from "./components/MainHeader";
import {useState} from "react";
// import CookieConsent from "./components/CookieConsent";
import CookieConsentMT from "./components/CookieConsentMT";

  const App = () => {
  // for modal to PostsList & MainHeader
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = (show) => {
    setIsModalVisible(show);
  };

  return (
    <div className="bg-gray-100 fluid-container">
      <MainHeader isModalVisible={isModalVisible} handleModal={handleModal}/>
      <main>
        <PostsList isModalVisible={isModalVisible} handleModal={handleModal} />
      </main>
      {/* <Mobx /> */}
      {/* <CookieConsent/> */}
      <CookieConsentMT/>
    </div>
  );
};

export default App;