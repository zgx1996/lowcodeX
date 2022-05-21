import { cloneDeep } from 'lodash';
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
    console.log('props.blockData', props.blockData);
    const config = inject<EditorConfig>('config');
    const component = config!.metaComponentMap[props.blockData?.key as string];
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
          console.log('置顶');
        },
      },
      {
        text: '置低',
        fn: () => {
          console.log('置低');
        },
      },
    ];
    return () => (
      <div
        style={styleData.value}
        class="absolute cursor-pointer"
        v-contextmenu:key={contextmenuList}
      >
        {component.render({
          width: props.blockData.style.width + 'px',
          height: props.blockData.style.height + 'px',
        })}
      </div>
    );
  },
});
