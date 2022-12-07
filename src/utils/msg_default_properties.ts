import { Message } from "../@types/dtos/message";

export function messageDefaultProperties() {

  const id = Math.random().toString(36).substr(2, 9)
  const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const type = 'user'

  return {
    id,
    time,
    type
  }
}