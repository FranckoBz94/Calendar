import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"
import Paper from "@mui/material/Paper"
import { NotifyHelper, getMuiTheme, optionsTable } from "contants"
import { useStyles } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Box from "@mui/material/Box"
import MotionModal from "components/Modal/Modal"
import FormBarber from "./FormBarber"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import "react-toastify/dist/ReactToastify.css"
import { getAllBarbers, removeBarber } from "redux/actions/barbersAction"
import { ThemeProvider } from '@mui/material/styles'
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Avatar } from "@mui/material"

const Barbers = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [optionSelected, setOptionSelected] = useState("")
  const dispatch = useDispatch()
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { barbers } = useSelector((state: RootState) => storeComplete.barbers)
  console.log(barbers)
  const handleOpenModal = (option: string) => {
    setOptionSelected(option)
    setDataSelected({})
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const dataRow = async (option: string, e: any) => {
    console.log(e)
    const values = {
      id: e[0],
      imagen: e[1],
      firstName: e[2],
      lastName: e[3],
      email: e[4],
      telefono: e[5],
      fecha_creacion: e[6],
      is_active: e[7],
      is_admin: e[8],
    };
    if (option === "Editar") {
      handleOpenModal("Editar")
      console.log("e", values)
      setDataSelected(values)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteUser(values)
      if (rtaDelete) {
        const rtaRemoveBarber = await dispatch(removeBarber(id) as any)
        if (rtaRemoveBarber.rta === 1) {
          NotifyHelper.notifySuccess(`Barbero eliminado correctamente.`)
        } else {
          NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
        }
        handleCloseModal()
      }
    }
  }

  const columnsTableBarbers = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "imagen",
      label: "Imagen",
      options: {
        textAlign: "center",
        customBodyRender: (imagen: any) => <div>
          <Avatar
            alt="Imagen"
            src={`${process.env.REACT_APP_URL_BASE}${imagen}`}
            sx={{ width: 70, height: 70, objectFit: "cover" }}
          />
        </div>,
      },
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
      name: "telefono",
      label: "Telefono",
    },
    {
      name: "fecha_creacion",
      label: "Usuario Creado",
      options: {
        customBodyRender: (value: any) => moment(value).format("DD/MM/YYYY"),
      },
    },
    {
      name: "is_active",
      label: "Activo",
      options: {
        customBodyRender: (row: any) => (row === 1 ? "Si" : "No")
      },
    },
    {
      name: "is_admin",
      label: "Administrador",
      options: {
        customBodyRender: (row: any) => (row === 1 ? "Si" : "No")
      },
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

                onClick={() => dataRow("Editar", tableMeta.rowData)}
              >

              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => dataRow("Eliminar", tableMeta.rowData)}
              >
              </Button>
            </div>
          );
        },
      },
    },
  ];


  useEffect(() => {
    dispatch(getAllBarbers() as any)
  }, [dispatch])

  return (
    <AppBarComponent>
      <MotionComponent>
        <>
          <MotionModal
            isOpen={openModal}
            handleClose={handleCloseModal}
          >
            <Box mt={1} position="relative">
              <FormBarber
                dataForm={dataSelected}
                optionSelected={optionSelected}
                setOpenModal={setOpenModal}
              />
            </Box>
          </MotionModal>
          <Card variant="outlined" className={classes.colorCard}>
            <Box px={2}>
              <p className={classes.card_title}>Barberos</p>
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
                        Nuevo Barbero
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
                <Paper className={classes.cardTable}>
                  <Grid >
                    <ThemeProvider theme={getMuiTheme("#0f4c75")}>
                      <MUIDataTable
                        title={"Listado de barberos"}
                        data={barbers}
                        columns={columnsTableBarbers}
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
    </AppBarComponent>
  )
}

export default Barbers
