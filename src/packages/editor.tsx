import { EditorConfig, MetaComponent } from "../types"
import EditorBlock from "./editor-block"


export default defineComponent({
  props: {
    modelValue: {type: Object}
  }, 
  setup(props) {
    const data = computed<any>(() => props.modelValue)
    const config = inject<EditorConfig>('config')
    let currentDragComponent:MetaComponent | null = null
    const dragstart = (component: MetaComponent,event: DragEvent) => {
      currentDragComponent = component
    }

    const dragEnter = (event: DragEvent) => {
      event.dataTransfer!.dropEffect = "move"
    }

    const dragLeave = (event: DragEvent) => {
      event.dataTransfer!.dropEffect = "none"
    }

    const dragOver = (event: DragEvent) => {
      event.preventDefault()
    }

    const drop = (event: DragEvent) => {
      console.log(currentDragComponent)
      let x = {
        ...data,
        componentList: data.value.componentList.push(
          {
            left: event.offsetX,
            top: event.offsetY,
            key: currentDragComponent?.key,
            label: currentDragComponent?.label
          }
        )
      }
      currentDragComponent = null
    }

    return () => <div>
      <div class="w-1/4 h-full bg-red-500 absolute left-0 top-0 bottom-0 p-4 box-border">
        {
          config?.metaComponentList.map(component => (
            <div draggable 
              onDragstart={(event) => dragstart(component,event)}
              onDragenter={(event) => dragEnter(event)}
              onDragleave={(event) => dragLeave(event)}
              class="h-26 w-full bg-white my-8 relative flex items-center justify-center px-1 select-none">
              <span class="absolute top-0 left-0 bg-blue-300 p-1 text-white rounded-br-sm">{component.label}</span>
              <div class="p-4">
                {component.preView()}
              </div>
            </div> 
          ))
        }
      </div>
      <div class="absolute left-1/4 top-0 h-1/6 w-7/12 bg-pink-500">top</div>
      <div class="absolute left-1/4 top-1/6 h-5/6 w-7/12 bg-blue-500">
        <div 
        onDragover={dragOver}
        onDrop={drop}
        class="h-full overflow-auto relative">
          {
            (data.value.componentList.map(element => <EditorBlock blockData={element}></EditorBlock>))
          }
        </div>
      </div>
      <div class="w-1/6 h-full bg-yellow-200 absolute right-0 top-0 bottom-0 p-4 box-border">right</div>
    </div>
  }
})