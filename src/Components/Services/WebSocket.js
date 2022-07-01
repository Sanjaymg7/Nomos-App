import { useEffect, useRef, useState } from "react";
import { WebSocketContext } from "../Context/Context";

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [response, setResponse] = useState(null);
  const webSocket = useRef(null);

  // const connectWebSocket = () => {
  //   webSocket.current = new WebSocket(
  //     `wss://websocket.nomos.net/V4?access_token=${localStorage.getItem(
  //       "access_token"
  //     )}`
  //   );
  // };

  const connectWebSocket = () => {
    webSocket.current = new WebSocket(
      `wss://ws2.juegogames.com/NOMOS-V3?access_token=${localStorage.getItem(
        "access_token"
      )}`
    );
  };

  useEffect(() => {
    connectWebSocket();

    webSocket.current.onopen = () => {
      setIsConnected(true);
    };
    webSocket.current.onclose = (event) => {
      setIsConnected(false);
      if (event.wasClean === false) {
        connectWebSocket();
      }
    };
    webSocket.current.onmessage = (event) => {
      setResponse(event.data);
    };
    webSocket.current.onerror = (err) => {
      connectWebSocket();
    };

    return () => {
      webSocket.current.close();
    };
  }, []);

  const sendRequest = (data) => {
    webSocket.current.send(JSON.stringify(data));
  };
  const webSocketData = [isConnected, response, setResponse, sendRequest];

  return (
    <WebSocketContext.Provider value={webSocketData}>
      {children}
    </WebSocketContext.Provider>
  );
};
