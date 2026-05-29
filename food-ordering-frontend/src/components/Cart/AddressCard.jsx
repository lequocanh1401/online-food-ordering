import React from 'react';
import { Card, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    return (
        <Card className="flex gap-5 w-64 p-5 bg-gray-800 text-white">
            <HomeIcon className="text-pink-500" />
            <div className="space-y-3">
                <h1 className="font-semibold text-lg text-white">Nhà riêng</h1>
                <p className="text-gray-400 text-sm">
                    Ký túc xá Đại học, Xuân Thủy, Cầu Giấy, Hà Nội
                </p>
                {showButton && (
                    <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)} color="primary">
                        Chọn địa chỉ
                    </Button>
                )}
            </div>
        </Card>
    )
}