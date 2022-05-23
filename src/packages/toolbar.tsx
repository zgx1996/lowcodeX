import useCommand from '../hooks/useCommand';
import { Command } from '../types';

export default defineComponent({
    setup(props, { emit }) {
        const { commandList } = useCommand()
        const handleClick = (command: Command) => {
            command.execute()
        };
        return () => (
            <div class="flex justify-center items-center">
                {commandList.map((item) => (
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
