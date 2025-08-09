import { Card, CardContent, Chip, Stack, Typography, useTheme, Zoom , Box } from '@mui/material'
import React from 'react'
import { AttachMoney, Group } from '@mui/icons-material';

const BasicInfo = ({ campaign }) => {
    const theme = useTheme();
  return (
    <>
            <Zoom in={true} timeout={800}>
                                       <Card
                                           elevation={6}
                                           sx={{
                                               borderRadius: 4,
                                               border: `1px solid ${theme.palette.primary.main}20`,
                                               background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                                               transition: "all 0.3s ease",
                                   
                                           }}
                                       >
                                           <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                               {" "}
                                               {/* Reduced padding */}
                                               <Typography
                                                   variant="h6"
                                                   fontWeight="bold"
                                                   sx={{
                                                       mb: 2, // Reduced margin
                                                       fontFamily: "Tajawal, Arial, sans-serif",
                                                       color: theme.palette.primary.main,
                                                       display: "flex",
                                                       alignItems: "center",
                                                       gap: 1.5,
                                                   }}
                                               >
                                                   {/* <Campaign /> */}
                                                   المعلومات الأساسية
                                               </Typography>
                                               <Stack
                                                   direction="row"
                                                   spacing={1} // Reduced spacing
                                                   alignItems="center"
                                                   mb={2} // Reduced margin
                                               >
                                                   <Typography
                                                       variant="h4"
                                                       fontWeight="bold"
                                                       sx={{
                                                           fontFamily: "Tajawal, Arial, sans-serif",
                                                           color: theme.palette.primary.main,
                                                           flex: 1,
                                                       }}
                                                   >
                                                       {campaign.name}
                                                   </Typography>
                                            
                                               </Stack>
                                               <Typography
                                                   variant="body1"
                                                   color="text.secondary"
                                                   sx={{
                                                       fontFamily: "Tajawal, Arial, sans-serif",
                                                       whiteSpace: "pre-line",
                                                       lineHeight: 1.6, // Reduced line height
                                                       fontSize: "1rem", // Reduced font size
                                                   }}
                                               >
                                                   {campaign.description}
                                               </Typography>
                                           </CardContent>
                                       </Card>
                                   </Zoom> 
    </>
  )
}

export default BasicInfo
