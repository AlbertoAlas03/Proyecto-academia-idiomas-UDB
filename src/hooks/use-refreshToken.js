import Url from "../utils/url-data"

const useRefreshToken = () => {

    const { url_renovar_sesion } = Url()

    const refresh = async (setToken) => {

        const response = await fetch(url_renovar_sesion, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if (!response.ok) {
            const ErrorData = await response.json()
            alert(ErrorData.message)
            localStorage.removeItem("token")
            setToken(null)
            return
        }

        const data = await response.json()

        localStorage.setItem("token", data.token_nuevo)
        setToken(data.token_nuevo)
        alert(data.message)

        return data.token_nuevo
    }

    return { refresh }
}

export default useRefreshToken