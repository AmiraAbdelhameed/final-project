import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabaseClient";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  Stack,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Fade,
  Zoom,
  Container,
  LinearProgress,
  Tooltip,
  Badge,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CampaignIcon from "@mui/icons-material/Campaign";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTheme } from "@mui/material/styles";

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchOrg = async () => {
      const { data } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", id)
        .single();
      setOrg(data);
      setLoading(false);
    };
    fetchOrg();
  }, [id]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await supabase
        .from("campaigns")
        .select("*")
        .eq("organization_id", id)
        .eq("is_approved", true);
      setCampaigns(data || []);
      setCampaignsLoading(false);
    };
    fetchCampaigns();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
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
              جاري تحميل تفاصيل المؤسسة...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );

  if (!org)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Alert severity="error" sx={{ fontSize: "1.1rem" }}>
            عذراً، لم يتم العثور على هذه المؤسسة.
          </Alert>
        </Fade>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
        fontFamily: theme.typography.fontFamily,
        direction: "rtl",
        position: "relative",
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
      {/* زر الرجوع المحسن */}
      <Fade in={true} timeout={800}>
        <Tooltip title="العودة إلى قائمة المؤسسات">
          <IconButton
            onClick={() => navigate("/organizations")}
            sx={{
              position: "fixed",
              top: { xs: 20, sm: 40 },
              right: { xs: 20, sm: 40 },
              bgcolor: theme.palette.background.paper,
              boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
              zIndex: 100,
              color: theme.palette.primary.main,
              border: `2px solid ${theme.palette.primary.main}30`,
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              "&:hover": {
                bgcolor: theme.palette.primary.main,
                color: "white",
                transform: "scale(1.1)",
                boxShadow: `0 12px 40px ${theme.palette.primary.main}40`,
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          </IconButton>
        </Tooltip>
      </Fade>

      {/* الهيدر المحسن */}
      <Fade in={true} timeout={1200}>
        <Box
          sx={{
            width: "100%",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "#fff",
            py: { xs: 8, sm: 12 },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
              pointerEvents: "none",
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* Avatar مع Badge */}
              <Zoom in={true} timeout={1000}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    org.is_approved ? (
                      <Tooltip title="مؤسسة معتمدة">
                        <Box
                          sx={{
                            bgcolor: theme.palette.success.main,
                            borderRadius: "50%",
                            p: 0.5,
                            border: `2px solid white`,
                          }}
                        >
                          <VerifiedIcon sx={{ fontSize: 16, color: "white" }} />
                        </Box>
                      </Tooltip>
                    ) : null
                  }
                >
                  <Avatar
                    src={org.profile_image || ""}
                    alt={org.name}
                    sx={{
                      width: { xs: 120, sm: 140 },
                      height: { xs: 120, sm: 140 },
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.primary.main,
                      fontSize: { xs: 48, sm: 56 },
                      mb: 3,
                      fontFamily: theme.typography.fontFamily,
                      border: `4px solid ${theme.palette.secondary.main}`,
                      boxShadow: `0 12px 40px ${theme.palette.primary.main}40`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: `0 16px 50px ${theme.palette.primary.main}50`,
                      },
                    }}
                  >
                    {org.name && org.name[0]}
                  </Avatar>
                </Badge>
              </Zoom>

              {/* اسم المؤسسة */}
              <Zoom in={true} timeout={1200}>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  fontFamily={theme.typography.fontFamily}
                  sx={{
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {org.name}
                </Typography>
              </Zoom>

              {/* حالة المعتمدة */}
              <Fade in={true} timeout={1400}>
                <Chip
                  label={org.is_approved ? "مؤسسة معتمدة" : "مؤسسة غير معتمدة"}
                  color={org.is_approved ? "success" : "warning"}
                  icon={org.is_approved ? <VerifiedIcon /> : <BusinessIcon />}
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: "bold",
                    fontSize: { xs: 16, sm: 18 },
                    px: 3,
                    py: 1,
                    bgcolor: org.is_approved
                      ? "rgba(76, 175, 80, 0.9)"
                      : "rgba(255, 152, 0, 0.9)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </Fade>
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* التفاصيل المحسنة */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={true} timeout={1600}>
          <Box
            sx={{
              mt: { xs: -4, sm: -6 },
              px: 2,
            }}
          >
            <Paper
              elevation={12}
              sx={{
                width: "100%",
                p: { xs: 4, sm: 6 },
                borderRadius: 4,
                background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}03 100%)`,
                border: `1px solid ${theme.palette.primary.main}20`,
                boxShadow: `0 20px 60px ${theme.palette.primary.main}15`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* الوصف */}
              {org.description && (
                <Fade in={true} timeout={1800}>
                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 4,
                      p: 3,
                      borderRadius: 3,
                      bgcolor: theme.palette.primary.main + "08",
                      border: `1px solid ${theme.palette.primary.main}20`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={theme.palette.primary.main}
                      fontFamily={theme.typography.fontFamily}
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <BusinessIcon />
                      نبذة عن المؤسسة
                    </Typography>
                    <Typography
                      variant="body1"
                      color={theme.palette.text.secondary}
                      fontFamily={theme.typography.fontFamily}
                      sx={{
                        fontSize: { xs: 16, sm: 18 },
                        lineHeight: 1.8,
                        maxWidth: 800,
                        mx: "auto",
                      }}
                    >
                      {org.description}
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* معلومات الاتصال */}
              <Fade in={true} timeout={2000}>
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: theme.palette.secondary.main + "08",
                    border: `1px solid ${theme.palette.secondary.main}20`,
                  }}
                >
                  <Typography
                    variant="h6"
                    color={theme.palette.secondary.main}
                    fontFamily={theme.typography.fontFamily}
                    sx={{
                      mb: 3,
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <EmailIcon />
                    معلومات الاتصال
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                      <Card
                        sx={{
                          p: 2,
                          bgcolor: "transparent",
                          border: `1px solid ${theme.palette.secondary.main}30`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: theme.palette.secondary.main + "10",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: "50%",
                              bgcolor: theme.palette.secondary.main + "20",
                            }}
                          >
                            <EmailIcon color="secondary" />
                          </Box>
                          <Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontWeight: "bold" }}
                            >
                              البريد الإلكتروني
                            </Typography>
                            <Typography
                              variant="body1"
                              color={theme.palette.text.primary}
                              fontFamily={theme.typography.fontFamily}
                              sx={{ fontWeight: "bold" }}
                            >
                              {org.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </Card>
                    </Grid>
                    {org.phone && (
                      <Grid xs={12} sm={6}>
                        <Card
                          sx={{
                            p: 2,
                            bgcolor: "transparent",
                            border: `1px solid ${theme.palette.secondary.main}30`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: theme.palette.secondary.main + "10",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: "50%",
                                bgcolor: theme.palette.secondary.main + "20",
                              }}
                            >
                              <PhoneIcon color="secondary" />
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontWeight: "bold" }}
                              >
                                رقم الهاتف
                              </Typography>
                              <Typography
                                variant="body1"
                                color={theme.palette.text.primary}
                                fontFamily={theme.typography.fontFamily}
                                sx={{ fontWeight: "bold" }}
                              >
                                {org.phone}
                              </Typography>
                            </Box>
                          </Stack>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Fade>

              {/* قسم الحملات المحسن */}
              <Divider
                sx={{
                  my: 4,
                  borderColor: theme.palette.primary.main + "30",
                  borderWidth: 2,
                }}
              />

              <Fade in={true} timeout={2200}>
                <Box sx={{ mt: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 4,
                      p: 3,
                      borderRadius: 3,
                      bgcolor: theme.palette.primary.main + "08",
                      border: `1px solid ${theme.palette.primary.main}20`,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.primary.main + "20",
                      }}
                    >
                      <CampaignIcon
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: 32,
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                        fontFamily={theme.typography.fontFamily}
                        sx={{ mb: 0.5 }}
                      >
                        الحملات المعتمدة
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: theme.typography.fontFamily }}
                      >
                        استكشف الحملات النشطة لهذه المؤسسة
                      </Typography>
                    </Box>
                    <Chip
                      label={campaigns.length}
                      color="primary"
                      size="large"
                      sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        height: 40,
                        px: 2,
                      }}
                    />
                  </Box>

                  {campaignsLoading ? (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                      <CircularProgress
                        sx={{
                          color: theme.palette.primary.main,
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" color="text.secondary">
                        جاري تحميل الحملات...
                      </Typography>
                    </Box>
                  ) : campaigns.length === 0 ? (
                    <Fade in={true} timeout={800}>
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 8,
                          px: 4,
                          bgcolor: theme.palette.grey[50],
                          borderRadius: 4,
                          border: `2px dashed ${theme.palette.grey[300]}`,
                        }}
                      >
                        <CampaignIcon
                          sx={{
                            fontSize: 80,
                            color: theme.palette.text.secondary,
                            mb: 3,
                            opacity: 0.5,
                          }}
                        />
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          fontFamily={theme.typography.fontFamily}
                          sx={{ mb: 2, fontWeight: "bold" }}
                        >
                          لا توجد حملات معتمدة حالياً
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          fontFamily={theme.typography.fontFamily}
                        >
                          سيتم إضافة الحملات المعتمدة قريباً
                        </Typography>
                      </Box>
                    </Fade>
                  ) : (
                    <Grid container spacing={3}>
                      {campaigns.map((campaign, index) => (
                        <Grid xs={12} sm={6} md={4} key={campaign.id}>
                          <Zoom in={true} timeout={1000 + index * 200}>
                            <Card
                              onClick={() =>
                                navigate(`/campaigns/${campaign.id}`)
                              }
                              sx={{
                                height: 420,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                border: `1px solid ${theme.palette.primary.main}20`,
                                background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
                                "&:hover": {
                                  transform: "translateY(-8px)",
                                  boxShadow: `0 20px 40px ${theme.palette.primary.main}30`,
                                  border: `2px solid ${theme.palette.primary.main}40`,
                                },
                              }}
                            >
                              {/* صورة الحملة */}
                              <Box sx={{ position: "relative" }}>
                                <CardMedia
                                  component="img"
                                  height="180"
                                  image={
                                    campaign.cover_image ||
                                    "/default-campaign.jpg"
                                  }
                                  alt={campaign.name}
                                  sx={{
                                    objectFit: "cover",
                                    borderBottom: `1px solid ${theme.palette.primary.main}20`,
                                  }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 12,
                                    right: 12,
                                    display: "flex",
                                    gap: 1,
                                  }}
                                >
                                  <Chip
                                    label={
                                      campaign.type === "money"
                                        ? "تبرع مالي"
                                        : "تطوع"
                                    }
                                    color={
                                      campaign.type === "money"
                                        ? "primary"
                                        : "secondary"
                                    }
                                    size="small"
                                    icon={
                                      campaign.type === "money" ? (
                                        <AttachMoneyIcon />
                                      ) : (
                                        <GroupIcon />
                                      )
                                    }
                                    sx={{
                                      fontSize: "0.7rem",
                                      height: 24,
                                      fontWeight: "bold",
                                    }}
                                  />
                                  <Chip
                                    icon={<CheckCircleIcon />}
                                    label="معتمدة"
                                    color="success"
                                    size="small"
                                    sx={{
                                      fontSize: "0.7rem",
                                      height: 24,
                                      fontWeight: "bold",
                                    }}
                                  />
                                </Box>
                              </Box>

                              <CardContent
                                sx={{
                                  p: 3,
                                  height: 240,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {/* اسم الحملة */}
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  fontWeight="bold"
                                  color={theme.palette.text.primary}
                                  fontFamily={theme.typography.fontFamily}
                                  sx={{
                                    mb: 2,
                                    fontSize: "1.1rem",
                                    lineHeight: 1.3,
                                    flex: 1,
                                  }}
                                >
                                  {campaign.name}
                                </Typography>

                                {/* وصف الحملة */}
                                {campaign.description && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    fontFamily={theme.typography.fontFamily}
                                    sx={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      lineHeight: 1.5,
                                      fontSize: "0.9rem",
                                      mb: 2,
                                      flex: 1,
                                    }}
                                  >
                                    {campaign.description}
                                  </Typography>
                                )}

                                {/* معلومات إضافية */}
                                <Box
                                  sx={{
                                    mt: "auto",
                                    pt: 2,
                                    borderTop: `1px solid ${theme.palette.grey[200]}`,
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    fontFamily={theme.typography.fontFamily}
                                    sx={{
                                      fontSize: "0.8rem",
                                      fontWeight: "bold",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    انقر لعرض التفاصيل الكاملة
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Zoom>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Fade>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default OrganizationDetails;
