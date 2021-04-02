import clienteAxios from "./clienteAxios";

const tokenAuth = token => {
    if (token) {
        clienteAxios.defaults.headers.common["Authorizations"] = token;
    } else {
        delete clienteAxios.defaults.headers.common["Authorizations"];
    }
}

export default tokenAuth;