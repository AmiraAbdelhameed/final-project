import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  IconButton
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MicIcon from '@mui/icons-material/Mic';
import img2 from '../../assets/img-2.png';

// Replace with your image path


const EpisodeCard = ({ title, description, author, img }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      backgroundColor: '#e8f0e5',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 1,
      mb: 2,
      direction: 'rtl',
    }}
  >
    <Box
      component="img"
      src={img2}
      alt="episode"
      sx={{
        width: { xs: '100%', md: 180 },
        height: { xs: 180, md: '100%' },
        objectFit: 'cover'
      }}
    />
    <Box sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" mb={2}>
        {description}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
        <Typography variant="caption">
          {author.name} • {author.role}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const NewEpisodesSection = () => {
  const episodeData = {
    title: 'كيف تعمل تجارة العود في السعودية',
    description:
      'تتحدث هذه الحلقة مع عبدالعزيز الصويغ، المؤسس والرئيس التنفيذي لشركة شذا الطيب، حيث تحدث عن تجارة العود...',
    author: {
      name: 'عبدالعزيز الصويغ',
      role: 'الرئيس التنفيذي لشركة شذا الطيب',
      avatar: 'https://via.placeholder.com/24x24?text=A'
    },
    img: img2
  };

  return (
    <Box sx={{ px: 4, py: 3, direction: 'rtl' }}>
      {/* Section Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <MicIcon />
          <Typography variant="h6" fontWeight="bold">
            الحلقات الجديدة
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <ArrowBackIosNewIcon fontSize="small" />
          <Typography variant="body2">عرض المزيد</Typography>
        </Box>
      </Box>

      {/* Episodes List */}
      <Grid container direction="column">
        {Array.from({ length: 3 }).map((_, idx) => (
          <EpisodeCard key={idx} {...episodeData} />
        ))}
      </Grid>
    </Box>
  );
};

export default NewEpisodesSection;
