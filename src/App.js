import React, { useState} from "react";
import { ThemeProvider, styled } from "styled-components";
import { FaBook, FaUsers, FaHome} from "react-icons/fa";
import { LoginForm, ChimpokodexTable, Menu, ChimpokomonSelector } from "./components/organisms";
import { NightModeSwitch } from "./components/molecules";
import { NightModeProvider } from "./contexts";
import { Provider } from "react-redux";
import { store } from "./store";

const menuData = [
  {
    icon: <FaHome />,
    text: "",
    slug: "home",
  },
  {
    icon: <FaBook />,
    text: " Consulter le Chimpokodex",
    slug: "chimpokodex",
  },
  {
    icon: <FaUsers />,
    text: " Composer votre équipe",
    slug: "team",
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
  min-height: 100vh;
  width: 100%;
`;

function App() {
  const [page, setPage] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const invert = () => (isNightMode ? night : day);
  
  const renderPage = () => {
    switch (page) {
      case "home":
        return;
      case "chimpokodex":
        return <ChimpokodexTable />;
      case "team":
        return <ChimpokomonSelector />;
      default:
        return;
    }
  };
  
  const handler = (pageName) => {
    setPage(pageName);
    setIsItemSelected(pageName !== "home");
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={invert(isNightMode)}>
        <NightModeProvider value={{ changeNightMode: () => setIsNightMode(!isNightMode), nightMode: isNightMode }}>
          <StyledAppContainer>
            {isAuthenticated && (
              <>
                <Menu data={menuData} handler={handler} isItemSelected={isItemSelected}>
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
