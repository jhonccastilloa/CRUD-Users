import axios from "axios";
import { useState } from "react";
import { ALertInfo, Users } from "../interfaces/types";
const initValuesAlert = {
  title: "",
  message: "",
  status: "",
};
const crud = () => {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const [hiddenAlert, setHiddenAlert] = useState<boolean>(true);
  const [alertInfo, setAlertInfo] = useState<ALertInfo>(initValuesAlert);
  const getData = () => {
    const URL = `http://users-crud.academlo.tech/users/`;
    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };
  const createNewUsers = (data: Users) => {
    const URL = `http://users-crud.academlo.tech/users/`;
    axios
      .post(URL, data)
      .then(() => {
        getData();
        setIsSuccessfully(true);
        //The users <b>{alertInfo.name}</b> was {alertInfo.status} successfully
        const dataAlert = {
          title: "Add User",
          message: `The users  <b>${data.first_name} ${data.last_name}</b> was added successfully`,
          status: "added",
        };
        setAlertInfo(dataAlert);
        setHiddenAlert(false);
      })
      .catch((err) => {
        console.log(err);
        const dataAlert = {
          title: "Add User Error",
          message: `Make sure you fill in all the fields correctly`,
          status: "added",
        };
        setAlertInfo(dataAlert);
        setHiddenAlert(false);
        setIsSuccessfully(false);
      });
  };
  const deleteUsers = (id: number) => {
    const URL = `http://users-crud.academlo.tech/users/${id}/`;
    axios
      .delete(URL)
      .then(() => {
        getData();
        const dataAlert = {
          title: "Delete User",
          message: `The users with id <b>${id}</b>  was added successfully`,
          status: "removed",
        };
        setAlertInfo(dataAlert);
        setHiddenAlert(false);
        setIsSuccessfully(true);
      })
      .catch((err) => {
        console.log(err);
        const dataAlert = {
          title: "Delete User Error",
          message: `The users with id <b>${id}</b> could not be deleted`,
          status: "removed",
        };
        setAlertInfo(dataAlert);
        setHiddenAlert(false);

        setIsSuccessfully(false);
      });
  };

  const updateUser = (id: number, data: Users) => {
    const URL = `http://users-crud.academlo.tech/users/${id}/`;
    axios
      .put(URL, data)
      .then(() => {
        getData();
        setIsSuccessfully(true);
        const dataAlert = {
          title: "Edit User",
          message: `The users <b>${data.first_name} ${data.last_name}</b> was edited successfully`,
          status: "edited",
        };
        setAlertInfo(dataAlert);
        setHiddenAlert(false);
      })
      .catch((err) => {
        console.log(err);
        const dataAlert = {
          title: "Edit User Error",
          message: `Make sure you fill in all the fields correctly`,
          status: "added",
        };
        setAlertInfo(dataAlert);
        setHiddenAlert(false);

        setIsSuccessfully(false);
      });
  };
  return {
    users,
    createNewUsers,
    deleteUsers,
    updateUser,
    getData,
    isSuccessfully,
    setHiddenAlert,
    hiddenAlert,
    setAlertInfo,
    alertInfo,
  };
};
export default crud;
