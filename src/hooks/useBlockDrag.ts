import { Ref } from "vue"
import { TotalData,Component } from "../types"

export default function useBlockDrag(data: Ref<TotalData>) {
  const focusList = computed(() => data.value.componentList.filter(item  => item.focusStatus))
  let moveStart = false
  const dragState = reactive<any>({
    startX: 0,
    startY: 0,
    startPos: []
  })
  function onMousedown(event: MouseEvent) {
    console.log('onMousedown')
    moveStart = true
    dragState.startX = event.clientX
    dragState.startY = event.clientY
    dragState.startPos = focusList.value.map(({top,left}) => ({ top,left }))
  }
  function onMousemoveInDocument(e:MouseEvent) {
    const { clientX,clientY } = e
    focusList.value.forEach((item,index) => {
      console.log('e.offsetX', item.left, clientX - dragState.startX, clientY - dragState.startY)
      item.left = dragState.startPos[index].left + (clientX - dragState.startX)
      item.top = dragState.startPos[index].top + (clientY - dragState.startY)
    })
  }
  function onMousemove(event: MouseEvent) {
    if(moveStart) {
      document.addEventListener('mousemove',onMousemoveInDocument)
    }
  }
  function onMouseup(event: MouseEvent) {
    console.log('onMouseup')
    moveStart = false
    document.removeEventListener('mousemove',onMousemoveInDocument)
  }
  function clearFocusStatus(exculdeComponent: Component|null = null) {
    if(!exculdeComponent) {
      data.value.componentList.forEach(item  => item.focusStatus = false)
    } else {
      data.value.componentList.forEach(item  => {
        if(item.componentId != exculdeComponent.componentId) {
          item.focusStatus = false
        }
      })
    }
  }
  return { onMousedown,onMousemove,onMouseup,clearFocusStatus }
}