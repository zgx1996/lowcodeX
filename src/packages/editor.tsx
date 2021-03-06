import { EditorConfig, Component } from '../types';
import EditorBlock from './editor-block';
import useMetaComponentDrag from '../hooks/useMetaComponentDrag';
import useBlockDrag from '../hooks/useBlockDrag';
import MarkLine from './mark-line';
import Toolbar from './toolbar';
import { useState } from '../store/state';
import ComponentConfig from './component-config';

export default defineComponent({
    props: {
        modelValue: { type: Object },
    },
    setup(props) {
        const state = $computed(() =>useState())
        const config = inject<EditorConfig>('config');
        const containerRef = ref<HTMLDivElement | null>(null);
        const markLineRef = ref<HTMLDivElement | null>();
        const lastFocusComponent = $computed(() => {
            const list = useState().getComponentList.filter(item => item.focusStatus)
            if(list && list.length > 0) {
                return list[list.length-1]
            }
            return null
        })
        const { dragstart, dragEnter, dragLeave, dragOver, drop } =
            useMetaComponentDrag();
        const { onMousedown, onMousemove, onMouseup, clearFocusStatus } =
            useBlockDrag(markLineRef);
        const onBlockClick = (event: MouseEvent, component: Component) => {
            component.focusStatus = !component.focusStatus;
            if (!event.shiftKey) {
                clearFocusStatus(component);
            }
            event.stopPropagation();
        };
        onMounted(() => {
            containerRef.value?.addEventListener('click', () => {
                clearFocusStatus();
            });
        });

        return () => (
            <div>
                <div class="w-1/4 h-full bg-red-500 absolute left-0 top-0 bottom-0 p-4 box-border">
                    {config?.metaComponentList.map((component) => (
                        <div
                            draggable
                            onDragstart={(event) => dragstart(component, event)}
                            onDragenter={(event) => dragEnter(event)}
                            onDragleave={(event) => dragLeave(event)}
                            class="h-26 w-full bg-white my-8 relative flex items-center justify-center px-1 select-none"
                        >
                            <span class="absolute top-0 left-0 bg-blue-300 p-1 text-white rounded-br-sm">
                                {component.label}
                            </span>
                            <div class="p-4">{component.preView()}</div>
                        </div>
                    ))}
                </div>
                <div class="absolute left-1/4 top-0 h-1/6 w-7/12 bg-pink-500">
                    <Toolbar class="h-full"></Toolbar>
                </div>
                <div class="absolute left-1/4 top-1/6 h-5/6 w-7/12 bg-blue-500">
                    <div
                        ref={containerRef}
                        onDragover={dragOver}
                        onDrop={drop}
                        class="h-full overflow-auto relative"
                    >
                        {state.getComponentList.map(
                            (component: Component) => (
                                <EditorBlock
                                    style={
                                        component.focusStatus
                                            ? { border: '2px dashed red' }
                                            : null
                                    }
                                    onClick={(event: MouseEvent) =>
                                        onBlockClick(event, component)
                                    }
                                    onMousedown={onMousedown}
                                    onMousemove={onMousemove}
                                    onMouseup={onMouseup}
                                    blockData={component}
                                ></EditorBlock>
                            ),
                        )}
                        <MarkLine ref={markLineRef}></MarkLine>
                    </div>
                </div>
                <div class="w-1/6 h-full bg-yellow-200 absolute right-0 top-0 bottom-0 p-4 box-border">
                    <ComponentConfig blockData={lastFocusComponent} state={state}></ComponentConfig>
                </div>
            </div>
        );
    },
});
