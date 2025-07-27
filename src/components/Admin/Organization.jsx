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
import { getOrganizations, toggleApproval, deleteOrganization } from '../../redux/Slices/organizationsSlice';
import AdminCard from './AdminCard';
import { useNavigate } from 'react-router-dom';

const Organization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: organizations, loading, error } = useSelector((state) => state.organizations);
  const [filter, setFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
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
      <Typography variant="h4" textAlign="right" mt={4} mb={2}>
        المؤسسات
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
      ) : filteredOrganizations.length === 0 ? (
        <Typography style={{ textAlign: 'center' }}>لا توجد مؤسسات مطابقة</Typography>
      ) : (
        filteredOrganizations.map((org) => (
          <AdminCard
            key={org.id}
            name={org.name}
            email={org.email}
            identification_number={org.identification_number}
            is_approved={org.is_approved}
            image={org.profile_image}
            id={org.id}
            handleApproval={() =>
              dispatch(toggleApproval({ id: org.id, currentStatus: org.is_approved }))
            }
            handleDelete={() => handleOpenDialog(org.id)}
            handleNavigation={() => navigate(`/admin/organization/${org.id}`)}
          />
        ))
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
    </>

  );
};

export default Organization;
