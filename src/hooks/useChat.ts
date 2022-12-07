import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { useMessagesStore } from "../store/messages";
import { useUserStore } from "../store/user";

import { Message } from "../@types/dtos/message";
import { Room } from "../@types/dtos/room";
import { User } from "../@types/dtos/user";
import { messageDefaultProperties } from "../utils/msg_default_properties";

export const useChat = (socket: Socket | undefined, room_id: string) => {

  const {
    messages,
    addMessage,
    clearMessages,
    currentReplyedMessage,
    setCurrentReplyedMessage
  } = useMessagesStore(state => state);

  const [username, color] = useUserStore(state => [state.username, state.color]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://archaicchatserver-production.up.railway.app/rooms')
      .then(response => response.json())
      .then(data => {
        data.forEach((room: Room) => {
          if (room.id === room_id) {
            setUsers(room.users);
          }
        })
      })
  }, [])

  useEffect(() => {
    socket?.on('message-to-app', (newMessage) => {
      addMessage(newMessage);
    });

    socket?.on('user-connected', (username) => {
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        message: `${username} entrou na sala`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'system'
      });

      setUsers(users => [...users, username]);
    })

    socket?.on('user-left', (username) => {
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        message: `${username} foi de base`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'system'
      });

      setUsers(users => users.filter(user => user !== username));
    })

    return () => {
      clearMessages()
    }
  }, [socket])

  function sendMessage(message: string) {

    const defaultProperties = messageDefaultProperties()

    const socket_id = socket?.id
    const reply = currentReplyedMessage

    const newMessage: Message = {
      ...defaultProperties,
      message,
      reply,
      username,
      color,
      socket_id,
      room_id
    }

    socket?.emit('message-to-server', newMessage);

    addMessage(newMessage)
    setCurrentReplyedMessage(null)
  }

  return {
    messages,
    sendMessage,
    users
  }
}