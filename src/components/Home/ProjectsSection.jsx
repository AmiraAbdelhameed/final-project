import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MicIcon from '@mui/icons-material/Mic';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from '../../redux/Slices/campaignsSlice';
import ProjectsCard from './ProjectsCard';

// Replace with your image path



const ProjectsSection = () => {
  const dispatch = useDispatch();
  const { data: campaigns = [], loading = false, error = null } = useSelector(
    (state) => state.campaigns || {}
  );
  const { data: organizations = [] } = useSelector((state) => state.organizations || {});

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);


  return (
    <Box sx={{ p: 4, direction: 'rtl' }}>
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
            المشاريع الجديده
          </Typography>
        </Box>
        <Button display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" pl={1}>عرض المزيد</Typography>
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
      </Box>

      {/* Episodes List */}
      <Grid container direction="column">
        {campaigns
          .filter((campaign) => campaign.is_approved === true)
          .map((campaign) => {
            const org = organizations.find(o => o.id === campaign.organization_id);

            return (

              <ProjectsCard
                key={campaign.id}
                title={campaign.name}
                description={campaign.description}
                img={campaign.cover_image}
                organizationName={org ? org.name : "غير معروف"}
                // orgImg={org.profile_image}
              />
            )
          })}
      </Grid>
    </Box>
  );
};

export default ProjectsSection;
