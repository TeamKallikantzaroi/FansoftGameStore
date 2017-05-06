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

    showDownloadSuggestion(name, imageUrl, isLoggedUser) {
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
                    if (isLoggedUser) {
                        swal("Downloaded!", "The game is in your profile and ready to play!", "success");
                    } else {
                        Notificator.prototype.showLoginSuggestion();
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
            () => window.location.hash = '#/login');
    }
}

const notificator = new Notificator();
export { notificator };