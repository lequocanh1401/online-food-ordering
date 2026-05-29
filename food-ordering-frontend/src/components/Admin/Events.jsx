import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Card, CardMedia, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, getRestaurantsEvents, deleteEventAction, updateEventAction } from '../../State/Restaurant/Action';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', outline: 'none', boxShadow: 24, p: 4, borderRadius: '8px'
};

const initialValues = { image: "", location: "", name: "", startedAt: null, endsAt: null };

export const Events = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);

    const [editOpen, setEditOpen] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    const [editForm, setEditForm] = useState({
        image: "",
        name: "",
        location: "",
        startedAt: null,
        endsAt: null
    });

    // Custom confirm delete modal states
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteEventId, setDeleteEventId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteEventId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteEventId) {
            dispatch(deleteEventAction({ eventId: deleteEventId, jwt }));
        }
        setConfirmOpen(false);
        setDeleteEventId(null);
    };

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantsEvents({
                restaurantId: restaurant.usersRestaurant.id,
                jwt: jwt
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleEditClick = (eventItem) => {
        setEditEventId(eventItem.id);
        setEditForm({
            image: eventItem.image || "",
            name: eventItem.name || "",
            location: eventItem.location || "",
            startedAt: eventItem.startedAt ? dayjs(eventItem.startedAt) : null,
            endsAt: eventItem.endsAt ? dayjs(eventItem.endsAt) : null
        });
        setEditOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const data = {
            image: editForm.image,
            name: editForm.name,
            location: editForm.location,
            startedAt: editForm.startedAt ? dayjs(editForm.startedAt).format("MMMM DD, YYYY hh:mm A") : "",
            endsAt: editForm.endsAt ? dayjs(editForm.endsAt).format("MMMM DD, YYYY hh:mm A") : "",
        };

        dispatch(updateEventAction({
            eventId: editEventId,
            data,
            jwt,
            restaurantId: restaurant.usersRestaurant?.id
        }));

        setEditOpen(false);
        setEditEventId(null);
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const data = {
                image: values.image,
                location: values.location,
                name: values.name,
                startedAt: values.startedAt ? dayjs(values.startedAt).format("MMMM DD, YYYY hh:mm A") : "",
                endsAt: values.endsAt ? dayjs(values.endsAt).format("MMMM DD, YYYY hh:mm A") : "",
            };

            dispatch(createEventAction({
                data,
                jwt,
                restaurantId: restaurant.usersRestaurant?.id
            }));

            formik.resetForm();
            handleClose();
        }
    });

    return (
        <div>
            <div className='p-5'>
                <Button onClick={handleOpen} variant='contained' color='primary' size='large'>
                    Tạo Sự Kiện Mới
                </Button>
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <h1 className='text-gray-400 font-bold text-center text-xl pb-6'>TẠO SỰ KIỆN / KHUYẾN MÃI</h1>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Link ảnh sự kiện (URL)" name="image" value={formik.values.image} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Tên sự kiện" name="name" value={formik.values.name} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Địa điểm áp dụng" name="location" value={formik.values.location} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Ngày bắt đầu" value={formik.values.startedAt} onChange={(newValue) => formik.setFieldValue("startedAt", newValue)} sx={{ width: '100%' }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Ngày kết thúc" value={formik.values.endsAt} onChange={(newValue) => formik.setFieldValue("endsAt", newValue)} sx={{ width: '100%' }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth size='large'>Thêm Sự Kiện</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>

            <Modal open={editOpen} onClose={() => setEditOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={handleEditSubmit}>
                        <h1 className='text-gray-800 font-bold text-center text-xl pb-6'>CẬP NHẬT SỰ KIỆN</h1>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Link ảnh sự kiện (URL)" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Tên sự kiện" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Địa điểm áp dụng" value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} required />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Ngày bắt đầu" value={editForm.startedAt} onChange={(newValue) => setEditForm({...editForm, startedAt: newValue})} sx={{ width: '100%' }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Ngày kết thúc" value={editForm.endsAt} onChange={(newValue) => setEditForm({...editForm, endsAt: newValue})} sx={{ width: '100%' }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth size='large'>Cập nhật</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>

            <div className='mt-5 px-5 flex flex-wrap gap-5'>
                {restaurant.events?.map((item) => (
                    <Card key={item.id} sx={{ width: 345, bgcolor: '#1f2937' }}>
                        <CardMedia sx={{ height: 140 }} image={item.image || "https://via.placeholder.com/345x140"} title={item.name} />
                        <CardContent>
                            <div className="flex justify-between items-center mb-2">
                                <Typography gutterBottom variant="h5" component="div" className='text-white mb-0' sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                <Box className="flex gap-1">
                                    <IconButton onClick={() => handleEditClick(item)} sx={{ color: '#60a5fa' }} size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(item.id)} color="error" size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </div>
                            <Typography variant="body2" color="text.secondary" className='text-gray-400'><strong>Địa điểm:</strong> {item.location}</Typography>
                            <Typography variant="body2" color="text.secondary" className='text-gray-400 mt-2'>Bắt đầu: {item.startedAt}</Typography>
                            <Typography variant="body2" color="text.secondary" className='text-gray-400'>Kết thúc: {item.endsAt}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Custom confirm delete Dialog */}
            <Dialog 
                open={confirmOpen} 
                onClose={() => setConfirmOpen(false)}
                PaperProps={{
                    sx: {
                        bgcolor: '#1f2937',
                        color: 'white',
                        borderRadius: '12px',
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold' }}>
                    <WarningIcon sx={{ color: '#f87171' }} />
                    Xác Nhận Xóa Sự Kiện
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#d1d5db' }}>
                        Bạn có chắc chắn muốn xóa sự kiện này không? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={() => setConfirmOpen(false)} 
                        sx={{ color: '#9ca3af', '&:hover': { bgcolor: 'rgba(156, 163, 175, 0.1)' } }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        variant="contained" 
                        color="error"
                        sx={{ borderRadius: '6px', fontWeight: 'bold' }}
                    >
                        Xác nhận xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};