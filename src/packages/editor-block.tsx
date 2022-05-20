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
        return () => (
            <div style={styleData.value} class="absolute cursor-pointer">
                {component.render({
                    width: props.blockData.style.width + 'px',
                    height: props.blockData.style.height + 'px',
                })}
            </div>
        );
    },
});
