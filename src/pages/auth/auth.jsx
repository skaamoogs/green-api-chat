import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input, INPUT_VARIATIONS } from "../../components/input/input";
import style from "./auth.module.scss";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { links } from "../../App";
import GreenAPIController from "../../controllers/greenAPI.controller";
import { AUTH_FIELDS } from "../../api/greenAPI.api";
import { storageService } from "../../service/storage/storage";

const inputs = [
  {
    name: AUTH_FIELDS.id,
    label: AUTH_FIELDS.id,
    type: "number",
  },
  {
    name: AUTH_FIELDS.token,
    label: AUTH_FIELDS.token,
    type: "password",
  },
];

export const Auth = () => {
  const [formFields, setFormFields] = useState({});
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  const currentUser = useLoaderData();

  const submitHandler = async (event) => {
    event.preventDefault();

    const accountState = await GreenAPIController.getAccountState(formFields);
    switch (accountState) {
      case "notAuthorized":
        setErrorText("Аккаунт не авторизован");
        break;
      case "authorized":
        const isGoodResponse = await GreenAPIController.setSettings(formFields);
        if (isGoodResponse) {
          storageService().set("messages", []);
          storageService().set("chats", {});
          storageService().set("currentUser", formFields);
          navigate(links.chat);
        } else {
          setErrorText("Данные введены неверно");
        }
        break;
      case "blocked":
        setErrorText("Аккаунт забанен");
        break;
      case "sleepMode":
        setErrorText("Аккаунт ушел в спящий режим");
        break;
      case "starting":
        setErrorText("Аккаунт в процессе запуска. Повторите позже");
        break;
      default:
        setErrorText("Данные введены неверно");
    }
  };

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setErrorText("");
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1 className={style.title}>Введите учетные данные</h1>
        {errorText && <p className={style.error}>{errorText}</p>}
        <form onSubmit={submitHandler}>
          {inputs.map((input) => (
            <Input
              className={style.input}
              key={input.name}
              name={input.name}
              label={input.label}
              value={formFields[input.name] ?? ""}
              onChange={changeInputHandler}
              variation={INPUT_VARIATIONS.FORM}
              required
            />
          ))}
          <Button type="submit" className={style.button}>
            Войти
          </Button>
        </form>
        {currentUser && (
          <Link to={links.chat} className={style.link}>
            В чат
          </Link>
        )}
      </div>
    </div>
  );
};
