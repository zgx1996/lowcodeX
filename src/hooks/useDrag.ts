import { MetaComponent } from '../types';
let componentId = 1;
export default function useDrag(data: any) {
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
        console.log(currentDragComponent);
        data.value = {
            ...data.value,
            componentList: data.value?.componentList.push({
                componentId: componentId++,
                left: event.offsetX,
                top: event.offsetY,
                key: currentDragComponent?.key,
                label: currentDragComponent?.label,
            }),
        };
        currentDragComponent = null;
    };
    return { dragstart, dragEnter, dragLeave, dragOver, drop, data };
}
