import style from "./message.module.scss";

export const Message = (props) => {
  const { id, text, status, time } = props;

  return (
    <div className={style.container}>
      <p class={style.text}></p>
      <div class={style.info}>
        <img class="read-mark" src="{{readMarkImage}}" alt="read mark" />
        <span class="send-time {{#if isMine}}ny-message-time{{/if}}">
        </span>
      </div>
    </div>
  );
};
