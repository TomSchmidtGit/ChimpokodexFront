import React, { useState, useContext, createContext } from "react";
import "./App.css";
import { ThemeProvider, styled } from "styled-components";
import { FaBook, FaGamepad} from "react-icons/fa";
import { Menu } from "./components/organisms";
import { LoginForm, ChimpokodexTable } from "./components/organisms";
import { NightModeSwitch } from "./components/molecules";
import { NightModeProvider } from "./contexts";
import { Provider } from "react-redux";
import { store } from "./store";

const menuData = [
  {
    icon: <FaBook />,
    text: "Consulter le Chimpokodex",
    slug: "chimpokodex",
  },
  {
    icon: <FaGamepad />,
    text: "Jouer",
    slug: "play",
  },
];

const night = {
  primary: "white",
  secondary: "#282c34",
};

const day = {
  primary: "#282c34",
  secondary: "white",
};

const StyledAppContainer = styled.div`
  background: ${(props) => props.theme.secondary};
  height: 300vh;
  width: 100vw;
`;

function App() {
  const [page, setPage] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);
  const invert = () => (isNightMode ? night : day);
  
  const renderPage = () => {
    switch (page) {
      case "chimpokodex":
        return <ChimpokodexTable />;
      case "play":
        return;
      default:
        return;
    }
  };
  
  const handler = (pageName) => {
    setPage(pageName);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={invert(isNightMode)}>
        <NightModeProvider value={{ changeNightMode: () => setIsNightMode(!isNightMode), nightMode: isNightMode }}>
          <StyledAppContainer>
            {isAuthenticated && (
              <>
                <Menu data={menuData} handler={handler}>
                  <NightModeSwitch></NightModeSwitch>
                </Menu>
                {renderPage()}
              </>
            )}
            {!isAuthenticated && <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />}
          </StyledAppContainer>
        </NightModeProvider>
      </ThemeProvider>
    </Provider>
  );

}

export default App;
