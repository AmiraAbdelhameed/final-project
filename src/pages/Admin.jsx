import Sidebar from '../components/Admin/Sidebar'
import { Divider, Grid  } from '@mui/material'
import { Outlet } from 'react-router'

const Admin = () => {
  return (
    <>
        <Grid container spacing={0} justifyContent={"space-evenly"} >
          <Grid
          size={2}
      
          sx={{ minHeight: "80vh" }}>
            <Sidebar />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid
      
          size={8} 
          
          >
            <Outlet />
          </Grid>
        </Grid>
 
    </>
  )
}

export default Admin
