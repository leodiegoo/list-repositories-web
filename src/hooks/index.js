import { createContext, useCallback, useState, useContext } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

const AppContext = createContext({});

export const AppProvider = (props) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("@GR:token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return token;
    }
    return "";
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const signIn = useCallback(async (token) => {
    localStorage.setItem("@GR:token", token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuth(token);
  }, []);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const putStarRepository = async ({ owner, repository }) => {
    const response = await api.put(`/repositories/${owner}/${repository}`);

    return response;
  };

  const deleteStarRepository = async ({ owner, repository }) => {
    const response = await api.delete(`/repositories/${owner}/${repository}`);

    return response;
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        signIn,
        modalIsOpen,
        toggleModal,
        putStarRepository,
        deleteStarRepository,
        repositories,
        setRepositories,
        toast,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);

  return context;
}
