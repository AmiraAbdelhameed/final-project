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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CampaignIcon from "@mui/icons-material/Campaign";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
        }}
      >
        <CircularProgress size={60} />
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
        }}
      >
        <Alert severity="error" sx={{ fontSize: "1.1rem" }}>
          عذراً، لم يتم العثور على هذه المؤسسة.
        </Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        direction: "rtl",
      }}
    >
      {/* زر الرجوع العائم */}
      <IconButton
        onClick={() => navigate("/organizations")}
        sx={{
          position: "fixed",
          top: { xs: 16, sm: 32 },
          right: { xs: 16, sm: 32 },
          bgcolor: theme.palette.background.paper,
          boxShadow: 2,
          zIndex: 100,
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          "&:hover": { bgcolor: theme.palette.secondary.main },
        }}
      >
        <ArrowBackIcon />
        <Typography
          sx={{
            fontWeight: "bold",
            ml: 1,
            display: { xs: "none", sm: "inline" },
          }}
        >
          العودة إلى قائمة المؤسسات
        </Typography>
      </IconButton>

      {/* الهيدر */}
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.primary.main,
          color: "#fff",
          py: { xs: 5, sm: 7 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={org.profile_image || ""}
          alt={org.name}
          sx={{
            width: 100,
            height: 100,
            bgcolor: "#fff",
            color: theme.palette.primary.main,
            fontSize: 44,
            mb: 2,
            fontFamily: theme.typography.fontFamily,
            border: `4px solid ${theme.palette.secondary.main}`,
          }}
        >
          {org.name && org.name[0]}
        </Avatar>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontFamily={theme.typography.fontFamily}
          textAlign="center"
          sx={{ mb: 1 }}
        >
          {org.name}
        </Typography>
        <Chip
          label={org.is_approved ? "مؤسسة معتمدة" : "مؤسسة غير معتمدة"}
          color={org.is_approved ? "success" : "warning"}
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: "bold",
            fontSize: 18,
            px: 2,
            py: 1,
            mt: 1,
          }}
        />
      </Box>

      {/* التفاصيل */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: -6, sm: -8 },
          px: 2,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 800,
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: 4,
            fontFamily: theme.typography.fontFamily,
            zIndex: 2,
          }}
        >
          {org.description && (
            <Typography
              variant="body1"
              color={theme.palette.text.secondary}
              fontFamily={theme.typography.fontFamily}
              mb={3}
              textAlign="center"
              sx={{ fontSize: 18 }}
            >
              {org.description}
            </Typography>
          )}
          <Stack spacing={2} mt={2} alignItems="flex-start">
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon color="primary" />
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                fontFamily={theme.typography.fontFamily}
                sx={{ fontSize: 17 }}
              >
                <strong>البريد الإلكتروني:</strong> {org.email}
              </Typography>
            </Stack>
            {org.phone && (
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon color="primary" />
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontFamily={theme.typography.fontFamily}
                  sx={{ fontSize: 17 }}
                >
                  <strong>رقم الهاتف:</strong> {org.phone}
                </Typography>
              </Stack>
            )}
          </Stack>

          {/* قسم الحملات */}
          <Divider sx={{ my: 4 }} />

          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <CampaignIcon
                sx={{ color: theme.palette.primary.main, fontSize: 28 }}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                color={theme.palette.primary.main}
                fontFamily={theme.typography.fontFamily}
              >
                الحملات المعتمدة
              </Typography>
              <Chip
                label={campaigns.length}
                color="primary"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </Box>

            {campaignsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : campaigns.length === 0 ? (
              <Fade in={true} timeout={800}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    px: 4,
                    bgcolor: theme.palette.grey[50],
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  <CampaignIcon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.text.secondary,
                      mb: 2,
                      opacity: 0.5,
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontFamily={theme.typography.fontFamily}
                    sx={{ mb: 1 }}
                  >
                    لا توجد حملات معتمدة حالياً
                  </Typography>
                  <Typography
                    variant="body2"
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
                  <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                    <Zoom in={true} timeout={1000 + index * 200}>
                      <Card
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        sx={{
                          height: "100%",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          border: `1px solid ${theme.palette.primary.main}20`,
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                            border: `2px solid ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
                        {/* صورة الحملة */}
                        <CardMedia
                          component="img"
                          height="140"
                          image={
                            campaign.cover_image || "/default-campaign.jpg"
                          }
                          alt={campaign.name}
                          sx={{ objectFit: "cover" }}
                        />

                        <CardContent sx={{ p: 2 }}>
                          {/* نوع الحملة وعلامة المعتمدة */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
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
                              icon={
                                campaign.type === "money" ? (
                                  <AttachMoneyIcon />
                                ) : (
                                  <GroupIcon />
                                )
                              }
                              sx={{ fontSize: "0.7rem", height: 20 }}
                            />
                            <CheckCircleIcon
                              sx={{
                                color: theme.palette.success.main,
                                fontSize: 16,
                              }}
                            />
                          </Box>

                          {/* اسم الحملة */}
                          <Typography
                            variant="h6"
                            component="h3"
                            fontWeight="bold"
                            color={theme.palette.text.primary}
                            fontFamily={theme.typography.fontFamily}
                            sx={{
                              mb: 1,
                              fontSize: "1rem",
                              lineHeight: 1.3,
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
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                lineHeight: 1.4,
                                fontSize: "0.85rem",
                              }}
                            >
                              {campaign.description}
                            </Typography>
                          )}

                          {/* معلومات إضافية */}
                          <Box
                            sx={{
                              mt: 2,
                              pt: 1,
                              borderTop: `1px solid ${theme.palette.grey[200]}`,
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontFamily={theme.typography.fontFamily}
                              sx={{ fontSize: "0.75rem" }}
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
        </Paper>
      </Box>
    </Box>
  );
};

export default OrganizationDetails;
