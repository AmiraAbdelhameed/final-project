import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsReqs, changePaymentStatus} from './../../redux/Slices/paymentReqSlice';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';



const PaymentReq = () => {
    const dispatch = useDispatch();
    const { data: paymentReqs, loading, error} = useSelector((state) => state.paymentReqs);
    const [selectedId, setSelectedId] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    useEffect(() => {
        dispatch(getPaymentsReqs());
    }, [dispatch]);
  
        const handleApproveClick = (id) => {
            setSelectedId(id);
            setOpenConfirm(true);
        };

        const handleConfirm = () => {
        const selectedRequest = paymentReqs.find(req => req.id === selectedId);
        const campaignId = selectedRequest?.campaigns?.id;

        if (!campaignId) {
            console.error('Missing campaign ID');
            return;
        }

        dispatch(changePaymentStatus({
            id: selectedId,
            newStatus: 'approved',
            campaignId: campaignId,
            campaignPayment: true
        }));

        setOpenConfirm(false);
        setSelectedId(null);
    };

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
                        <Typography>الحالة الحالية: {req.status=='approved'?'تم الاعتماد':"في انتظار الموافقه"}</Typography>
                        <Typography>الحملة: {req.campaigns?.name || '—'}</Typography>
                        <Typography>
                            اسم المؤسسة: {req.campaigns?.organizations?.name || '—'}
                        </Typography>
                        <Button variant='contained'
                            color={req.status == 'approved' ? 'primary' :"warning"}
                        onClick={() => handleApproveClick(req.id)}>{req.status == 'approved' ? 'تمت الموافقه' : "اعتماد الطلب"}</Button>
                  
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
