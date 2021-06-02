import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Product from '../models/product'

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888/', // Your store URL
    consumerKey: 'ck_8a975027f857d4a90efdaa8853ebb08d7991f9c6', // Your consumer key
    consumerSecret: 'cs_fff0d151dbf8b52f7d615e0819cba4c5a1c7692a', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});


class ProductService {
    getProducts = (page) => {
        return WooCommerce.get("products", {
            page: page,
            per_page: 3
        }).then((response) => {
            const products = response.data.map((rawData) => {
                return new Product(rawData)
            })
            return products
        }).catch((error) => {
            console.log(error);
            return []
        });
    }

    getProductById = (id) =>{
        return WooCommerce.get(`products/${id}`, {
        }).then((response) => {
            return new Product(response.data)
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

    getProductsByIds = (ids) => {
        return WooCommerce.get("products", {
            per_page: 100,
            include: ids
        }).then((response) => {
            const products = response.data.map((rawData) => {
                return new Product(rawData)
            })
            return products
        }).catch((error) => {
            console.log(error);
            return []
        });
    }
}

export default ProductService