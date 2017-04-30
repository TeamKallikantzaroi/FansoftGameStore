class Utils {
    showProgressbar() {
        return new Promise((resolve, reject) => {
                $('.disabler').show();
                $('.wrapper').addClass('blurred');
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

                            window.requestAnimationFrame(progressLoop);
                        }());
                    })
                    .then(() => this.hideProgressbar());
            });
    }

    hideProgressbar() {
        return new Promise((resolve, reject) => {
                setTimeout(() => $('.disabler').fadeOut('slow', resolve), 500);
            })
            .then(() => {
                $('.progress-bar').css('width', `0%`)
                $('.wrapper').removeClass('blurred');
            })
    }
}

const utils = new Utils();
export { utils };