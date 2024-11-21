import React, { useEffect, useState } from "react"
import { Box, Button, Card, Grid, Paper } from "@mui/material"
import { useStyles } from "./styles"
import FormService from "./FormService"
import "react-data-table-component-extensions/dist/index.css"
import { NotifyHelper, getMuiTheme, optionsTable } from "contants"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import MotionComponent from "components/MotionComponent"
import MotionModal from "components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import { getAllServices, removeService } from "redux/actions/servicesAction"
import { ThemeProvider } from '@mui/material/styles'
import MUIDataTable from "mui-datatables"
import MainComponent from "pages/AppBar/MainComponent"

const Services = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [optionSelected, setOptionSelected] = useState("")
  const [dataSelected, setDataSelected] = useState({})
  const dispatch = useDispatch()
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)

  const { services } = useSelector((state: RootState) => storeComplete.services)
  const handleOpenModal = (option: string) => {
    setOptionSelected(option)
    setDataSelected({})
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const dataRowService = async (option: string, e: any) => {
    const values = {
      id: e[0],
      name_service: e[1],
      price_service: e[2],
      minutes_service: e[3],
      event_color: e[4],
    };
    console.log("values", values)
    if (option === "Editar") {
      handleOpenModal("Editar")
      console.log(values)
      setDataSelected(values)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteService(values)
      if (rtaDelete) {
        const rtaRemoveUser = await dispatch(removeService(id) as any)
        if (rtaRemoveUser.rta === 1) {
          NotifyHelper.notifySuccess(`Servicio eliminado correctamente.`)
          handleCloseModal()
        } else {
          NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
          handleCloseModal()
        }
      }
    }
  }

  const ColorLabel = ({ color }: { color: string }) => {
    const style = {
      backgroundColor: color,
      width: "24px",
      height: "24px",
      display: "inline-block",
      borderRadius: "50%"
    }

    return <div style={style}></div>
  }

  const columnsTableServices = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "name_service",
      label: "Nombre",
    },
    {
      name: "price_service",
      label: "Precio",
    },
    {
      name: "minutes_service",
      label: "Minutos",
    },
    {
      name: "event_color",
      label: "Color del evento",
      options: {
        customBodyRender: (value: string) => <div >
          <ColorLabel color={value} />
        </div>,
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

                onClick={() => dataRowService("Editar", tableMeta.rowData)}
              >

              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

                onClick={() => dataRowService("Eliminar", tableMeta.rowData)}
              >

              </Button>
            </div>
          );
        },
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllServices() as any)
  }, [dispatch])

  return (
    <MainComponent>
      <MotionComponent>
        <>
          <Card variant="outlined" className={classes.colorCard}>
            <Box px={2}>
              <p className={classes.card_title}>Servicios</p>
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
                      <FormService
                        dataFormService={dataSelected}
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
                        sx={{ width: { xs: "100%", md: "auto" } }}
                      >
                        Nuevo Servicio
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
                <Paper className={classes.cardTable}>
                  <Grid>
                    <ThemeProvider theme={getMuiTheme("#404258")}>
                      <MUIDataTable
                        title={"Listado de Servicios"}
                        data={services}
                        columns={columnsTableServices}
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

export default Services
