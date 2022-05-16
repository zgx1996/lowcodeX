export interface MetaData {
    container: Record<string, any>;
    metaComponentList: Array<MetaComponent>;
}

export interface MetaComponent {
    id: number;
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
