import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import style from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import { links } from "../../App";
import GreenAPIController from "../../controllers/greenAPI.controller";
import { API_HOST, AUTH_FIELDS, createURL } from "../../api/greenAPI.api";
import axios from "axios";

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

  const submitHandler = async (event) => {
    event.preventDefault();
    /*     const endpoint = createURL("SetSettings", formFields);
    const url = `${API_HOST}${endpoint}`;
    const response = await axios.post(url, {
      webhookUrl: "",
      outgoingWebhook: "yes",
      stateWebhook: "yes",
      incomingWebhook: "yes",
    }); */
    //console.log(response)
    const isGoodResponse = await GreenAPIController.setSettings(formFields);
    if (isGoodResponse) {
      navigate(links.chat);
    }
  };

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Введите учетные данные</h1>
        <form onSubmit={submitHandler}>
          {inputs.map((input) => (
            <Input
              key={input.name}
              name={input.name}
              label={input.label}
              value={formFields[input.name] ?? ""}
              onChange={changeInputHandler}
              required
            />
          ))}
          <Button type="submit">Нажми на меня!!!</Button>
        </form>
      </div>
    </div>
  );
};
