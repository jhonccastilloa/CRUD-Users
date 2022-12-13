import React, { FC } from "react";
import { ALertInfo } from "../interfaces/types";
import "./style/alert.css";

interface AlertProps {
  setHiddenAlert: (value: boolean) => void;
  hiddenAlert: boolean;
  alertInfo: ALertInfo;
  isSuccessfully: boolean;
}
const Alert: FC<AlertProps> = ({
  setHiddenAlert,
  hiddenAlert,
  alertInfo,
  isSuccessfully,
}) => {
  return (
    <div className={`alert ${hiddenAlert && "alertHidden"}`}>
      <div className="alert__x" onClick={() => setHiddenAlert(true)}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <h2 className="alert__title">{alertInfo.title}</h2>
      <p
        className="alert__message"
        dangerouslySetInnerHTML={{ __html: alertInfo.message }}
      />
      <button onClick={() => setHiddenAlert(true)} className="alert__btn">
        Accept
      </button>
    </div>
  );
};

export default Alert;
