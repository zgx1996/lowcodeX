import type { MetaComponent } from "../types"

function createEditorConfig() {
  const metaComponentList: Array<MetaComponent> = []
  const metaComponentMap: Record<string, MetaComponent> = {}
  return {
    metaComponentList,
    metaComponentMap,
    register: (component: MetaComponent) => {
      metaComponentList.push(component)
      metaComponentMap[component.key] = component
    }
  }
}

export let editorConfig = createEditorConfig()

editorConfig.register({
  key: "text",
  label: "文本",
  preView: () => "预览文本",
  render: () => "渲染文本"
})

editorConfig.register({
  key: "button",
  label: "按钮",
  preView: () => <el-button>预览按钮</el-button>,
  render: () => <el-button>渲染按钮</el-button>
})

editorConfig.register({
  key: "input",
  label: "输入框",
  preView: () => <el-input>输入框</el-input>,
  render: () => <el-input>输入框</el-input>
})