import React from 'react'
import { Typography, Box } from '@mui/material'
const Hero = () => {
  return (
      <Box sx={{ position: 'relative', width: '100%', height: '60vh' }}>

          <Box
              component="img"
              src="./images/adminlogin.jpg"
              alt="background"
              sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
              }}
          />
          <Box
              sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
              }}
          />

          <Box
              sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
              }}
          >
              <Typography variant="h4" fontWeight="bold">
                  من نحن
              </Typography>
          </Box>


      </Box>
  )
}

export default Hero
