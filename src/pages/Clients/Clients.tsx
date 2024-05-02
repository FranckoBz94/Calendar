import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import { Box, Button, Card, Grid, Paper } from "@mui/material"
import { useStyles } from "./styles"
import FormClient from "./FormClient"
import "react-data-table-component-extensions/dist/index.css"
import { NotifyHelper, getMuiTheme, optionsTable } from "contants"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import MotionComponent from "components/MotionComponent"
import MotionModal from "components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import { getAllClients, removeClient } from "redux/actions/clientsAction"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import { ThemeProvider } from "@mui/styles"
import MUIDataTable from "mui-datatables"

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
    const values = {
      id: e[0],
      firstName: e[1],
      lastName: e[2],
      email: e[3],
      telefono: e[4],
      dni: e[5]
    };
    console.log(values)
    if (option === "Editar") {
      handleOpenModal("Editar")
      setDataSelected(values)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteUser(values)
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
      name: "id",
      label: "ID",
      options: {
        display: false,
      }
    },
    {
      name: "firstName",
      label: "Nombre",
    },
    {
      name: "lastName",
      label: "Apellido",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "dni",
      label: "Dni",
    },
    {
      name: "telefono",
      label: "telefono"
    },
    {
      name: "actions",
      label: "Acciones",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <div style={{ display: "flex" }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                style={{ marginRight: "4px" }}

                onClick={() => dataRowClient("Editar", tableMeta.rowData)}
              >

              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

                onClick={() => dataRowClient("Eliminar", tableMeta.rowData)}
              >

              </Button>
            </div>
          );
        },
      },
    },
  ];



  useEffect(() => {
    dispatch(getAllClients() as any)
  }, [dispatch])

  return (
    <AppBarComponent>
      <>
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
                  <Paper >
                    <Grid>
                      <ThemeProvider theme={getMuiTheme("#0b0e3a")}>
                        <MUIDataTable
                          title={"Clientes"}
                          data={clients}
                          columns={columnsTableClients}
                          options={optionsTable}
                        />
                      </ThemeProvider>
                    </Grid>
                  </Paper>
                </Box>
              </Card>
            </Box>
          </>
        </MotionComponent>
      </>
    </AppBarComponent>
  )
}

export default Clients
