import {NavLink, useLocation } from 'react-router-dom';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function SideBar() {
    const location = useLocation();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('box-list')}>
                    <li className={cx('box-item')}>
                        <NavLink to='/adminproduct' className={cx('box-item_span',{active: location.pathname === '/adminproduct'})}>Quản lí sản phẩm</NavLink>
                    </li>
                    <hr/>
                    <li className={cx('box-item')}>
                        <NavLink to='/adminuser' className={cx('box-item_span',{active: location.pathname === '/adminuser'})}>Quản lí người dùng</NavLink>
                    </li>
                    <hr/>
                    <li className={cx('box-item')}>
                        <NavLink to='/adminorder' className={cx('box-item_span',{active: location.pathname === '/adminorder'})}>Quản lí hóa đơn</NavLink>
                    </li>
                    <hr/>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;