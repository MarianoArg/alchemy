import { ActionTypes, SidebarShape } from './types';
import { Component } from "~/types/components";
// Action creators

export function setSidebarItems(data: SidebarShape) {
  return {
    type: ActionTypes.SET_SIDEBAR_ITEMS,
    payload: data,
  };
}

export function addItemToBoard(item: Component) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: item,
  };
}

export function removeItemFromBoard(id: string) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: id
  };
}

export function moveItem(item: Component | null) {
  return {
    type: ActionTypes.MOVE_ITEM,
    payload: item
  };
}


export function updateItem(item: Component) {
  return {
    type: ActionTypes.UPDATE_ITEM,
    payload: item
  };
}

export function init(key: string) {
  return {
    type: ActionTypes.INIT,
    payload: key,
  };
}
