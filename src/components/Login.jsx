import { Form, Card, Button, Container, Image } from "react-bootstrap"
import logo from "../assets/img/logo.png"
import Footer from "./Footer"
import { useState } from "react"

const Login = () => {

    const [error, setError] = useState(null)
    const [loading, setlLoading] = useState(false)

    return (
        <>
            <Container className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Card className="rounded-3 w-75" style={{ maxWidth: '500px' }}>
                    <Card.Body>
                        <Image src={logo} className="img-fluid mx-auto d-block mb-4" style={{ width: '220px', height: '100px' }} />
                        {
                            error ? (
                                <Container className="alert alert-danger d-flex align-items-center" role="alert">
                                    <button className="me-2" style={{ background: 'transparent', border: 'none' }} onClick={() => { }}>
                                        <i className="bi bi-x-circle-fill"></i>
                                    </button>
                                    <span>hubo un error</span>
                                </Container>
                            ) : (
                                <Container className="alert alert-success d-flex align-items-center" role="alert">
                                    <span>Puedes iniciar sesión utilizando las credenciales que se le han proporcionado. <strong>Si aún no cuenta con credenciales de acceso, por favor comuníquese con el área administrativa de la Escuela de Idiomas para solicitarlas.</strong></span>
                                </Container>
                            )
                        }

                        <Form onSubmit={{}}>
                            <Form.Group className="mb-4">
                                <Form.Label><i className="bi bi-envelope-at"></i> Correo eléctronico</Form.Label>
                                <Form.Control type="email" placeholder="Correo eléctronico" />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label><i className="bi bi-lock"></i> Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" />
                            </Form.Group>
                            <hr />
                            <Button className="btn btn-primary w-100" type="submit">Iniciar sesión</Button>
                        </Form>
                    </Card.Body >
                </Card >
            </Container >
            <Footer />
        </>
    )
}

export default Login