import React, { useEffect, useState } from "react"
// import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"
import Paper from "@mui/material/Paper"
import { NotifyHelper, optionsTable, getMuiTheme } from "contants"
import { useStyles } from "./styles"
import { getAllUsers, removeUser } from "redux/actions/usersAction"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Box from "@mui/material/Box"
import MotionModal from "components/Modal/Modal"
import FormUser from "./FormUser"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import moment from "moment"
import MUIDataTable from "mui-datatables"
import { ThemeProvider } from '@mui/material/styles'
import { Avatar } from "@mui/material"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import MainComponent from "pages/AppBar/MainComponent"
import { useUser } from "components/UserProvider"

const Users = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [optionSelected, setOptionSelected] = useState("")
  const dispatch = useDispatch()
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const users = useSelector((state: RootState) => storeComplete.users, shallowEqual);

  const { user: userLogged } = useUser();

  const handleOpenModal = (option: string) => {
    setOptionSelected(option)
    setDataSelected({})
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const dataRow = async (option: string, e: any) => {
    const values = {
      id: e[0],
      url_image: e[1],
      firstName: e[2],
      lastName: e[3],
      email: e[4],
      fecha_creacion: e[5],
      is_barber: e[6],
      is_admin: e[7],
    };
    console.log(e)
    if (option === "Editar") {
      handleOpenModal("Editar")
      console.log(values)
      setDataSelected(values)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteUser(values)
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
      name: "id",
      label: "ID",
      options: {
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "url_image",
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
      name: "fecha_creacion",
      label: "Usuario Creado",
      options: {
        customBodyRender: (value: any) => moment(value).format("DD/MM/YYYY"),
      },
    },
    {
      name: "is_barber",
      label: "Barbero",
      options: {
        customBodyRender: (row: any) => (row === 1 ? <CheckBoxIcon color="success" /> : <CloseIcon color="error" />)
      },
    },
    {
      name: "is_admin",
      label: "Administrador",
      options: {
        customBodyRender: (row: any) => (row === 1 ? <CheckBoxIcon color="success" /> : <CloseIcon color="error" />)
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
                {tableMeta.rowData.id}
              </Button>
              {tableMeta.rowData[0] !== userLogged?.id && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

                  onClick={() => dataRow("Eliminar", tableMeta.rowData)}
                >
                </Button>
              )}
            </div>
          );
        },
      },
    },
  ]


  useEffect(() => {
    dispatch(getAllUsers() as any)
  }, [dispatch])

  return (
    <MainComponent>
      <MotionComponent>
        <>
          <MotionModal
            isOpen={openModal}
            handleClose={handleCloseModal}
          >
            <Box mt={1} position="relative">
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
                    <Grid container justifyContent="flex-end" p={2} >
                      <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => handleOpenModal("NewUser")}
                        className={classes.btnAddUser}
                        sx={{ width: { xs: "100%", md: "auto" } }}
                      >
                        Nuevo Usuario
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
                <Paper className={classes.cardTable}>
                  <Grid >
                    <ThemeProvider theme={getMuiTheme("#0f4c75")}>
                      <MUIDataTable
                        title={"Listado de Usuarios"}
                        data={users}
                        columns={columnsTableUsers}
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
    </MainComponent>
  )
}

export default Users
