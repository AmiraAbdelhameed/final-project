import { Box, Card, Container, Divider, Fade, Grid, Paper, Stack, Typography, Chip, Zoom, CircularProgress, CardMedia, CardContent } from '@mui/material'
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CampaignIcon from "@mui/icons-material/Campaign";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from 'react-router';


const OrgDetails = ({ org, campaigns, campaignsLoading }) => {
      const theme = useTheme();
      const navigate = useNavigate();
    
  return (

    <>
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
    </>
  )
}

export default OrgDetails
