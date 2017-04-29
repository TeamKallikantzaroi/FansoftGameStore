class Notificator {
    constructor(notificator) {
        this.notificator = notificator;
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

const notificator = new Notificator(toastr);
export { notificator };