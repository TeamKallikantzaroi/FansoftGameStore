class SweetAlertNotificator {
    constructor() {
        this.notificator = swal;
    }

    // downloadGame(name, imageUrl) {
    //     this.notificator({
    //             title: "Download the game?",
    //             text: `Do you want ${name}?`,
    //             showCancelButton: true,
    //             imageUrl,
    //             confirmButtonColor: "32C704",
    //             confirmButtonText: "Yes, i want it!",
    //             cancelButtonText: "Cancel",
    //             closeOnConfirm: false,
    //             closeOnCancel: false
    //         },
    //         function(isConfirm) {
    //             if (isConfirm) {
    //                 swal("Downloaded!", "The game is in your profile and ready to play!", "success");
    //             } else {
    //                 swal("Cancelled", "Eh, maybe next time :)", "error");
    //             }
    //         }
    //     )
    // }
}

const notificator = new SweetAlertNotificator();
export { notificator };