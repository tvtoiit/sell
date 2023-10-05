
import SideBar from './SideBar';
import styles from './DefaultLayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import HeaderAdmin from './HeaderAdmin';

const cx = classNames.bind(styles);
function DefaultLayoutAdmin({ children }) {
    return (
        <>
        <HeaderAdmin/>
        <div className={cx('wrapper-container')}>
            <div className={cx('wrapper')}>
                <SideBar/>
                <div className={cx('inner')}> {children} </div>
            </div>
        </div>
        
        </>
    );  
}

export default DefaultLayoutAdmin;