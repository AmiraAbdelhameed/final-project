import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

function Hero() {
  return (
    <Box
      className="home"
      sx={{
        height: '90vh',
        color: 'white',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'right',
      }}
    >
      <Box
        sx={{
          maxWidth: '800px',
          position: 'absolute',
          right: { xs: '5%', md: '5%' },
          bottom: { xs: '15%', md: '30%' },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            lineHeight: 1.6,
            fontSize: { xs: '1.8rem', md: '3rem' },
          }}
        >
          مؤسسو كريم في الرياض، والخُطّة: بناؤها من جديد!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: '#e0e0e0',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.8,
          }}
        >
          الحصول على نجاح بُمستويات الريادات أمر لا يحصل كل يوم. ولو حصل، فمعظم الأشخاص إما يتجهون إلى استثمار هذه الأموال،
          أو يعودون إلى صناعة نجاح جديد. لكن أن تعود وتقرر بناء مرحلة جديدة لشركة التي تأخرت منها، وبعد خمس سنوات، كان أمرًا
          غريبًا على من في البداية على الأقل.
        </Typography>
<Stack
className='mo'
  direction={{ xs: 'column', md: 'row'  }}
  spacing={2}
  sx={{
    alignItems: { xs: 'center', md: 'flex-start' },
  }}
>
          <Button variant="contained" >
            ابدأ تجربتك المجانية
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
            اكتشف الآن
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Hero;
