import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"
import Paper from "@mui/material/Paper"
import DataTableExtensions from "react-data-table-component-extensions"
import DataTable from "react-data-table-component"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { NotifyHelper, paginationOption } from "contants"
import { useStyles } from "./styles"
import { getAllUsers, removeUser } from "redux/actions/usersAction"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Box from "@mui/material/Box"
import MotionModal from "components/Modal/Modal"
import CloseIcon from "@mui/icons-material/Close"
import FormUser from "./FormUser"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Users = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [optionSelected, setOptionSelected] = useState("")
  const dispatch = useDispatch()
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { users } = useSelector((state: RootState) => storeComplete.users)

  const handleOpenModal = (option: string) => {
    setOptionSelected(option)
    setDataSelected({})
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const dataRow = async (option: string, e: any) => {
    if (option === "Editar") {
      handleOpenModal("Editar")
      setDataSelected(e)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteUser(e)
      if (rtaDelete) {
        const rtaRemoveUser = await dispatch(removeUser(id) as any)
        if (rtaRemoveUser.rta === 1) {
          NotifyHelper.notifySuccess(`Usuario eliminado correctamente.`)
          handleCloseModal()
        } else {
          NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
          handleCloseModal()
        }
      }
    }
  }

  const columnsTableUsers = [
    {
      name: "Id",
      selector: (row: any) => row.id,
      sortable: true,
      omit: true
    },
    {
      name: "Nombre",
      selector: (row: any) => row.firstName,
      sortable: true
    },
    {
      name: "Apellido",
      selector: (row: any) => row.lastName,
      sortable: true
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true
    },
    {
      name: "Usuario Creado",
      selector: (row: any) => new Date(row.fecha_creacion).toLocaleString(),
      sortable: true
    },
    {
      name: "Activo",
      selector: (row: any) => (row.is_active === 1 ? "Si" : "No"),
      sortable: true,
      center: true
    },
    {
      name: "Administrador",
      selector: (row: any) => (row.is_admin === 1 ? "Si" : "No"),
      sortable: true,
      center: true
    },
    {
      name: "Acciones",
      sortable: false,
      cell: (d: any) => [
        <Button
          key={1}
          style={{ marginLeft: "3px", marginRight: "3px" }}
          variant="contained"
          type="button"
          className="btnTable"
          title="Editar Usuario"
          startIcon={<EditIcon />}
          color="primary"
          onClick={() => dataRow("Editar", d)}
        ></Button>,
        <Button
          key={2}
          variant="contained"
          color="error"
          style={{ marginLeft: "3px", marginRight: "3px" }}
          className="btnTable"
          type="button"
          title="Eliminar Usuario"
          startIcon={<DeleteIcon />}
          onClick={() => dataRow("Eliminar", d)}
        ></Button>
      ],
      grow: 2,
      center: true
    }
  ]

  const tableData = {
    columns: columnsTableUsers,
    data: users
  }

  useEffect(() => {
    dispatch(getAllUsers() as any)
  }, [dispatch])

  return (
    <AppBarComponent>
      <MotionComponent>
        <>
          <MotionModal open={openModal} handleClose={handleCloseModal}>
            <Box mt={1} position="relative">
              <Box
                position="absolute"
                className={classes.close}
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </Box>
              <FormUser
                dataForm={dataSelected}
                optionSelected={optionSelected}
                setOpenModal={setOpenModal}
              />
            </Box>
          </MotionModal>
          <Card variant="outlined" className={classes.colorCard}>
            <Box px={2}>
              <p className={classes.card_title}>Usuarios</p>
            </Box>
          </Card>
          <Box mt={2}>
            <Card variant="outlined">
              <Box p={2}>
                <Grid mb={2}>
                  <Card variant="outlined">
                    <Grid container justifyContent="flex-end" p={2}>
                      <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => handleOpenModal("NewUser")}
                        className={classes.btnAddUser}
                      >
                        Nuevo Usuario
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
                <Paper className={classes.cardTable}>
                  <Card variant="outlined">
                    <Grid p={2}>
                      <DataTableExtensions {...tableData} px={0}>
                        <DataTable
                          columns={columnsTableUsers}
                          data={users}
                          pagination
                          sortIcon={<ArrowDownwardIcon />}
                          highlightOnHover
                          defaultSortAsc={true}
                          title="Listado de Usuarios"
                          noDataComponent="No hay datos para mostrar"
                          paginationComponentOptions={paginationOption}
                          expandableRowsHideExpander
                        />
                      </DataTableExtensions>
                    </Grid>
                  </Card>
                </Paper>
              </Box>
            </Card>
          </Box>
          <ToastContainer />
        </>
      </MotionComponent>
    </AppBarComponent>
  )
}

export default Users
