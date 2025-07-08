import { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import useLanguage from "../hooks/use-language"
import useCourse from "../hooks/use-course"
import Swal from "sweetalert2"

const UpdateCourseModal = ({ showModal, setShowModal, updateData, setUpdateData, token, list_course, setcourseID, setCourseSelected, setisSearching, setcourseSearched }) => {

    const [error, setError] = useState(null)
    const [isProcessing, setisProcessing] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedLanguageId, setSelectedLanguageId] = useState('')
    const [cursoID, setcursoID] = useState('')
    const [program, setProgram] = useState('')
    const [modalidad, setModalidad] = useState('')
    const [horario, setHorario] = useState('')
    const [date_init, setDate_init] = useState(null)
    const [date_finish, setDate_finish] = useState(null)
    const [cupo, setCupo] = useState('')

    const { list_idiomas, language } = useLanguage()

    const { update_course } = useCourse()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setisProcessing(true)
        setError(null)

        const data = {
            curso_id: cursoID,
            idioma_id: selectedLanguageId,
            nombre: name,
            descripcion: description,
            programa: program,
            modalidad: modalidad,
            horario: horario,
            fecha_inicio: date_init,
            fecha_fin: date_finish,
            capacidad_maxima: cupo
        }

        try {

            const response = await update_course(token, data)

            if (response) {
                await Swal.fire({
                    title: response.message,
                    icon: "success",
                    draggable: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                setisProcessing(false)
                setShowModal(false)
                clearForm()
                list_course(token)
                setcourseID('')
                setCourseSelected(null)
                setisSearching(false)
                setcourseSearched(null)
            }

        } catch (error) {

            setError(error.message || 'Error en el servidor')
            setisProcessing(false)

        }
    }

    const clearForm = () => {
        setCupo('')
        setName('')
        setDate_finish(null)
        setDate_init(null)
        setDescription('')
        setSelectedLanguageId('')
        setcursoID('')
        setProgram('')
        setModalidad('')
        setHorario('')
    }

    useEffect(() => {
        if (updateData) {
            setcursoID(updateData.curso_id || 'sin id de curso')
            setName(updateData.nombre || 'Sin nombre')
            setDescription(updateData.descripcion || 'sin descripcion')
            setSelectedLanguageId(updateData.idioma_id || 'Sin id')
            setProgram(updateData.programa || 'sin programa')
            setModalidad(updateData.modalidad || 'sin modalidad')
            setHorario(updateData.horario || 'sin horario')
            setDate_init(updateData.fecha_inicio)
            setDate_finish(updateData.fecha_fin)
            setCupo(updateData.capacidad_maxima || 'no definido')
            list_idiomas(token)
        }
    }, [updateData])

    return (
        <Modal
            show={showModal}
            onHide={() => {
                setError(null)
                setShowModal(false)
                clearForm()
            }
            }
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title><i className="bi bi-pencil-square" style={{ fontSize: '30px' }}></i> Actualizar curso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <button className="me-2" style={{ background: 'transparent', border: 'none' }} onClick={() => setError(null)}>
                                <i className="bi bi-x-circle-fill"></i>
                            </button>
                            {error}
                        </div>
                    )}
                    {isProcessing && (
                        <div className="alert alert-info d-flex align-items-center" role="alert">
                            <i className="bi bi-hourglass-split me-2"></i>
                            Procesando, por favor espere...
                        </div>
                    )}
                    <fieldset disabled={isProcessing}>
                        <div className="row">

                            <div className="col-md-6">

                                <Form.Group className="mb-3" controlId="formBasicNameCourseedit">
                                    <Form.Label><i className="bi bi-journal-bookmark-fill"></i> Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre del curso"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicDescriptionCourseedit">
                                    <Form.Label><i className="bi bi-journal-bookmark-fill"></i> Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Descripción del curso"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLanguageCourseedit">
                                    <Form.Label><i className="bi bi-translate"></i> Idioma</Form.Label>
                                    <Form.Select
                                        value={selectedLanguageId}
                                        onChange={(e) => setSelectedLanguageId(e.target.value)}
                                    >
                                        <option value="">Seleccionar idioma</option>
                                        {
                                            language.length > 0 ? (
                                                language.map((Language) => (
                                                    <option key={Language.idioma_id} value={Language.idioma_id}>
                                                        {Language.nombre}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">
                                                    No hay idiomas disponibles...
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProgramCourseedit">
                                    <Form.Label><i className="bi bi-person-video"></i> Programa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Programa"
                                        value={program}
                                        onChange={(e) => setProgram(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicModalidadCourseedit">
                                    <Form.Label><i className="bi bi-person-video3"></i> Modalidad</Form.Label>
                                    <Form.Select value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
                                        <option value="">Seleccionar modalidad</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="En línea">En línea</option>
                                    </Form.Select>
                                </Form.Group>

                            </div>

                            <div className="col-md-6">

                                <Form.Group className="mb-3" controlId="formBasichorarioCourseedit">
                                    <Form.Label><i className="bi bi-clock"></i> Horario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Horario del curso"
                                        value={horario}
                                        onChange={(e) => setHorario(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicdateInitCourseedit">
                                    <Form.Label><i className="bi bi-calendar"></i> Fecha inicio</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Seleccionar fecha de inicio"
                                        value={date_init || ''}
                                        onChange={(e) => setDate_init(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicdatefinishCourseedit">
                                    <Form.Label><i className="bi bi-calendar"></i> Fecha fin</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Seleccionar fecha de fin"
                                        value={date_finish || ''}
                                        onChange={(e) => setDate_finish(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicapacidadedit">
                                    <Form.Label><i className="bi bi-people"></i> Capacidad máxima</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Cupos"
                                        value={cupo}
                                        onChange={(e) => setCupo(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                        </div>

                        <hr />

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="warning" type="submit">
                                <i className="bi bi-pencil-square"></i> Actualizar
                            </Button>
                            <Button variant="danger" onClick={() => {
                                clearForm()
                                setShowModal(false)
                                setError(null)
                            }}>
                                <i className="bi bi-x"></i> Cancelar
                            </Button>
                        </div>
                    </fieldset>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateCourseModal