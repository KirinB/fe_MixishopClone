import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import HomeTemplate from "./templates/HomeTemplate";
import { NotificationProvider } from "./store/Notification.Context";
import HomePage from "./pages/Home/HomePage";
import Product from "./pages/Product/Product";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import AdminTemplate from "./templates/AdminTemplate";
import AdminPage from "./pages/Admin/AdminPage";
import ManagerUser from "./pages/Admin/ManagerUser/ManagerUser";
import AboutUs from "./pages/AboutUs/AboutUs";
import ManagerProduct from "./pages/Admin/ManagerProudct/ManagerProduct";
import PostManagerProduct from "./pages/Admin/ManagerProudct/Post/Post.Manager.Product";
import Contact from "./pages/Contact/Contact";
import Categories from "./pages/Categories/Categories";
import Cart from "./pages/Cart/Cart";
import ScrollToTop from "./hooks/useScrollToTop";
import PaymentResult from "./pages/PaymentResult/PaymentResult";
import AccountPage from "./pages/Account/AccountPage";
import SearchPage from "./pages/Search/SearchPage";
import ManagerProductType from "./pages/Admin/ManagerProductType/ManagerProductType";
import ManagerOrder from "./pages/Admin/ManagerOrder/ManagerOrder";

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: pathDefault.product,
        element: <Product />,
      },
      {
        path: pathDefault.login,
        element: <Login />,
      },
      {
        path: pathDefault.register,
        element: <Register />,
      },
      {
        path: pathDefault.aboutUs,
        element: <AboutUs />,
      },
      {
        path: pathDefault.contact,
        element: <Contact />,
      },
      {
        path: pathDefault.categories,
        element: <Categories />,
      },
      {
        path: pathDefault.cart,
        element: <Cart />,
      },
      {
        path: pathDefault.paymentResult,
        element: <PaymentResult />,
      },
      {
        path: pathDefault.account,
        element: <AccountPage />,
      },
      {
        path: pathDefault.search,
        element: <SearchPage />,
      },
    ],
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      {
        path: "",
        element: <AdminPage />,
      },
      {
        path: pathDefault.managerUser,
        element: <ManagerUser />,
      },
      {
        path: pathDefault.managerProduct,
        element: <ManagerProduct />,
      },
      {
        path: pathDefault.managerPostProduct,
        element: <PostManagerProduct />,
      },
      {
        path: pathDefault.managerProductType,
        element: <ManagerProductType />,
      },
      {
        path: pathDefault.managerOrder,
        element: <ManagerOrder />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return (
    <>
      <ScrollToTop />
      <NotificationProvider>{routes}</NotificationProvider>
    </>
  );
}

export default App;
