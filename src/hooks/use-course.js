import { useState } from "react"
import Url from "../utils/url-data"
import useRefreshToken from "./use-refreshToken"
import { useAuth } from "./auth-context"
import useLogin from "./use-login"

const useCourse = () => {

    const [course, setCourse] = useState([])

    const { url_list_cursos, url_add_curso } = Url()

    const { refresh } = useRefreshToken()

    const { setToken } = useAuth()

    const { logout } = useLogin()

    const list_course = async (token) => {

        const response = await fetch(url_list_cursos, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {

            const ErrorData = await response.json()

            if (ErrorData.message_about_token) {

                const modal_validacion = window.confirm('Tu sesión a expirado, ¿Desea renovarla?')

                if (modal_validacion) {

                    const response_token = await refresh(setToken)

                    const token_nuevo = response_token.token_nuevo

                    if (token_nuevo) {

                        return await list_course(token_nuevo)

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

        setCourse(data.data)
    }


    const add_course = async (token, data_course) => {

        const Data = {
            idioma_id: data_course.idioma_id,
            nombre: data_course.nombre,
            descripcion: data_course.descripcion,
            programa: data_course.programa,
            modalidad: data_course.modalidad,
            horario: data_course.horario,
            fecha_inicio: data_course.fecha_inicio,
            fecha_fin: data_course.fecha_fin,
            capacidad_maxima: data_course.capacidad_maxima
        }

        const response = await fetch(url_add_curso, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(Data)
        })

        if (!response.ok) {

            const ErrorData = await response.json()

            if (ErrorData.message_about_token) {

                const modal_validacion = window.confirm('Tu sesión a expirado, ¿Desea renovarla?')

                if (modal_validacion) {

                    const response_token = await refresh(setToken)

                    const token_nuevo = response_token.token_nuevo

                    if (token_nuevo) {

                        return await add_course(token_nuevo, data_course)

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

    return { list_course, course, add_course }
}

export default useCourse