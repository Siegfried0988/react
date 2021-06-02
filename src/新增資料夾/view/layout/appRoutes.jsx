import React, {useContext} from 'react'
import HomePage from '../home/homePage'
import ProductsIndexPage from '../products/productsIndexPage'
import ProductsShowPage from '../products/productsShowPage'
import OrdersIndexPage from '../orders/ordersIndexPage'
import OrdersShowPage from '../orders/ordersShowPage'
import OrderSuccessPage from '../orders/orderSuccessPage'
import OrderFailedPage from '../orders/orderFailedPage'
import CartIndexPage from '../cart/cartIndexPage'
import CheckoutPage from '../cart/checkoutPage'
import CusomterLoginPage from '../customer/logInPage'
import CusomterSignupPage from '../customer/signUpPage'
import NoMatch from '../errors/404'
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import IsLogInContext from '../../context/isLogInContext';
import CustomerService from '../../services/customerService'

const customerService = new CustomerService()

const Routes = () => {
    const [isLogin, setIsLogin] = useContext(IsLogInContext)

    return (<>
        <Switch>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/products" exact>
                <ProductsIndexPage />
            </Route>
            <Route path="/products/:id" exact>
                <ProductsShowPage />
            </Route>
            <Route path="/orders" exact>
                <OrdersIndexPage />
            </Route>
            <Route path="/orders/failed" exact>
                <OrderFailedPage />
            </Route>
            <Route path="/orders/:id/success" exact>
                <OrderSuccessPage />
            </Route>
            <Route path="/orders/:id" exact>
                <OrdersShowPage />
            </Route>
            <Route path="/cart" exact>
                <CartIndexPage />
            </Route>
            <Route path="/checkout" exact>
                <CheckoutPage />
            </Route>
            <Route path="/login" exact>
                <CusomterLoginPage />
            </Route>
            <Route path="/signup" exact>
                <CusomterSignupPage />
            </Route>
            <Route
                path="/logout" exact
                render={() => {
                    customerService.logOut()
                    setIsLogin(false)
                    return <Redirect to="/" />
                }
                }
            />
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    </>)
}

export default Routes;