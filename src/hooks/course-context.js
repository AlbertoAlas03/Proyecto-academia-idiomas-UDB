import { createContext, useState, useEffect, useContext } from "react";

export const CourseContext = createContext()

export const CourseProvider = ({ children }) => {

    const [courses, setCourses] = useState([])

    return (
        <CourseContext.Provider value={{ courses, setCourses }}>
            {children}
        </CourseContext.Provider>
    )
}

export const CallCourses = () => useContext(CourseContext)