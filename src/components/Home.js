import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Footer from './Footer'
import Dashboard from './Dashboard';
import User from './User';
import useLogin from '../hooks/use-login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth-context';

const Home = () => {

    const [selectedView, setSelectedView] = useState(0);
    const [showLogoutModal, setshowLogoutModal] = useState(false);

    const { logout } = useLogin();
    const navigate = useNavigate()
    const { token } = useAuth()

    const handleLogout = async () => {
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

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [token, navigate]);
    return (
        <>
            <Tabs selectedIndex={selectedView} onSelect={setSelectedView}>
                <header className="navbar bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Academia de idiomas UDB - Administración</a>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary vh-100 sticky-top">
                            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                                <div className="offcanvas-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

                                    <TabList className="nav flex-column mb-auto">
                                        <Tab className="nav-link d-flex align-items-center gap-2 active" aria-current="page">
                                            <i className="bi bi-speedometer2"></i>
                                            Dashboard
                                        </Tab>
                                        <Tab className="nav-link d-flex align-items-center gap-2 active" aria-current="page">
                                            <i className="bi bi-speedometer2"></i>
                                            Usuarios
                                        </Tab>
                                        <button className="nav-link d-flex align-items-center gap-2" onClick={() => setshowLogoutModal(true)}>
                                            <i className="bi bi-box-arrow-in-left"></i>
                                            Cerrar sesión
                                        </button>
                                    </TabList>
                                </div>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="col-md-9 col-lg-10 ms-sm-auto px-md-4 pt-3">
                            <TabPanel>
                                <Dashboard />
                            </TabPanel>
                            <TabPanel>
                                <User />
                            </TabPanel>
                        </div>
                    </div>
                </div>

                {
                    showLogoutModal && (
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Cerrar sesión</h5>
                                        <button type="button" className="btn-close" onClick={() => setshowLogoutModal(false)}></button>
                                    </div>
                                    <div className="modal-body">¿Estás seguro que deseas cerrar sesión?</div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setshowLogoutModal(false)}>
                                            <i className="bi bi-x"></i> Cancelar
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-left"></i> Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <Footer />
            </Tabs>
        </>
    )
}

export default Home