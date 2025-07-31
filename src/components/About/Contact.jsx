import {
    Box,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Button,
    Select,
    InputLabel,
    FormControl,
    TextareaAutosize,
    IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

import React from 'react'

const Contact = () => {
    return (
        <>
            <Box sx={{ position: 'relative', width: '100%', height: '50vh', overflow: 'hidden', my:1 }}>

              <Box component={'img'} src='./images/adminlogin.jpg' alt='Contact Us'
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', mb: 4 }} >
              </Box>
              <Box sx={{
                  position: 'absolute', top: '30%', right: { md: '10%' }, textAlign: 'center', width: {
                      xs: '90%',
                      sm: '60%',
                      md: '40%',
                  }
              }}>
                  <Box sx={{ backgroundColor: 'primary.main', color: 'white', padding: 2 }}>
                      <Typography>تواصل معنا</Typography>
                      <Box component={'table'} sx={{ width: '100%', mt: 2, textAlign: 'right' }}>
                          <Box component={'tbody'}>
                              <Box component={'tr'}>
                                  <Box component={'td'} sx={{ padding: 1, width: '30%' }}>
                                      <Typography variant="body1">الايميل </Typography>
                                  </Box>
                                  <Box component={'td'} sx={{ padding: 1 }}>
                                      <Typography variant="body1">ayady@gmail.com</Typography>
                                  </Box>
                              </Box>
                              <Box component={'tr'}>
                                  <Box component={'td'} sx={{ padding: 1, width: '30%' }}>
                                      <Typography variant="body1">رقم الهاتف </Typography>
                                  </Box>
                                  <Box component={'td'} sx={{ padding: 1 }}>
                                      <Typography variant="body1">+1234567890</Typography>
                                  </Box>
                              </Box>
                              <Box component={'tr'}>
                                  <Box component={'td'} sx={{ padding: 1, width: '30%' }}>
                                      <Typography variant="body1">العنوان</Typography>
                                  </Box>
                                  <Box component={'td'} sx={{ padding: 1 }}>
                                      <Typography variant="body1">٣ طه حسين، من محمد مظهر، الدور ٣، الباحة ستارت، الزمالك، القاهرة، مصر</Typography>
                                  </Box>
                              </Box>
                          </Box>
                      </Box>
                  </Box>
              </Box>
          </Box>
         

        </>
    )
}

export default Contact
