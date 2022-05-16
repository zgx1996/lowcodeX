import { EditorConfig } from "../types";

export default defineComponent({
  props: {
    blockData: {
      type: Object
    }
  },
  setup(props) {
    const styleData = computed(() => ({
      left: `${props.blockData?.left}px`,
      top: `${props.blockData?.top}px`,
    }))
    const config = inject<EditorConfig>('config')
    const component = config!.metaComponentMap[props.blockData?.key as string]
    return () => <div style={styleData.value} class="absolute cursor-pointer">
      {component.render()}
    </div>
  }
})