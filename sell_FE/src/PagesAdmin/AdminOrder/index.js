import styles from './AdminOrder.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function AdminOrder() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-order')}>
                <h3>Quản lí hóa đơn</h3>
                <div className={cx('content-status__order')}>
                    <select className={cx('select-status__order')}>
                        <option value="1">Tất Cả Hóa Đơn</option>
                        <option value="2">Hóa Đơn Đang Duyệt</option>
                        <option value="3">Hóa Đơn Thành Công</option>
                        <option value="4">Hóa Đơn Đã Hủy</option>
                    </select>
                    <button>Xem hóa đơn</button>
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Tuổi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Smith</td>
                            <td>35</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default AdminOrder;