import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input, INPUT_VARIATIONS } from "../../components/input/input";
import style from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import { links } from "../../App";
import GreenAPIController from "../../controllers/greenAPI.controller";
import { AUTH_FIELDS } from "../../api/greenAPI.api";

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
  const [error, setError] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const isGoodResponse = await GreenAPIController.setSettings(formFields);
    if (isGoodResponse) {
      navigate(links.chat);
    } else {
      setError(true);
    }
  };

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setError(false);
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1 className={style.title}>Введите учетные данные</h1>
        {error && <p className={style.error}>Данные введены неверно</p>}
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
      </div>
    </div>
  );
};
