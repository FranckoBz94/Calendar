import moment from "moment"

export class DateContants {
  static formatDateTime = (fecha: any) => {
    const hora = fecha.getHours()
    const minutos = fecha.getMinutes()
    const horaMinutos = `${hora < 10 ? "0" + hora : hora}:${minutos < 10 ? "0" + minutos : minutos
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
    // Si startDate no es un objeto Date, intenta convertirlo
    if (!(startDate instanceof Date)) {
        startDate = new Date(startDate);
    }
    
    // Verifica que la conversión fue exitosa
    if (!isNaN(startDate.getTime())) {
        if (optionTimeEnd !== null) {
            const end = new Date(startDate.getTime() + (optionTimeEnd * 60000));
            return end;
        }
    } else {
        console.error("Invalid date format: ", startDate);
    }
  }

  static generateDates = (startDate: Date, endDate: Date, hiddenDays: number[]): string[] => {
    const dates: string[] = [];
    let currentDate: Date = new Date(startDate);

    while (currentDate <= endDate) {
      const dayIndex = currentDate.getDay(); 
        if (!hiddenDays.includes(dayIndex)) {
        dates.push(moment(currentDate).format('YYYY-MM-DD'));
      }
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    
    return dates;
  };
  
  
}
