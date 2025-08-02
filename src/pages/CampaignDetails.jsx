import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "../redux/Slices/campaignsSlice";
import { makePayment, clearPaymentState } from "../redux/Slices/paymentSlice";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Stack,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
  Badge,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  PhotoLibrary,
  Flag,
  TrendingUp,
  ArrowBack,
  Campaign,
  AttachMoney,
  Group,
  CheckCircle,
  ZoomIn,
  Close,
  NavigateNext,
  NavigateBefore,
  Description,
  Info,
  Build,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE = "/default-image.png";

const CampaignDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: campaigns, loading } = useSelector((state) => state.campaigns);
  const {
    loading: paymentLoading,
    error: paymentError,
    data: paymentResponse,
  } = useSelector((state) => state.payment);
  const [donationAmount, setDonationAmount] = useState(100);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    if (!campaigns || campaigns.length === 0) {
      dispatch(getCampaigns());
    }
  }, [dispatch, campaigns]);

  useEffect(() => {
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  const campaign = (campaigns || []).find((c) => String(c.id) === String(id));

  const handleDonation = useCallback(() => {
    if (campaign && donationAmount > 0) {
      dispatch(
        makePayment({
          campaign_id: campaign.id,
          amount: donationAmount,
        })
      );
    }
  }, [campaign, donationAmount, dispatch]);

  useEffect(() => {
    if (paymentResponse?.iframe_url) {
      window.open(paymentResponse.iframe_url, "_blank");
      dispatch(clearPaymentState());
    } else if (paymentError) {
      setShowPaymentModal(true);
    }
  }, [paymentResponse, paymentError, dispatch]);

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    dispatch(clearPaymentState());
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setImageGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setImageGalleryOpen(false);
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    const allImages = [
      campaign?.cover_image,
      ...(campaign?.campaign_images || []),
    ];
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const allImages = [
      campaign?.cover_image,
      ...(campaign?.campaign_images || []),
    ];
    const prevIndex =
      currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };

  const getAllImages = () => {
    const images = [];
    if (campaign?.cover_image) images.push(campaign.cover_image);
    if (campaign?.campaign_images && Array.isArray(campaign.campaign_images)) {
      images.push(...campaign.campaign_images);
    }
    return images;
  };

  const financialProgress =
    campaign?.goal_amount && campaign.goal_amount > 0
      ? Math.min(
          ((campaign.current_amount || 0) / campaign.goal_amount) * 100,
          100
        )
      : 0;

  const isAutomaticallyCompleted =
    campaign?.goal_amount &&
    campaign?.current_amount &&
    campaign.current_amount >= campaign.goal_amount;

  const isCampaignCompleted =
    campaign?.is_completed || isAutomaticallyCompleted;

  const volunteerProgress = campaign?.goal_volunteers
    ? Math.min(
        (campaign.current_volunteers / campaign.goal_volunteers) * 100,
        100
      )
    : 0;

  if (loading || !campaign) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress
              sx={{
                color: theme.palette.primary.main,
                width: 80,
                height: 80,
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary">
              جاري تحميل تفاصيل الحملة...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        direction: "rtl",
        py: 6,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
      }}
    >
      {/* Header with back button */}
      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, sm: 4 }, mb: 4 }}>
        <Zoom in={true} timeout={800}>
          <Tooltip title="العودة للقائمة" placement="left">
            <IconButton
              onClick={() => navigate("/campaigns")}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                width: 60,
                height: 60,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  transform: "scale(1.1)",
                  boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                },
                transition: "all 0.3s ease",
                boxShadow: `0 4px 15px ${theme.palette.primary.main}30`,
              }}
              aria-label="العودة إلى قائمة الحملات"
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Zoom>
      </Box>

      <Fade in={true} timeout={1200}>
        <Paper
          elevation={12}
          sx={{
            maxWidth: 1400,
            mx: "auto",
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}03 100%)`,
            border: `1px solid ${theme.palette.primary.main}20`,
            boxShadow: `0 20px 60px ${theme.palette.primary.main}15`,
          }}
        >
          <Grid container spacing={4}>
            {/* Right Section: Images */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                {" "}
                {/* Reduced spacing for compactness */}
                {/* Main Image */}
                <Zoom in={true} timeout={1000}>
                  <Card
                    elevation={8}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      border: `3px solid ${theme.palette.primary.main}50`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 30px ${theme.palette.primary.main}40`,
                      },
                      background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Box
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                          overflow: "hidden",
                          borderRadius: 2,
                          "&:hover .image-overlay": {
                            opacity: 1,
                          },
                          "&:hover .zoom-icon": {
                            transform: "scale(1.1)",
                          },
                        }}
                        onClick={() =>
                          handleImageClick(campaign.cover_image, 0)
                        }
                        role="button"
                        aria-label="عرض الصورة الرئيسية"
                      >
                        <img
                          src={campaign.cover_image || FALLBACK_IMAGE}
                          alt={campaign.name}
                          style={{
                            width: "100%",
                            height: "200px", // Fixed smaller height
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.3s ease",
                          }}
                          onError={(e) => {
                            e.target.src = FALLBACK_IMAGE;
                          }}
                          loading="lazy"
                        />
                        <Box
                          className="image-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <ZoomIn
                            className="zoom-icon"
                            sx={{
                              color: "white",
                              fontSize: 48,
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "rgba(0,0,0,0.8)",
                          borderRadius: 3,
                          p: 1.5,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <PhotoLibrary sx={{ color: "white", fontSize: 24 }} />
                      </Box>
                      {campaign.is_approved && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            bgcolor: theme.palette.success.main,
                            borderRadius: 3,
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CheckCircle sx={{ color: "white", fontSize: 20 }} />
                          <Typography
                            variant="caption"
                            sx={{ color: "white", fontWeight: "bold" }}
                          >
                            معتمدة
                          </Typography>
                        </Box>
                      )}
                      {isCampaignCompleted && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: campaign.is_approved ? 60 : 16,
                            left: 16,
                            bgcolor: theme.palette.warning.main,
                            borderRadius: 3,
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CheckCircle sx={{ color: "white", fontSize: 20 }} />
                          <Typography
                            variant="caption"
                            sx={{ color: "white", fontWeight: "bold" }}
                          >
                            مكتمل
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Zoom>
                {/* Additional Images */}
                {Array.isArray(campaign.campaign_images) &&
                  campaign.campaign_images.length > 0 && (
                    <Fade in={true} timeout={1200}>
                      <Card
                        elevation={6}
                        sx={{
                          borderRadius: 4,
                          p: 2, // Reduced padding for compactness
                          border: `3px solid ${theme.palette.primary.main}50`,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 12px 30px ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
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
                          <PhotoLibrary />
                          صور إضافية ({campaign.campaign_images.length})
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1} // Reduced spacing
                          sx={{ overflowX: "auto", pb: 1 }} // Reduced padding
                        >
                          {campaign.campaign_images.map((img, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                minWidth: { xs: 60, sm: 80 }, // Reduced size
                                minHeight: { xs: 60, sm: 80 },
                                maxWidth: 80, // Reduced max size
                                maxHeight: 80,
                                borderRadius: 3,
                                overflow: "hidden",
                                border: `3px solid ${theme.palette.primary.main}80`,
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                position: "relative",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                  boxShadow: `0 8px 25px ${theme.palette.primary.main}50`,
                                  borderColor: theme.palette.primary.dark,
                                },
                                "&:hover .image-overlay": {
                                  opacity: 1,
                                },
                              }}
                              onClick={() => handleImageClick(img, idx + 1)}
                              role="button"
                              aria-label={`عرض الصورة الإضافية ${idx + 1}`}
                            >
                              <img
                                src={img}
                                alt={`صورة إضافية ${idx + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                  transition: "transform 0.3s ease",
                                }}
                                onError={(e) => {
                                  e.target.src = FALLBACK_IMAGE;
                                }}
                                loading="lazy"
                              />
                              <Box
                                className="image-overlay"
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  bgcolor: "rgba(0,0,0,0.5)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  opacity: 0,
                                  transition: "opacity 0.3s ease",
                                }}
                              >
                                <ZoomIn
                                  sx={{
                                    color: "white",
                                    fontSize: 20, // Reduced icon size
                                  }}
                                />
                              </Box>
                            </Box>
                          ))}
                        </Stack>
                      </Card>
                    </Fade>
                  )}
              </Stack>
            </Grid>

            {/* Left Section: Info, Donation, Progress */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                {" "}
                {/* Reduced spacing for compactness */}
                {/* Basic Info */}
                <Zoom in={true} timeout={800}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                      },
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
                        <Campaign />
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
                        <Stack direction="row" spacing={0.5}>
                          <Chip
                            label={
                              campaign.type === "money" ? "تبرع مالي" : "تطوع"
                            }
                            color={
                              campaign.type === "money"
                                ? "primary"
                                : "secondary"
                            }
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              height: 28, // Reduced height
                            }}
                            icon={
                              campaign.type === "money" ? (
                                <AttachMoney />
                              ) : (
                                <Group />
                              )
                            }
                          />
                        </Stack>
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
                {/* Donation Section */}
                {campaign.type === "money" && !isCampaignCompleted && (
                  <Fade in={true} timeout={1000}>
                    <Card
                      elevation={6}
                      sx={{
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                        },
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
                          <AttachMoney />
                          تبرع الآن
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          {" "}
                          {/* Reduced margin */}
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              mb: 1, // Reduced margin
                              fontFamily: "Tajawal, Arial, sans-serif",
                            }}
                          >
                            اختر مبلغ التبرع:
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1} // Reduced spacing
                            flexWrap="wrap"
                            useFlexGap
                          >
                            {[50, 100, 200, 500, 1000].map((amount) => (
                              <Chip
                                key={amount}
                                label={`${amount} جنيه`}
                                onClick={() => setDonationAmount(amount)}
                                color={
                                  donationAmount === amount
                                    ? "primary"
                                    : "default"
                                }
                                variant={
                                  donationAmount === amount
                                    ? "filled"
                                    : "outlined"
                                }
                                sx={{
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                  },
                                  height: 28, // Reduced height
                                  fontSize: "0.85rem", // Reduced font size
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          {" "}
                          {/* Reduced margin */}
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              mb: 1, // Reduced margin
                              fontFamily: "Tajawal, Arial, sans-serif",
                            }}
                          >
                            أو أدخل مبلغ مخصص:
                          </Typography>
                          <Box sx={{ position: "relative", width: "100%" }}>
                            <input
                              type="text"
                              inputMode="decimal"
                              value={donationAmount}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                                  const numValue =
                                    value === "" || value === "."
                                      ? 0
                                      : parseFloat(value);
                                  if (
                                    !isNaN(numValue) &&
                                    numValue >= 0 &&
                                    numValue <= 1000000
                                  ) {
                                    setDonationAmount(numValue);
                                  }
                                }
                              }}
                              onKeyPress={(e) => {
                                if (!/[\d.]/.test(e.key)) {
                                  e.preventDefault();
                                }
                                if (
                                  e.key === "." &&
                                  e.target.value.includes(".")
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="أدخل المبلغ"
                              style={{
                                width: "100%",
                                padding: "10px 14px", // Reduced padding
                                borderRadius: "6px", // Reduced radius
                                border: `2px solid ${theme.palette.primary.main}30`,
                                fontSize: "14px", // Reduced font size
                                fontFamily: "Tajawal, Arial, sans-serif",
                                outline: "none",
                                transition: "all 0.3s ease",
                                backgroundColor: "white",
                                direction: "ltr",
                                textAlign: "left",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor =
                                  theme.palette.primary.main;
                                e.target.style.boxShadow = `0 0 0 2px ${theme.palette.primary.main}20`;
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = `${theme.palette.primary.main}30`;
                                e.target.style.boxShadow = "none";
                              }}
                              aria-label="أدخل مبلغ التبرع المخصص"
                            />
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <button
                            onClick={handleDonation}
                            disabled={paymentLoading || donationAmount <= 0}
                            style={{
                              backgroundColor: theme.palette.primary.main,
                              color: "white",
                              border: "none",
                              borderRadius: "10px", // Reduced radius
                              padding: "12px 24px", // Reduced padding
                              fontSize: "16px", // Reduced font size
                              fontWeight: "bold",
                              fontFamily: "Tajawal, Arial, sans-serif",
                              cursor: paymentLoading
                                ? "not-allowed"
                                : "pointer",
                              opacity: paymentLoading ? 0.7 : 1,
                              transition: "all 0.3s ease",
                              boxShadow: `0 4px 15px ${theme.palette.primary.main}40`,
                            }}
                            onMouseEnter={(e) => {
                              if (!paymentLoading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = `0 8px 25px ${theme.palette.primary.main}50`;
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = `0 4px 15px ${theme.palette.primary.main}40`;
                            }}
                            aria-label="تبرع الآن"
                          >
                            {paymentLoading ? "جاري المعالجة..." : "تبرع الآن"}
                          </button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                )}
                {/* Campaign Completed Message */}
                {isCampaignCompleted && (
                  <Fade in={true} timeout={1000}>
                    <Card
                      elevation={6}
                      sx={{
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.warning.main}30`,
                        background: `linear-gradient(135deg, ${theme.palette.warning.main}08 0%, transparent 100%)`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 12px 30px ${theme.palette.warning.main}30`,
                        },
                      }}
                    >
                      <CardContent
                        sx={{ p: { xs: 2, sm: 3 }, textAlign: "center" }}
                      >
                        {" "}
                        {/* Reduced padding */}
                        <Box sx={{ mb: 1 }}>
                          {" "}
                          {/* Reduced margin */}
                          <CheckCircle
                            sx={{
                              color: theme.palette.warning.main,
                              fontSize: 40, // Reduced size
                              mb: 1, // Reduced margin
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{
                            mb: 1, // Reduced margin
                            fontFamily: "Tajawal, Arial, sans-serif",
                            color: theme.palette.warning.main,
                          }}
                        >
                          تم إكمال هذه الحملة
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            fontFamily: "Tajawal, Arial, sans-serif",
                            lineHeight: 1.6,
                            fontSize: "0.95rem", // Reduced font size
                          }}
                        >
                          {isAutomaticallyCompleted && !campaign.is_completed
                            ? `تم الوصول للهدف المالي المطلوب (${Number(campaign.goal_amount).toLocaleString()} جنيه). شكراً لجميع المتبرعين والمتطوعين الذين ساهموا في نجاح هذه الحملة.`
                            : "شكراً لجميع المتبرعين والمتطوعين الذين ساهموا في نجاح هذه الحملة."}
                          لم تعد التبرعات مقبولة لهذه الحملة.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                )}
                {/* Progress and Status Sections */}
                <Grid container spacing={3}>
                  {" "}
                  {/* Reduced spacing */}
                  <Grid item xs={12} md={6}>
                    <Zoom in={true} timeout={1200}>
                      <Card
                        elevation={6}
                        sx={{
                          borderRadius: 4,
                          border: `1px solid ${theme.palette.primary.main}20`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                          },
                          height: "100%",
                        }}
                      >
                        <CardContent
                          sx={{ p: { xs: 2, sm: 3 }, height: "100%" }}
                        >
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
                            <Flag />
                            أهداف الحملة
                          </Typography>
                          <Grid container spacing={2}>
                            {" "}
                            {/* Reduced spacing */}
                            {campaign.goal_amount !== null && (
                              <Grid item xs={12}>
                                <Box
                                  sx={{
                                    p: 2, // Reduced padding
                                    borderRadius: 3,
                                    bgcolor:
                                      theme.palette.secondary.main + "15",
                                    border: `2px solid ${theme.palette.secondary.main}40`,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      bgcolor:
                                        theme.palette.secondary.main + "20",
                                      transform: "scale(1.02)",
                                    },
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={1}
                                    mb={1} // Reduced margin
                                  >
                                    <AttachMoney
                                      sx={{
                                        color: theme.palette.secondary.main,
                                      }}
                                    />
                                    <Typography
                                      variant="body1"
                                      color="text.secondary"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      الهدف المالي
                                    </Typography>
                                  </Stack>
                                  <Typography
                                    variant="h5"
                                    color={theme.palette.secondary.main}
                                    fontWeight="bold"
                                    sx={{ mb: 1 }} // Reduced margin
                                  >
                                    {Number(
                                      campaign.goal_amount
                                    ).toLocaleString()}{" "}
                                    جنيه
                                  </Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={financialProgress}
                                    sx={{
                                      height: 6, // Reduced height
                                      borderRadius: 4,
                                      bgcolor:
                                        theme.palette.secondary.main + "20",
                                      "& .MuiLinearProgress-bar": {
                                        bgcolor: theme.palette.secondary.main,
                                        borderRadius: 4,
                                      },
                                    }}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mt: 1, display: "block" }}
                                  >
                                    {financialProgress.toFixed(1)}% محقق
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                      display: "block",
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    المتبقي:{" "}
                                    {Number(
                                      campaign.goal_amount -
                                        (campaign.current_amount || 0)
                                    ).toLocaleString()}{" "}
                                    جنيه
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                            {campaign.goal_volunteers !== null && (
                              <Grid item xs={12}>
                                <Box
                                  sx={{
                                    p: 2, // Reduced padding
                                    borderRadius: 3,
                                    bgcolor:
                                      theme.palette.secondary.main + "15",
                                    border: `2px solid ${theme.palette.secondary.main}40`,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      bgcolor:
                                        theme.palette.secondary.main + "20",
                                      transform: "scale(1.02)",
                                    },
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={1}
                                    mb={1} // Reduced margin
                                  >
                                    <Group
                                      sx={{
                                        color: theme.palette.secondary.main,
                                      }}
                                    />
                                    <Typography
                                      variant="body1"
                                      color="text.secondary"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      الهدف من المتطوعين
                                    </Typography>
                                  </Stack>
                                  <Typography
                                    variant="h5"
                                    color={theme.palette.secondary.main}
                                    fontWeight="bold"
                                    sx={{ mb: 1 }} // Reduced margin
                                  >
                                    {campaign.goal_volunteers}
                                  </Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={volunteerProgress}
                                    sx={{
                                      height: 6, // Reduced height
                                      borderRadius: 4,
                                      bgcolor:
                                        theme.palette.secondary.main + "20",
                                      "& .MuiLinearProgress-bar": {
                                        bgcolor: theme.palette.secondary.main,
                                        borderRadius: 4,
                                      },
                                    }}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mt: 1, display: "block" }}
                                  >
                                    {volunteerProgress.toFixed(1)}% محقق
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Zoom>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={1400}>
                      <Card
                        elevation={6}
                        sx={{
                          borderRadius: 4,
                          border: `1px solid ${theme.palette.primary.main}20`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                          },
                          height: "100%",
                        }}
                      >
                        <CardContent
                          sx={{ p: { xs: 2, sm: 3 }, height: "100%" }}
                        >
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
                            <TrendingUp />
                            الحالة الحالية
                          </Typography>
                          <Grid container spacing={2}>
                            {" "}
                            {/* Reduced spacing */}
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  p: 2, // Reduced padding
                                  borderRadius: 3,
                                  bgcolor: theme.palette.success.main + "15",
                                  border: `2px solid ${theme.palette.success.main}30`,
                                  textAlign: "center",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    bgcolor: theme.palette.success.main + "20",
                                    transform: "scale(1.02)",
                                  },
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  gap={1}
                                  mb={1} // Reduced margin
                                >
                                  <AttachMoney
                                    sx={{ color: theme.palette.success.main }}
                                  />
                                  <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    المبلغ الحالي
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="h4"
                                  color={theme.palette.success.main}
                                  fontWeight="bold"
                                >
                                  {Number(
                                    campaign.current_amount || 0
                                  ).toLocaleString()}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  جنيه
                                </Typography>
                                {campaign.goal_amount && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: "block", mt: 0.5 }} // Reduced margin
                                  >
                                    من أصل{" "}
                                    {Number(
                                      campaign.goal_amount
                                    ).toLocaleString()}{" "}
                                    جنيه
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  p: 2, // Reduced padding
                                  borderRadius: 3,
                                  bgcolor: theme.palette.success.main + "15",
                                  border: `2px solid ${theme.palette.success.main}30`,
                                  textAlign: "center",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    bgcolor: theme.palette.success.main + "20",
                                    transform: "scale(1.02)",
                                  },
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  gap={1}
                                  mb={1} // Reduced margin
                                >
                                  <Group
                                    sx={{ color: theme.palette.success.main }}
                                  />
                                  <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    عدد المتطوعين
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="h4"
                                  color={theme.palette.success.main}
                                  fontWeight="bold"
                                >
                                  {campaign.current_volunteers ?? 0}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  متطوع
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Fade>

      {/* Image Gallery Modal */}
      <Dialog
        open={imageGalleryOpen}
        onClose={handleCloseGallery}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "rgba(0,0,0,0.95)",
            border: "none",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            p: 2,
          }}
        >
          <IconButton
            onClick={handleCloseGallery}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              zIndex: 10,
            }}
            aria-label="إغلاق معرض الصور"
          >
            <Close />
          </IconButton>
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              zIndex: 10,
            }}
            aria-label="الصورة السابقة"
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              zIndex: 10,
            }}
            aria-label="الصورة التالية"
          >
            <NavigateNext />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={`صورة ${currentImageIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: 8,
              }}
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
              loading="lazy"
            />
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.7)",
              px: 2,
              py: 1,
              borderRadius: 2,
              fontSize: "0.9rem",
            }}
          >
            {currentImageIndex + 1} من {getAllImages().length}
          </Box>
        </Box>
      </Dialog>

      {/* Payment Response Modal */}
      <Dialog
        open={showPaymentModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
            border: `2px solid ${theme.palette.primary.main}30`,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontFamily: "Tajawal, Arial, sans-serif",
            fontWeight: "bold",
            color: "error.main",
            borderBottom: `2px solid ${theme.palette.error.main}30`,
          }}
        >
          خطأ في الدفع
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography
              variant="h6"
              color="error.main"
              fontWeight="bold"
              sx={{ mb: 2, fontFamily: "Tajawal, Arial, sans-serif" }}
            >
              حدث خطأ أثناء معالجة الدفع
            </Typography>
            <Typography
              variant="body1"
              color="error.dark"
              sx={{ fontFamily: "Tajawal, Arial, sans-serif" }}
            >
              {paymentError}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="error"
            sx={{
              fontWeight: "bold",
              fontFamily: "Tajawal, Arial, sans-serif",
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
            aria-label="إغلاق نافذة خطأ الدفع"
          >
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignDetails;
