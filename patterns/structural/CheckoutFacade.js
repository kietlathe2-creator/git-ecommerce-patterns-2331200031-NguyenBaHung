import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.

        console.log("---Bắt đầu xử lí đơn hàng cho: "+ orderDetails.userId + " ---");
        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        if(inStock){
            const paymentSuccess = this.paymentService.processPayment(orderDetails.userId, 1200);

            if(paymentSuccess){
                this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
                console.log("Đơn hàng đã hoàn tất thành công.");
            }else{
                console.log("Lỗi: Thanh toán thất bại");
            }
        }else{
            console.log("Sản phẩm đã hết hàng trong kho.");
        }

       

    }
}

export { CheckoutFacade };
