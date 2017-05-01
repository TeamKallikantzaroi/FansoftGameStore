class ToastrNotificator {
    constructor() {
        this.notificator = toastr;
    }

    success(message) {
        this.notificator.success(message);
    }

    error(message) {
        this.notificator.error(message);
    }

    warning(message) {
        this.notificator.warning(message);
    }
}

const notificator = new ToastrNotificator();
export { notificator };