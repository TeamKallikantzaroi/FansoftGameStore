class Notificator {
    success(message) {
        toastr.success(message);
    }

    error(message) {
        toastr.error(message);
    }

    warning(message) {
        toastr.warning(message);
    }

    showDownloadSuggestion(name, imageUrl) {
        return new Promise((resolve, reject) => {
            swal({
                    title: "Download the game?",
                    text: `Do you want ${name}?`,
                    showCancelButton: true,
                    imageUrl,
                    confirmButtonColor: "#40A104",
                    confirmButtonText: "Yes, i want it!",
                    cancelButtonText: "Cancel",
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            )
        });
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
            () => window.location.hash = '#/login'
        );
    }

    showSuccessfulDownloadMessage() {
        swal("Downloaded!", "The game is in your profile and ready to play!", "success");
    }

    showInvalidDownloadMessage() {
        swal("Already downloaded", "You alredy have this game!", "warning");
    }

    showRejectedDownloadMessage() {
        swal("Cancelled", "Eh, maybe next time :)", "error");
    }
}

const notificator = new Notificator();
export { notificator };