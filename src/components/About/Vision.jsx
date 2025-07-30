import { Box, Typography } from '@mui/material'
import React from 'react'

const Vision = () => {
    return (
        <>
            <Box sx={{
                bgcolor: 'secondary.main',
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
                >رؤيتنا </Typography>
                <Typography sx={{
                    textAlign: 'center',
                    width: '80%',
                    mx: 'auto'

                }}>
                    نؤمن في "أيادي" أن العطاء لا يجب أن يكون معقدًا. رؤيتنا هي خلق مجتمع رقمي يربط الخير بأهله، ويوصل المساعدة لمستحقيها بأقصى درجات الشفافية والسهولة.
                </Typography>
            </Box>
        </>
    )
}

export default Vision
