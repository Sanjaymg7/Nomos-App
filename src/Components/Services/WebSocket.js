import { useEffect, useRef, useState } from "react";
import { WebSocketContext } from "../Context/Context";

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [response, setResponse] = useState(null);
  const webSocket = useRef(null);

  const connectWebSocket = () => {
    webSocket.current = new WebSocket(
      `wss://websocket.nomos.net/V4?access_token=${localStorage.getItem(
        "access_token"
      )}`
    );
  };

  useEffect(() => {
    connectWebSocket();

    webSocket.current.onopen = () => {
      console.log("Websocket Connected");
      setIsConnected(true);
    };
    webSocket.current.onclose = (event) => {
      console.log("Websocket Closed");
      setIsConnected(false);
      if (event.wasClean === false) {
        connectWebSocket();
      }
    };
    webSocket.current.onmessage = (event) => setResponse(event.data);
    webSocket.current.onerror = (err) => {
      console.log("Websocket error occured", err);
    };

    return () => {
      webSocket.current.close();
    };
  }, []);

  const webSocketData = [
    isConnected,
    response,
    webSocket.current?.send.bind(webSocket.current),
  ];

  return (
    <WebSocketContext.Provider value={webSocketData}>
      {children}
    </WebSocketContext.Provider>
  );
};
