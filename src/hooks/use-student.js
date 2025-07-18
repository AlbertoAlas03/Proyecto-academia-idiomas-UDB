import { url_list_estudiantes } from '../utils/request-url'
import { useAuth } from './contexts/auth-context'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const useStudent = () => {

    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(true)

    const { curso_id } = useParams()
    const { token } = useAuth()

    const list_estudiantes = async () => {

        setLoading(true)

        const response = await fetch(url_list_estudiantes, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ curso_id })
        })

        if (!response.ok) {
            const ErrorData = await response.json()
            throw new Error(ErrorData.message || 'Error en el servidor')
        }

        const data = await response.json()

        setStudent(data.data)
        setLoading(false)
    }

    return { list_estudiantes, student, loading }
}

export default useStudent