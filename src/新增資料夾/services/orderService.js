import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Order from '../models/order'

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888/', // Your store URL
    consumerKey: 'ck_8a975027f857d4a90efdaa8853ebb08d7991f9c6', // Your consumer key
    consumerSecret: 'cs_fff0d151dbf8b52f7d615e0819cba4c5a1c7692a', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});

class OrderService {
    submitOrder = (data) => {
        return WooCommerce.post("orders", data)
            .then((response) => {
                return new Order(response.data);
            }).catch((error) => {
                console.log(error);
                return null
            });
    }

    getOrder = (id) => {
        return WooCommerce.get(`orders/${id}`)
        .then((response) => {
            return new Order(response.data);
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

    getOrders = () => {
        return WooCommerce.get('orders')
        .then((response) => {
            return response.data.map((rawData) => {
                return new Order(rawData)
            });
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

    getPaymentGatways = () => {
        return WooCommerce.get("payment_gateways")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    getShippingMethods = () => {
        return WooCommerce.get("shipping_methods")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }
}

export default OrderService