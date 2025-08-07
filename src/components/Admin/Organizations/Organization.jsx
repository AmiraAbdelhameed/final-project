import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Tab, Typography, Tabs, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Modal,
  TextField
} from '@mui/material';
import { getOrganizations, toggleApproval, deleteOrganization, disapproveOrganization } from '../../../redux/Slices/organizationsSlice';
import AdminCard from '../Cards/AdminCard';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';

const Organization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: organizations, loading, error } = useSelector((state) => state.organizations);
  const [filter, setFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [disapprovalReason, setDisapprovalReason] = useState("")
  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredOrganizations = organizations.filter((org) => {
    if (filter === 'approved') return org.is_approved === true;
    if (filter === 'not_approved') return org.is_approved === false;
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
      dispatch(deleteOrganization(selectedId)).then((res) => {
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
        <Search tableName='organizations' page="organization" />
        <Typography variant="h4" textAlign="right" mt={4} mb={2}>
          المؤسسات
        </Typography>

        {/* Tabs Filter */}
        <Box display="flex" justifyContent="flex-start"

          mb={4}>
          <Tabs value={filter} onChange={handleChange} centered
          // flexDirection='column'
          >
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
        ) : filteredOrganizations.length === 0 ? (
          <Typography style={{ textAlign: 'center' }}>لا توجد مؤسسات مطابقة</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'space-between',
              px: 2,
              my: 4
            }}
          >
            {filteredOrganizations.map((org) => (
              <AdminCard
                key={org.id}
                name={org.name}
                email={org.email}
                identification_number={org.identification_number}
                is_approved={org.is_approved}
                image={org.profile_image}
                id={org.id}
                handleApproval={() => {
                  if (org.is_approved) {
                    setSelectedId(org.id);
                    setOpenModal(true);
                  } else {
                    dispatch(toggleApproval({ id: org.id, currentStatus: org.is_approved }));
                  }
                }}
                handleDelete={() => handleOpenDialog(org.id)}
                handleNavigation={() => navigate(`/admin/organization/${org.id}`)}
              />
            ))}
          </Box>
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          هل أنت متأكد أنك تريد حذف هذه المؤسسة؟
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
          تم حذف المؤسسة بنجاح
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
              dispatch(disapproveOrganization({ id: selectedId, reason: disapprovalReason }));
              setOpenModal(false);
              setDisapprovalReason('');
            }}
          >
            حفظ
          </Button>
        </Box>
      </Modal>
    </>

  );
};

export default Organization;
