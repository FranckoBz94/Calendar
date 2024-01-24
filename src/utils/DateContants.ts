export class DateContants {
  static formatDateTime = (fecha: any) => {
    const hora = fecha.getHours()
    const minutos = fecha.getMinutes()
    const horaMinutos = `${hora < 10 ? "0" + hora : hora}:${
      minutos < 10 ? "0" + minutos : minutos
    }`
    return horaMinutos
  }

  static formatDate = (fecha: any) => {
    const dia = fecha.getDate().toString().padStart(2, "0")
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const anio = fecha.getFullYear().toString()
    const fechaFormateada = `${anio}-${mes}-${dia}`
    return fechaFormateada
  }

  static formatDateToTimeInput = (dateString: any) => {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    // Asegúrate de agregar un 0 delante de los números menores a 10
    const formattedHours = hours < 10 ? `0${hours}` : hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    // Devuelve una cadena con el formato "HH:mm"
    return `${formattedHours}:${formattedMinutes}`
  }

  static calculateEndTime = (startDate: any, optionTimeEnd: any) => {
    console.log("startDate", new Date(startDate))
    console.log("optionTimeEnd", optionTimeEnd)
    if (optionTimeEnd !== null) {
      const end = new Date(startDate)
      end.setMinutes(end.getMinutes() + optionTimeEnd)
      return end
    }
  }
}
