import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tab,
  Typography,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Modal,
  TextField
} from '@mui/material';
import { getCampaigns, toggleApproval, deleteCampaign, disapproveCampaign } from '../../../redux/Slices/campaignsSlice';
import AdminCard from '../Cards/AdminCard';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';

const Campaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: campaigns,
    loading,
    error,
  } = useSelector((state) => state.campaigns);
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [disapprovalReason, setDisapprovalReason] = useState("")

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter === "approved") return campaign.is_approved === true;
    if (filter === "not_approved") return campaign.is_approved === false;
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
        <Search tableName="campaigns" page='campaigns' />
        <Typography variant="h4" textAlign="right" mt={4} mb={2}>
          الحملات
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
          <Typography style={{ textAlign: "center" }}>
            لا توجد مؤسسات مطابقة
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'start',
              px: 2,
              my: 4
            }}
          >
            {filteredCampaigns.map((campaign) => (
              <AdminCard
                key={campaign.id}
                name={campaign.name}
                email={campaign.email}
                is_approved={campaign.is_approved}
                image={campaign.cover_image}
                id={campaign.id}
                handleApproval={() => {
                  if (campaign.is_approved) {
                    setSelectedId(campaign.id);
                    setOpenModal(true);
                  } else {
                    dispatch(toggleApproval({ id: campaign.id, currentStatus: campaign.is_approved }));
                  }
                }}
                handleDelete={() => handleOpenDialog(campaign.id)}
                handleNavigation={() => navigate(`/admin/campaigns/${campaign.id}`)}
              />
            ))}
          </Box>
        )
        }
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>هل أنت متأكد أنك تريد حذف هذه المشروع؟</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>إلغاء</Button>
          <Button onClick={handleConfirmDelete} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
        >
          تم حذف المشروع بنجاح
        </Alert>
      </Snackbar>
      {/* Modal  */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4, borderRadius: 2, width: 400
        }}>
          <Typography variant="h6" mb={2}>سبب عدم الاعتماد</Typography>
          <TextField
            fullWidth
            label="السبب"
            multiline
            rows={4}
            value={disapprovalReason}
            onChange={(e) => setDisapprovalReason(e.target.value)}
          />

          <Button onClick={() => setOpenModal(false)}>إلغاء</Button>
          <Button
            onClick={() => {
              dispatch(disapproveCampaign({ id: selectedId, reason: disapprovalReason }));
              setOpenModal(false);
              setDisapprovalReason('');
            }}
          >
            حفظ
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Campaigns
