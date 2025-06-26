import { useEffect } from "react"
import useCount from "../hooks/use-count"
import { useAuth } from '../hooks/auth-context'

const Dashboard = () => {

    const { count_registros, count } = useCount()

    const { token } = useAuth()

    useEffect(() => {
        count_registros(token)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><i className="bi bi-speedometer2"></i> Dashboard</h1>
            </div>
            <div className="row g-4 mb-3">

                <div className="col-md-6">
                    <div className="card text-white bg-primary shadow-lg p-3" style={{ minHeight: '180px' }}>
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fs-4 mb-0">Idiomas ofertados</h5>
                                <i className="bi bi-translate display-3"></i>
                            </div>
                            <h2 className="fw-bold">{count?.count_idiomas ?? 0}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-white bg-success shadow-lg p-3" style={{ minHeight: '180px' }}>
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fs-4 mb-0">Cursos activos</h5>
                                <i className="bi bi-calendar-check display-3"></i>
                            </div>
                            <h2 className="fw-bold">{count?.count_cursos_activos ?? 0}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card text-white bg-warning shadow-lg p-3" style={{ minHeight: '180px' }}>
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fs-4 mb-0">Estudiantes activos</h5>
                                <i className="bi bi-mortarboard display-3"></i>
                            </div>
                            <h2 className="fw-bold">{count?.count_estudiantes ?? 0}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-white bg-info shadow-lg p-3" style={{ minHeight: '180px' }}>
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fs-4 mb-0">Profesores activos</h5>
                                <i className="bi bi-person-video3 display-3"></i>
                            </div>
                            <h2 className="fw-bold">{count?.count_profesores ?? 0}</h2>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard