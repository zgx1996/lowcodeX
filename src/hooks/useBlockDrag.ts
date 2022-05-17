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
        });
    }
    function onMousemoveInDocument(e: MouseEvent) {
        const { clientX, clientY } = e;
        const deviation = 10;
        const block = focusList.value[0];
        markLineRef.value.hideYMarkLine();
        console.log(dragState.lines.x);
        for (const x of dragState.lines.x) {
            const durX = block.left - x.left;
            console.log('durX', durX);
            if (Math.abs(durX) < deviation) {
                markLineRef.value.showYMarkLine({
                    left: x.showLeft,
                });
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

    return { onMousedown, onMousemove, onMouseup, clearFocusStatus };
}
