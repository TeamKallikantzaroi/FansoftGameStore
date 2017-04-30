class Utils {
    constructor() {}

    showProgressbar() {
        return new Promise((resolve, reject) => {
                $('.progress').show();
                $('#content').addClass('blurred');
                resolve();
            })
            .then(() => {
                let progress = 0;

                return new Promise((resolve, reject) => {
                        (function progressLoop() {
                            if (progress >= 100) {
                                resolve();
                                return;
                            }

                            progress += 1;
                            $('.progress-bar').css('width', `${progress}%`)
                            console.log($('.progress-bar').css('width'));

                            window.requestAnimationFrame(progressLoop);
                        }());
                    })
                    .then(() => this.hideProgressbar());
            });
    }

    hideProgressbar() {
        return new Promise((resolve, reject) => {
                setTimeout(() => $('.progress').fadeOut('slow', resolve), 500);
            })
            .then(() => {
                $('.progress-bar').css('width', `0%`)
                $('#content').removeClass('blurred');
            })
    }
}

const utils = new Utils();
export { utils };