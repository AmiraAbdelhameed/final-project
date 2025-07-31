import React, { useEffect } from "react";
import img1 from "../../assets/img-1.png";
import { Box, Button, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getOrganizations } from "../../redux/Slices/organizationsSlice";
import { useDispatch, useSelector } from "react-redux";

const OrganizationSection = () => {
  const dispatch = useDispatch();
  const {
    data: organizations = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.organizations || {});

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4, direction: "rtl" }}>
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
            المؤسسات
          </Typography>
        </Box>

        <Button sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" pl={1}>
            عرض المزيد
          </Typography>
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
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
        style={{ padding: "8px 0" }}
      >
        {organizations
          .filter((org) => org.is_approved === true)
          .map((item) => (
            <SwiperSlide key={item.id}>
              <Box
                component="img"
                src={item.profile_image}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: 100,
                  borderRadius: 2,
                  objectFit: "cover",
                  boxShadow: 1,
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default OrganizationSection;
