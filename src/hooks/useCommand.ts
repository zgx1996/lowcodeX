import { useSnapshot } from "../store/snapshot"
import { useState } from "../store/state"
import { Command } from "../types"

export default function useCommand() {
    const commandList: Array<Command> = []
    function register(command: Command) {
        commandList.push(command)
    }
    const state = useState()
    const snapshot = useSnapshot()
    const keyboardEvent = (() => {
        const onKeyDown = (e:KeyboardEvent) => {
            const { ctrlKey, key } = e
            if(ctrlKey) {
                const command = commandList.find(c => c.hotKey === ('ctrl+' + key))
                command && command.execute()
            }
        }
        window.addEventListener('keydown',onKeyDown)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    })()
    onUnmounted(() => {
        keyboardEvent()
    })
    register({
        key: 'back',
        text: '撤消',
        icon: 'i-ic-baseline-arrow-back',
        hotKey: 'ctrl+z',
        execute: () => {
            state.setState(snapshot.back())
        }
    })
    register({
        key: 'forward',
        text: '重做',
        icon: 'i-ic-baseline-arrow-forward',
        hotKey: 'ctrl+y',
        execute: () => {
            state.setState(snapshot.forward())
        }
    })
    return { commandList,register }
}

