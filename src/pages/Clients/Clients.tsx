import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import { Box, Button, Card, Grid, Paper } from "@mui/material"
import { useStyles } from "./styles"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import FormClient from "./FormClient"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { NotifyHelper, paginationOption } from "contants"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import MotionComponent from "components/MotionComponent"
import MotionModal from "components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import { getAllClients, removeClient } from "redux/actions/clientsAction"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import { ToastContainer } from "react-toastify"

const Clients = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [optionSelected, setOptionSelected] = useState("")
  const [dataSelected, setDataSelected] = useState({})

  const dispatch = useDispatch()
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { clients } = useSelector((state: RootState) => storeComplete.clients)

  const handleOpenModal = (option: string) => {
    setOptionSelected(option)
    setDataSelected({})
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const dataRowClient = async (option: string, e: any) => {
    if (option === "Editar") {
      handleOpenModal("Editar")
      setDataSelected(e)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteUser(e)
      if (rtaDelete) {
        const rtaRemoveUser = await dispatch(removeClient(id) as any)
        if (rtaRemoveUser.rta === 1) {
          NotifyHelper.notifySuccess(`Cliente eliminado correctamente.`)
          handleCloseModal()
        } else {
          NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
          handleCloseModal()
        }
      }
    }
  }

  const columnsTableClients = [
    {
      name: "Id",
      selector: (row: any) => row.id,
      sortable: true
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
      name: "Dni",
      selector: (row: any) => row.dni,
      sortable: true
    },
    {
      name: "telefono",
      selector: (row: any) => row.telefono,
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
          onClick={() => dataRowClient("Editar", d)}
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
          onClick={() => dataRowClient("Eliminar", d)}
        ></Button>
      ],
      grow: 2,
      center: true
    }
  ]

  const tableData = {
    columns: columnsTableClients,
    data: clients
  }

  useEffect(() => {
    dispatch(getAllClients() as any)
  }, [dispatch])

  return (
    <AppBarComponent>
      <MotionComponent>
        <>
          <Card variant="outlined" className={classes.colorCard}>
            <Box px={2}>
              <p className={classes.card_title}>Clientes</p>
            </Box>
          </Card>
          <Box mt={2}>
            <Card variant="outlined">
              <Box p={2}>
                <div>
                  <MotionModal
                    isOpen={openModal}
                    handleClose={handleCloseModal}
                  >
                    <Box mt={1} position="relative">
                      <FormClient
                        dataFormClient={dataSelected}
                        optionSelected={optionSelected}
                        setOpenModal={setOpenModal}
                      />
                    </Box>
                  </MotionModal>
                </div>
                <Grid mb={2}>
                  <Card variant="outlined">
                    <Grid container justifyContent="flex-end" p={2}>
                      <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => handleOpenModal("NewClient")}
                        className={classes.btnAddClient}
                      >
                        Nuevo Cliente
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
                <Paper className={classes.cardTable}>
                  <Card variant="outlined">
                    <Grid p={2}>
                      <DataTableExtensions {...tableData} px={0}>
                        <DataTable
                          columns={columnsTableClients}
                          data={clients}
                          pagination
                          sortIcon={<ArrowDownwardIcon />}
                          highlightOnHover
                          defaultSortAsc={true}
                          title="Listado de Clientes"
                          noDataComponent="No hay datos para mostrar"
                          paginationComponentOptions={paginationOption}
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

export default Clients
