import React, { 
    useEffect, 
    useState, 
    useRef, 
    useMemo 
} from 'react'
import {
    useParams,
    Redirect,
} from "react-router-dom";
import ProductContentView from './components/productContentView'
import LoadingView from '../layout/loadingView'
import ProductService from '../../services/productService'

const productService = new ProductService()

const ProductsShowPage = () => {
    let { id } = useParams();
    let isInited = useRef(false)
    const [product, setProduct] = useState([])

    useEffect(() => {
        const loadFunc = async () => {
            const result = await productService.getProductById(id)
            isInited.current = true
            setProduct(result)
        }

        loadFunc()
    }, [id])

    const initFlag = isInited.current
    const contentView = useMemo(() => {
        if (initFlag) {
            if (product) {
                return (<ProductContentView product={product}/>)
            } else {
                return (<Redirect to="/products" />)
            }
        } else {
            return (<LoadingView />)
        }
    }, [product, initFlag])

    return (
        <div>
            {
                contentView 
            }
        </div>
    )
}

export default ProductsShowPage;