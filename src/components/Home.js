import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Footer from './Footer'
import Dashboard from './Dashboard';
import User from './User';
import useLogin from '../hooks/use-login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth-context';
import Swal from 'sweetalert2';

const Home = () => {

    const [selectedView, setSelectedView] = useState(0);

    const { logout } = useLogin();
    const navigate = useNavigate()
    const { token } = useAuth()

    const handleLogout = async () => {

        const modal = await Swal.fire({
            title: "¿Estás seguro que deseas cerrar sesión?",
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

        if (modal.isConfirmed) {
            try {
                const response = await logout()

                if (response) {
                    alert(response.message)
                    navigate('/', { replace: true })
                }
            } catch (error) {
                console.log("Error al cerrar sesión: ", error.message)

                alert('Error al cerrar sesión: ' + error.message)
            }
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [token, navigate]);
    return (
        <>
            <header className="navbar sticky-top bg-dark flex-nowrap p-0 shadow" data-bs-theme="dark">
                <button
                    className="btn btn-dark ms-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                >
                    <i className="bi bi-list"></i>
                </button>
                <a className="navbar-brand px-3 fs-6 text-white" href="#">
                    Academia de idiomas UDB - Administración
                </a>
            </header>

            <Tabs selectedIndex={selectedView} onSelect={setSelectedView}>

                <div
                    className="offcanvas offcanvas-start text-bg-dark"
                    tabIndex="-1"
                    id="sidebarMenu"
                    aria-labelledby="sidebarMenuLabel"
                >

                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="sidebarMenuLabel">Menú</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="offcanvas-body d-flex flex-column">
                        <hr />
                        <TabList className="nav nav-pills flex-column mb-auto">
                            <Tab type="button" className="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" style={{ fontSize: '20px' }}>
                                <i className="bi bi-speedometer2"></i>
                                Dashboard
                            </Tab>
                            <Tab type="button" className="nav-link d-flex align-items-center gap-2 text-white" style={{ fontSize: '20px' }}>
                                <i className="bi bi-people"></i>
                                Usuarios
                            </Tab>
                        </TabList>
                        <hr />
                        <button
                            className="nav-link d-flex align-items-center gap-2"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-in-left"></i>
                            Cerrar sesión
                        </button>
                    </div>

                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 px-md-4 pt-3">
                            <TabPanel>
                                <Dashboard />
                            </TabPanel>
                            <TabPanel>
                                <User />
                            </TabPanel>
                        </div>
                    </div>
                </div>
                <Footer />
            </Tabs>

        </>
    )
}

export default Home