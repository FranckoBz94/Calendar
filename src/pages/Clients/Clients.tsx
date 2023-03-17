import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import { Box, Button, Card, Grid, Paper } from "@mui/material"
import { useStyles } from "./styles"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import RegisterClient from "./RegisterClient"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { paginationOption } from "contants"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import MotionComponent from "components/MotionComponent"
import MotionModal from "components/Modal/Modal"
import CloseIcon from "@mui/icons-material/Close"

const Clients = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const data = [
    { id: 1, name: "John Doe", company: "Acme Inc.", age: 30 },
    { id: 2, name: "Jane Smith", company: "Acme Inc.", age: 32 },
    { id: 3, name: "Bob Johnson", company: "XYZ Corp.", age: 45 },
    { id: 4, name: "Mary Smith", company: "XYZ Corp.", age: 28 },
    { id: 5, name: "Mary Smith", company: "XYZ Corp.", age: 28 },
    { id: 6, name: "Mary Smith", company: "XYZ Corp.", age: 28 },
    { id: 7, name: "Mary Smith", company: "XYZ Corp.", age: 28 }
  ]
  const [filteredData, setFilteredData] = useState(data)

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true
    },
    {
      name: "Company",
      selector: (row: any) => row.company,
      sortable: true
    },
    {
      name: "Age",
      selector: (row: any) => row.age,
      sortable: true
    }
  ]

  const tableData = {
    columns,
    data
  }

  useEffect(() => {
    setFilteredData(data)
  }, [])

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
                  <MotionModal open={openModal} handleClose={handleCloseModal}>
                    <Box mt={1} position="relative">
                      <Box
                        position="absolute"
                        className={classes.close}
                        onClick={handleCloseModal}
                      >
                        <CloseIcon />
                      </Box>
                      <RegisterClient />
                    </Box>
                  </MotionModal>
                </div>
                <Grid mb={2}>
                  <Card variant="outlined">
                    <Grid container justifyContent="flex-end" p={2}>
                      <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleOpenModal}
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
                          columns={columns}
                          data={filteredData}
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
        </>
      </MotionComponent>
    </AppBarComponent>
  )
}

export default Clients
