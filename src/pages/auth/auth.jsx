import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import style from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import { links } from "../../App";

const inputs = [
  {
    name: "idInstance",
    label: "idInstance",
    type: "number",
  },
  {
    name: "apiTokenInstance",
    label: "apiTokenInstance",
    type: "password",
  },
];

export const Auth = () => {
  const [formFields, setFormFields] = useState({});
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    navigate(links.chat);
  };

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Введите учетные данные</h1>
        <form>
          {inputs.map((input) => (
            <Input
              key={input.name}
              name={input.name}
              label={input.label}
              value={formFields[input.name] ?? ""}
              onChange={changeInputHandler}
            />
          ))}
          <Button onClick={submitHandler} type="submit">
            Нажми на меня!!!
          </Button>
        </form>
      </div>
    </div>
  );
};
