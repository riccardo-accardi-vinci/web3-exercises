/* eslint-disable react-refresh/only-export-components */

import { ToastContainer } from 'react-toastify';
import './App.css'
import Welcome from './pages/Welcome';
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from 'react';
import Add from './pages/Add';
import List from './pages/List';

export const PageContext = createContext<{
    currentPage: string;
    setCurrentPage: (page: string) => void;
}>(null!);

const pages: { [key: string]: React.FunctionComponent } = {
  "Welcome": Welcome,
  "List": List,
  "Add": Add
}


function App() {
  const [currentPage, setCurrentPage] = useState<string>("Welcome");
  const CurrentPageComponent = pages[currentPage];

 function handlePageChange(page: string) {
    window.history.pushState(null, page, `/${page.toLowerCase()}`);
    setCurrentPage(page);
  }

  return (
  <PageContext.Provider value={{ currentPage, setCurrentPage: handlePageChange }}>
  <CurrentPageComponent />
</PageContext.Provider>
);
}

export default App
