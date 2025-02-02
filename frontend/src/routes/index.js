import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Cancel from "../pages/Cancel";
import Success from "../pages/Success";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";
import AllCategory from "../pages/AllCategory";
import AllAds from "../pages/AllAds";
import WalletManagement from "../pages/WalletManagement";
import Profile from "../pages/Profile";
import AllDevelopers from "../pages/AllDevelopers";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path:"",
                element: <Home />
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category/",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "cart",
                element : <Cart/>
            },
            {
                path : "cancel",
                element : <Cancel/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "order",
                element : <OrderPage/>
            },
            {
                path : "profile",
                element : <Profile/>
            },
            {
                path: "admin-panel",
                element : <AdminPanel/>,
                children :[
                    {
                        path: "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path: "all-developers",
                        element : <AllDevelopers/>
                    },
                    {
                        path : "all-ads",
                        element : <AllAds/>
                    },
                    {
                        path: "all-categories",
                        element : <AllCategory/>
                    },
                    {
                        path: "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path: "all-orders",
                        element : <AllOrder/>
                    },
                    {
                        path : "wallet-management",
                        element : <WalletManagement/>
                    }
                ]
            },
        ]
    }
])

export default router;