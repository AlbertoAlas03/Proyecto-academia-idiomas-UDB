import { useState, useEffect, use } from "react";
import useUser from "../hooks/use-user";
import { useAuth } from '../hooks/auth-context'
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import Swal from "sweetalert2";
import NoData from "./NoData";
import Select from "react-select";

const User = () => {

    const [showAddModal, setShowAddModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [DataUpdate, setDataUpdate] = useState([])
    const [isSearching, setisSearching] = useState(false)
    const [UserSelected, setUserSelected] = useState(null)
    const [userID, setuserID] = useState('')

    const { list_user, usuarios, enable_user, disable_user, search_usuario, searchData, setsearchData } = useUser()
    const { token, user } = useAuth()

    const optionsUser = usuarios.map((u) => ({
        value: u.usuario_id,
        label: `${u.nombre} ${u.apellido} - ${u.rol}`
    }))

    const handleChangeUser = (UserSelected) => {
        setUserSelected(UserSelected)
        setuserID(UserSelected ? UserSelected.value : '')
    }

    const handleSearch = async () => {
        try {

            await search_usuario(token, userID)
            setisSearching(true)

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
                    setisSearching(false)
                    setUserSelected(null)
                    setuserID('')
                    setsearchData(null)
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
                    setisSearching(false)
                    setUserSelected(null)
                    setuserID('')
                    setsearchData(null)
                }

            } catch (error) {

                alert(error.message || 'Hubo un error en el servidor')
            }
        }
    }

    const handleReset = () => {
        setisSearching(false)
        setUserSelected(null)
        setuserID('')
        setsearchData(null)
    }

    useEffect(() => {
        list_user(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-people"></i> Gestión de usuarios</h1>
            </div>
            <div className="row g-4 mb-3 align-items-center">
                <div className="col-auto">
                    <button type="button" className="btn btn-success" onClick={() => setShowAddModal(true)}><i className="bi bi-person-add"></i> Registrar usuario</button>
                </div>
                <div className="col ms-auto">
                    <div className="d-flex" style={{ maxWidth: '400px', marginLeft: 'auto' }}>
                        <Select
                            isDisabled={isSearching}
                            className="w-100"
                            options={optionsUser}
                            value={UserSelected}
                            onChange={handleChangeUser}
                            placeholder="Buscar usuario..."
                            isClearable
                            noOptionsMessage={() => 'No hay coincidencias'}
                        />
                        <button type="button" className={isSearching ? 'btn btn-success' : 'btn btn-primary'} style={{ marginLeft: '5px' }}
                            onClick={() => {
                                if (isSearching) {
                                    handleReset()
                                } else {
                                    handleSearch()
                                }

                            }}>
                            <i className={isSearching ? 'bi bi-arrow-repeat' : 'bi bi-search'}></i>
                        </button>
                    </div>
                </div>
                {
                    searchData ? (
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

                                        <tr key={searchData.usuario_id}>
                                            <th scope="row">{searchData.usuario_id}</th>
                                            <td>{searchData.nombre}</td>
                                            <td>{searchData.apellido}</td>
                                            <td>{searchData.email}</td>
                                            <td>{searchData.telefono}</td>
                                            <td>{searchData.rol}</td>
                                            <td className='text-center'>
                                                <span className={searchData.activo ? 'badge text-bg-success' : 'badge text-bg-danger'}>
                                                    {searchData.activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td>{searchData ? new Date(searchData.fecha_registro).toISOString().split('T')[0] : 'Fecha no disponible'}</td>
                                            <td>

                                                <div className="d-flex">
                                                    <button disabled={user.usuario_id === searchData.usuario_id} type="button" className={searchData.activo ? 'btn btn-danger' : 'btn btn-success'} onClick={() => {
                                                        if (searchData.activo) {
                                                            Disable_user(searchData.usuario_id)
                                                        } else {
                                                            Enable_user(searchData.usuario_id)
                                                        }
                                                    }}><i className={searchData.activo ? 'bi bi-x-square' : 'bi bi-check2-square'}></i> {searchData.activo ? 'Inhabilitar' : 'Habilitar'}</button>
                                                    <button
                                                        disabled={user.usuario_id === searchData.usuario_id}
                                                        type="button"
                                                        className="btn btn-warning"
                                                        style={{ marginLeft: '10px' }}
                                                        onClick={() => {

                                                            const dataToupdate = {
                                                                usuario_id: searchData.usuario_id,
                                                                nombre: searchData.nombre,
                                                                apellido: searchData.apellido,
                                                                email: searchData.email,
                                                                telefono: searchData.telefono,
                                                                rol: searchData.rol
                                                            }

                                                            setDataUpdate(dataToupdate)
                                                            setShowUpdateModal(true)
                                                        }}
                                                    ><i className="bi bi-pencil-square"></i> Actualizar</button>
                                                </div>
                                            </td>
                                        </tr>

                                    }

                                </tbody>
                            </table>
                        </div>
                    ) : (
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
                                                            <button disabled={user.usuario_id === usuario.usuario_id} type="button" className={usuario.activo ? 'btn btn-danger' : 'btn btn-success'} onClick={() => {
                                                                if (usuario.activo) {
                                                                    Disable_user(usuario.usuario_id)
                                                                } else {
                                                                    Enable_user(usuario.usuario_id)
                                                                }
                                                            }}><i className={usuario.activo ? 'bi bi-x-square' : 'bi bi-check2-square'}></i> {usuario.activo ? 'Inhabilitar' : 'Habilitar'}</button>
                                                            <button
                                                                disabled={user.usuario_id === usuario.usuario_id}
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
                    )

                }
            </div >

            <AddUserModal
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                list_user={list_user}
                token={token}
                setUserSelected={setUserSelected}
                setuserID={setuserID}
                setisSearching={setisSearching}
                setsearchData={setsearchData}
            />
            <UpdateUserModal
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                DataUpdate={DataUpdate}
                token={token}
                list_user={list_user}
                setUserSelected={setUserSelected}
                setuserID={setuserID}
                setisSearching={setisSearching}
                setsearchData={setsearchData}
            />
        </>
    )
}

export default User