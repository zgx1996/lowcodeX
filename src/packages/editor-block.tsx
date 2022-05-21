import { cloneDeep, divide } from 'lodash';
import { useState } from '../store/state';
import { EditorConfig, Component } from '../types';

export default defineComponent({
  props: {
    blockData: {
      type: Object,
    },
  },
  setup(props) {
    const styleData = computed(() => ({
      left: `${props.blockData!.style.left}px`,
      top: `${props.blockData!.style.top}px`,
      zIndex: `${props.blockData!.style.zIndex}`,
    }));
    const state = useState()
    const isFocusStatus = computed(() => {
      return state.getComponentList.filter(item => item.focusStatus).map(item => item.componentId).includes(props.blockData.componentId)
    })
    console.log('props.blockData', props.blockData);
    const config = inject<EditorConfig>('config');
    const metaComponent = config!.metaComponentMap[props.blockData?.key as string];
    const contextmenuList = [
      {
        text: '复制',
        fn: () => {
          const copyOne = cloneDeep<Component>(props.blockData as Component);
          useState().addComponent({
            ...copyOne,
            style: {
              ...copyOne.style,
              top: copyOne.style.top + 10,
              left: copyOne.style.left + 10,
            },
          });
        },
      },
      {
        text: '置顶',
        fn: () => {
          const maxZIndex = useState().getComponentList.map(item => item.style.zIndex).reduce((pre,cur) => {
            return Math.max(pre, cur)
          },1)
          useState().updateComponentStyle(props.blockData as Record,{key: 'zIndex', value: maxZIndex + 1}, true)
        },
      },
      {
        text: '置低',
        fn: () => {
          const minZIndex = useState().getComponentList.map(item => item.style.zIndex).reduce((pre,cur) => {
            return Math.min(pre, cur)
          },1)
          useState().updateComponentStyle(props.blockData as Record,{key: 'zIndex', value: minZIndex - 1}, true)
        },
      },
    ];
    const scaleBlockSize = 8
    const scaleSizeBlockList = [
      {dir:'top-left',value: {x:0,y:0}},
      {dir:'top',value: {x:1/2,y:0}},
      {dir:'top-right',value: {x:1,y:0}},
      {dir:"right",value: {x:1,y:1/2}},
      {dir:'bottom-right',value: {x:1,y:1}},
      {dir:'bottom',value: {x:1/2,y:1}},
      {dir:'bottom-left',value:{x:0,y:1}},
      {dir:'left',value:{x:0,y:1/2}}
    ]
    let scaleBlockStyle = (scaleBlock) => {
      return {
        position:"absolute",
        left: `${props.blockData?.style.width * scaleBlock.value.x - 4}px`,
        top: `${props.blockData?.style.height * scaleBlock.value.y - 4}px`,
        width:`${scaleBlockSize}px`,
        height:`${scaleBlockSize}px`,
        backgroundColor:"black"
      }
    }
    return () => (
      <div
        style={styleData.value}
        class="absolute cursor-pointer"
        v-contextmenu:key={contextmenuList}
      >
        {metaComponent.render({
          width: props.blockData.style.width + 'px',
          height: props.blockData.style.height + 'px',
        })}
        {isFocusStatus.value ? 
          scaleSizeBlockList.map(block => <div style={scaleBlockStyle(block)} class= {'scale-block ' + block.dir}></div>)
          :<div></div>
        }
      </div>
    );
  },
});
