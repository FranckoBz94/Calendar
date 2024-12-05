import { useEffect } from "react"


const Prueba = () => {
    console.log("pruebas")

    useEffect(() => {
        console.log("una vex")
    }, [])
    return (
        <div>Prueba</div>
    )
}

export default Prueba

