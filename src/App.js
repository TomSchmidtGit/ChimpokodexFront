import React, { useState, useContext, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, styled } from "styled-components";
import { InputText, Clock, Section, Heading } from "./components/atoms";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";
import { Menu } from "./components/organisms";
import { LoginForm, ChimpokodexTable } from "./components/organisms";
import { MenuButton, NightModeSwitch } from "./components/molecules";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import HttpExample from "./components/atoms/HttpExample/HttpExample";
import { NightModeProvider } from "./contexts";
import TodoList from "./components/organisms/TodoList/TodoList";
import { Provider } from "react-redux";
import { store } from "./store";
import Playlist from "./components/organisms/Playlist/Playlist";

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }


const menuData = [
  {
    icon: <FaPlus />,
    text: "Chimpokodex",
    slug: "chimpokodex",
  },
  {
    icon: <FaPen></FaPen>,
    text: "Edit",
    slug: "Edit",
  },
  {
    icon: <FaTrash></FaTrash>,
    text: "Delete",
    slug: "Delete",
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
  const [page, setPage] = useState("chili");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);
  const invert = () => (isNightMode ? night : day);
  const [chimpokodexData, setChimpokodexData] = useState([]);

  const fetchChimpokodexData = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/chimpokodex');
        const data = await response.json();
        setChimpokodexData(data); // Stockez les données dans l'état
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
};

const handleMenuClick = (slug) => {
  setPage(slug);
  if (slug === "chimpokodex") {
    fetchChimpokodexData();
  }
  // Ajoutez d'autres conditions ici pour d'autres éléments de menu si nécessaire
};


  const handleNightMode = () => {
    setIsNightMode(!isNightMode);
  };
  
  const renderPage = () => {
    switch (page) {
      case "Edit":
        return <div><Clock /></div>;
      case "Delete":
        return <Playlist />;
      case "chimpokodex":
        return <ChimpokodexTable />;
      default:
        return <TodoList />;
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
