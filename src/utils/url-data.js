import React from "react"
import data from "../data/data"

const Url = () => {

    const url_login = data + 'login'
    const url_logout = data + 'logout'
    const url_count = data + 'count'
    const url_renovar_sesion = data + 'refresh_token'

    return { url_login, url_logout, url_count, url_renovar_sesion }
}

export default Url