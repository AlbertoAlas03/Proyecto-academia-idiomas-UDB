import data from "../data/data"

const Url = () => {

    const url_login = data + 'login'
    const url_logout = data + 'logout'
    const url_count = data + 'count'
    const url_renovar_sesion = data + 'refresh_token'
    const url_list_user = data + 'list_usuarios'
    const url_add_user = data + 'add_usuario'

    return { url_login, url_logout, url_count, url_renovar_sesion, url_list_user, url_add_user }
}

export default Url