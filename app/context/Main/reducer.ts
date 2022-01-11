import { State, Actions, ActionTypes, SidebarShape} from './types';
import { getSessionData, setSessionData } from '~/services/sessionStorage';
import { Component } from '~/types/components';
import { v4 as uuidv4 } from "uuid";

export default function appReducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_SIDEBAR_ITEMS: {
      const newState = {
        ...state,
        sidebarItems: action.payload as SidebarShape
      };

      setSessionData(state.sessionId ?? '', newState)
      return newState;
    }
    case ActionTypes.ADD_ITEM: {
      const newComponent = action.payload as Component;
      const sectionIndex = state.sidebarItems.findIndex(section => section.type === newComponent.type);
      const itemIndex = state.sidebarItems[sectionIndex].items.findIndex(item => item.id === newComponent.id);
      let updatedSidebar = state.sidebarItems;
      
      if(sectionIndex !== -1 && itemIndex !== -1) {
        updatedSidebar[sectionIndex].items[itemIndex].id = uuidv4()
      }

      const newState = {
        ...state,
        sidebarItems: updatedSidebar,
        boardItems: {
          ...state.boardItems,
          [newComponent.id]: {
            ...newComponent
          }
        }
      };

      setSessionData(state.sessionId ?? '', newState)
      return newState;
    }
    case ActionTypes.REMOVE_ITEM: {
      // Shallow copy for avoid mutation
      const {[action.payload as string]: omit, ...rest} = state.boardItems;
      const newState = {
        ...state,
        items: {
          ...rest
        },
      };
      setSessionData(state.sessionId ?? '', newState)
      return newState;
    }
    case ActionTypes.UPDATE_ITEM: {
      const component = action.payload as Component;
      const newState = {
        ...state,
        boardItems: {
          ...state.boardItems,
          [component.id]: {
            ...state.boardItems[component.id],
            ...component
          }
        }
      };

      setSessionData(state.sessionId ?? '', newState)
      return newState;
    }
    case ActionTypes.MOVE_ITEM: {
      const newState = {
        ...state,
        activeItem: action.payload,
        isDragging: !!action.payload
      };

      setSessionData(state.sessionId ?? '', newState)
      return newState;
    }
    case ActionTypes.INIT: {
      const key = action.payload as string;;
      const init = getSessionData(key);

      return {
        ...state,
        ...init,
        sessionId: key,
        isDragging: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
