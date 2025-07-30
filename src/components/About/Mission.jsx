import { Box, Typography } from '@mui/material'
import React from 'react'

const Mission = () => {
  return (
    <>
          <Box sx={{
              my: 4,
              py: 4
          }}>
              <Typography
                  component={"h2"} variant='h5' sx={{
                      mb: 3,
                      color: 'primary.main',
                      fontWeight: 'bold',
                      textAlign: 'center',

                  }}
              >رسالتنا</Typography>
              <Typography sx={{
                  textAlign: 'center',
                  width: '80%',
                  mx: 'auto',
                  color: 'text.secondary'


              }}>
                  تمكين الأفراد من إحداث فرق حقيقي في حياة الآخرين، عبر منصة تبرعات آمنة، موثوقة، وسهلة الاستخدام تربط المتبرعين بالجمعيات الخيرية المعتمدة في مصر والعالم العربي.
              </Typography>
          </Box>
    </>
      

  )
}

export default Mission
