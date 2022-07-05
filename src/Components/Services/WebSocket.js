import { useEffect, useRef, useState } from "react";
import {
  access_token,
  sendChatMessage,
  sendUserRead,
  sendUserTyping,
  webSocketEndpoint,
} from "../../Library/Constants";
import { WebSocketContext } from "../Context/Context";

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [response, setResponse] = useState(null);
  const webSocket = useRef(null);

  const connectWebSocket = () => {
    webSocket.current = new WebSocket(webSocketEndpoint);
  };

  useEffect(() => {
    connectWebSocket();

    webSocket.current.onopen = () => {
      console.log("WebSocket Open");
      setIsConnected(true);
    };
    webSocket.current.onclose = (event) => {
      console.log("Websocket Closed");
      setIsConnected(false);
      if (event.wasClean === false) {
        connectWebSocket();
      }
    };
    webSocket.current.onmessage = (event) => {
      setResponse(event.data);
    };
    webSocket.current.onerror = () => {
      connectWebSocket();
    };

    return () => {
      webSocket.current.close();
    };
  }, []);

  const sendRequest = (data) => {
    webSocket.current.send(JSON.stringify(data));
  };

  const sendMessage = (data) => {
    sendRequest({
      action: sendChatMessage,
      access_token,
      ...data,
    });
  };

  const sendTyping = (data) => {
    sendRequest({
      action: sendUserTyping,
      access_token,
      ...data,
    });
  };

  const sendRead = (data) => {
    sendRequest({
      action: sendUserRead,
      access_token,
      ...data,
    });
  };

  const webSocketData = [
    isConnected,
    response,
    setResponse,
    sendMessage,
    sendTyping,
    sendRead,
  ];

  return (
    <WebSocketContext.Provider value={webSocketData}>
      {children}
    </WebSocketContext.Provider>
  );
};
