import { useEffect, useState } from "react"
import useLanguage from "../hooks/use-language"
import { useAuth } from "../hooks/auth-context"
import AddLanguageModal from "./AddLanguageModal"
import UpdateLanguageModal from "./UpdateLanguageModal"
import Swal from "sweetalert2"
import NoData from "./NoData"

const Language = () => {

    const [showAddModal, setShowAddModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updateData, setUpdateData] = useState([])

    const { list_idiomas, language, delete_idioma } = useLanguage()

    const { token } = useAuth()

    const handleDelete = async (idioma_id) => {

        const modal_confim = await Swal.fire({
            title: "¿Estas seguro de eliminar este idioma?",
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

        if (modal_confim.isConfirmed) {
            try {

                const response = await delete_idioma(idioma_id, token)

                if (response) {
                    await Swal.fire({
                        title: response.message,
                        icon: "success",
                        draggable: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })

                    list_idiomas(token)

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

    useEffect(() => {
        list_idiomas(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-translate"></i> Gestión de idiomas</h1>
            </div>
            <div className="row g-4 mb-3">
                <div className="col col-lg-2">
                    <button type="button" className="btn btn-success" onClick={() => setShowAddModal(true)}> <i className="bi bi-plus"></i> Registrar nuevo idioma</button>
                </div>
                {
                    language.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Fecha registro</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        language.map((Language) => (
                                            <tr key={Language.idioma_id}>
                                                <th scope="row">{Language.idioma_id}</th>
                                                <td>{Language.nombre}</td>
                                                <td>{new Date(Language.createdAt).toISOString().split('T')[0]}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button type="button" className='btn btn-warning' onClick={() => {
                                                            setShowUpdateModal(true)

                                                            const data = {
                                                                idioma_id: Language.idioma_id,
                                                                nombre: Language.nombre
                                                            }

                                                            setUpdateData(data)

                                                        }}><i className='bi bi-pencil-square'></i> Actualizar</button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => handleDelete(Language.idioma_id)}
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

            <AddLanguageModal showModal={showAddModal} setShowModal={setShowAddModal} list_idiomas={list_idiomas} token={token} />
            <UpdateLanguageModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} updateData={updateData} token={token} list_idiomas={list_idiomas} setUpdateData={setUpdateData} />
        </>
    )
}

export default Language