import React, { createContext, useContext, useState } from "react";
import AlertComponent, { IAlertProps } from "../components/AlertComponent";

type configState = Pick<IAlertProps, "duration" | "message" | "severity">;
type AlertPropsData = IAlertProps & {
  openAlert: (props: configState) => void;
};

const defultAlertContextData: AlertPropsData = {
  open: false,
  duration: 6000,
  message: "",
  severity: "info",
  onClose: () => {},
  openAlert: (props: configState) => {},
};

const AlertContext = createContext<AlertPropsData>(defultAlertContextData);

const AlertProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(defultAlertContextData.open);
  const [config, setConfig] = useState<configState>({
    duration: defultAlertContextData.duration,
    message: defultAlertContextData.message,
    severity: defultAlertContextData.severity,
  });

  const onClose = () => {
    setOpen(false);
  };

  const openAlert = (props: configState) => {
    setConfig(props);
    setOpen(true);
  };

  return (
    <AlertContext.Provider
      value={{
        ...config,
        open,
        onClose,
        openAlert,
      }}
    >
      <AlertComponent
        message={config.message}
        open={open}
        severity={config.severity}
        onClose={onClose}
      />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

export const useAlertContext = () => useContext(AlertContext);
