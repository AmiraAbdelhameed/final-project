import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
function Hero() {
  const navigate =useNavigate()
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
          ساهم بيدك... وصِل الخير لمستحقيه عبر "أيادي" 


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
          في عالم تزداد فيه التحديات، يبقى العطاء هو الأمل الذي يجمعنا.
          "أيادي" منصة تبرعات تربط المتبرعين بالجمعيات الموثوقة بكل شفافية وسهولة.
          تبرعك معنا ليس مجرد مساعدة، بل شراكة إنسانية تصنع فرقًا حقيقيًا.
        </Typography>
<Stack
className='mo'
  direction={{ xs: 'column', md: 'row'  }}
  spacing={2}
  sx={{
    alignItems: { xs: 'center', md: 'flex-start' },
  }}
>
          <Button variant="contained" onClick={() => navigate('/campaigns')} >
            ابدأ التبرع الآن
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
            onClick={() => navigate('/organizations')}
          >
            استكشف الجمعيات
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Hero;
