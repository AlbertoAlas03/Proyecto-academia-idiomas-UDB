import { useEffect, useState } from "react"
import useStudent from "../hooks/use-student"
import { Table, Container, Button, Spinner, Image } from "react-bootstrap"
import { useAuth } from "../hooks/contexts/auth-context"
import { CallCourses } from "../hooks/contexts/course-context"
import { useParams } from "react-router-dom"
import looking_img from '../assets/img/reclutador.png'

const Student = () => {

    const { list_estudiantes, student, loading } = useStudent()
    const { token } = useAuth()
    const { nombre, modalidad, programa } = CallCourses()
    const { curso_id } = useParams()

    useEffect(() => {
        if (token) {
            list_estudiantes()
        }
    }, [curso_id])

    if (loading) {
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100vh', background: '#f5f7fa' }}
            >
                <Spinner animation="border" variant="primary" role="status" style={{ width: '4rem', height: '4rem' }} />

                <p className="mt-4 fs-5 text-secondary">Cargando estudiantes inscritos, por favor espera...</p>
            </Container>
        )
    }

    return (
        <Container className="album py-4">
            <Container className="container">
                <h3 className="h3"><i className="bi bi-people"></i> Gestión de estudiantes - {nombre} - {programa} - {modalidad}</h3>
                <hr />
                {
                    student.length > 0 ? (
                        <>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='text-center'>#</th>
                                        <th className='text-center'>Nombre</th>
                                        <th className='text-center'>Apellido</th>
                                        <th className='text-center'>Email</th>
                                        <th className='text-center'>Telefono</th>
                                        <th className='text-center'>Estado</th>
                                        <th className='text-center'>Ver notas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        student.map((Student) => (
                                            <tr key={Student.inscripcion_id}>
                                                <td className='text-center'>{Student.estudiante_id}</td>
                                                <td className='text-center'>{Student.estudiante.nombre}</td>
                                                <td className='text-center'>{Student.estudiante.apellido}</td>
                                                <td className='text-center'>{Student.estudiante.email}</td>
                                                <td className='text-center'>{Student.estudiante.telefono}</td>
                                                <td className='text-center'>
                                                    <span className={Student.estudiante.activo ? 'badge text-bg-success' : 'badge text-bg-danger'}>
                                                        {Student.estudiante.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Container className="text-center">
                                                        <Button className="btn btn-success"><i className="bi bi-eye"></i></Button>
                                                    </Container>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                            <Image src={looking_img} className="display-1 text-secondary mb-4" style={{ height: '200px', width: '200px' }} />
                            <h3 className="text-muted mb-3">¡Vaya! Parece que aún no se han inscrito estudiantes a este curso.</h3>
                            <p className="text-center text-secondary mb-4">Cuando se inscriban, aparecerán aquí.</p>
                        </Container>
                    )
                }

            </Container>
        </Container>
    )
}

export default Student