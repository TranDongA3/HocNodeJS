const isAdmin = (req, res, next) => {
    try {
        const { role } = req.user;
        console.log(role);

        if (role === 'ADMIN') {
            // Nếu là admin thì cho phép đi tiếp
            return next();
        } else {
            // Nếu không phải admin thì chặn lại
            return res.status(403).json({
                message: 'Bạn không có quyền truy cập'
            });
        }
       
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi xác thực quyền',
            error: error.message
        });
    }
};

export default isAdmin;
