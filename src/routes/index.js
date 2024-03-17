import Homepage from "../pages/Homepage/Homepage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import Products from "../pages/Products/Products";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
export const routes = [
    {
        path:'/',
        page:Homepage,
        isShowHeader:true,
    },
    {
        path:'/order',
        page:OrderPage,
        isShowHeader:true,
    },
    {
        path:'/products',
        page:Products,
        isShowHeader:true,
    },
    {
        path:'/:type',
        page:TypeProductPage,
        isShowHeader:true,
    },
    {
        path:'/sign-in',
        page:SignInPage,
        isShowHeader:true,
    },
    {
        path:'/sign-up',
        page:SignUpPage,
        isShowHeader:true,
    },
    {
        path:'/product-details',
        page:ProductDetailPage,
        isShowHeader:true,
    },
    {
        path:'*',
        page:NotFoundPage,
    },
]