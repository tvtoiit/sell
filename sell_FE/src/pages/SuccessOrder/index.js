
import React from 'react';
import classNames from 'classnames/bind';
import ressut from '../../assets/successorder.png';
import styles from './SuccessOrder.module.scss';
import { NavLink } from 'react-router-dom';


const cx = classNames.bind(styles);
function SuccessOrder() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('l-12 m-12 c-12')}>
                <div className={cx('container-order')}>
                    <img className={cx('container-img')} src={ressut} alt='hinh anh dat hang thanh cong'/>
                    <div className={cx('success-text')}>Đặt hàng thành công</div>
                </div>
                <div className={cx('button')}>
                    <NavLink className={cx('nav-button')} to={'/'}>Quay về trang chủ</NavLink>
                </div>
            </div>
            
        </div>
    )
}

export default SuccessOrder;