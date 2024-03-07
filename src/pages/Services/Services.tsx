import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import { Box, Button, Card, Grid, Paper } from "@mui/material"
import { useStyles } from "./styles"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import FormService from "./FormService"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { NotifyHelper, paginationOption } from "contants"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import MotionComponent from "components/MotionComponent"
import MotionModal from "components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { HelperContants } from "utils/HelperContants"
import { ToastContainer } from "react-toastify"
import { getAllServices, removeService } from "redux/actions/servicesAction"

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
    if (option === "Editar") {
      handleOpenModal("Editar")
      console.log(e)
      setDataSelected(e)
    } else {
      const { id, rtaDelete } = await HelperContants.SwalDeleteUser(e)
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
      name: "Id",
      selector: (row: any) => row.id,
      sortable: true,
      omit: true
    },
    {
      name: "Nombre",
      selector: (row: any) => row.name_service,
      sortable: true
    },
    {
      name: "Precio",
      selector: (row: any) => `$ ${row.price_service}`,
      sortable: true
    },
    {
      name: "Minutos",
      selector: (row: any) => row.minutes_service,
      sortable: true
    },
    {
      name: "Color evento",
      // selector: (row: any) => row.event_color,
      cell: (row: any) => <ColorLabel color={row.event_color} />,
      sortable: true
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
          onClick={() => dataRowService("Editar", d)}
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
          onClick={() => dataRowService("Eliminar", d)}
        ></Button>
      ],
      grow: 2,
      center: true
    }
  ]

  const tableData = {
    columns: columnsTableServices,
    data: services
  }

  useEffect(() => {
    dispatch(getAllServices() as any)
  }, [dispatch])

  return (
    <AppBarComponent>
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
                      >
                        Nuevo Servicio
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
                <Paper className={classes.cardTable}>
                  <Card variant="outlined">
                    <Grid p={2}>
                      <DataTableExtensions {...tableData} px={0}>
                        <DataTable
                          columns={columnsTableServices}
                          data={services}
                          pagination
                          sortIcon={<ArrowDownwardIcon />}
                          highlightOnHover
                          defaultSortAsc={true}
                          title="Listado de Servicios"
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

export default Services
