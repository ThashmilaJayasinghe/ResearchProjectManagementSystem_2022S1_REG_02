import React, { useEffect, useState } from 'react'
import MDSpinner from "react-md-spinner";
const appID = process.env.REACT_APP_ID;
const region = process.env.REACT_APP_REGION;
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const wid = process.env.REACT_APP_W1;

const Stu_chat = () => {

    localStorage.setItem("cc-uid", "IT20123456")
    localStorage.setItem("agent-uid", "nuwankodagoda")

  console.log("user : " + localStorage.getItem("cc-uid"))
  console.log("agent : " + localStorage.getItem("agent-uid"))

  const [load, setLoad] = useState(true);
    const [studentName, setStudentName] = useState("IT20253462Name");
    const [studentEmail, setStudentEmail] = useState("")

  useEffect(() => {
    setLoad(true);
    window.CometChatWidget.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then((response) => {
      console.log("Initialization completed successfully");
      //You can now call login function.
      let uid = localStorage.getItem("cc-uid");
      if (uid === null || uid == "") {
        // create new user
        const uid = "user" + new Date().getSeconds().toString();
        const user = new window.CometChatWidget.CometChat.User(uid);
        user.setName(studentName);
        window.CometChatWidget.createOrUpdateUser(user).then((user) => {
          // Proceed with user login

          window.CometChatWidget.login({
            uid: uid,
          }).then((loggedInUser) => {
            localStorage.setItem("cc-uid", loggedInUser.uid);
            // Proceed with launching your Chat Widget
            window.CometChatWidget.launch({
              widgetID: wid,
              roundedCorners: "true",
              docked: "true",
              height: "500px",
              width: "400px",
              defaultID: localStorage.getItem("agent-uid"),
              defaultType: "user", //user or group
            });
            setLoad(false);
            console.log(loggedInUser)
          }).catch(err => {
            console.log("error occured when login : " + err)
          });
        });
      } else {
        window.CometChatWidget.login({
          uid: uid,
        }).then((user) => {
          window.CometChatWidget.launch({
            widgetID: wid,
            roundedCorners: "true",
            docked: "true",
            height: "500px",
            width: "400px",
            defaultID: localStorage.getItem("agent-uid"),
            defaultType: "user", //user or group
          });
          setLoad(false);
          console.log(user)
        }, 
        (error) => {
        
          console.log("error in register: " + error )
          const uid = localStorage.getItem("cc-uid")
          const user = new window.CometChatWidget.CometChat.User(uid);
          user.setName(studentName);
          window.CometChatWidget.createOrUpdateUser(user).then((user) => {
            window.CometChatWidget.login({
              uid: uid,
            }).then((loggedInUser) => {
              localStorage.setItem("cc-uid", loggedInUser.uid);
              // Proceed with launching your Chat Widget
              window.CometChatWidget.launch({
                widgetID: wid,
                roundedCorners: "true",
                docked: "true",
                height: "500px",
                width: "400px",
                defaultID: localStorage.getItem("agent-uid"),
                defaultType: "user", //user or group
              });
              setLoad(false);
              console.log(loggedInUser)
            }).catch(err => {
              console.log("error occured when login : " + err)
            });
          });

        }
        )
      }
    });
  }, []);
  if (load) {
    return (
      <div className="container" style={{paddingTop: "2.5rem"}}>
        <MDSpinner />
      </div>
    );
  }

  return <div className="App"></div>

}

export default Stu_chat