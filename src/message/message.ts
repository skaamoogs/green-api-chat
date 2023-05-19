import Handlebars from "handlebars";
import Block from "../../../../modules/block";
import { IMessage } from "../../../../utils/interfaces";
import messageTemplate from "./message.tmpl";

export interface IMessageProps extends IMessage {
  isMine: boolean;
  readMarkImage: string;
  date?: string,
}

export default class Message extends Block<IMessageProps> {
  render() {
    const template = Handlebars.compile(messageTemplate);
    return this.compile(template, this.props);
  }
}
