import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Card, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getMyUser, updateUser } from "redux/actions/usersAction";
import { NotifyHelper } from "contants";

interface ValuesProfile {
  firstName: string
  lastName: string
  email: string
  is_barber: number
  is_admin: number
  url_image: string
}

export const Profile = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null)
  const [dataUser, setDataUser] = React.useState<ValuesProfile>()
  const [userId, setUserId] = React.useState(null)
  const urlBase = process.env.REACT_APP_URL_BASE || ""

  const dispatch = useDispatch()

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0])
    }
  }

  const getDataUser = async (id: number) => {
    const rtaGetDataUser = await dispatch(getMyUser(id) as any);
    setDataUser(rtaGetDataUser);
  }
  const updateProfile = async (e: any, data: any) => {
    e.preventDefault()
    console.log(data)
    const formData = new FormData()
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("imageProfile", profileImage || data.imageProfile)
    let rtaUpdateUser
    try {
      rtaUpdateUser = await dispatch(updateUser(formData, userId) as any)
      if (rtaUpdateUser.rta === 1) {
        NotifyHelper.notifySuccess(rtaUpdateUser.message)
      } else {
        NotifyHelper.notifyError(rtaUpdateUser.message)
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
    }
  }

  const getData = async () => {
    const user = await JSON.parse(localStorage.getItem('user') || '{}');
    const id = user.id;
    getDataUser(id)
    setUserId(id);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (dataUser) {
      setDataUser({
        ...dataUser,
        [e.target.name]: e.target.value
      });
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <AppBarComponent>
      <MotionComponent>
        <Card>
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Mis datos
            </Typography>
            <Grid container direction="column" sx={{ overflowX: "hidden" }}>
              <Grid
                container
                spacing={3}
                sx={{
                  px: { xs: 0, md: 7 },
                  py: { md: 3 }
                }}
              >
                <Grid item md={3} width="100%">
                  <Paper style={{ width: "auto", height: "200px", border: "1px solid #ddd" }}>
                    <label htmlFor="file" style={{ cursor: "pointer", display: "flex", height: "100%" }}>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          id="file"
                          onChange={loadFile}
                          style={{ display: "none" }}
                        />
                        <Avatar src={profileImage ? URL.createObjectURL(profileImage) : urlBase + dataUser?.url_image} sx={{ width: 170, height: 170 }} />

                      </Box>
                    </label>
                  </Paper>
                </Grid>
                <Grid item md={9}>
                  <Box component="form" encType="multipart/form-data"
                    noValidate onSubmit={(e) => updateProfile(e, dataUser)}  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="Nombre"
                          autoFocus
                          value={dataUser?.firstName || ''}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Apellido"
                          name="lastName"
                          value={dataUser?.lastName || ''}
                          onChange={handleChange}
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          value={dataUser?.email || ''}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Actualizar datos
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </MotionComponent>
    </AppBarComponent >
  );
}

export default Profile
