import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import { Snapshot, State } from '../types';
import { useState } from './state';

export const useSnapshot = defineStore('snapshot', {
    state: (): Snapshot => {
        return {
            snapshotList: [
                {
                    container: {
                        width: 500,
                        height: 500,
                    },
                    componentList: [],
                },
            ],
            index: 0,
        };
    },
    actions: {
        snapshot() {
            const state = useState();
            if (this.index != this.snapshotList.length - 1) {
                // 说明处于撤销状态中
                this.snapshotList.splice(
                    this.index + 1,
                    0,
                    cloneDeep(state.getState),
                );
                this.index++;
            } else {
                this.snapshotList.push(cloneDeep(state.getState));
                this.index++;
            }
        },
        back(): State {
            if (this.index > 0) {
                this.index--;
            }
            return this.snapshotList[this.index];
        },
        forward(): State {
            if (this.index < this.snapshotList.length - 1) {
                this.index++;
            }
            return this.snapshotList[this.index];
        },
    },
});
