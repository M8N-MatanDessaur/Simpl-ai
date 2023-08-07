import React from "react";

import FullViewContainer from "./Components/FullViewContainer";
import ChatBot from "./Components/ChatBot";
import IntroContainer from "./Components/IntroContainer";

export default function App() {
  return (
    <FullViewContainer theme="#1b092f">
      <IntroContainer/>
      <ChatBot/>
    </FullViewContainer>
  );
}
