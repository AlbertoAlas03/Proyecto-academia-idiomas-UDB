import { useEffect } from "react"
import useCourse from "../hooks/use-course"
import { useAuth } from "../hooks/auth-context"
import { Button, Card, Container, Badge, Image } from "react-bootstrap"
import english_img from '../assets/img/english.jpg'
import france_img from '../assets/img/france.jpg'

const Course = () => {

    const { list_course, cursos } = useCourse()

    const { token } = useAuth()

    useEffect(() => {
        if (token) {
            list_course(token)
        }
    }, [])

    return (
        <>
            {
                cursos.length > 0 ? (
                    <Container className="album py-5">
                        <Container className="container">
                            <Container className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {
                                    cursos.map((Curso) => (
                                        <Container className="col-md-6 col-lg-4 mb-4" key={Curso.asignacion_id}>
                                            <Card className="shadow-lg border-0 rounded-4" key={Curso.asignacion_id}>
                                                <Image className="bd-placeholder-img card-img-top" src={
                                                    Curso.curso.idioma.nombre === 'Ingles' ? english_img : france_img
                                                } height="180" width="100%" />
                                                <Card.Body>
                                                    <Card.Title className="fw-bold text-primary mb-3 d-flex align-items-center">
                                                        <i className="bi bi-journal-bookmark"></i> {Curso.curso.nombre}
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                                                        Idioma: <span className="ms-1" style={{ color: 'red' }}>{Curso.curso.idioma.nombre}</span>
                                                    </Card.Subtitle>
                                                    <Card.Text className="mb-2">
                                                        <strong>Modalidad:</strong> <span style={{ color: 'green' }}>{Curso.curso.modalidad}</span>
                                                    </Card.Text>
                                                    <Card.Text className="mb-2">
                                                        <strong>Horario:</strong> {Curso.curso.horario}
                                                    </Card.Text>
                                                    <Card.Text className="mb-3">
                                                        <strong>Programa:</strong> {Curso.curso.programa}
                                                    </Card.Text>
                                                    <Badge className="mb-3" bg={
                                                        Curso.curso.estado === 'activo' ? 'success' :
                                                            Curso.curso.estado === 'finalizado' ? 'danger' : 'warning'
                                                    }>
                                                        {Curso.curso.estado}
                                                    </Badge>

                                                    <div className="d-flex justify-content-end">
                                                        <Button variant="primary" className="rounded-pill">
                                                            Ir al curso <i className="bi bi-arrow-right"></i>
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Container>
                                    ))
                                }
                            </Container>
                        </Container>
                    </Container>
                ) : (
                    <div>No hay XD</div>
                )
            }
        </>
    )
}

export default Course