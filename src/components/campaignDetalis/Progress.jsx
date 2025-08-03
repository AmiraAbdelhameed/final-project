import { AttachMoney, Flag, Group, TrendingUp} from '@mui/icons-material'
import { Card, CardContent, Grid, Stack, Typography, useTheme, Zoom, Box, LinearProgress, Fade } from '@mui/material'


const Progress = ({ campaign }) => {
          const theme = useTheme();
          const volunteerProgress = campaign?.goal_volunteers
            ? Math.min(
                (campaign.current_volunteers / campaign.goal_volunteers) * 100,
                100
              )
            : 0;
              const financialProgress =
                campaign?.goal_amount && campaign.goal_amount > 0
                  ? Math.min(
                      ((campaign.current_amount || 0) / campaign.goal_amount) * 100,
                      100
                    )
                  : 0;
            
  return (
    <>
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
    </>
  )
}

export default Progress
