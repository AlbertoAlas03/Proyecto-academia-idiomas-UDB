import { useEffect, useState } from "react"
import useCourse from "../hooks/use-course"
import { useAuth } from "../hooks/auth-context"
import AddCourseModal from "./AddCourseModal"

const Course = () => {

    const [showAddModal, setShowAddModal] = useState(false)

    const { list_course, course } = useCourse()

    const { token } = useAuth()

    useEffect(() => {
        list_course(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-journal"></i> Gestión de cursos</h1>
            </div>
            <div className="row g-4 mb-3">
                <div className="col col-lg-2">
                    <button type="button" className="btn btn-success" onClick={() => setShowAddModal(true)}><i className="bi bi-journal-plus"></i> Registrar nuevo curso</button>
                </div>
                {
                    course.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Idioma</th>
                                        <th scope="col">Programa</th>
                                        <th scope="col">Modalidad</th>
                                        <th scope="col">Horario</th>
                                        <th scope="col">Fecha inicio</th>
                                        <th scope="col">Fecha fin</th>
                                        <th scope="col">Cupos</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        course.map((Course) => (
                                            <tr key={Course.curso_id}>
                                                <th scope="row">{Course.curso_id}</th>
                                                <td>{Course.nombre}</td>
                                                <td>{Course.descripcion}</td>
                                                <td>{Course.idioma.nombre}</td>
                                                <td>{Course.programa}</td>
                                                <td>{Course.modalidad}</td>
                                                <td>{Course.horario}</td>
                                                <td>{new Date(Course.fecha_inicio).toLocaleDateString()}</td>
                                                <td>{new Date(Course.fecha_fin).toLocaleDateString()}</td>
                                                <td className="text-center">{Course.capacidad_maxima}</td>
                                                <td className="text-center">
                                                    <span className={
                                                        Course.estado === 'activo' ? 'badge text-bg-success' : Course.estado === 'finalizado' ? 'badge text-bg-danger' : 'badge text-bg-warning'
                                                    }>
                                                        {
                                                            Course.estado === 'activo' ? 'activo' : Course.estado === 'finalizado' ? 'finalizado' : 'no iniciado'
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button type="button" className='btn btn-warning' onClick={() => {


                                                        }}><i className='bi bi-pencil-square'></i> Actualizar</button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => { }}
                                                        ><i className="bi bi-trash3"></i> Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>sin registros</div>
                    )
                }
            </div >

            <AddCourseModal showModal={showAddModal} setShowModal={setShowAddModal} token={token} list_course={list_course} />

            {/* <AddLanguageModal showModal={showAddModal} setShowModal={setShowAddModal} list_idiomas={list_idiomas} token={token} />
            <UpdateLanguageModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} updateData={updateData} token={token} list_idiomas={list_idiomas} setUpdateData={setUpdateData} /> */}
        </>
    )
}

export default Course