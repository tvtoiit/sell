import styles from './Authen.module.scss';
import classNames from 'classnames/bind';
import { right_arrows, log_logins, check_login } from '../../assets/images';
import { NavLink } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Authen() {
    const [activeTab, setActiveTab] = useState('login');

    const handleTab = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className={cx('wrapper col m-12 c-12')}>
            <div className={cx('inner')}>
                <div className={cx('breadcrumbs')}>
                    <span className={cx('login-texthome')}>Trang chủ</span>
                    <img src={right_arrows.right_arrow} alt="icon login" />
                    <span className={cx('text-login')}>Đăng nhập tài khoản</span>
                </div>

                <div className={cx('grid-members')}>
                    <div className={cx('grid-item')}>
                        <img className={cx('grid-item__img')} src={log_logins.logs} alt="hình ảnh nền login" />
                        <p className={cx('para-login')}>Quyền lợi thành viên</p>
                        <ul className={cx('box-login')}>
                            <li className={cx('box-item')}>
                                <img className={cx('box_img')} src={check_login.check} alt="check login" />
                                Mua hàng khắp thế giới cực dễ dàng, nhanh chóng
                            </li>

                            <li className={cx('box-item')}>
                                <img className={cx('box_img')} src={check_login.check} alt="check login" />
                                Theo dõi chi tiết đơn hàng, địa chỉ thanh toán dễ dàng
                            </li>
                            <li className={cx('box-item')}>
                                <img className={cx('box_img')} src={check_login.check} alt="check login" />
                                Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid-item2')}>
                        <div className={cx('top-title')}>
                            <ul className={cx('box-item__login')}>
                                <li className={cx('box-item__li')}>
                                    <NavLink
                                        className={cx('box-item__nav', { active: activeTab === 'login' })}
                                        onClick={() => handleTab('login')}
                                    >
                                        Đăng nhập
                                    </NavLink>
                                </li>
                                <li className={cx('box-item__li')}>
                                    <NavLink
                                        className={cx('box-item__nav', { active: activeTab === 'register' })}
                                        onClick={() => handleTab('register')}
                                    >
                                        Đăng kí
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        {activeTab === 'login' ? <Login /> : <Register onRegisterSuccess={() => handleTab('login')} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authen;
