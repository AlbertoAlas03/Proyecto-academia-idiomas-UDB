import React from "react"
import data from "../data/data"

const Url = () => {

    const url_login = data + 'login'
    const url_logout = data + 'logout'

    return { url_login, url_logout }
}

export default Url