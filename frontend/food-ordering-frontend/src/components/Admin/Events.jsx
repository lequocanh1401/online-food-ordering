import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, getRestaurantsEvents } from '../../State/Restaurant/Action';

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

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantsEvents({
                restaurantId: restaurant.usersRestaurant.id,
                jwt: jwt
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

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

            <div className='mt-5 px-5 flex flex-wrap gap-5'>
                {restaurant.events?.map((item) => (
                    <Card key={item.id} sx={{ width: 345, bgcolor: '#1f2937' }}>
                        <CardMedia sx={{ height: 140 }} image={item.image || "https://via.placeholder.com/345x140"} title={item.name} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className='text-white'>{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary" className='text-gray-400'><strong>Địa điểm:</strong> {item.location}</Typography>
                            <Typography variant="body2" color="text.secondary" className='text-gray-400 mt-2'>Bắt đầu: {item.startedAt}</Typography>
                            <Typography variant="body2" color="text.secondary" className='text-gray-400'>Kết thúc: {item.endsAt}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};