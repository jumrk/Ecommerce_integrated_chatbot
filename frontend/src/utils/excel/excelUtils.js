import ExcelJS from 'exceljs';

const createHeaderStyle = (workbook) => {
    return {
        font: { bold: true, color: { argb: 'FFFFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } },
        alignment: { vertical: 'middle', horizontal: 'center' },
        border: {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } }
        }
    };
};

const createDataStyle = (workbook) => {
    return {
        border: {
            top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
            bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
            left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
            right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
        }
    };
};

export const exportDashboardToExcel = async (statsData, orders, products, users, blogs) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'E-Commerce Admin';
    workbook.lastModifiedBy = 'E-Commerce Admin';
    workbook.created = new Date();
    workbook.modified = new Date();

    // 1. Stats Sheet
    const statsSheet = workbook.addWorksheet('Thống kê');
    statsSheet.columns = [
        { header: 'Tiêu đề', key: 'title', width: 30 },
        { header: 'Giá trị', key: 'value', width: 20 }
    ];

    statsData.forEach(stat => {
        statsSheet.addRow({
            title: stat.title,
            value: stat.value
        });
    });

    // 2. Orders Sheet
    const ordersSheet = workbook.addWorksheet('Đơn hàng');
    ordersSheet.columns = [
        { header: 'Mã đơn hàng', key: 'orderCode', width: 20 },
        { header: 'Tổng tiền', key: 'total', width: 20 },
        { header: 'Ngày đặt', key: 'createdAt', width: 25 },
        { header: 'Trạng thái', key: 'status', width: 15 }
    ];

    orders.forEach(order => {
        ordersSheet.addRow({
            orderCode: order.orderCode || order._id,
            total: order.total ? order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND',
            createdAt: order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : '',
            status: order.status || 'Chưa xác định'
        });
    });

    // 3. Products Sheet
    const productsSheet = workbook.addWorksheet('Sản phẩm');
    productsSheet.columns = [
        { header: 'Tên sản phẩm', key: 'name', width: 30 },
        { header: 'Giá', key: 'price', width: 20 },
        { header: 'Số lượng', key: 'quantity', width: 15 },
        { header: 'Danh mục', key: 'category', width: 20 },
        { header: 'Mô tả', key: 'description', width: 40 },
        { header: 'Trạng thái', key: 'status', width: 15 }
    ];

    products.forEach(product => {
        productsSheet.addRow({
            name: product.name || '',
            price: product.price ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND',
            quantity: product.quantity || 0,
            category: product.category ? (typeof product.category === 'string' ? product.category : product.category.name) : '',
            description: product.description || '',
            status: product.status || 'Chưa xác định'
        });
    });

    // 4. Users Sheet
    const usersSheet = workbook.addWorksheet('Người dùng');
    usersSheet.columns = [
        { header: 'Tên người dùng', key: 'fullName', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Số điện thoại', key: 'phone', width: 20 },
        { header: 'Địa chỉ', key: 'address', width: 40 },
        { header: 'Vai trò', key: 'role', width: 15 },
        { header: 'Trạng thái', key: 'status', width: 15 },
        { header: 'Ngày tạo', key: 'createdAt', width: 20 }
    ];

    users.forEach(user => {
        usersSheet.addRow({
            fullName: user.fullName || user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            role: user.role || '',
            status: user.isActive ? 'Hoạt động' : 'Khóa',
            createdAt: user.createdAt ? new Date(user.createdAt).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : ''
        });
    });

    // 5. Blogs Sheet
    const blogsSheet = workbook.addWorksheet('Blog');
    blogsSheet.columns = [
        { header: 'Tiêu đề', key: 'title', width: 30 },
        { header: 'Danh mục', key: 'category', width: 20 },
        { header: 'Ngày đăng', key: 'createdAt', width: 20 },
        { header: 'Trạng thái', key: 'status', width: 15 },
        { header: 'Lượt xem', key: 'views', width: 15 },
        { header: 'Tác giả', key: 'author', width: 20 }
    ];

    blogs.forEach(blog => {
        blogsSheet.addRow({
            title: blog.title || '',
            category: blog.category ? (typeof blog.category === 'string' ? blog.category : blog.category.name) : '',
            createdAt: blog.createdAt ? new Date(blog.createdAt).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : '',
            status: blog.status || 'Chưa xác định',
            views: blog.views || 0,
            author: blog.author || ''
        });
    });

    // Apply styles to all sheets
    workbook.worksheets.forEach(worksheet => {
        // Style header row
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
        headerRow.border = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } }
        };

        // Style data rows
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            row.border = {
                top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
                bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
                left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
                right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
            };
        }

        // Auto filter
        worksheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: worksheet.columnCount }
        };
    });

    // Save file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const currentDate = new Date().toISOString().split('T')[0];
    link.download = `dashboard_report_${currentDate}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
}; 