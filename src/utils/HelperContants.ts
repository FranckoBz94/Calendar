import Swal from "sweetalert2"

export class HelperContants {
  static async SwalDeleteUser(e: any) {
    // eslint-disable-next-line camelcase
    const { id, firstName, lastName } = e
    const nameComplete = `${firstName} ${lastName}`

    let rtaDelete: boolean = false
    await Swal.fire({
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      icon: "error",
      reverseButtons: true,
      showCancelButton: true,
      text: "El usuario se borrara de su sistema.",
      title: `<h5 style="margin:0">¿Está seguro que desea eliminar a ${nameComplete}?</h5>`,
    }).then((result) => {
      if (result.isConfirmed) {
        rtaDelete = true
      } else {
        rtaDelete = false
      }
    })
    return { id, rtaDelete }
  }

  static async SwalDeleteService(e: any) {
    // eslint-disable-next-line camelcase
    const { id, name_service:nameService } = e

    let rtaDelete: boolean = false
    await Swal.fire({
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      icon: "error",
      reverseButtons: true,
      showCancelButton: true,
      text: "El usuario se borrara de su sistema.",
      title: `<h5 style="margin:0">¿Está seguro que desea eliminar a ${nameService}?</h5>`,
    }).then((result) => {
      if (result.isConfirmed) {
        rtaDelete = true
      } else {
        rtaDelete = false
      }
    })
    return { id, rtaDelete }
  }

  static async SwalDeleteTurn(turn: any) {
    // eslint-disable-next-line camelcase
    const { idTurn } = turn
    console.log("Turn", turn)
    let rtaDelete: boolean = false
    await Swal.fire({
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      icon: "error",
      reverseButtons: true,
      showCancelButton: true,
      customClass: {
        container: "my-swal-container"
      },
      text: "El usuario se borrara de su sistema.",
      title: `<h5 style="margin:0">¿Está seguro que desea eliminar el turno de ${turn.titleTurn}?</h5>`
    }).then((result) => {
      if (result.isConfirmed) {
        rtaDelete = true
      } else {
        rtaDelete = false
      }
    })
    return { idTurn, rtaDelete }
  }

  static async SwalDeleteUserAsosiate(user: any) {
    // eslint-disable-next-line camelcase
    const { firstName, lastName } = user
    console.log("user", firstName)
    let rtaDelete: boolean = false
    await Swal.fire({
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      icon: "error",
      reverseButtons: true,
      showCancelButton: true,
      customClass: {
        container: "my-swal-container"
      },
      text: "El barbero no tendrá usuario para ingresar al sistema.",
      title: `<h5 style="margin:0">¿Está seguro que desea desvincular este usuario: ${firstName} ${lastName}?</h5>`
    }).then((result) => {
      if (result.isConfirmed) {
        rtaDelete = true
      } else {
        rtaDelete = false
      }
    })
    return { rtaDelete }
  }

}
