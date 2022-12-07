import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useScoketStore } from "../store/socket";
import { useUserStore } from "../store/user";

export const useConnection = (room_id: string) => {

  const [username] = useUserStore(state => [state.username]);
  const [setScoketId] = useScoketStore(state => [state.setSocketId]);

  const [connected, setConnected] = useState(false);

  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(
      'https://archaicchatserver-production.up.railway.app/',
      { transports: ['websocket'] }
    );

    socket.current?.on('connect', () => {
      socket.current?.emit('join-room', {
        room_id,
        username: username || 'Anônimo'
      });

      setConnected(true)
      setScoketId(socket.current?.id || '');
    })

    return () => {
      socket.current?.disconnect();
    }
  }, []);

  return { connected, socket: socket.current }
}	