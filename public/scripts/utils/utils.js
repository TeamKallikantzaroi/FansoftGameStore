class Utils { // refactor and maybe remove
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

    showDownloadSuggestion(name, imageUrl, isLogged) {
        swal({
                title: "Download the game?",
                text: `Do you want ${name}?`,
                showCancelButton: true,
                imageUrl,
                confirmButtonColor: "32C704",
                confirmButtonText: "Yes, i want it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    if (isLogged) {
                        swal("Downloaded!", "The game is in your profile and ready to play!", "success");
                    } else { // showLoginSuggestion
                        swal({
                                title: "You need to be logged-in to download the games!",
                                text: "Do you want to log in and continue?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yep, lets sign in!",
                                closeOnConfirm: true
                            },
                            function() {
                                window.location.hash = '#/login';
                            });
                    }
                } else {
                    swal("Cancelled", "Eh, maybe next time :)", "error");
                }
            }
        )
    }

    showLoginSuggestion() {
        swal({
                title: "You need to be logged-in to download the games!",
                text: "Do you want to log in and continue?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yep, lets sign in!",
                closeOnConfirm: true
            },
            function() {
                window.location.hash = '#/login';
            });
    }
}

const utils = new Utils();
export { utils };