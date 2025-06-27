import { useState } from 'react'
import useRefreshToken from '../hooks/use-refreshToken'
import { useAuth } from '../hooks/auth-context'
import url from '../utils/url-data'
import useLogin from '../hooks/use-login'

const useUser = () => {

    const [usuarios, setUsuarios] = useState([])

    const { url_list_user, url_add_user } = url()
    const { logout } = useLogin()

    const { refresh } = useRefreshToken()

    const { setToken } = useAuth()

    const list_user = async (token) => {

        const response = await fetch(url_list_user, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {

            const ErrorData = await response.json()

            if (ErrorData.message === 'Token inválido o expirado, acceso denegado') {

                const modal_validacion = window.confirm('Tu sesión a expirado, ¿Desea renovarla?')

                if (modal_validacion) {

                    const token_nuevo = await refresh(setToken)

                    if (token_nuevo) {
                        return await list_user(token_nuevo)
                    } else {
                        return
                    }

                } else {
                    try {

                        const response_logout = await logout()

                        if (response_logout) {
                            alert(response_logout.message)
                            return
                        }

                    } catch (error) {

                        console.log('Error al cerrar sesion: ', error.message)
                        alert(error.message)
                        return
                    }

                }

            } else {
                throw new Error(ErrorData.message || 'Error en el servidor')
            }
        }

        const data = await response.json()

        setUsuarios(data.data)

    }

    const add_usuario = async (token, dataUser) => {

        const usuario = {
            nombre: dataUser.nombre,
            apellido: dataUser.apellido,
            email: dataUser.email,
            password: dataUser.password,
            telefono: dataUser.telefono,
            rol: dataUser.rol
        }

        const response = await fetch(url_add_user, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(usuario)
        })

        if (!response.ok) {

            const ErrorData = await response.json()

            if (ErrorData.message === 'Token inválido o expirado, acceso denegado') {

                const modal_validacion = window.confirm('Tu sesión a expirado, ¿Desea renovarla?')

                if (modal_validacion) {

                    const token_nuevo = await refresh(setToken)

                    if (token_nuevo) {
                        return await add_usuario(token_nuevo, dataUser)
                    } else {
                        return
                    }

                } else {
                    try {

                        const response_logout = await logout()

                        if (response_logout) {
                            alert(response_logout.message)
                            return
                        }

                    } catch (error) {

                        console.log('Error al cerrar sesion: ', error.message)
                        alert(error.message)
                        return
                    }

                }

            } else {
                throw new Error(ErrorData.message || 'Error en el servidor')
            }
        }

        const data = await response.json()

        return data
    }

    return { list_user, usuarios, add_usuario }
}

export default useUser