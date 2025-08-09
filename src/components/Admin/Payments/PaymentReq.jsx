import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsReqs, changePaymentStatus } from './../../../redux/Slices/paymentReqSlice';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';



const PaymentReq = () => {
    const dispatch = useDispatch();
    const { data: paymentReqs, loading, error } = useSelector((state) => state.paymentReqs);
    const [selectedId, setSelectedId] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    useEffect(() => {
        dispatch(getPaymentsReqs());
    }, [dispatch]);

    const handleApproveClick = (id) => {
        setSelectedId(id);
        setOpenConfirm(true);
    };

    const handleConfirm = useCallback(async () => {
        const selectedRequest = paymentReqs.find(req => req.id === selectedId);

        if (!selectedRequest) {
            console.error('Missing payment request');
            return;
        }

        await dispatch(changePaymentStatus({ id: selectedId }));


        await dispatch(getPaymentsReqs());

        setOpenConfirm(false);
        setSelectedId(null);
    }, [dispatch, paymentReqs, selectedId]);
    const handleCancel = () => {
        setOpenConfirm(false);
        setSelectedId(null);
    };


    return (
        <>
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
                        <Typography>الحالة الحالية: {req.status == 'processed' ? 'تم الاعتماد' : "في انتظار الموافقه"}</Typography>
                        <Typography>الحملة: {req.campaigns?.name || '—'}</Typography>
                        <Typography>
                            اسم المؤسسة: {req.campaigns?.organizations?.name || '—'}
                        </Typography>
                        <Typography>
                            المبلغ: {req.campaigns.current_amount}
                        </Typography>
                        <Button variant='contained'
                            color={req.status == 'processed' ? 'primary' : "warning"}
                            onClick={() => handleApproveClick(req.id)}>{req.status == 'processed' ? 'تمت الموافقه' : "اعتماد الطلب"}</Button>

                    </Box>
                ))}
            </Box>
            <Dialog
                open={openConfirm}
                onClose={handleCancel}
            >
                <DialogTitle>تأكيد الموافقة</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        هل أنت متأكد أنك تريد تاكيد  هذا الطلب ؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">إلغاء</Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained">تأكيد</Button>
                </DialogActions>
            </Dialog>
        </>

    );
};

export default PaymentReq;
