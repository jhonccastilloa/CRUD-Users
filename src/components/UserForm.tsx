import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ALertInfo, Users } from "../interfaces/types";
import "./style/useForm.css";
interface UserFormProps {
  createNewUsers: (value: Users) => void;
  updateInfo: Users | null;
  updateUser: (value: number, value2: Users) => void;
  setUpdateInfo: (value: null) => void;
  setCloseForm: (value: boolean) => void;
  closeForm: boolean;
}
const UserForm: React.FC<UserFormProps> = ({
  createNewUsers,
  updateInfo,
  updateUser,
  setUpdateInfo,
  setCloseForm,
  closeForm,
}) => {
  const { register, reset, handleSubmit } = useForm<Users>();

  useEffect(() => {
    updateInfo && reset(updateInfo);
  }, [updateInfo]);
  const submit: SubmitHandler<Users> = (data) => {
    console.log(data);
    if (updateInfo) {
      updateUser(updateInfo.id, data);
      setUpdateInfo(null);
    } else {
      createNewUsers(data);
    }
    setCloseForm(true);
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
  };

  const handleCLickCancel = () => {
    setUpdateInfo(null);
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
  };
  return (
    <form
      className={`form ${closeForm && "formHidden"}`}
      onSubmit={handleSubmit(submit)}
    >
      <div className="fomr__x" onClick={() => setCloseForm(true)}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <h1 className="form_title">
        {updateInfo ? "Update User" : "Create User"}
      </h1>
      <div className="form__div">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          className="form__input"
          type="email"
          id="email"
          placeholder="type an email"
          {...register("email")}
        />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          placeholder="type a password"
          {...register("password")}
        />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="first_name">
          First Name
        </label>
        <input
          className="form__input"
          type="text"
          id="first_name"
          placeholder="type a first name"
          {...register("first_name")}
        />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="last_name">
          Last Name
        </label>
        <input
          className="form__input"
          type="text"
          id="last_name"
          placeholder="type a last name"
          {...register("last_name")}
        />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="birthday">
          Birthday
        </label>
        <input
          className="form__input"
          type="date"
          id="birthday"
          {...register("birthday")}
        />
      </div>
      <div className="form__buttons">
        <button className="form__btn">Submit</button>
        {updateInfo && (
          <button
            className="form__btn form__btn--warning"
            onClick={handleCLickCancel}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
