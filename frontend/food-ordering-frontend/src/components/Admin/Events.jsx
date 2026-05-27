import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, deleteEventAction, getRestaurantsEvents } from '../../State/Restaurant/Action';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 };

export const Events = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { usersRestaurant, events } = useSelector(store => store.restaurant);

    const [open, setOpen] = useState(false);
    const [eventData, setEventData] = useState({ image: "", location: "", name: "", startedAt: "", endsAt: "" });

    useEffect(() => {
        if (usersRestaurant?.id) dispatch(getRestaurantsEvents({ restaurantId: usersRestaurant.id, jwt }));
    }, [dispatch, usersRestaurant?.id, jwt]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEventAction({ data: eventData, jwt, restaurantId: usersRestaurant?.id }));
        setOpen(false);
    };

    return (
        <div className='px-5'>
            <Card className='bg-gray-800 text-white'>
                <CardHeader title="SỰ KIỆN & KHUYẾN MÃI" action={<Button onClick={() => setOpen(true)} variant='contained' sx={{ backgroundColor: "#e91e63" }}>Tạo Sự Kiện</Button>} />
                <TableContainer className='bg-gray-800'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Ảnh</TableCell>
                                <TableCell sx={{ color: "white" }}>Tên Sự Kiện</TableCell>
                                <TableCell sx={{ color: "white" }}>Địa Điểm</TableCell>
                                <TableCell sx={{ color: "white" }}>Ngày Bắt Đầu</TableCell>
                                <TableCell sx={{ color: "white" }}>Ngày Kết Thúc</TableCell>
                                <TableCell sx={{ color: "white" }}>Xóa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell><img src={row.image} className='w-20 h-20 object-cover' /></TableCell>
                                    <TableCell sx={{ color: "gray" }}>{row.name}</TableCell>
                                    <TableCell sx={{ color: "gray" }}>{row.location}</TableCell>
                                    <TableCell sx={{ color: "gray" }}>{row.startedAt}</TableCell>
                                    <TableCell sx={{ color: "gray" }}>{row.endsAt}</TableCell>
                                    <TableCell><IconButton onClick={() => dispatch(deleteEventAction({ eventId: row.id, jwt }))} color="error"><DeleteIcon /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <TextField fullWidth label="Link ảnh Poster" onChange={(e) => setEventData({ ...eventData, image: e.target.value })} />
                        <TextField fullWidth label="Tên sự kiện" onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
                        <TextField fullWidth label="Địa điểm" onChange={(e) => setEventData({ ...eventData, location: e.target.value })} />
                        <TextField fullWidth label="Ngày bắt đầu" type="text" placeholder='vd: 10/10/2024' onChange={(e) => setEventData({ ...eventData, startedAt: e.target.value })} />
                        <TextField fullWidth label="Ngày kết thúc" type="text" placeholder='vd: 15/10/2024' onChange={(e) => setEventData({ ...eventData, endsAt: e.target.value })} />
                        <Button fullWidth variant='contained' type='submit' sx={{ backgroundColor: "#e91e63" }}>Tạo mới</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};