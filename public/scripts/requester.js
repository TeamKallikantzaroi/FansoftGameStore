class Requester {
    getJSON(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url,
                    type: 'GET',
                })
                .done(resolve)
                .fail(reject);
        });
    }

    postJSON(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url,
                    type: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    }

    putJSON(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url,
                    type: "PUT",
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    }

    getTemplate(name) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: `../templates/${name}.html`,
                    type: 'GET',
                })
                .done(resolve)
                .fail(reject);
        });
    }
}

const requester = new Requester();
export { requester };