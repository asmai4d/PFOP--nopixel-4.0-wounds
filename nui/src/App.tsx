import type { Component } from "solid-js";
import { WoundsProvider } from "./WoundsProvider";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
import Incapacitated from "./components/Incapacitated";
import Character from "./components/Character";
import Inspection from "./components/Inspection";
import QuickInspection from "./components/QuickInspection";
import styles from "./App.module.scss";

const App: Component = () => {
  return (
    <WoundsProvider>
      <DragDropProvider>
        <DragDropSensors>
          <div class={styles.App}>
            <Incapacitated />
            <Character />
            <Inspection />
            <QuickInspection />
          </div>
        </DragDropSensors>
      </DragDropProvider>
    </WoundsProvider>
  );
};

export default App;