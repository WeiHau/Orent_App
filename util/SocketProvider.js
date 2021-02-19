import React, { useContext, useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import io from "socket.io-client";

// redux/dataActions
import { connect } from "react-redux";
import { receiveMessage } from "../redux/actions/dataActions";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

//https://www.youtube.com/watch?v=tBr-PybP_9c
//https://github.com/WebDevSimplified/Whatsapp-Clone/tree/master/client/src/contexts
const SocketProvide = (props) => {
  const [socket, setSocket] = useState();
  let socketR = useRef(null).current; // to use this inside functions
  const { children, handle } = props;

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    initializeSocket();
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      disconnectSocket();
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const initializeSocket = () => {
    const newSocket = io("http://192.168.0.168:5000");

    newSocket.on("connect", (data) => {
      // sending user handle to socket io
      newSocket.emit("storeClientInfo", {
        customId: handle,
      });

      // clear buffer (in case)
      newSocket.sendBuffer = [];
    });

    newSocket.on("receive-message", (message) => {
      // store/add into state (probably redux)
      // console.log("received message: " + JSON.stringify(message));

      // user = sender
      if (message.sender === handle) return;

      props.receiveMessage(message);
    });

    socketR = newSocket;
    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    socketR.emit("pre-disconnect", {
      customId: handle,
    });
    socketR.close();
  };

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    if (appState.current === "active") {
      initializeSocket();
    } else if (appState.current === "background") {
      disconnectSocket();
    }
  };

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const mapActionsToProps = {
  receiveMessage,
};

export const SocketProvider = connect(null, mapActionsToProps)(SocketProvide);
