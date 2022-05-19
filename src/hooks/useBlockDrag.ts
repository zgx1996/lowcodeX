import { Ref } from 'vue';
import { useState } from '../store/state';
import { Component } from '../types';

export default function useBlockDrag(markLineRef) {
    const state = useState()
    const focusList = computed(() =>
        state.getComponentList.filter((item) => item.focusStatus),
    );
    const unFocusList = computed(() =>
        state.getComponentList.filter((item) => !item.focusStatus),
    );
    let moveStart = false;
    const dragState = reactive<any>({
        startX: 0,
        startY: 0,
        startPos: [],
        lines: {
            x: [],
            y: [],
        },
    });
    function onMousedown(event: MouseEvent) {
        const {
            top: aTop,
            left: aLeft,
            width: aWidth,
            height: aHeight,
        } = focusList.value[0]; // 拖动的元素A
        debugger;
        moveStart = true;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        dragState.startLeft = focusList.value[0].left;
        dragState.startTop = focusList.value[0].top;
        dragState.startPos = focusList.value.map(({ top, left }) => ({
            top,
            left,
        }));
        unFocusList.value.forEach((element) => {
            const { top, left, width, height } = element; // 不动的元素B
            // X 水平方向移动
            dragState.lines.x.push({ showLeft: left, left: left }); // B左对A左
            dragState.lines.x.push({
                showLeft: left + width! / 2,
                left: left + width! / 2,
            }); // B中对A左
            dragState.lines.x.push({
                showLeft: left + width!,
                left: left + width!,
            }); // B右对A左

            dragState.lines.x.push({
                showLeft: left,
                left: left - aWidth! / 2,
            }); // B左对A中
            dragState.lines.x.push({
                showLeft: left + width! / 2,
                left: left + width! / 2 - aWidth! / 2,
            }); // B中对A中
            dragState.lines.x.push({
                showLeft: left + width!,
                left: left + width! - aWidth! / 2,
            }); // B右对A中

            dragState.lines.x.push({ showLeft: left, left: left - aWidth! }); // B左对A右
            dragState.lines.x.push({
                showLeft: left + width! / 2,
                left: left + width! / 2 - aWidth!,
            }); // B中对A右
            dragState.lines.x.push({
                showLeft: left + width!,
                left: left + width! - aWidth!,
            }); // B右对A右

            //TODO Y 垂直方向移动
            dragState.lines.y.push({ showTop: top, top: top }); // B顶对A顶
            dragState.lines.y.push({
                showTop: top + height! / 2,
                top: top + height! / 2,
            }); // B中对A顶
            dragState.lines.y.push({
                showTop: top + height!,
                top: top + height!,
            }); // B低对A顶

            dragState.lines.y.push({ showTop: top, top: top - aHeight! / 2 }); // B顶对A中
            dragState.lines.y.push({
                showTop: top + height! / 2,
                top: top + height! / 2 - aHeight! / 2,
            }); // B中对A中
            dragState.lines.y.push({
                showTop: top + height!,
                top: top + height! - aHeight! / 2,
            }); // B低对A中

            dragState.lines.y.push({ showTop: top, top: top - aHeight! }); // B顶对A底
            dragState.lines.y.push({
                showTop: top + height! / 2,
                top: top + height! / 2 - aHeight!,
            }); // B中对A底
            dragState.lines.y.push({
                showTop: top + height!,
                top: top + height! - aHeight!,
            }); // B低对A底
        });
    }
    function onMousemoveInDocument(e: MouseEvent) {
        let { clientX, clientY } = e;
        const deviation = 5;
        const left = clientX - dragState.startX + dragState.startLeft;
        const top = clientY - dragState.startY + dragState.startTop;
        markLineRef.value.hideXMarkLine();
        markLineRef.value.hideYMarkLine();
        for (const x of dragState.lines.x) {
            if (Math.abs(left - x.left) < deviation) {
                markLineRef.value.showYMarkLine({
                    left: x.showLeft,
                });
                clientX = x.left + dragState.startX - dragState.startLeft;
                break;
            }
        }
        for (const y of dragState.lines.y) {
            if (Math.abs(top - y.top) < deviation) {
                markLineRef.value.showXMarkLine({
                    top: y.showTop,
                });
                clientY = y.top + dragState.startY - dragState.startTop;
                break;
            }
        }
        focusList.value.forEach((item, index) => {
            item.left =
                dragState.startPos[index].left + (clientX - dragState.startX);
            item.top =
                dragState.startPos[index].top + (clientY - dragState.startY);
        });
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
            state.getComponentList.forEach(
                (item) => (item.focusStatus = false),
            );
        } else {
            state.getComponentList.forEach((item) => {
                if (item.componentId != exculdeComponent.componentId) {
                    item.focusStatus = false;
                }
            });
        }
    }

    return { onMousedown, onMousemove, onMouseup, clearFocusStatus };
}
