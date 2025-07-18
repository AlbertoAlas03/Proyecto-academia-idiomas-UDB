import { createContext, useState, useEffect, useContext } from "react";

export const CourseContext = createContext()

export const CourseProvider = ({ children }) => {

    const [courses, setCourses] = useState([])
    const [nombre, setNombre] = useState('')
    const [programa, setPrograma] = useState('')
    const [modalidad, setModalidad] = useState('')

    return (
        <CourseContext.Provider value={{
            courses,
            setCourses,
            nombre,
            setNombre,
            programa,
            setPrograma,
            modalidad,
            setModalidad
        }}>
            {children}
        </CourseContext.Provider>
    )
}

export const CallCourses = () => useContext(CourseContext)