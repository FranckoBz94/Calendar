import MotionComponent from "components/MotionComponent"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Card, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "redux/actions/usersAction";
import { NotifyHelper } from "contants";
import { useUser } from '../../components/UserProvider';
import { LoadingButton } from "@mui/lab";
import MainComponent from "pages/AppBar/MainComponent";

const Profile = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { user, setUser } = useUser();
  const urlBase = process.env.REACT_APP_URL_BASE || ""

  const dispatch = useDispatch()

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0])
    }
  }

  const updateProfile = async (e: any, data: any) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("imageProfile", profileImage || data.imageProfile)
    let rtaUpdateUser
    try {
      rtaUpdateUser = await dispatch(updateUser(formData, user?.id) as any)
      if (rtaUpdateUser.rta === 1) {
        NotifyHelper.notifySuccess(rtaUpdateUser.message)
        const updatedUser = { ...user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        NotifyHelper.notifyError(rtaUpdateUser.message)
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
    }
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
  };

  return (
    <MainComponent>
      <MotionComponent>
        <Box >
          <Card>
            <Box
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "100%"
              }}
            >
              <Typography component="h1" variant="h5">
                Mis datos
              </Typography>
              <Grid
                container
                spacing={6}
                sx={{
                  px: { xl: 1, md: 3 },
                  mt: 1,
                  mb: 5,
                  minHeight: '100%',
                  width: "100%",
                  flexWrap: 'wrap'
                }}
              >
                <Grid item md={3} sm={12} width="100%" display="flex" flexDirection="column" alignItems="center"  >
                  <div >
                    <label htmlFor="file" style={{ cursor: "pointer", display: "flex" }}>
                      <Box
                        width={150}
                        height={150}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          id="file"
                          onChange={loadFile}
                          style={{ display: "none" }}
                        />
                        <Avatar src={profileImage ? URL.createObjectURL(profileImage) : urlBase + user?.url_image} sx={{ maxWidth: 170, maxHeight: 170, width: "100%", height: "100%" }} />
                      </Box>
                    </label>

                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" noWrap>
                        <b >Administrador:</b> {user?.is_admin === 1 ? 'Si' : 'No'}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        <b>Barbero Activo:</b> {user?.is_barber === 1 ? 'Si' : 'No'}
                      </Typography>
                    </Box>
                  </div>

                </Grid>
                <Grid item md={9} sm={12} display="flex" flexDirection="column">
                  <Box component="form" encType="multipart/form-data"
                    noValidate onSubmit={(e) => updateProfile(e, user)}  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="Nombre"
                          autoFocus
                          value={user?.firstName || ''}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Apellido"
                          name="lastName"
                          value={user?.lastName || ''}
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
                          value={user?.email || ''}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </Grid>
                    </Grid>
                    <LoadingButton
                      type="submit"
                      fullWidth
                      loading={isLoading}
                      loadingPosition="start"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {isLoading ? "Cargando" : "Actualizar datos"}
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </MotionComponent>
    </MainComponent >
  );
}

export default Profile
