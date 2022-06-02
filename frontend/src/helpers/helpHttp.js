const helpHttp = () => {
    // Private method
    /**
     * @param {string} endpoint = url
     * @param {object} options = options request AJAX
     * return = retorna una promesa
     */
    const customFetch = (endpoint, options, seg) => {
        let url = `http://localhost:5000/${endpoint}`;

        // Es mejor manejar los headers en donde se manden a llamar
        const defaultHeader = {
            accept: "application/json", // no afecta mucho
        };

        // * Si no hay respuesta del servidor abortar la petición
        const controller = new AbortController();

        // * Opción de poner un manejador de errores y si no responde cancelar la petición
        options.signal = controller.signal;

        // method = GET, POST, PUT, DELETE
        options.method = options.method || "GET";

        // headers = optios.header + defaultHeader || defaultHeader
        options.headers = options.headers ? {...defaultHeader, ...options.headers } : defaultHeader;

        // Parser body, convert body to string
        options.body = JSON.stringify(options.body) || false;

        if (!options.body) delete options.body;

        // ?Si el servidor está caido y la petición no se quede enciclada aborter luego de 3000 segundos
        setTimeout(() => {
            controller.abort();
        }, seg);

        // return callback
        return fetch(url, options)
            .then((res) =>
                res.ok ?
                res.json() :
                Promise.reject({
                    err: true,
                    status: res.status || "00", // ? Si status = 00 la API no trajo ningun codigo de error. || If status = 00 the API did not present any error code.
                    statusText: res.statusText || "An error occurred",
                })
            )
            .catch((err) => err);
    };

    const getData = (url, options = {}, seg = 3000) => customFetch(url, options, seg);

    const postData = (url, options, seg = 3000) => {
        options.method = "POST";
        return customFetch(url, options, seg);
    };

    const putData = (url, options, seg = 3000) => {
        options.method = "PUT";
        return customFetch(url, options, seg);
    };

    const patchData = (url, options, seg = 3000) => {
        options.method = "PATCH";
        return customFetch(url, options, seg);
    };

    const deleteData = (url, options, seg = 3000) => {
        options.method = "DELETE";
        return customFetch(url, options, seg);
    };

    // Retorna un objeto con los siguientes atributos
    return {
        getData,
        postData,
        putData,
        patchData,
        deleteData,
    };
};

export { helpHttp };