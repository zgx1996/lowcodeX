export default defineComponent({
    setup(props) {
        const showXMarkLineStatus = ref(false);
        const showYMarkLineStatus = ref(false);
        const pos = reactive({
            left: '0px',
            top: '0px',
        });
        const showXMarkLine = ({ top }) => {
            showXMarkLineStatus.value = true;
            pos.top = top + 'px';
        };
        const showYMarkLine = ({ left }) => {
            showYMarkLineStatus.value = true;
            pos.left = left + 'px';
        };

        const hideXMarkLine = () => {
            showXMarkLineStatus.value = false;
        };
        const hideYMarkLine = () => {
            showYMarkLineStatus.value = false;
        };
        return {
            pos,
            showXMarkLine,
            showYMarkLine,
            hideXMarkLine,
            hideYMarkLine,
            showXMarkLineStatus,
            showYMarkLineStatus,
        };
    },
    render() {
        return (
            <div>
                <div
                    style={{
                        width: '2px',
                        height: '100%',
                        backgroundColor: 'pink',
                        position: 'absolute',
                        left: `${this.pos?.left}`,
                        display: `${
                            this.showYMarkLineStatus ? 'block' : 'none'
                        }`,
                    }}
                ></div>
                <div
                    style={{
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: `${this.pos?.top}`,
                        display: `${
                            this.showXMarkLineStatus ? 'block' : 'none'
                        }`,
                    }}
                ></div>
            </div>
        );
    },
});
