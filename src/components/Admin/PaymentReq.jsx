import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsReqs, changePaymentStatus } from './../../redux/Slices/paymentReqSlice';
import { Typography, MenuItem, Select, Box } from '@mui/material';

const statusOptions = ['pending', 'approved', 'rejected', 'processed'];

const PaymentReq = () => {
    const dispatch = useDispatch();
    const { data: paymentReqs, loading, error } = useSelector((state) => state.paymentReqs);

    useEffect(() => {
        dispatch(getPaymentsReqs());
    }, [dispatch]);

    const handleStatusChange = (id, newStatus) => {
        dispatch(changePaymentStatus({ id, newStatus }));
    };

    return (
        <Box p={2}>
            <Typography variant="h5" mb={2}>طلبات الدفع</Typography>

            {loading && <Typography>جاري التحميل...</Typography>}
            {error && <Typography color="error">حدث خطأ: {error}</Typography>}

            {paymentReqs.map((req) => (
                <Box
                    key={req.id}
                    mb={2}
                    p={2}
                    border="1px solid #ccc"
                    borderRadius="8px"
                >
                    <Typography>رقم الطلب: {req.id}</Typography>
                    <Typography>الحالة الحالية: {req.status}</Typography>

                    <Select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        size="small"
                    >
                        {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                    </Select>
                </Box>
            ))}
        </Box>
    );
};

export default PaymentReq;
