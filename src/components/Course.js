import { useEffect, useState } from "react"
import useCourse from "../hooks/use-course"
import { useAuth } from "../hooks/auth-context"
import AddCourseModal from "./AddCourseModal"
import NoData from './NoData'
import Swal from "sweetalert2"
import UpdateCourseModal from "./UpdateCourseModal"

const Course = () => {

    const [showAddModal, setShowAddModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updateData, setUpdateData] = useState([])

    const { list_course, course, delete_course } = useCourse()

    const { token } = useAuth()

    const handleDelete = async (curso_id) => {

        const response_modal = await Swal.fire({
            title: "¿Estas seguro de eliminar este curso?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            allowEscapeKey: false,
            allowOutsideClick: false
        })

        if (response_modal.isConfirmed) {

            try {

                const response = await delete_course(token, curso_id)

                if (response) {
                    await Swal.fire({
                        title: response.message,
                        icon: "success",
                        draggable: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    list_course(token)
                }

            } catch (error) {

                await Swal.fire({
                    title: error.message,
                    icon: "error",
                    draggable: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
            }
        }

    }

    const Modal_warning_delete = async () => {
        await Swal.fire({
            title: "¡No puedes eliminar este curso, por que esta activo!",
            icon: "error",
            draggable: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
    }

    const modal_warning_udpate = async () => {
        await Swal.fire({
            title: "¡No puedes actualizar este curso!",
            icon: "error",
            draggable: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
    }

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
                                                <td>{new Date(Course.fecha_inicio).toISOString().split('T')[0]}</td>
                                                <td>{new Date(Course.fecha_fin).toISOString().split('T')[0]}</td>
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

                                                            if (Course.estado === 'activo' || Course.estado === 'finalizado') {
                                                                modal_warning_udpate()
                                                            } else {

                                                                const data = {
                                                                    curso_id: Course.curso_id,
                                                                    idioma_id: Course.idioma.idioma_id,
                                                                    nombre: Course.nombre,
                                                                    descripcion: Course.descripcion,
                                                                    programa: Course.programa,
                                                                    modalidad: Course.modalidad,
                                                                    horario: Course.horario,
                                                                    fecha_inicio: new Date(Course.fecha_inicio).toISOString().split('T')[0],
                                                                    fecha_fin: new Date(Course.fecha_fin).toISOString().split('T')[0],
                                                                    capacidad_maxima: Course.capacidad_maxima
                                                                }

                                                                setUpdateData(data)

                                                                setShowUpdateModal(true)
                                                            }

                                                        }}><i className='bi bi-pencil-square'></i> Actualizar</button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => {
                                                                if (Course.estado === 'activo') {
                                                                    Modal_warning_delete()
                                                                } else {
                                                                    handleDelete(Course.curso_id)
                                                                }
                                                            }}
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
                        <NoData />
                    )
                }
            </div >

            <AddCourseModal showModal={showAddModal} setShowModal={setShowAddModal} token={token} list_course={list_course} />
            <UpdateCourseModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} updateData={updateData} setUpdateData={setUpdateData} token={token} list_course={list_course} />
        </>
    )
}

export default Course