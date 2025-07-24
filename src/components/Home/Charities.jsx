import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress, 
  Alert,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
// import { createClient } from '@supabase/supabase-js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router';

// Initialize Supabase client
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

const Charities = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const charityTypes = ['كوميدي', 'حواري', 'تعليمي', 'ثقافي', 'توعية دينية'];

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name, email, profile_image');
        
        if (error) throw error;
        setOrganizations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          خطأ في تحميل المؤسسات: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box 
      sx={{ 
        backgroundColor: '#4B781129',
        py: 8,
        minHeight: '40vh',
        width: '100%',
        direction: 'rtl'
      }}
    >
      <Container maxWidth="lg">
        {/* Centered Heading */}
       
<Typography 
  variant="h3" 
  component="h1" 
  align="center" 
  gutterBottom
  sx={{ 
    mb: 6,
    fontWeight: 700,
    color: 'text.primary'
  }}
>
  المؤسسات المسجلة
  <IconButton
    component={Link}
    to="/organizations"
    sx={{ ml: 1, verticalAlign: 'middle' }}
    aria-label="المؤسسات"
  >
    <ArrowBackIosNewIcon fontSize="large" />
  </IconButton>
</Typography>

        {/* Filter Chips - UI Only */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          gap: 2,
          mb: 6
        }}>
          {charityTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              sx={{
                px: 3,
                py: 1,
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'Tahoma, Arial, sans-serif',
                cursor: 'pointer'
              }}
            />
          ))}
        </Box>
        
        {/* Organizations Swiper */}
        {organizations.length > 0 ? (
          <Box sx={{ width: '100%', px: 2 }}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                600: {
                  slidesPerView: 2,
                },
                900: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                }
              }}
            >
              {organizations.map((org) => (
                <SwiperSlide key={org.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: '#d4cacaff',
                    justifyContent: 'center',
                    borderRadius: 2,
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2
                  }}>
                    {org.profile_image ? (
                      <CardMedia
                        component="img"
                        image={org.profile_image}
                        alt={org.name}
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          borderRadius: '50%',
                          mb: 2,
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Avatar 
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          mb: 2,
                          fontSize: '3rem'
                        }}
                      >
                        {org.name.charAt(0)}
                      </Avatar>
                    )}
                    <CardContent>
                      <Typography variant="h6" component="h3" sx={{ fontFamily: 'Tahoma', mb: 1 }}>
                        {org.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Tahoma' }}>
                        {org.email}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ) : (
          <Typography align="center" sx={{ py: 4, fontFamily: 'Tahoma, Arial, sans-serif' }}>
            لا توجد مؤسسات مسجلة
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Charities;