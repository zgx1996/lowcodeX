import { ToolBarItem } from '../types';

const toolbar: Array<ToolBarItem> = [
    { text: '撤消', icon: 'i-ic-baseline-arrow-back' },
    { text: '重做', icon: 'i-ic-baseline-arrow-forward' },
];
export default defineComponent({
    setup(props, { emit }) {
        const handleClick = (toolbarItem: ToolBarItem) => {
            console.log('toolbarItem', toolbarItem);
        };
        return () => (
            <div class="flex justify-center items-center">
                {toolbar.map((item) => (
                    <div
                        class="flex flex-col justify-center items-center bg-white-100 cursor-pointer"
                        style="width: 60px;height:60px;margin-right: 10px"
                        onClick={() => handleClick(item)}
                    >
                        <div class={item.icon} />
                        <div>{item.text}</div>
                    </div>
                ))}
            </div>
        );
    },
});
