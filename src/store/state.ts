import { getChildState } from "element-plus/es/components/tree/src/model/node";
import { cloneDeep } from "lodash";
import { defineStore } from "pinia";
import { Component, State } from "../types";
import { useSnapshot } from "./snapshot";
export const initialState = {
  container: {
    width: 500,
    height: 500
  },
  componentList: []
}
export const useState = defineStore('state', {
  state: (): State => {
    return initialState
  },
  getters: {
    getComponentList(): Array<Component> {
      return this.componentList||[];
    },
    getState(): State {
      return {
        container: this.container,
        componentList: this.componentList
      }
    }
  },
  actions: {
    setState(state: State) {
      this.container = cloneDeep(state.container)
      this.componentList = cloneDeep(state.componentList)
    },
    addComponent(component: Component) {
      this.componentList.push(component)
    },
    addComponentWithTransaction(component: Component) {
      this.addComponent(component)
      useSnapshot().snapshot()
    },
    updateComponent(component: Component) {
      const index = this.getComponentList.findIndex(comp => comp.componentId === component.id)
      if(index > -1) {
        this.componentList.splice(index,1,component)
      }
    },
    updateComponentWithTransaction(component: Component){
      this.updateComponent(component)
      useSnapshot().snapshot()
    },
    updateComponentAttr<T>(component: Component, attr: Record<'key'|'value',any>) {
      const index = this.componentList.findIndex(comp => comp.componentId === component.componentId)
      if(index > -1) {
        this.componentList[index][attr.key] = attr.value
      }
    }
  }
})