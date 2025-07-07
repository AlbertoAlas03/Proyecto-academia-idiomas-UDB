import NoData from "./NoData"
import useTeacherAssigment from "../hooks/use-teacher-assigment"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/auth-context"
import AssigmentTeacherModal from "./AssigmentTeacherModal"
import Swal from "sweetalert2"
import UpdateAssignmentModal from "./UpdateAssignmentModal"

const TeacherAssigment = () => {

    const [showAssigmentModal, setshowAssigmentModal] = useState(false)
    const [updateData, setupdateData] = useState([])
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const { list_teacher_assigment, teacherAssigment, delete_assingment } = useTeacherAssigment()

    const { token } = useAuth()

    const handledelete = async (asignacion_id) => {

        const response_modal = await Swal.fire({
            title: "¿Estas seguro de eliminar esta asignación?",
            icon: "warning",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            }
        })

        if (response_modal.isConfirmed) {
            try {

                const response = await delete_assingment(token, asignacion_id)

                if (response) {
                    await Swal.fire({
                        title: response.message,
                        icon: "success",
                        draggable: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    list_teacher_assigment(token)
                }

            } catch (error) {

                alert(error.message || 'Error al eliminar la asignacion')
            }
        }
    }

    const showModalDeleteWarning = async () => {
        await Swal.fire({
            title: "No puedes eliminar esta asignación porque esta activa!",
            icon: "error",
            draggable: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
    }


    const showModalUpdateWarning = async () => {
        await Swal.fire({
            title: "No puedes actualizar esta asignación!",
            icon: "error",
            draggable: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
    }

    useEffect(() => {
        list_teacher_assigment(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-person-video3"></i> Asignación de profesores</h1>
            </div>
            <div className="row g-4 mb-3">
                <div className="col col-lg-2">
                    <button type="button" className="btn btn-success" onClick={() => setshowAssigmentModal(true)}><i className="bi bi-plus"></i> Nueva asignación</button>
                </div>
                {
                    teacherAssigment.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Profesor</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Curso</th>
                                        <th scope="col">Idioma</th>
                                        <th scope="col">Programa</th>
                                        <th scope="col">Modalidad</th>
                                        <th scope="col">Horario</th>
                                        <th scope="col">Inscritos</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Fecha de asignación</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        teacherAssigment.map((Teacher) => (
                                            <tr key={Teacher.asignacion_id}>
                                                <th scope="row">{Teacher.asignacion_id}</th>
                                                <td>{Teacher.profesor.nombre + ' ' + Teacher.profesor.apellido}</td>
                                                <td>{Teacher.profesor.email}</td>
                                                <td>{Teacher.curso.nombre}</td>
                                                <td>{Teacher.curso.idioma.nombre}</td>
                                                <td>{Teacher.curso.programa}</td>
                                                <td>{Teacher.curso.modalidad}</td>
                                                <td>{Teacher.curso.horario}</td>
                                                <td className="text-center">{Teacher.curso.total_inscripciones}</td>
                                                <td className="text-center">
                                                    <span
                                                        className={Teacher.curso.estado === 'activo' ? 'badge text-bg-success' : Teacher.curso.estado === 'finalizado' ? 'badge text-bg-danger' : 'badge text-bg-warning'}
                                                    >
                                                        {Teacher.curso.estado}
                                                    </span>
                                                </td>
                                                <td>{new Date(Teacher.fecha_asignacion).toISOString().split('T')[0]}</td>
                                                <td>

                                                    <div className="d-flex">
                                                        <button type="button" className='btn btn-warning' onClick={() => {
                                                            if (Teacher.curso.estado === 'activo' || Teacher.curso.estado === 'finalizado') {
                                                                showModalUpdateWarning()
                                                            } else {

                                                                const updateData = {
                                                                    asignacion_id: Teacher.asignacion_id,
                                                                    curso_id: Teacher.curso_id,
                                                                    profesor_id: Teacher.profesor_id
                                                                }

                                                                setupdateData(updateData)
                                                                setShowUpdateModal(true)
                                                            }
                                                        }}><i className="bi bi-pencil-square"></i> Actualizar</button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => {
                                                                if (Teacher.curso.estado === 'activo') {
                                                                    showModalDeleteWarning()
                                                                } else {
                                                                    handledelete(Teacher.asignacion_id)
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

            <AssigmentTeacherModal showModal={showAssigmentModal} setShowModal={setshowAssigmentModal} token={token} list_teacher_assigment={list_teacher_assigment} />
            <UpdateAssignmentModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} token={token} updateData={updateData} list_teacher_assigment={list_teacher_assigment} />
        </>
    )

}

export default TeacherAssigment