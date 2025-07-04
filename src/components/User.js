import { useState, useEffect, use } from "react";
import useUser from "../hooks/use-user";
import { useAuth } from '../hooks/auth-context'
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import Swal from "sweetalert2";
import NoData from "./NoData";

const User = () => {

    const [showAddModal, setShowAddModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [DataUpdate, setDataUpdate] = useState([])

    const { list_user, usuarios, enable_user, disable_user } = useUser()
    const { token } = useAuth()

    const Enable_user = async (usuario_id) => {

        const modal_enable = await Swal.fire({
            title: "¿Estás seguro de habilitar a este usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        if (modal_enable.isConfirmed) {

            try {

                const response = await enable_user(usuario_id, token)

                if (response) {
                    await Swal.fire({
                        title: response.message,
                        icon: "success",
                        draggable: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    list_user(token)

                }

            } catch (error) {

                alert(error.message || 'Hubo un error en el servidor')

            }
        }
    }

    const Disable_user = async (usuario_id) => {

        const modal_enable = await Swal.fire({
            title: "¿Estás seguro de inhabilitar a este usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        if (modal_enable.isConfirmed) {

            try {

                const response = await disable_user(usuario_id, token)

                if (response) {
                    await Swal.fire({
                        title: response.message,
                        icon: "success",
                        draggable: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    list_user(token)
                }

            } catch (error) {

                alert(error.message || 'Hubo un error en el servidor')
            }
        }
    }

    useEffect(() => {
        list_user(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-people"></i> Gestión de usuarios</h1>
            </div>
            <div className="row g-4 mb-3">
                <div className="col col-lg-2">
                    <button type="button" className="btn btn-success" onClick={() => setShowAddModal(true)}><i className="bi bi-person-add"></i> Registrar usuario</button>
                </div>
                {
                    usuarios.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Rol</th>
                                        <th scope="col">Estado actual</th>
                                        <th scope="col">Fecha registro</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuarios.map((usuario) => (
                                            <tr key={usuario.usuario_id}>
                                                <th scope="row">{usuario.usuario_id}</th>
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.apellido}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.telefono}</td>
                                                <td>{usuario.rol}</td>
                                                <td className='text-center'>
                                                    <span className={usuario.activo ? 'badge text-bg-success' : 'badge text-bg-danger'}>
                                                        {usuario.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td>{new Date(usuario.fecha_registro).toISOString().split('T')[0]}</td>
                                                <td>

                                                    <div className="d-flex">
                                                        <button type="button" className={usuario.activo ? 'btn btn-danger' : 'btn btn-success'} onClick={() => {
                                                            if (usuario.activo) {
                                                                Disable_user(usuario.usuario_id)
                                                            } else {
                                                                Enable_user(usuario.usuario_id)
                                                            }
                                                        }}><i className={usuario.activo ? 'bi bi-x-square' : 'bi bi-check2-square'}></i> {usuario.activo ? 'Inhabilitar' : 'Habilitar'}</button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => {

                                                                const dataToupdate = {
                                                                    usuario_id: usuario.usuario_id,
                                                                    nombre: usuario.nombre,
                                                                    apellido: usuario.apellido,
                                                                    email: usuario.email,
                                                                    telefono: usuario.telefono,
                                                                    rol: usuario.rol
                                                                }

                                                                setDataUpdate(dataToupdate)
                                                                setShowUpdateModal(true)
                                                            }}
                                                        ><i className="bi bi-pencil-square"></i> Actualizar</button>
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

            <AddUserModal showModal={showAddModal} setShowModal={setShowAddModal} list_user={list_user} token={token} />
            <UpdateUserModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} DataUpdate={DataUpdate} token={token} list_user={list_user} />
        </>
    )
}

export default User