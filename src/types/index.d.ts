export interface State {
  container: Record<string, any>;
  componentList: Array<Component>;
}
export interface Style {
  width: number;
  height: number;
  top?: number;
  left?: number;
  zIndex: number;
}

export interface Component extends Omit<MetaComponent, 'preView' | 'render'> {
  componentId: number;
  focusStatus?: boolean;
}

export interface MetaComponent {
  key: string;
  label: string;
  style: Style;
  preView: () => void;
  render: (style?: Partial<CSSStyleDeclaration>) => void;
}

export interface EditorConfig {
  metaComponentList: Array<MetaComponent>;
  metaComponentMap: Record<string, MetaComponent>;
  register: (component: MetaComponent) => void;
}

export interface ToolBarItem {
  text: string;
  icon: string;
}

export interface Command {
  key: string;
  text: string;
  icon: string;
  hotKey: string;
  execute: () => void;
}

export interface Snapshot {
  snapshotList: Array<State>;
  index: number;
}
