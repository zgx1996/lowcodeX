import { cloneDeep } from 'lodash';
import { useSnapshot } from '../store/snapshot';
import { useState } from '../store/state';
import { Command } from '../types';

export default function useCommand() {
    const commandList: Array<Command> = [];
    function register(command: Command) {
        commandList.push(command);
    }
    const state = useState();
    const snapshot = useSnapshot();
    register({
        key: 'back',
        text: '撤消',
        icon: 'i-ic-baseline-arrow-back',
        hotKey: 'ctrl+z',
        execute: () => {
            useState().setState(snapshot.back());
        },
    });
    register({
        key: 'forward',
        text: '重做',
        icon: 'i-ic-baseline-arrow-forward',
        hotKey: 'ctrl+y',
        execute: () => {
            useState().setState(snapshot.forward());
        },
    });
    return { commandList, register };
}
