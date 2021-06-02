import React from 'react'
import ProductCard from './productCard'
import {
    Cell,
    Grid,
    Row
} from '@material/react-layout-grid';

const ProductCardsList = ({ products = [] }) => {
    return (
        <Grid>
            <Row>
                {
                    products.map((product) => {
                        return (
                            <Cell
                                key={product.id}
                                desktopColumns={3}
                                phoneColumns={4}
                                tabletColumns={4}
                            >
                                <ProductCard
                                    product={product}
                                />
                            </Cell>
                        )
                    })
                }

            </Row>
        </Grid>
    )
}

export default ProductCardsList

