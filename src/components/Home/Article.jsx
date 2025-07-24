import { Box, Grid, Typography, Avatar, Button } from "@mui/material";
import img1 from "../../assets/image 9.png";
import img2 from "../../assets/googleanalytics_svgrepo.com.png";

export default function FeaturedArticle() {
  return (
    <Box p={4}>
      <Grid container spacing={4} alignItems="center" justifyContent="space-around" margin={"auto"}>
        

        {/* Right side content */}
        <Grid item xs={12} md={6} textAlign="right">
          {/* Header */}
          <Box display="flex" alignItems="center"  gap={1}>
            <Typography fontWeight="bold">
          <Box
  component="img"
  src={img2}
  className="img-icon"
  alt="كفالة يتيم"
  sx={{ width: "100%", maxWidth: 578, borderRadius: 2 }}
/>
                المقالات المميز</Typography>
            <Avatar
              src="https://via.placeholder.com/60"
              alt="icon"
              sx={{ width: 40, height: 40 }}
            />
          </Box>

          {/* Text */}
          <Box mt={3} maxWidth={500} ml="auto">
            <Typography paragraph>
              شاهدت ترويج إعلان خاص بجمعية مكافحة السجائر في أوسباد باريس عشرات المرات شاهدت ترويج إعلان خاص بجمعية مكافحة السجائر في أوسباد باريس عشرات المرات شاهدت ترويج.
            </Typography>
            <Typography paragraph>
              شاهدت ترويج إعلان خاص بجمعية مكافحة السجائر في أوسباد باريس عشرات المرات شاهدت ترويج.
            </Typography>

            {/* Buttons */}
            <Box display="flex"  gap={2} mt={5}>
              <Button variant="contained"  color="primary" style={{ padding: "10px 30px" }}>
                تبرع الان
              </Button>
            
            </Box>
          </Box>
        </Grid>
        {/* Left side image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={img1}
            className="img-2"
            alt="كفالة يتيم"
            sx={{ width: "100%", maxWidth: 578, borderRadius: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
