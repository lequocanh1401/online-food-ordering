import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, Rating, TextField, Box, Typography, Alert 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../State/Review/Action';

export const ReviewModal = ({ open, handleClose, restaurantId, foodId, foodName, reviewToEdit, onSuccess }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Đồng bộ rating và comment khi mở modal hoặc khi có review cần sửa
    useEffect(() => {
        if (reviewToEdit) {
            setRating(reviewToEdit.rating || 5);
            setComment(reviewToEdit.comment || "");
        } else {
            setRating(5);
            setComment("");
        }
        setError(null);
    }, [open, reviewToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const reviewData = {
            rating: rating,
            comment: comment
        };

        try {
            if (reviewToEdit) {
                await dispatch(updateReview({ reviewId: reviewToEdit.id, reviewData, jwt }));
            } else {
                await dispatch(createReview({ reviewData, jwt, restaurantId, foodId }));
            }
            setComment("");
            setRating(5);
            if (onSuccess) onSuccess();
            handleClose();
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: '#111827',
                    border: '1px solid #1f2937',
                    borderRadius: 3,
                    color: 'white'
                }
            }}
        >
            <DialogTitle sx={{ borderBottom: '1px solid #1f2937', pb: 2 }} className="font-bold">
                {reviewToEdit ? 'Chỉnh sửa đánh giá' : (foodId ? `Đánh Giá Món Ăn: ${foodName}` : 'Đánh Giá & Nhận Xét Nhà Hàng')}
            </DialogTitle>
            
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {error && (
                        <Alert severity="error" sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            {error}
                        </Alert>
                    )}

                    <Box className="flex flex-col items-center gap-2">
                        <Typography className="text-gray-400 font-medium text-sm">
                            Vui lòng chọn mức độ hài lòng của bạn:
                        </Typography>
                        <Rating
                            name="rating-select"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue || 5);
                            }}
                            size="large"
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#ff9800',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: '#374151',
                                }
                            }}
                        />
                    </Box>

                    <TextField
                        label="Viết bình luận của bạn..."
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                        variant="outlined"
                        required
                        InputLabelProps={{
                            sx: { color: '#9ca3af', '&.Mui-focused': { color: '#e91e63' } }
                        }}
                        InputProps={{
                            sx: {
                                color: 'white',
                                bgcolor: '#1f2937',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e91e63' }
                            }
                        }}
                    />
                </DialogContent>
                
                <DialogActions sx={{ borderTop: '1px solid #1f2937', px: 3, py: 2 }}>
                    <Button 
                        onClick={handleClose} 
                        sx={{ color: '#9ca3af', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={submitting}
                        sx={{ 
                            bgcolor: '#e91e63', 
                            '&:hover': { bgcolor: '#ad1457' },
                            '&.Mui-disabled': { bgcolor: '#880e4f', color: '#9ca3af' }
                        }}
                    >
                        {submitting ? "Đang gửi..." : (reviewToEdit ? "Cập nhật" : "Gửi đánh giá")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
