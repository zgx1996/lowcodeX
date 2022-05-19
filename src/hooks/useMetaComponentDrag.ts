import { Ref } from 'vue';
import { MetaComponent, TotalData, Component } from '../types';
import useSnapshot from './useSnapshot';
let componentId = 1;
export default function useMetaComponentDrag(data: Ref<TotalData>) {
    let currentDragComponent: MetaComponent | null = null;
    const { addSnapshot } = useSnapshot(data.value);
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
        data.value?.componentList.push({
            componentId: componentId++,
            key: currentDragComponent?.key!,
            label: currentDragComponent?.label!,
            left: event.offsetX,
            top: event.offsetY,
            width: currentDragComponent?.width,
            height: currentDragComponent?.height,
        });
        addSnapshot(data.value);
        currentDragComponent = null;
    };
    return { dragstart, dragEnter, dragLeave, dragOver, drop, data };
}
