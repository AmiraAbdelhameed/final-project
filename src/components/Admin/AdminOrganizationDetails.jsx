import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { getOrganizationById } from '../../redux/Slices/organizationsSlice';
import { getOrganizationCampaignsById } from '../../redux/Slices/organizationsSlice';
import { Button, Typography } from '@mui/material';
const AdminOrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    selectedOrg: org,
    loading,
    error,
    organizationCampaigns
  } = useSelector((state) => state.organizations);;

  useEffect(() => {
    dispatch(getOrganizationById(id));
    dispatch(getOrganizationCampaignsById(id))
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!org) return <p>No organization found.</p>;

  return (
    <>
    <Button onClick={()=> navigate('/admin/main')}>العوده الي جميع المؤسسات</Button>
      <h1>Org details by id {id}</h1>
      <h2>{org.name}</h2>
      <h2>{org.description}</h2>
      <h2>{org.email}</h2>
      <h2>{org.is_approved}</h2>
      <h2>{org.created_at}</h2>
      <h2>{org.updated_at}</h2>
      <h2>{org.identification_number}</h2>
      <h2>{org.phone}</h2>
      <h2>{org.profile_image}</h2>
      <h3>المشاريع </h3>
      {organizationCampaigns.length === 0 ? (
        <p>No campaigns found for this organization.</p>
      ) : (
        <ul>
          {organizationCampaigns.map((campaign) => (
            <li key={campaign.id}>
              <strong>{campaign.name}</strong> — {campaign.description}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default AdminOrganizationDetails
