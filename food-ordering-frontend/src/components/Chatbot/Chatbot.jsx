import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Paper, Typography, InputBase, Chip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { API_URL } from '../../config/api';
import { useSelector } from 'react-redux';

export const Chatbot = () => {
    const { restaurant } = useSelector(store => store);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/coupons`);
                setCoupons(data.filter(c => c.active) || []);
            } catch (err) {
                console.error("Lỗi chatbot tải coupon:", err);
            }
        };
        fetchCoupons();
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Xin chào! Tôi là Trợ lý hỗ trợ tự động của Online Food Ordering. Bạn cần giúp đỡ gì hôm nay?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const suggestions = [
        "Cách áp dụng mã giảm giá?",
        "Đơn hàng tối thiểu là gì?",
        "Thời gian giao hàng?",
        "Thanh toán bằng thẻ?",
        "Làm sao hủy đơn hàng?"
    ];

    const getBotResponse = (userText) => {
        const text = userText.toLowerCase().trim();
        
        // Chào hỏi
        if (text.includes("chào") || text.includes("hello") || text.includes("hi") || text.includes("hey")) {
            return "Xin chào! Chúc bạn một ngày tốt lành. Tôi có thể giúp gì cho bạn về các món ăn, nhà hàng hoặc ưu đãi hôm nay?";
        }
        // Cảm ơn
        if (text.includes("cảm ơn") || text.includes("cám ơn") || text.includes("thanks") || text.includes("thank you")) {
            return "Dạ không có chi! Được phục vụ bạn là niềm vinh hạnh của tôi. Chúc bạn ngon miệng nhé! 😊";
        }
        // Tạm biệt
        if (text.includes("tạm biệt") || text.includes("bye") || text.includes("hẹn gặp lại") || text.includes("see you")) {
            return "Tạm biệt bạn! Chúc bạn một ngày vui vẻ và hẹn gặp lại bạn sớm nhất khi đói bụng nhé! 👋";
        }
        // Tác giả / Người phát triển
        if (text.includes("tác giả") || text.includes("ai tạo ra") || text.includes("sinh viên") || text.includes("phát triển") || text.includes("developer") || text.includes("code")) {
            return "Hệ thống Đặt đồ ăn trực tuyến (Online Food Ordering) này được thiết kế và phát triển bởi anh Lê Quốc Anh và cộng sự, sử dụng công nghệ Spring Boot và React!";
        }
        // Chuyện vui / Hài hước
        if (text.includes("vui") || text.includes("hài hước") || text.includes("kể chuyện") || text.includes("đùa") || text.includes("joke")) {
            return "Tại sao lập trình viên luôn thích chế độ tối (dark mode)? Vì ánh sáng sẽ thu hút bọ (bug)! 😂";
        }
        // Nhà hàng
        if (text.includes("nhà hàng") || text.includes("quán") || text.includes("restaurant") || text.includes("cửa hàng")) {
            const list = restaurant.restaurants || [];
            if (list.length > 0) {
                const resList = list.slice(0, 5).map(r => `• 🏠 ${r.name} (${r.cuisineType || 'Ẩm thực'})`).join('\n');
                return `Dưới đây là một số nhà hàng nổi bật đang hoạt động trên hệ thống:\n${resList}\nBạn có thể nhấn vào các nhà hàng này ở trang chủ để xem thực đơn chi tiết nhé!`;
            }
            return "Hiện tại hệ thống đang cập nhật danh sách nhà hàng. Bạn vui lòng quay lại sau nhé!";
        }
        // Món ăn
        if (text.includes("món") || text.includes("ăn gì") || text.includes("món ăn") || text.includes("food")) {
            return "Gợi ý cho bạn một số món ăn cực hot hôm nay:\n• 🍕 Pizza thập cẩm\n• 🍔 Burger bò phô mai\n• 🍣 Sushi cá hồi\n• 🍜 Phở bò truyền thống\n• 🍗 Gà rán giòn rụm.\nBạn có thể nhập tên món vào thanh tìm kiếm ở đầu trang để tìm quán bán nhé!";
        }
        // Mã giảm giá / Coupon
        if (text.includes("mã") || text.includes("giảm giá") || text.includes("coupon") || text.includes("khuyến mãi")) {
            if (coupons.length > 0) {
                const couponList = coupons.map(c => {
                    const valueStr = c.discountType === 'PERCENTAGE' ? `${c.discountValue}%` : `${c.discountValue?.toLocaleString()} đ`;
                    const minStr = c.minimumOrderValue ? ` (đơn tối thiểu từ ${c.minimumOrderValue.toLocaleString()} đ)` : "";
                    const scope = c.restaurant ? `nhà hàng ${c.restaurant.name}` : "toàn sàn";
                    return `• Mã: **${c.code}** - Giảm ${valueStr}${minStr} - Áp dụng: ${scope}`;
                }).join('\n');
                return `Dưới đây là danh sách các mã giảm giá đang hoạt động:\n${couponList}\nHãy copy mã và áp dụng khi thanh toán trong Giỏ hàng nhé!`;
            }
            return "Để áp dụng mã giảm giá, bạn vào Giỏ hàng, điền mã và bấm 'Áp dụng'. Hiện tại hệ thống chưa có mã giảm giá nào đang chạy.";
        }
        // Đơn hàng tối thiểu
        if (text.includes("tối thiểu") || text.includes("min order") || text.includes("áp dụng tối thiểu")) {
            return "Đơn hàng tối thiểu là mức tiền tối thiểu bạn cần đạt được để áp dụng mã giảm giá thành công. Nếu bạn bớt món ăn khiến tổng tiền giảm xuống dưới mức này, mã giảm giá sẽ tự động bị gỡ bỏ.";
        }
        // Hủy đơn hàng
        if (text.includes("hủy") || text.includes("hủy đơn") || text.includes("cancel")) {
            return "Bạn có thể dễ dàng hủy các đơn hàng chưa thanh toán (PENDING) bằng cách bấm nút 'Hủy đơn hàng' trực tiếp tại trang Lịch sử đơn hàng hoặc Hóa đơn chờ thanh toán trong Hồ sơ cá nhân.";
        }
        // Giao hàng
        if (text.includes("giao hàng") || text.includes("ship") || text.includes("bao lâu") || text.includes("thời gian")) {
            return "Online Food Ordering cam kết giao thức ăn nóng hổi đến tay bạn trong vòng 30 phút kể từ lúc nhà hàng hoàn thành chuẩn bị món.";
        }
        // Stripe
        if (text.includes("stripe") || text.includes("thanh toán") || text.includes("thẻ") || text.includes("card")) {
            return "Hệ thống hỗ trợ cổng thanh toán quốc tế Stripe. Sau khi đặt hàng, bạn sẽ được tự động chuyển sang trang thanh toán Stripe. Bạn có thể sử dụng thẻ test (4242 4242...) để thanh toán thử nghiệm.";
        }
        // Admin
        if (text.includes("admin") || text.includes("tài khoản") || text.includes("super admin")) {
            return "Tài khoản quản trị viên Super Admin mặc định là: email/username: 'admin', password: 'admin'. Đối với chủ cửa hàng, bạn có thể tự đăng ký bằng cách chọn vai trò 'Restaurant Owner'.";
        }
        // Thông tin hệ thống
        if (text.includes("dự án") || text.includes("phần mềm") || text.includes("hệ thống")) {
            return "Đây là hệ thống quản lý đặt đồ ăn online toàn diện gồm giao diện Khách hàng (đặt món, áp mã, thanh toán Stripe), giao diện Chủ nhà hàng (quản lý món ăn, đơn hàng) và giao diện Admin tổng (kiểm duyệt đánh giá, quản lý mã toàn sàn).";
        }
        
        return "Cảm ơn câu hỏi của bạn. Để được hỗ trợ cụ thể hoặc xử lý đơn hàng gặp sự cố, bạn vui lòng liên hệ hotline: 1900 8888 hoặc chat trực tiếp với nhà hàng nhé!";
    };

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        // 1. Thêm tin nhắn của User
        setMessages(prev => [...prev, { sender: 'user', text }]);
        
        // 2. Kích hoạt hiệu ứng đang gõ
        setIsTyping(true);

        setTimeout(() => {
            const response = getBotResponse(text);
            setMessages(prev => [...prev, { sender: 'bot', text: response }]);
            setIsTyping(false);
        }, 800);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSendMessage(inputValue);
        setInputValue('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Nút tròn nổi mở khung chat */}
            {!isOpen && (
                <IconButton 
                    onClick={() => setIsOpen(true)}
                    className="animate-bounce shadow-2xl hover:scale-110 transition-transform duration-300"
                    sx={{
                        width: 60,
                        height: 60,
                        bgcolor: '#e91e63',
                        color: 'white',
                        '&:hover': { bgcolor: '#c2185b' }
                    }}
                >
                    <ChatIcon sx={{ fontSize: 30 }} />
                </IconButton>
            )}

            {/* Khung chat Drawer */}
            {isOpen && (
                <Paper 
                    elevation={24}
                    className="w-[350px] md:w-[380px] h-[500px] flex flex-col bg-gray-950/95 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 animate-slideUp"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-600 to-purple-700 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <SmartToyIcon className="text-white" />
                            <div>
                                <Typography variant="subtitle1" className="font-bold leading-tight">Trợ Lý Hỗ Trợ FAQ</Typography>
                                <Typography variant="caption" className="text-pink-200 block">Tự động trả lời 24/7</Typography>
                            </div>
                        </div>
                        <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/40">
                        {messages.map((msg, index) => {
                            const isBot = msg.sender === 'bot';
                            return (
                                <div key={index} className={`flex items-start gap-2.5 ${!isBot ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${isBot ? 'bg-pink-600' : 'bg-purple-600'}`}>
                                        {isBot ? <SmartToyIcon sx={{ fontSize: 16 }} /> : <PersonIcon sx={{ fontSize: 16 }} />}
                                    </div>
                                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                                        isBot 
                                            ? 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-800/50 animate-fadeIn' 
                                            : 'bg-pink-600 text-white rounded-tr-none animate-fadeIn'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}
                        
                        {isTyping && (
                            <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white shrink-0">
                                    <SmartToyIcon sx={{ fontSize: 16 }} />
                                </div>
                                <div className="bg-gray-800 text-gray-400 p-3 rounded-2xl rounded-tl-none border border-gray-800/50 text-sm flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions Pills */}
                    <div className="p-3 border-t border-gray-900/60 flex flex-wrap gap-1.5 bg-gray-950/50">
                        {suggestions.map((sug, index) => (
                            <Chip
                                key={index}
                                label={sug}
                                onClick={() => handleSendMessage(sug)}
                                size="small"
                                className="text-[11px] bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800/40 cursor-pointer"
                                sx={{ height: 24 }}
                            />
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleFormSubmit} className="p-3 border-t border-gray-900 flex gap-2 bg-gray-950">
                        <InputBase
                            fullWidth
                            placeholder="Nhập câu hỏi của bạn..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            sx={{
                                color: 'white',
                                bgcolor: '#111827',
                                border: '1px solid #1f2937',
                                borderRadius: '10px',
                                px: 2,
                                py: 0.5,
                                fontSize: '0.9rem'
                            }}
                        />
                        <IconButton type="submit" sx={{ bgcolor: '#e91e63', color: 'white', '&:hover': { bgcolor: '#c2185b' }, borderRadius: '10px' }}>
                            <SendIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </form>
                </Paper>
            )}
        </div>
    );
};
