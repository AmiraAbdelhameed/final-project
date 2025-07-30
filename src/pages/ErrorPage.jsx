import { Box, Typography, Container, Grid, Paper } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
    return (
        <>
              <Container maxWidth="md" sx={{maxHeight:'80vh'}} >
            <Grid container spacing={1} sx={{justifyContent:'center' , alignItems:'center'}}>
                <Grid item>
                    <Typography component={"h2"} sx={{ fontWeight:'bold' ,my:4 }}>لا يمكن العثور علي الصفحه المطلوبه </Typography>
                </Grid>
           
                <Box component={"img"} src='./images/error.svg' sx={{ width:'100%', height:'60vh'}} />
              
            </Grid>
              </Container>
        </>
    )
}

export default ErrorPage
