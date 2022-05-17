import { Ref } from 'vue';
import { TotalData, Component } from '../types';

export default function useBlockDrag(data: Ref<TotalData>, markLineRef) {
    const focusList = computed(() =>
        data.value.componentList.filter((item) => item.focusStatus),
    );
    const unFocusList = computed(() =>
        data.value.componentList.filter((item) => !item.focusStatus),
    );
    let moveStart = false;
    const dragState = reactive<any>({
        startX: 0,
        startY: 0,
        startPos: [],
    });
    function onMousedown(event: MouseEvent) {
        console.log('onMousedown');
        moveStart = true;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        dragState.startPos = focusList.value.map(({ top, left }) => ({
            top,
            left,
        }));
    }
    function onMousemoveInDocument(e: MouseEvent) {
        const { clientX, clientY } = e;
        focusList.value.forEach((item, index) => {
            item.left =
                dragState.startPos[index].left + (clientX - dragState.startX);
            item.top =
                dragState.startPos[index].top + (clientY - dragState.startY);
        });
        _showMarkLine();
    }
    function onMousemove(event: MouseEvent) {
        if (moveStart) {
            document.addEventListener('mousemove', onMousemoveInDocument);
        }
    }
    function onMouseup(event: MouseEvent) {
        console.log('onMouseup');
        moveStart = false;
        markLineRef.value?.hideXMarkLine();
        markLineRef.value?.hideYMarkLine();
        document.removeEventListener('mousemove', onMousemoveInDocument);
    }
    function clearFocusStatus(exculdeComponent: Component | null = null) {
        if (!exculdeComponent) {
            data.value.componentList.forEach(
                (item) => (item.focusStatus = false),
            );
        } else {
            data.value.componentList.forEach((item) => {
                if (item.componentId != exculdeComponent.componentId) {
                    item.focusStatus = false;
                }
            });
        }
    }
    function _showMarkLine() {
        const deviation = 10;
        focusList.value.forEach((focusItem) => {
            const left = focusItem.left;
            const right = focusItem.left + focusItem.width!;
            const midX = focusItem.left + focusItem.width! / 2;
            const top = focusItem.top;
            const bottom = focusItem.top + focusItem.height!;
            const midY = focusItem.top + focusItem.height! / 2;
            unFocusList.value.forEach((unFocusItem) => {
                if (Math.abs(unFocusItem.left - left) < deviation) {
                    focusItem.left = unFocusItem.left;
                    markLineRef.value?.showYMarkLine({ left: focusItem.left });
                } else if (
                    Math.abs(unFocusItem.left + unFocusItem.width! - left) <
                    deviation
                ) {
                    focusItem.left = unFocusItem.left + unFocusItem.width!;
                    markLineRef.value?.showYMarkLine({ left: focusItem.left });
                } else if (
                    Math.abs(unFocusItem.left + unFocusItem.width! / 2 - left) <
                    deviation
                ) {
                    focusItem.left = unFocusItem.left + unFocusItem.width! / 2;
                    markLineRef.value?.showYMarkLine({ left: focusItem.left });
                } else {
                    markLineRef.value?.hideXMarkLine();
                    markLineRef.value?.hideYMarkLine();
                }
            });
        });
    }
    return { onMousedown, onMousemove, onMouseup, clearFocusStatus };
}
