import React, { useEffect, useState } from "react";
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
  CalendarToday,
  Flag,
  TrendingUp,
  Info,
  ArrowBack,
  Campaign,
  AttachMoney,
  Group,
  CheckCircle,
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
  const theme = useTheme();

  useEffect(() => {
    if (!campaigns || campaigns.length === 0) {
      dispatch(getCampaigns());
    }
  }, [dispatch, campaigns]);

  // Clear payment state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  const campaign = (campaigns || []).find((c) => String(c.id) === String(id));

  // Handle donation payment
  const handleDonation = () => {
    if (campaign && donationAmount > 0) {
      dispatch(
        makePayment({
          campaign_id: campaign.id,
          amount: donationAmount,
        })
      );
    }
  };

  // Redirect to payment URL when payment is successful
  useEffect(() => {
    if (paymentResponse?.iframe_url) {
      // Redirect directly to payment URL
      window.open(paymentResponse.iframe_url, "_blank");
      dispatch(clearPaymentState());
    } else if (paymentError) {
      // Show error modal only for errors
      setShowPaymentModal(true);
    }
  }, [paymentResponse, paymentError, dispatch]);

  // Close modal and clear payment state
  const handleCloseModal = () => {
    setShowPaymentModal(false);
    dispatch(clearPaymentState());
  };

  // Calculate progress percentages
  const financialProgress = campaign?.goal_amount
    ? Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100)
    : 0;

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
        py: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
      }}
    >
      {/* Header with back button */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, mb: 3 }}>
        <Zoom in={true} timeout={800}>
          <Tooltip title="العودة للقائمة">
            <IconButton
              onClick={() => navigate("/campaigns")}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                width: 56,
                height: 56,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  transform: "scale(1.1)",
                  boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                },
                transition: "all 0.3s ease",
                mb: 2,
                boxShadow: `0 4px 15px ${theme.palette.primary.main}30`,
              }}
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
            maxWidth: 1200,
            mx: "auto",
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}03 100%)`,
            border: `1px solid ${theme.palette.primary.main}20`,
            boxShadow: `0 20px 60px ${theme.palette.primary.main}15`,
          }}
        >
          <Grid container spacing={5}>
            <Grid xs={12} md={5}>
              {/* الصور */}
              <Zoom in={true} timeout={1000}>
                <Card
                  elevation={8}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    mb: 3,
                    border: `2px solid ${theme.palette.primary.main}30`,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={campaign.cover_image || FALLBACK_IMAGE}
                      alt={campaign.name}
                      style={{
                        width: "100%",
                        height: 320,
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
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
                  </Box>
                </Card>
              </Zoom>

              {Array.isArray(campaign.campaign_images) &&
                campaign.campaign_images.length > 0 && (
                  <Fade in={true} timeout={1200}>
                    <Card
                      elevation={6}
                      sx={{
                        borderRadius: 4,
                        p: 3,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, transparent 100%)`,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          mb: 3,
                          fontFamily: "Tajawal, Arial, sans-serif",
                          color: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <PhotoLibrary />
                        صور إضافية
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ overflowX: "auto", pb: 1 }}
                      >
                        {campaign.campaign_images.map((img, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              minWidth: 70,
                              minHeight: 70,
                              maxWidth: 90,
                              maxHeight: 90,
                              borderRadius: 3,
                              overflow: "hidden",
                              border: `3px solid ${theme.palette.primary.main}`,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                                boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                              },
                            }}
                          >
                            <img
                              src={img}
                              alt={`صورة إضافية ${idx + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                              onError={(e) => {
                                e.target.src = FALLBACK_IMAGE;
                              }}
                            />
                          </Box>
                        ))}
                      </Stack>
                    </Card>
                  </Fade>
                )}
            </Grid>

            <Grid xs={12} md={7}>
              <Stack spacing={4}>
                {/* المعلومات الأساسية */}
                <Zoom in={true} timeout={800}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          mb: 3,
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
                        spacing={2}
                        alignItems="center"
                        mb={3}
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
                        <Stack direction="row" spacing={1}>
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
                              height: 32,
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
                          lineHeight: 1.8,
                          fontSize: "1.1rem",
                        }}
                      >
                        {campaign.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>

                {/* Donation Section */}
                {campaign.type === "money" && (
                  <Fade in={true} timeout={1000}>
                    <Card
                      elevation={6}
                      sx={{
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            mb: 3,
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

                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              fontFamily: "Tajawal, Arial, sans-serif",
                            }}
                          >
                            اختر مبلغ التبرع:
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
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
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              mb: 1,
                              fontFamily: "Tajawal, Arial, sans-serif",
                            }}
                          >
                            أو أدخل مبلغ مخصص:
                          </Typography>
                          <input
                            type="number"
                            value={donationAmount}
                            onChange={(e) =>
                              setDonationAmount(Number(e.target.value) || 0)
                            }
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: `2px solid ${theme.palette.primary.main}30`,
                              fontSize: "16px",
                              fontFamily: "Tajawal, Arial, sans-serif",
                              outline: "none",
                              transition: "all 0.3s ease",
                            }}
                            placeholder="أدخل المبلغ"
                            min="1"
                          />
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                          <button
                            onClick={handleDonation}
                            disabled={paymentLoading || donationAmount <= 0}
                            style={{
                              backgroundColor: theme.palette.primary.main,
                              color: "white",
                              border: "none",
                              borderRadius: "12px",
                              padding: "16px 32px",
                              fontSize: "18px",
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
                          >
                            {paymentLoading ? "جاري المعالجة..." : "تبرع الآن"}
                          </button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                )}

                {/* التواريخ */}
                <Fade in={true} timeout={1000}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          mb: 3,
                          fontFamily: "Tajawal, Arial, sans-serif",
                          color: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <CalendarToday />
                        تواريخ الحملة
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              bgcolor: theme.palette.primary.main + "10",
                              border: `2px solid ${theme.palette.primary.main}30`,
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: theme.palette.primary.main + "15",
                                transform: "scale(1.02)",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1, fontWeight: "bold" }}
                            >
                              تاريخ البداية
                            </Typography>
                            <Typography
                              variant="h5"
                              color={theme.palette.primary.main}
                              fontWeight="bold"
                            >
                              {new Date(
                                campaign.start_date
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              bgcolor: theme.palette.primary.main + "10",
                              border: `2px solid ${theme.palette.primary.main}30`,
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: theme.palette.primary.main + "15",
                                transform: "scale(1.02)",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1, fontWeight: "bold" }}
                            >
                              تاريخ النهاية
                            </Typography>
                            <Typography
                              variant="h5"
                              color={theme.palette.primary.main}
                              fontWeight="bold"
                            >
                              {new Date(campaign.end_date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Fade>

                {/* الأهداف مع Progress Bars */}
                <Zoom in={true} timeout={1200}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          mb: 3,
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
                      <Grid container spacing={3}>
                        {campaign.goal_amount !== null && (
                          <Grid xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: theme.palette.secondary.main + "15",
                                border: `2px solid ${theme.palette.secondary.main}40`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: theme.palette.secondary.main + "20",
                                  transform: "scale(1.02)",
                                },
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                mb={2}
                              >
                                <AttachMoney
                                  sx={{ color: theme.palette.secondary.main }}
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
                                sx={{ mb: 2 }}
                              >
                                {campaign.goal_amount} جنيه
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={financialProgress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: theme.palette.secondary.main + "20",
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
                            </Box>
                          </Grid>
                        )}
                        {campaign.goal_volunteers !== null && (
                          <Grid xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: theme.palette.secondary.main + "15",
                                border: `2px solid ${theme.palette.secondary.main}40`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: theme.palette.secondary.main + "20",
                                  transform: "scale(1.02)",
                                },
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                mb={2}
                              >
                                <Group
                                  sx={{ color: theme.palette.secondary.main }}
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
                                sx={{ mb: 2 }}
                              >
                                {campaign.goal_volunteers}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={volunteerProgress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: theme.palette.secondary.main + "20",
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

                {/* الحالة الحالية */}
                <Fade in={true} timeout={1400}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          mb: 3,
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
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 3,
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
                              mb={2}
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
                              {campaign.current_amount ?? 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              جنيه
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 3,
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
                              mb={2}
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
                            <Typography variant="body2" color="text.secondary">
                              متطوع
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Fade>

                {/* معلومات إضافية */}
                <Zoom in={true} timeout={1600}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          mb: 3,
                          fontFamily: "Tajawal, Arial, sans-serif",
                          color: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Info />
                        معلومات إضافية
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              bgcolor: theme.palette.grey[100],
                              border: `2px solid ${theme.palette.grey[300]}`,
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: theme.palette.grey[200],
                                transform: "scale(1.02)",
                              },
                            }}
                          >
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ mb: 1, fontWeight: "bold" }}
                            >
                              رقم الحملة
                            </Typography>
                            <Typography
                              variant="h5"
                              color="text.primary"
                              fontWeight="bold"
                            >
                              {campaign.id}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              bgcolor: theme.palette.grey[100],
                              border: `2px solid ${theme.palette.grey[300]}`,
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: theme.palette.grey[200],
                                transform: "scale(1.02)",
                              },
                            }}
                          >
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ mb: 1, fontWeight: "bold" }}
                            >
                              رقم المؤسسة
                            </Typography>
                            <Typography
                              variant="h5"
                              color="text.primary"
                              fontWeight="bold"
                            >
                              {campaign.organization_id}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Zoom>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Fade>

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
            borderBottom: `2px solid error.main30`,
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
          >
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignDetails;
