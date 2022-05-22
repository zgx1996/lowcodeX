import { Ref } from 'vue';
import { useState } from '../store/state';
import { MetaComponent, Component } from '../types';
let componentId = 1;
export default function useMetaComponentDrag() {
  const state = useState();
  let currentDragComponent: MetaComponent | null = null;
  const dragstart = (component: MetaComponent, event: DragEvent): void => {
    currentDragComponent = component;
  };

  const dragEnter = (event: DragEvent): void => {
    event.dataTransfer!.dropEffect = 'move';
  };

  const dragLeave = (event: DragEvent): void => {
    event.dataTransfer!.dropEffect = 'none';
  };

  const dragOver = (event: DragEvent): void => {
    event.preventDefault();
  };

  const drop = (event: DragEvent): void => {
    state.addComponent({
      componentId: componentId++,
      key: currentDragComponent?.key!,
      label: currentDragComponent?.label!,
      style: {
        ...currentDragComponent?.style,
        left: event.offsetX,
        top: event.offsetY,
      },
      props: {}
    }, true);
    currentDragComponent = null;
  };
  return { dragstart, dragEnter, dragLeave, dragOver, drop };
}
