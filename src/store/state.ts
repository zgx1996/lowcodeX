import { fa } from 'element-plus/lib/locale';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import { Component, State } from '../types';
import { useSnapshot } from './snapshot';
export const useState = defineStore('state', {
  state: (): State => {
    return {
      container: {
        width: 500,
        height: 500,
      },
      componentList: [],
    };
  },
  getters: {
    getComponentList(): Array<Component> {
      return this.componentList || [];
    },
    getState(): State {
      return {
        container: this.container,
        componentList: this.componentList,
      };
    },
  },
  actions: {
    setState(state: State) {
      this.container = cloneDeep(state.container);
      this.componentList = cloneDeep(state.componentList);
    },
    addComponent(component: Component,transactional:boolean = false) {
      this.componentList.push(component);
      transactional && useSnapshot().snapshot();
    },
    updateComponent(component: Component,transactional:boolean = false) {
      console.log('updateComponent', component)
      const index = this.getComponentList.findIndex(
        (comp) => comp.componentId === component.componentId,
      );
      console.log('index', index)
      if (index > -1) {
        console.log('this.componentList', this.componentList)
        this.componentList.splice(index, 1, component);
        transactional && useSnapshot().snapshot();
      }
    },
    updateComponentAttr(
      component: Component,
      attr: Record<'key' | 'value', any>,
      transactional:boolean = false
    ) {
      const index = this.componentList.findIndex(
        (comp) => comp.componentId === component.componentId,
      );
      if (index > -1) {
        this.componentList[index][attr.key] = attr.value;
        transactional && useSnapshot().snapshot();
      }
    },
    updateComponentStyle(component: Component, styleAttr: Record<'key' | 'value', any>, transactional:boolean = false) {
      const index = this.componentList.findIndex(
        (comp) => comp.componentId === component.componentId,
      );
      if (index > -1) {
        this.componentList[index].style[styleAttr.key] = styleAttr.value;
        transactional && useSnapshot().snapshot();
      }
    },
  },
});
