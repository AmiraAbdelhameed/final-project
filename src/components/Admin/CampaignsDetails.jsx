import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { getCampaignById } from '../../redux/Slices/campaignsSlice'
import { Button } from '@mui/material';
const CampaignsDetails = () => {
  const { id } = useParams();
   const dispatch = useDispatch();
  const navigate= useNavigate()
  const { selectedCampaign: campaign, loading, error } = useSelector(
     (state) => state.campaigns
   );
 
   useEffect(() => {
     dispatch(getCampaignById(id));
   }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!campaign) return <p>No Projects found.</p>;
  return (
    <>
    <Button onClick={()=> navigate('/admin/main/campaigns')}>العوده الي جميع المشاريع </Button>
      <h1>campain details by id {id}</h1>
      <h2>{campaign.name}</h2>
      <h2>{campaign.organization_id}</h2>
      <h2>{campaign.description}</h2>
      <h2>{campaign.start_date}</h2>
      <h2>{campaign.end_date}</h2>
      <h2>{campaign.campaign_images}</h2>
      <h2>{campaign.cover_image}</h2>
      <h2>{campaign.created_at}</h2>
      <h2>{campaign.is_approved}</h2>
      <h2>{campaign.current_volunteers}</h2>
      <h2>{campaign.current_amount}</h2>
      <h2>{campaign.goal_volunteers}</h2>
      <h2>{campaign.goal_amount}</h2>
      <h2>{campaign.type}</h2>
  
    </>
  )
}

export default CampaignsDetails


       