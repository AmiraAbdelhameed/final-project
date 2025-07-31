import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          background: "#e0e6d9",
          color: "#000",
          pt: 6,
          pb: 4,
          px: 2,
          direction: "rtl",
          borderTopLeftRadius: { xs: 24, md: 48 },
          borderTopRightRadius: { xs: 24, md: 48 },
          overflow: "hidden",
        }}
      >
        <Box maxWidth="lg" mx="auto" position="relative">
          <Grid container spacing={4}>
            <Grid xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                أيادي – منصتك للخير
              </Typography>
              <Typography variant="body2" maxWidth={400}>
                نوفّر وسيلة سهلة وآمنة للتبرع، عبر ربط المتبرعين بالجمعيات
                الخيرية المعتمدة. نؤمن أن كل يد تمتدّ بالعطاء قادرة على صناعة
                أثر حقيقي.
              </Typography>
              <Box mt={2}>
                <IconButton className="icon">
                  <LinkedInIcon />
                </IconButton>
                <IconButton className="icon">
                  <FacebookIcon />
                </IconButton>
                <IconButton className="icon">
                  <InstagramIcon />
                </IconButton>
                <IconButton className="icon">
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                عن أيادي
              </Typography>
              <Typography variant="body2">من نحن</Typography>
              <Typography variant="body2">انضم كجمعية خيرية</Typography>
              <Typography variant="body2">قصص النجاح</Typography>
              <Typography variant="body2">كيف تعمل المنصة</Typography>
              <Typography variant="body2">الأسئلة الشائعة</Typography>
              <Typography variant="body2">سياسة الخصوصية</Typography>
              <Typography variant="body2">شروط الخدمة</Typography>
            </Grid>

            <Grid xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                خدماتنا
              </Typography>
              <Typography variant="body2">التبرع الشهري</Typography>
              <Typography variant="body2"> التبرع السريع</Typography>
              <Typography variant="body2"> التبرع حسب الفئة</Typography>
              <Typography variant="body2"> اكتشف الجمعيات</Typography>
            </Grid>

            <Grid xs={12} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                تواصل معنا
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  ٣ طه حسين، من محمد مظهر، الدور ٣، الباحة ستارت، الزمالك،
                  القاهرة، مصر
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">hashstudio@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">01005467987</Typography>
              </Box>
            </Grid>
          </Grid>
          <hr />
          <Box mt={4} textAlign="center">
            <Typography variant="body2">
              أيادي
              <br />
              جميع الحقوق محفوظة 2025
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
