import React, { useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import Toast from "../components/Toast";
const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
//   const showToast = (toastMessage) => {
//     const { message, type } = toastMessage;
//     const ToastMessage = { message, type };
//     console.log(ToastMessage);
//     return toastMessage;
//   };
  const [toast, setToast] = useState(undefined);
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContextProvider;
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
