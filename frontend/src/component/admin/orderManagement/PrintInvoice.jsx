import React from 'react';
import { FiPrinter } from 'react-icons/fi';

const PrintInvoice = ({ order }) => {
    const handlePrint = () => {
        const printContent = `
            <div style="padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 24px; margin-bottom: 10px;">HÓA ĐƠN BÁN HÀNG</h1>
                    <p>Mã đơn hàng: ${order.id}</p>
                    <p>Ngày đặt: ${new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 18px; margin-bottom: 10px;">Thông tin khách hàng</h2>
                    <p>Họ tên: ${order.customer.name}</p>
                    <p>Số điện thoại: ${order.customer.phone}</p>
                    <p>Địa chỉ: ${order.shippingAddress.street}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.city}</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sản phẩm</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Đơn giá</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Số lượng</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}<br><span style="font-size: 12px; color: #666;">${item.variant}</span></td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.quantity}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div style="margin-left: auto; width: 300px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Tạm tính:</span>
                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.subtotal)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Phí vận chuyển:</span>
                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingFee)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Giảm giá:</span>
                        <span>-${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.discount)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                        <span>Tổng cộng:</span>
                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</span>
                    </div>
                </div>

                <div style="margin-top: 40px; text-align: center;">
                    <p>Cảm ơn quý khách đã mua hàng!</p>
                </div>
            </div>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>In hóa đơn - ${order.id}</title>
                </head>
                <body>
                    ${printContent}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
            <FiPrinter />
            In hóa đơn
        </button>
    );
};

export default PrintInvoice;