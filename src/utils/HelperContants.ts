import Swal from "sweetalert2"

export class HelperContants {
  static async SwalDeleteUser(e: any) {
    // eslint-disable-next-line camelcase
    const { id, name_service } = e
    // eslint-disable-next-line camelcase
    const nameService = name_service.replace(/_([a-z])/g, function (g: any) {
      return g[1].toUpperCase()
    })

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
      title: `<h5 style="margin:0">¿Está seguro que desea eliminar a ${nameService}?</h5>`
    }).then((result) => {
      if (result.isConfirmed) {
        rtaDelete = true
      } else {
        rtaDelete = false
      }
    })
    return { id, rtaDelete }
  }
}
