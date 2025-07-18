import { Nav, Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CallCourses } from "../hooks/contexts/course-context"

const OffCanvas = ({ show, setshow }) => {

    const { courses, setNombre, setPrograma, setModalidad } = CallCourses()

    return (
        <Offcanvas show={show} onHide={() => setshow(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column" style={{ fontSize: '18px' }}>
                    <Nav.Link as={Link} to="/home"><i className="bi bi-house"></i> Inicio</Nav.Link>
                </Nav>

                {
                    courses.length > 0 && (
                        courses.map((Cursos) => (
                            <Nav className="flex-column" key={Cursos.asignacion_id} style={{ fontSize: '18px' }}>
                                <Nav.Link as={Link} to={`/home/course/${Cursos.curso_id}`} onClick={() => {
                                    setNombre(Cursos.curso.nombre)
                                    setPrograma(Cursos.curso.programa)
                                    setModalidad(Cursos.curso.modalidad)
                                }
                                }><i className="bi bi-mortarboard"></i> {Cursos.curso.programa} - {Cursos.curso.modalidad}</Nav.Link>
                            </Nav>
                        ))

                    )
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvas