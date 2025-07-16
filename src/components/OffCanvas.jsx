import { Nav, Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import useCourse from "../hooks/use-course"
import { CallCourses } from "../hooks/course-context"

const OffCanvas = ({ show, setshow }) => {

    const { courses } = CallCourses()

    return (
        <Offcanvas show={show} onHide={() => setshow(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/home"><i className="bi bi-house"></i> Inicio</Nav.Link>
                </Nav>
                {
                    courses.length > 0 && (
                        courses.map((Cursos) => (
                            <Nav className="flex-column" key={Cursos.asignacion_id}>
                                <Nav.Link as={Link} to="/home"><i className="bi bi-mortarboard"></i> {Cursos.curso.nombre} - {Cursos.curso.programa} - {Cursos.curso.modalidad}</Nav.Link>
                            </Nav>
                        ))

                    )
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvas