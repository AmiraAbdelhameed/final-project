import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../../redux/Slices/organizationsSlice";
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
  Chip,
  Fade,
  Zoom,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { Business, Email, CheckCircle, TrendingUp } from "@mui/icons-material";

const Charities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    data: organizations,
    loading,
    error,
  } = useSelector((state) => state.organizations);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  // Filter for approved organizations only
  const approvedOrgs = (organizations || []).filter((org) =>
    [true, "TRUE", 1].includes(org.is_approved)
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress
              sx={{
                color: theme.palette.primary.main,
                width: 60,
                height: 60,
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary">
              جاري تحميل المؤسسات...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4, fontSize: "1.1rem" }}>
          خطأ في تحميل المؤسسات: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
        py: 8,
        pt: 12,
        minHeight: "50vh",
        width: "100%",
        direction: "rtl",
        position: "relative",
        marginTop: "64px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}10 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}10 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  fontFamily: "Tajawal, Arial, sans-serif",
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                المؤسسات المعتمدة
              </Typography>
              <Tooltip title="عرض جميع المؤسسات">
                <IconButton
                  component={Link}
                  to="/organizations"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 3,
                fontFamily: "Tajawal, Arial, sans-serif",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              استكشف المؤسسات الخيرية المعتمدة في مجتمعنا
            </Typography>
          </Box>
        </Fade>

        {/* Organizations Swiper */}
        {approvedOrgs.length > 0 ? (
          <Fade in={true} timeout={1200}>
            <Box sx={{ width: "100%", px: 2 }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                style={{
                  paddingBottom: 40,
                }}
              >
                {approvedOrgs.map((org, index) => (
                  <SwiperSlide key={org.id}>
                    <Zoom in={true} timeout={1400 + index * 200}>
                      <Card
                        onClick={() => navigate(`/organizations/${org.id}`)}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
                          justifyContent: "center",
                          borderRadius: 3,
                          alignItems: "center",
                          textAlign: "center",
                          p: 3,
                          border: `1px solid ${theme.palette.primary.main}20`,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
                            border: `2px solid ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
                        {/* Approval Badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bgcolor: theme.palette.success.main,
                            borderRadius: 2,
                            p: 0.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CheckCircle sx={{ color: "white", fontSize: 16 }} />
                          <Typography
                            variant="caption"
                            sx={{ color: "white", fontWeight: "bold" }}
                          >
                            معتمدة
                          </Typography>
                        </Box>

                        {/* Organization Image */}
                        <Box sx={{ position: "relative", mb: 3 }}>
                          {org.profile_image ? (
                            <CardMedia
                              component="img"
                              image={org.profile_image}
                              alt={org.name}
                              sx={{
                                width: 140,
                                height: 140,
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: `4px solid ${theme.palette.primary.main}20`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: `4px solid ${theme.palette.primary.main}`,
                                  transform: "scale(1.05)",
                                },
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 140,
                                height: 140,
                                fontSize: "3.5rem",
                                bgcolor: theme.palette.primary.main,
                                border: `4px solid ${theme.palette.primary.main}20`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: `4px solid ${theme.palette.primary.main}`,
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              <Business />
                            </Avatar>
                          )}
                        </Box>

                        {/* Organization Info */}
                        <CardContent sx={{ p: 0, width: "100%" }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontFamily: "Tajawal, Arial, sans-serif",
                              mb: 2,
                              fontWeight: "bold",
                              color: theme.palette.primary.main,
                            }}
                          >
                            {org.name}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: theme.palette.grey[50],
                              border: `1px solid ${theme.palette.grey[200]}`,
                            }}
                          >
                            <Email
                              sx={{
                                color: theme.palette.primary.main,
                                fontSize: 18,
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontFamily: "Tajawal, Arial, sans-serif",
                                fontSize: "0.9rem",
                              }}
                            >
                              {org.email}
                            </Typography>
                          </Box>

                          {/* Additional Info if available */}
                          {org.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mt: 2,
                                fontFamily: "Tajawal, Arial, sans-serif",
                                lineHeight: 1.5,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {org.description}
                            </Typography>
                          )}
                        </CardContent>

                        {/* Footer */}
                        <Box
                          sx={{
                            mt: "auto",
                            pt: 2,
                            width: "100%",
                            borderTop: `1px solid ${theme.palette.grey[200]}`,
                          }}
                        >
                          <Chip
                            icon={<TrendingUp />}
                            label="مؤسسة خيرية"
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ fontWeight: "bold" }}
                          />
                        </Box>
                      </Card>
                    </Zoom>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Fade>
        ) : (
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 4,
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: 2,
                border: `1px solid ${theme.palette.primary.main}20`,
              }}
            >
              <Business
                sx={{
                  fontSize: 80,
                  color: theme.palette.text.secondary,
                  mb: 2,
                  opacity: 0.5,
                }}
              />
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ fontFamily: "Tajawal, Arial, sans-serif", mb: 1 }}
              >
                لا توجد مؤسسات معتمدة حالياً
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontFamily: "Tajawal, Arial, sans-serif" }}
              >
                سيتم إضافة المؤسسات المعتمدة قريباً
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Charities;
