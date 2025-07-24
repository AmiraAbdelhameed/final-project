import React from 'react';
import img1 from "../../assets/img-1.png";
import { Box, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const newsletters = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  img: img1,
}));

const Postarticles = () => {
  return (
    <Box sx={{ px: 4, py: 3, direction: 'rtl' }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <MailOutlineIcon />
          <Typography variant="h6" fontWeight="bold">
            نشرات بريدية مميزة
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <ArrowBackIosNewIcon fontSize="small" />
          <Typography variant="body2">عرض المزيد</Typography>
        </Box>
      </Box>

      {/* Swiper Image Carousel */}
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          600: { slidesPerView: 3 },
          900: { slidesPerView: 5 },
          1200: { slidesPerView: 7 },
        }}
        style={{ padding: '8px 0' }}
      >
        {newsletters.map((item) => (
          <SwiperSlide key={item.id}>
            <Box
              component="img"
              src={item.img}
              alt={`newsletter-${item.id}`}
              sx={{
                width: '100%',
                height: 100,
                borderRadius: 2,
                objectFit: 'cover',
                boxShadow: 1,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Postarticles;