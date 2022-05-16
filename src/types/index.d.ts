export interface TotalData {
    container: Record<string, any>;
    componentList: Array<Component>;
}

export interface Component extends Omit<MetaComponent,'preView' | 'render'> {
    componentId: number;
    left:number,
    top: number,
    focusStatus?: boolean
}

export interface MetaComponent {
    key: string;
    label: string;
    preView: () => void;
    render: () => void;
}

export interface EditorConfig {
    metaComponentList: Array<MetaComponent>;
    metaComponentMap: Record<string, MetaComponent>;
    register: (component: MetaComponent) => void;
}