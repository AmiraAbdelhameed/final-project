import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Typography, Tabs , Button } from '@mui/material';
import { getOrganizations, toggleApproval } from '../../redux/Slices/organizationsSlice';

const Organization = () => {
  const dispatch = useDispatch();

  const { data: organizations, loading, error } = useSelector((state) => state.organizations);
  const [filter, setFilter] = useState('all');

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

  return (
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
              <ul>
                {filteredOrganizations.map((org) => (
                  <li key={org.id}>
                    <strong>{org.name}</strong><br />
                    Email: {org.email}<br />
                    رقم التعريف: {org.identification_number}<br />
                    معتمدة: {org.is_approved ? 'نعم' : 'لا'}
                    <br />
                    <Button
                      variant="outlined"
                      color={org.is_approved ? 'warning' : 'primary.main'}
                      size="small"
                      onClick={() =>
                        dispatch(toggleApproval({ id: org.id, currentStatus: org.is_approved }))
                      }
                      sx={{ mt: 1 }}
                    >
                      {org.is_approved ? 'إلغاء الاعتماد' : 'اعتماد'}
                    </Button>
                  </li>
                ))}
              </ul>
      )}
    </Box>
  );
};

export default Organization;
