import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import UserForm from "./components/UserForm";
import { Users } from "./interfaces/types";
import UserCard from "./components/UserCard";
import useCrud from "./hooks/useCrud";
import Alert from "./components/Alert";

function App() {
  const [updateInfo, setUpdateInfo] = useState<Users | null>(null);
  const [closeForm, setCloseForm] = useState<boolean>(true);

  const {
    createNewUsers,
    deleteUsers,
    updateUser,
    getData,
    users,
    isSuccessfully,
    alertInfo,
    hiddenAlert,
    setHiddenAlert,
  } = useCrud();
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="header-container">
        <h1 className="header__title">Users</h1>
        <button className="header__btn" onClick={() => setCloseForm(false)}>
          <i className="fa-solid fa-plus"></i> Add new User
        </button>
      </header>

      <div className={`form-container ${closeForm && "close__form"}`}>
        <UserForm
          createNewUsers={createNewUsers}
          updateInfo={updateInfo}
          updateUser={updateUser}
          setUpdateInfo={setUpdateInfo}
          setCloseForm={setCloseForm}
          closeForm={closeForm}
        />
      </div>
      <div className={`alert-container ${hiddenAlert && "hidden__alert"}`}>
        {alertInfo && (
          <Alert
            setHiddenAlert={setHiddenAlert}
            hiddenAlert={hiddenAlert}
            alertInfo={alertInfo}
            isSuccessfully={isSuccessfully}
            
          />
        )}
      </div>

      <div className="user-container">
        {users?.length? users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            deleteUsers={deleteUsers}
            setUpdateInfo={setUpdateInfo}
            setCloseForm={setCloseForm}
          />
        )):<p className="user__info">Add new Users...!</p>}
      </div>
    </div>
  );
}

export default App;
