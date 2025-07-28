import { useEffect } from "react"
import useAssessment from "../hooks/use-assessment"
import { useParams } from "react-router-dom"
import { Container, Button, Table, Image, Spinner } from "react-bootstrap"
import { CallCourses } from "../hooks/contexts/course-context"
import evaluacion_img from '../assets/img/evaluacion.png'

const Assessment = () => {

    const { list_evaluaciones, evaluaciones, loading } = useAssessment()

    const { nombre, modalidad, programa } = CallCourses()

    const { curso_id } = useParams()

    useEffect(() => {
        list_evaluaciones()
    }, [curso_id])

    if (loading) {
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100vh', background: '#f5f7fa' }}
            >
                <Spinner animation="border" variant="primary" role="status" style={{ width: '4rem', height: '4rem' }} />

                <p className="mt-4 fs-5 text-secondary">Cargando las evaluaciones, por favor espera...</p>
            </Container>
        )
    }


    return (
        <Container className="album py-4">
            <Container className="container">
                <h3 className="h3"><i className="bi bi-book"></i> Gestión de evaluaciones - {nombre} - {programa} - {modalidad}</h3>
                <hr />
                <Button className="btn btn-success" style={{ marginBottom: '15px' }}><i className="bi bi-plus-lg"></i> Crear evaluación</Button>
                {
                    evaluaciones.length > 0 ? (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='text-center'>#</th>
                                        <th className='text-center'>Nombre</th>
                                        <th className='text-center'>Descripción</th>
                                        <th className='text-center'>Porcentaje</th>
                                        <th className='text-center'>Fecha creación</th>
                                        <th className='text-center'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        evaluaciones.map((Evaluacion) => (
                                            <tr key={Evaluacion.evaluacion_id}>
                                                <td className='text-center'>{Evaluacion.evaluacion_id}</td>
                                                <td className='text-center'>{Evaluacion.nombre}</td>
                                                <td className='text-center'>{Evaluacion.descripcion}</td>
                                                <td className='text-center'>{Evaluacion.porcentaje}%</td>
                                                <td className='text-center'>{new Date(Evaluacion.fecha_creacion).toISOString().split('T')[0]}</td>
                                                <td>
                                                    <Container className="text-center">
                                                        <Button className="btn btn-warning" style={{ marginRight: '10px' }}><i className="bi bi-pencil-square"></i> Actualizar</Button>
                                                        <Button className="btn btn-danger"><i className="bi bi-trash3"></i> Eliminar</Button>
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
                            <Image src={evaluacion_img} className="display-1 text-secondary mb-4" style={{ height: '200px', width: '200px' }} />
                            <h3 className="text-muted mb-3">¡Vaya! Parece que este curso no tiene evaluaciones.</h3>
                            <p className="text-center text-secondary mb-4">Crea una evaluación para empezar.</p>
                        </Container>
                    )
                }

            </Container>
        </Container>
    )
}

export default Assessment