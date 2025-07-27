import React, { useEffect } from 'react';
import {
    Box,
    Typography,
  
} from '@mui/material';
const ProjectsCard = ({ title, description, organizationName, img, orgImg }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: '#e8f0e5',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 1,
            mb: 2,
            direction: 'rtl',
            
        }}
    >
        <Box
            sx={{
                width: { xs: '100%', md: 200 },
                height: { xs: 180, md: 'auto' },
                flexShrink: 0,
            }}
        >
            <Box
                component="img"
                src={img}
                alt="project"
                sx={{
                    width: '100%',
                    height: '100%',
                    maxHeight: { md: 220 }, 
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                }}
            />
        </Box>
        <Box sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                {title}
            </Typography>
            <Typography variant="body2" mb={2}>
                {description}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
                <Box component="img" src={orgImg} sx={{ width: 24, height: 24 , borderRadius:"50%"}} />
   
        <Typography variant="caption">
          {organizationName} 
        </Typography>
      </Box>
        </Box>
    </Box>
);
export default ProjectsCard