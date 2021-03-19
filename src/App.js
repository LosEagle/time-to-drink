import React from "react";
import { hot } from "react-hot-loader/root";
import { IonApp } from "@ionic/react";
import { Timer } from "./components/timer/Timer.jsx";
import { Header } from "./components/header/Header";

const App = () => (
  <IonApp>
    <div className="container mx-auto">
      <Header />
      <Timer />
    </div>
  </IonApp>
);

export default hot(App);
