import { ElButton, ElColorPicker, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from "element-plus"
import { cloneDeep } from "lodash"
import { useState } from "../store/state"

export default defineComponent({
  props:{
    blockData: {
      type: Object
    },
    state: {
      type: Object
    }
  },
  setup() {
    return (props) => {
      const config = inject('config')
      const content = []
      const state = reactive({
        editData: {}
      })
      const apply = () => {
        if(props.blockData) {
          useState().updateComponent({...props.blockData,props: state.editData.props})
        } else {
        }
      }
      const reset = () => {
        if(props.blockData) {
          state.editData = cloneDeep(props.blockData)
        } else {
          state.editData = cloneDeep(props.state.container)
        }
      }
      watch(() => props.blockData,reset,{ immediate: true } )
      if(props.blockData) {
        const component = config.metaComponentMap[props.blockData.key]
        console.log('component',component,Object.entries(component.props||{}))
        Object.entries(component.props||{}).map(([propName,value]) => {
          console.log(propName, value)
          if(value.type === 'color') {
            content.push(<ElFormItem label={value.label}>
              <ElColorPicker v-model={state.editData.props[propName]}></ElColorPicker>
            </ElFormItem>)
          } else if(value.type === 'input') {
            content.push(<ElFormItem label={value.label}>
              <ElInput v-model={state.editData.props[propName]}></ElInput>
            </ElFormItem>)
          }else if(value.type === 'select') {
            content.push(<ElSelect label={value.label} v-model={state.editData.props[propName]}>
              { value.options.map(opt => {
                return <ElOption label={opt.label} value={opt.value}></ElOption>
              }) }
            </ElSelect>)
          }
        })
      } else {
        content.push(
          <ElFormItem label="容器宽度">
            <ElInput v-model={props.state.container.width}></ElInput>
          </ElFormItem>
        )
        content.push(
          <ElFormItem label="容器高度">
            <el-input v-model={props.state.container.height}></el-input>
          </ElFormItem>
        )
      }
      
      return <ElForm label-position="top">
        {content}
        <ElFormItem>
          <ElButton type="primary" onClick={apply}>应用</ElButton>
          <ElButton onClick={reset}>重置</ElButton>
        </ElFormItem>
      </ElForm>
    }
  }
})