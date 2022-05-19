import { Snapshot, TotalData } from './../types/index.d';
export default function useSnapshot() {
    const snapshots = inject<Snapshot>('snapshots')!;
    function addSnapshot(data: TotalData) {
        snapshots.snapshotList.push(data);
        snapshots.index++;
    }
    function backSnapshot() {
        if (snapshots.index > 1) snapshots.index--;
    }
    function forwardSnapshot() {
        if (snapshots.index < snapshots.snapshotList.length) snapshots.index++;
    }

    return { addSnapshot, backSnapshot, forwardSnapshot };
}
