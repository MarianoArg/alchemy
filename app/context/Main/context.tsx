import React from "react";
import appReducer from "./reducer";
import InitialState from "./state";
import { State, ActionCreators, SidebarShape } from "./types";
import {
  setSidebarItems,
  addItemToBoard,
  removeItemFromBoard,
  moveItem,
  updateItem,
  init,
} from "./actions";
import { Component } from "~/types/components";

const AppStateContext = React.createContext<State>(InitialState);
const AppUpdaterContext = React.createContext<ActionCreators | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, InitialState);

  const actions = {
    setSidebarItems: (data: SidebarShape) => dispatch(setSidebarItems(data)),
    addItemToBoard: (item: Component) => dispatch(addItemToBoard(item)),
    removeItemFromBoard: (id: string) => dispatch(removeItemFromBoard(id)),
    moveItem: (item: Component | null) => dispatch(moveItem(item)),
    updateItem: (item: Component) => dispatch(updateItem(item)),
    init: (key: string) => dispatch(init(key)),
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppUpdaterContext.Provider value={actions}>
        {children}
      </AppUpdaterContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const authState = React.useContext(AppStateContext);
  if (typeof authState === "undefined") {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return authState;
}

function useAppUpdater() {
  const actions = React.useContext(AppUpdaterContext);
  if (typeof actions === "undefined") {
    throw new Error("useAppUpdater must be used within a AppProvider");
  }

  return actions;
}

export { AppProvider, useAppState, useAppUpdater };
