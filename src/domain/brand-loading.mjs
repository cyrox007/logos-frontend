// Координатор показывает заставку только пока действительно выполняется запрос.
export function createBrandLoadingController({
    schedule,
    cancel,
    notify,
    initialDelay = 380,
    longDelay = 1400
}) {
    let timer = null;
    let activePath = null;
    let firstLoad = true;
    let visible = false;

    function setVisible(next) {
        if (visible === next) return;
        visible = next;
        notify(next);
    }

    function stop() {
        if (timer !== null) {
            cancel(timer);
            timer = null;
        }
        activePath = null;
        setVisible(false);
    }

    return {
        start(path) {
            if (!path) return;
            stop();
            activePath = path;
            timer = schedule(
                () => {
                    timer = null;
                    if (activePath === path) setVisible(true);
                },
                firstLoad ? initialDelay : longDelay
            );
        },
        finish(path) {
            if (path !== activePath) return;
            stop();
            firstLoad = false;
        },
        navigate(path) {
            if (activePath !== null && activePath !== path) {
                stop();
                firstLoad = false;
            }
        },
        dispose() {
            stop();
        }
    };
}
