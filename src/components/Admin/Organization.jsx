
import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase/supabaseClient';
import { Box, Tab, Typography, Tabs } from '@mui/material';

const Organization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase.from('organizations').select('*');
      if (error) {
        console.error('Error fetching organizations:', error.message);
      } else {
        setOrganizations(data);
      }
      setLoading(false);
    };

    fetchOrganizations();
  }, []);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredOrganizations = organizations.filter((org) => {
    if (filter === 'approved') return org.is_approved === true;
    if (filter === 'not_approved') return org.is_approved === false;
    return true;
  });
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
              </li>
            ))}
          </ul>
        )}
      </Box>
    </>
  )
}

export default Organization

