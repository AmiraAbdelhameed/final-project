import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Fade,
  Zoom,
  Container,
  Tooltip,
  Badge,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTheme } from "@mui/material/styles";
import OrgDetails from "../components/organizationDetails/OrgDetails";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationById, getOrganizationCampaignsById } from "../redux/Slices/organizationsSlice";

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch()
  const { selectedOrg: org, loading,organizationCampaigns } = useSelector((state) => state.organizations);

  useEffect(() => {
    dispatch(getOrganizationById(id))
        dispatch(getOrganizationCampaignsById(id));
    
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
                color: "primary",
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
      <OrgDetails org={org} campaigns={organizationCampaigns}  />
    </Box>
  );
};

export default OrganizationDetails;
