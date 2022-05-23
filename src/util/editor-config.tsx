import { ElForm, ElFormItem } from 'element-plus';
import type { MetaComponent } from '../types';

function createEditorConfig() {
  const metaComponentList: Array<MetaComponent> = [];
  const metaComponentMap: Record<string, MetaComponent> = {};
  return {
    metaComponentList,
    metaComponentMap,
    register: (component: MetaComponent) => {
      metaComponentList.push(component);
      metaComponentMap[component.key] = component;
    },
  };
}
const createTextProp = (label: string) => ({ type: 'input', label })
const createColorProp = (label: string) => ({ type: 'color', label })
const createSelectProp = (label: string, options) => ({ type: 'select', label,options })
export let editorConfig = createEditorConfig();

editorConfig.register({
  key: 'text',
  label: '文本',
  style: {
    width: 68,
    height: 25,
    zIndex: 1,
  },
  props:{
    text:createTextProp('文本'),
    color:createColorProp('颜色') 
  },
  preView: () => '预览文本',
  render: (style,props) => '渲染文本',
});

editorConfig.register({
  key: 'button',
  label: '按钮',
  style: {
    zIndex: 1,
    width: 200,
    height:40,
  },
  props:{
    text:createTextProp('文本'),
    size: createSelectProp('大小', [
      {label: '默认',value:"default"},
      {label: '小',value:"small"},
      {label: '中等',value:"medium"},
      {label: '大',value:"large"}
    ])
  },
  preView: () => <el-button>预览按钮</el-button>,
  render: (style,props) => {
    return <el-button style={style} size={props.size ||  'default'}>{props.text||'渲染按钮'}</el-button>
  },
});

editorConfig.register({
  key: 'input',
  label: '输入框',
  style: {
    width: 200,
    height: 40,
    zIndex: 1,
  },
  props:{
    text:createTextProp('文本'),
    color:createColorProp('颜色'),
  },
  preView: () => <el-input>输入框</el-input>,
  render: (style,props) => <el-input style={style}>输入框</el-input>,
});
