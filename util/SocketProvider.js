// Programmer Name     : Lim Wei Hau
// Program Name        : SocketProvider.js
// Description         : util - a React Context to allow all components to access socket at any file
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useContext, useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import io from "socket.io-client";

// redux/dataActions
import { connect } from "react-redux";
import { receiveMessage } from "../redux/actions/dataActions";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

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
    // const newSocket = io("https://apu-fyp-api.herokuapp.com");

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
