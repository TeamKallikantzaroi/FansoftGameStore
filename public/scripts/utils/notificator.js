class Notificator {
    successToast(message) {
        toastr.success(message);
    }

    errorToast(message) {
        toastr.error(message);
    }

    warningToast(message) {
        toastr.warning(message);
    }

    showSuccessAlert(title, message) {
        swal(title, message, "success");
    }

    showWarningAlert(title, message) {
        swal(title, message, "warning");
    }

    showErrorAlert(title, message) {
        swal(title, message, "error");
    }

    showDownloadSuggestion(id, name, imageUrl) {
        return new Promise((resolve, reject) => {
            swal({
                    title: "Download the game?",
                    text: `Do you want ${name}?`,
                    imageUrl,
                    confirmButtonColor: "#40A104",
                    confirmButtonText: "Yes, i want it!",
                    cancelButtonText: "Cancel",
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        resolve(id);
                    } else {
                        reject();
                    }
                }
            )
        });
    }

    showRemoveSuggestion(name) {
        return new Promise((resolve, reject) => {
            swal({
                    title: "Delete the game?",
                    text: `Do you want to delete ${name}?`,
                    type: 'warning',
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Burn it!",
                    cancelButtonText: "Cancel",
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
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
}

const notificator = new Notificator();
export { notificator };