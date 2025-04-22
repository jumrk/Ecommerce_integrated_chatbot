import React from 'react';
import { FiPrinter } from 'react-icons/fi';

const PrintInvoice = ({ order }) => {
    const handlePrint = () => {
        const printContent = `
            <div style="font-family: Arial, sans-serif; padding: 30px; max-width: 800px; margin: 0 auto; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2d3748; padding-bottom: 20px;">
                    <h1 style="font-size: 28px; color: #2d3748; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Hóa Đơn Bán Hàng</h1>
                    <p style="color: #4a5568; margin: 5px 0;">Mã đơn hàng: <strong>${order.orderCode}</strong></p>
                    <p style="color: #4a5568; margin: 5px 0;">Ngày đặt: ${new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>

                <div style="display: grid; grid-template-columns: ${order.shipper ? '1fr 1fr' : '1fr'}; gap: 30px; margin-bottom: 30px;">
                    <div>
                        <h2 style="font-size: 18px; color: #2d3748; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Thông tin khách hàng</h2>
                        <p style="margin: 8px 0; color: #4a5568;">Họ tên: <strong>${order.addressId.receiver}</strong></p>
                        <p style="margin: 8px 0; color: #4a5568;">Số điện thoại: <strong>${order.addressId.phone}</strong></p>
                        <p style="margin: 8px 0; color: #4a5568;">Địa chỉ: ${order.addressId.address}, ${order.addressId.ward}, ${order.addressId.district}, ${order.addressId.province}</p>
                    </div>

                    ${order.shipper ? `
                    <div>
                        <h2 style="font-size: 18px; color: #2d3748; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Thông tin người giao hàng</h2>
                        <p style="margin: 8px 0; color: #4a5568;">Tên: <strong>${order.shipper.name}</strong></p>
                        <p style="margin: 8px 0; color: #4a5568;">Số điện thoại: <strong>${order.shipper.phone}</strong></p>
                    </div>
                    ` : `
                    <div>
                        <h2 style="font-size: 18px; color: #2d3748; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Phương thức vận chuyển</h2>
                        <p style="margin: 8px 0; color: #4a5568;">${order.shippingMethod}</p>
                    </div>
                    `}
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; background: #fff;">
                    <thead>
                        <tr style="background-color: #2d3748; color: white;">
                            <th style="padding: 12px; text-align: left; font-weight: 600;">Sản phẩm</th>
                            <th style="padding: 12px; text-align: right; font-weight: 600;">Đơn giá</th>
                            <th style="padding: 12px; text-align: right; font-weight: 600;">Số lượng</th>
                            <th style="padding: 12px; text-align: right; font-weight: 600;">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px; color: #4a5568;">
                                    ${item.productId.name}
                                    <br><span style="font-size: 12px; color: #718096;">${item.size} / ${item.color}</span>
                                </td>
                                <td style="padding: 12px; text-align: right; color: #4a5568;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                                <td style="padding: 12px; text-align: right; color: #4a5568;">${item.quantity}</td>
                                <td style="padding: 12px; text-align: right; color: #2d3748; font-weight: 600;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div style="margin-left: auto; width: 320px; background: #f7fafc; padding: 15px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #4a5568;">
                        <span>Tạm tính:</span>
                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.subtotal)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #4a5568;">
                        <span>Phí vận chuyển:</span>
                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingFee)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: 600; margin-top: 15px; padding-top: 15px; border-top: 2px solid #2d3748; color: #2d3748; font-size: 18px;">
                        <span>Tổng cộng:</span>
                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</span>
                    </div>
                </div>

                <div style="margin-top: 40px; text-align: center; color: #718096; font-style: italic;">
                    <p>Cảm ơn quý khách đã mua hàng!</p>
                </div>
            </div>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>In hóa đơn - ${order.orderCode}</title>
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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
            <FiPrinter />
            In hóa đơn
        </button>
    );
};

export default PrintInvoice;