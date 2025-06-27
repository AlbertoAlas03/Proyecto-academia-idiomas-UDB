import { useState, useEffect } from "react";
import useUser from "../hooks/use-user";
import { useAuth } from '../hooks/auth-context'
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from "sweetalert2";

const User = () => {

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setrole] = useState('')
    const [isProcessing, setisProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const { list_user, usuarios, add_usuario } = useUser()
    const { token } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisProcessing(true)
        setError(null)

        const dataUser = {
            nombre: name,
            apellido: lastName,
            email: email,
            password: password,
            telefono: phone,
            rol: role
        }

        try {

            const response = await add_usuario(token, dataUser)

            if (response) {
                await Swal.fire({
                    title: response.message,
                    icon: "success",
                    draggable: false
                })
                setisProcessing(false)
                clearForm()
                setShowModal(false)
                list_user(token)
            }

        } catch (error) {

            console.log('Error al registrar al usuario: ', error.message)

            setError(error.message || 'Error al registrar al usuario')
            setisProcessing(false)
        }
    }

    const clearForm = () => {
        setEmail('')
        setLastName('')
        setName('')
        setPassword('')
        setPhone('')
        setrole('')
    }

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        list_user(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-people"></i> Usuarios</h1>
            </div>
            <div className="row g-4 mb-3">
                <div className="col col-lg-2">
                    <button type="button" className="btn btn-success" onClick={() => setShowModal(true)}> <i className="bi bi-plus"></i> Registrar usuario</button>
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
                                                <td>{new Date(usuario.fecha_registro).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button type="button" className={usuario.activo ? 'btn btn-danger' : 'btn btn-success'}><i className={usuario.activo ? 'bi bi-x-square' : 'bi bi-check2-square'}></i> {usuario.activo ? 'Inhabilitar' : 'Habilitar'}</button>
                                                        <button type="button" className="btn btn-warning" style={{ marginLeft: '10px' }}><i className="bi bi-pencil-square"></i> actualizar</button>
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

            <Modal
                show={showModal}
                onHide={() => {
                    clearForm()
                    setShowModal(false)
                    setError(null)
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-person-add" style={{ fontSize: '30px' }}></i> Registrar usuario</Modal.Title>
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
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label><i className="bi bi-file-earmark-person"></i> Nombres</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombres del usuario"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicLastName">
                                        <Form.Label><i className="bi bi-file-earmark-person"></i> Apellidos</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Apellidos del usuario"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><i className="bi bi-envelope"></i> Correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email del usuario"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="formBasicPhone">
                                        <Form.Label><i className="bi bi-telephone"></i> Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Teléfono del usuario"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label><i className="bi bi-lock"></i> Contraseña</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button className="input-group-text" onClick={togglePasswordVisibility}><i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></button>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicRol">
                                        <Form.Label><i className="bi bi-person-vcard"></i> Rol del usuario</Form.Label>
                                        <Form.Select value={role} onChange={(e) => setrole(e.target.value)}>
                                            <option>administrador</option>
                                            <option>profesor</option>
                                            <option>estudiante</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>

                            </div>

                            <hr />

                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="success" type="submit">
                                    <i className="bi bi-check-lg"></i> Registrar
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
            </Modal >
        </>
    )
}

export default User