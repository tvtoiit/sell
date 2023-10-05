import images from '../../../../assets/images';
import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function HeaderAdmin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavLink to={'/adminproduct'}><img className={cx('inner-logo')} src={images.logo}/></NavLink>
            </div>
        </div>
    );
}

export default HeaderAdmin;