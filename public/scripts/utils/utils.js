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
                });
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

    encryptPassword(password) {
        return CryptoJS.SHA1(password).toString();
    }

    configFacebookSharing() {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}

const utils = new Utils();
export { utils };