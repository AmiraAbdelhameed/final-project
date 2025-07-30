import { Box, CircularProgress, Fade } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <>
          <Box
              sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 8,
                  background: `linear-gradient(135deg, primary.main08 0%, secondary.main08 100%)`,
              }}
          >
              <Fade in={true} timeout={1000}>
                  <Box sx={{ textAlign: "center" }}>
                      <CircularProgress
                          sx={{
                              color: "primary.main",
                              width: 60,
                              height: 60,
                              mb: 2,
                          }}
                      />
                  </Box>
              </Fade>
          </Box> 
    </>
  )
}

export default Loading
