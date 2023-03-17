import React, { useEffect, useState } from "react"
import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"
import Paper from "@mui/material/Paper"
import DataTableExtensions from "react-data-table-component-extensions"
import DataTable from "react-data-table-component"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { paginationOption, columnsTableUsers } from "contants"
import { useStyles } from "./styles"
import { getAllUsers } from "redux/actions/usersAction"
import { useDispatch, useSelector } from "react-redux"
import store from "redux/store"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Box from "@mui/material/Box"
import MotionModal from "components/Modal/Modal"
import CloseIcon from "@mui/icons-material/Close"
import RegisterClient from "pages/Clients/RegisterClient"

export function dataRow(e: any): any {
  console.log(e)
}

const Users = () => {
  const classes: any = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  type RootState = ReturnType<typeof store.getState>
  const { users } = useSelector((state: RootState) => state.users)
  console.log(users)
  const tableData = {
    columns: columnsTableUsers,
    data: users
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    dispatch(getAllUsers() as any)
  }, [dispatch, dataRow])

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
              <RegisterClient />
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
                        onClick={handleOpenModal}
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

export default Users
