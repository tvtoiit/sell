import { useNavigate } from 'react-router-dom';
import  styles  from './AdminUser.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function AdminUser() {
    let navigater = useNavigate();
    const[data, setData] = useState([]);
    const accessToken = localStorage.getItem('token');

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        const getUserAdmin = `http://34.124.192.61:8888/api/v1/user_admin`;
        fetch(getUserAdmin, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })
        .then(response => {
            return response.json();
        })
        .then(dataUser => {
            setData(dataUser);
        })
        .catch(err => {
            console.log(err + 'error get api userAdmin');
        })
    }, []);

    const handleUpdateUser = (idUser) => {
        navigater(`/updateUser?idUser=${idUser}`);
    }

    const hanldeDeleteUser = (idUser) => {
        const apiDeleteUser = `http://34.124.192.61:8888/api/v1/user_admin/${idUser}`;
        fetch(apiDeleteUser, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.reload(true);
            }
        })

    }

    const renderActions = (idUser) => {
        return (
        <td className={cx('inner-btn')}>
            <input value='Sửa' onClick={() => handleUpdateUser(idUser)}  type='button' className={cx('btn-update')}/>
            <input value='Xóa' onClick={() => hanldeDeleteUser(idUser)} type='button' className={cx('btn-delete')}/>
        </td>);
    }


    return (
        <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <h3 className={cx('inner-h3')}>Quản Lí Người Dùng</h3>
            <hr/>
            <table className={cx('inner-table')}>
                <thead className={cx('inner-table_thead')}>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Điện thoại</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Vai trò</th>
                        <th style={{width :'50px'}}>Hành động</th>
                    </tr>
                </thead>
                
                <tbody>
                    {data && data.map((itemuser, index) => (
                        <tr key={`${index}`}
                        className={index % 2 === 0 ? cx('even-row') : cx('odd-row')}
                    >
                        <td>{index++}</td>
                        <td>{itemuser.fullName}</td>
                        <td>{itemuser.phoneNumber}</td>
                        <td>{itemuser.email}</td>
                        <td>{itemuser.status == true ? 'Hoạt động' : 'Đã xóa'}</td>
                        <td>
                            {itemuser.role}
                        </td>
                        {renderActions(itemuser.userId)} 
                    </tr>       
                    ))
                }
                 
                </tbody>
            </table>
        </div>
    </div>

    );
}

export default AdminUser;