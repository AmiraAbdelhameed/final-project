import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Tab, Typography, Tabs, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { getCampaigns, toggleApproval, deleteCampaign } from '../../redux/Slices/campaignsSlice';
import AdminCard from './AdminCard';
import { useNavigate } from 'react-router-dom';

const Campaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: campaigns, loading, error } = useSelector((state) => state.campaigns);
  const [filter, setFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter === 'approved') return campaign.is_approved === true;
    if (filter === 'not_approved') return campaign.is_approved === false;
    return true;
  });
  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      dispatch(deleteCampaign(selectedId)).then((res) => {
        if (!res.error) {
          setShowSnackbar(true);
        }
      });
    }
    handleCloseDialog();
  };

  return (
    <>
      <Box>
        <Typography variant="h4" textAlign="right" mt={4} mb={2}>
          المشاريع
        </Typography>

        {/* Tabs Filter */}
        <Box display="flex" justifyContent="flex-start" mb={4}>
          <Tabs value={filter} onChange={handleChange} centered>
            <Tab label="الجميع" value="all" />
            <Tab label="معتمدة" value="approved" />
            <Tab label="غير معتمدة" value="not_approved" />
          </Tabs>
        </Box>

        {/* Organizations List */}
        {loading ? (
          <Typography>جاري التحميل...</Typography>
        ) : error ? (
          <Typography color="error">حدث خطأ: {error}</Typography>
        ) : filteredCampaigns.length === 0 ? (
          <Typography style={{ textAlign: 'center' }}>لا توجد مؤسسات مطابقة</Typography>
        ) : (
          filteredCampaigns.map((campaign) => (
            <AdminCard
              key={campaign.id}
              name={campaign.name}
              email={campaign.email}
              is_approved={campaign.is_approved}
              image={campaign.cover_image}
              id={campaign.id}
              handleApproval={() => {
                dispatch(toggleApproval({ id: campaign.id, currentStatus: campaign.is_approved }))
                  .then((res) => {
                    console.log('Toggle result:', res);
                  });
              }}
              handleDelete={() => handleOpenDialog(campaign.id)}
              handleNavigation={() => navigate(`/admin/campaigns/${campaign.id}`)}
            />
          ))
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          هل أنت متأكد أنك تريد حذف هذه المشروع؟
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>إلغاء</Button>
          <Button onClick={handleConfirmDelete} color="error">حذف</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success" variant="filled">
          تم حذف المشروع بنجاح
        </Alert>
      </Snackbar>
    </>
  )
}

export default Campaigns
