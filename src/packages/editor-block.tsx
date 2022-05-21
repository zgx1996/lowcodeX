import { EditorConfig } from '../types';

export default defineComponent({
    props: {
        blockData: {
            type: Object,
        },
    },
    setup(props) {
        const styleData = computed(() => ({
            left: `${props.blockData.style.left}px`,
            top: `${props.blockData.style.top}px`,
        }));
        console.log('props.blockData', props.blockData);
        const config = inject<EditorConfig>('config');
        const component =
            config!.metaComponentMap[props.blockData?.key as string];
            const contextmenuList = [{
                text: '复制',
                fn: () => console.log('点击了复制按钮')
            }]
        return () => (
            <div style={styleData.value} class="absolute cursor-pointer" v-contextmenu:key={contextmenuList}>
                {component.render({
                    width: props.blockData.style.width + 'px',
                    height: props.blockData.style.height + 'px',
                })}
            </div>
        );
    },
});
