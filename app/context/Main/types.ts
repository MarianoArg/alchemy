import { Component } from "~/types/components";


export enum ActionTypes {
  SET_SIDEBAR_ITEMS = 'set_sidebar_items',
  ADD_ITEM = 'add_item',
  REMOVE_ITEM = 'remove_item',
  UPDATE_ITEM = 'update_item',
  MOVE_ITEM = 'move_item',
  INIT = 'init',
}

export type SidebarShape = {
  title: string,
  id: string,
  type: string,
  items: Component[]
}

export type State = {
  sidebarItems: SidebarShape[];
  boardItems: Record<string, Component>;
  activeItem: Component | null;
  isDragging: boolean;
  sessionId: string | null;
};

interface IActionInterface {
  type: ActionTypes;
}

interface ISetSidebarAction extends IActionInterface { 
  payload: SidebarShape;
}

interface IAddItemAction extends IActionInterface { 
  payload: Component;
}

interface IMoveItemAction extends IActionInterface {
 payload: Component;
}

interface IRemoveItemAction extends IActionInterface {
  payload: string;
 }

 interface IInitAction extends IActionInterface {
  payload: string;
 }

 export type Actions = ISetSidebarAction | IAddItemAction | IMoveItemAction | IRemoveItemAction | IInitAction;

export type ActionCreators = {
  setSidebarItems: (data: SidebarShape) => void;
  addItemToBoard: (component: Component) => void;
  moveItem: (component: Component | null) => void;
  updateItem: (component: Component) => void;
  removeItemFromBoard: (id: string) => void;
  init: (key: string) => void;
};
