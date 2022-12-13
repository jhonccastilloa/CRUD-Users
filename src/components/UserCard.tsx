import React, { useEffect, useState } from "react";
import { ALertInfo, Users } from "../interfaces/types";
import Confirm from "./Confirm";
import "./style/useCard.css";
interface UserCardProps {
  user: Users;
  deleteUsers: (value: number) => void;
  setUpdateInfo: (value: Users) => void;
  setCloseForm: (value: boolean) => void;
}
const UserCard: React.FC<UserCardProps> = ({
  user,
  deleteUsers,
  setUpdateInfo,
  setCloseForm,
}) => {
  const [hiddenConfirm, setHiddenConfirm] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const handleEdit = () => {
    setCloseForm(false);
    setUpdateInfo(user);
  };
  const handleClickDelete = () => {
    setHiddenConfirm(false);
    // deleteUsers(user.id);
  };
  useEffect(() => {
    if (isConfirm) {
      deleteUsers(user.id);
      setHiddenConfirm(true);
      setIsConfirm(false);
    }
  }, [isConfirm]);
  return (
    <>
      <div className="card">
        <h2 className="card__title">
          {user.first_name} {user.last_name}
        </h2>
        <ul className="card__body">
          <li className="card__item">
            <span className="card__span"><i className="fa-solid fa-envelope"></i> Email:</span>
            <p> {user.email}</p>
          </li>
          <li className="card__item">
            <span className="card__span"><i className="fa-solid fa-cake-candles"></i> Birthday:</span>
            <p> {user.birthday}</p>
          </li>
        </ul>

        <footer className="card__footer">
          <button
            className="card__btn card__btn--trash"
            onClick={handleClickDelete}
          >
            <i className="card__icon fa-solid fa-trash"></i>
          </button>
          <button className="card__btn card__btn--edit" onClick={handleEdit}>
            <i className="card__icon fa-solid fa-pen-to-square"></i>
          </button>
        </footer>
      </div>
      <div
        className={`confirm-container ${hiddenConfirm && "hidden__confirm"}`}
      >
        <Confirm
          hiddenConfirm={hiddenConfirm}
          setHiddenConfirm={setHiddenConfirm}
          setIsConfirm={setIsConfirm}
        />
      </div>
    </>
  );
};

export default UserCard;
