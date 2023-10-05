
import Addproduct  from '../PagesAdmin/Addproduct';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Detail from '../pages/Detail';
import Authen from '../pages/Authen';
import AdminOrder from '../PagesAdmin/AdminOrder';
import AdminProduct from '../PagesAdmin/AdminProduct';
import AdminUser from '../PagesAdmin/AdminUser';
import UpdateUser from '../PagesAdmin/UpdateUser';
import SuccessOrder from '../pages/SuccessOrder';
//public router

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/authen', component: Authen },
    { path: '/detail/:productId', component: Detail },
    { path: '/cart', component: Cart },
    { path: '/successOrder', component: SuccessOrder },
];

const privateRoutes = [
    { path: '/adminproduct', component: AdminProduct },
    { path: '/adminorder', component: AdminOrder },
    { path: '/adminuser', component: AdminUser },
    { path: '/addproduct', component: Addproduct },
    { path: '/updateuser', component: UpdateUser },
];

export { publicRoutes, privateRoutes };
