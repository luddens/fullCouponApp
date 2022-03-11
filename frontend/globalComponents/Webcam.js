import React, {useCallback, useState, useEffect} from "react";
// import io from "socket.io-client";

// https://tsh.io/blog/how-to-write-video-chat-app-using-webrtc-and-nodejs/
// https://www.youtube.com/watch?v=DvlyzDZDEq4
// https://www.youtube.com/watch?v=uTdUUpfA83s object identification in react
// https://codelabs.developers.google.com/codelabs/tensorflowjs-object-detection#0

export default function Webcam(){
  const [response, setResponse] = useState("");
  const newUserID = 10; 
  const ENDPOINT = "http://localhost:8080/";

  // useEffect(() => {
  //   const socket = io(ENDPOINT, {
  //     withCredentials: true,
  //     // reconnectionDelay: 1000,
  //     // reconnection: true,
  //     // reconnectionAttemps: 10,
  //     // transports: ["websocket"],
  //     // agent: false,
  //     // upgrade: true,
  //     // rejectUnauthorized: false,
  //     extraHeaders: {
  //       // "Access-Control-Allow-Origin": "http://localhost:3000/"
  //     }
  //   });

  //   socket.emit("join-room", window.roomID, newUserID);
  // }, []);

  return (
    <div id = "webcam">
      <time dateTime={response}>{response}</time>
      <div id = "videogrid"></div>
    </div>
  );
} 
 
Webcam.displayName = "Webcam"; 
