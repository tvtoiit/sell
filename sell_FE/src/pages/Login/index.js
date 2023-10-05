import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRoleContext from '../UserRole';
import * as Yup from 'yup';

const cx = classNames.bind(styles);

//Component InputField để tạo trường nhập liệu 
const InputField = ({ type, placeholder, value, onChange, error }) => {
    return (
        <>    
            <input type={type} className={cx('form-control')} placeholder={placeholder} value={value} onChange={onChange} />
            <div className={cx('content-error')}>{error && <div className={cx('error')}>{error}</div>}</div>    
        </>
    );
};

// Định nghĩa schema cho việc kiểm tra đầu vào
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
})

function Login() {
    document.title = "Đăng nhập";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [noSuccess, setNoSuccess] = useState(false);
    const { setCheckAdmin  } = useContext(UserRoleContext);
    let navigate = useNavigate();
    const handleSubmit = () => {
        LoginSchema.validate({email, password}, {abortEarly: false})
        .then(() => {
            setErrors({});   
            setNoSuccess(false);
            const data = {
                username: email,
                password: password
            }
            const API = 'http://34.124.192.61:8888/api/v1/auth/signin';
            
            // Gửi POST request đến API để xác thực đăng nhập
            fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setNoSuccess(true);
                }
            })
            .then(data => {
                const accessToken = data.accessToken;
                if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    const apiAdmin = `http://34.124.192.61:8888/api/v1/user_admin/${accessToken}`;
                    fetch(apiAdmin, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    .then( response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(data => {
                        if (data.role === 'ROLE_ADMIN') {
                            setCheckAdmin(true);
                        }
                    })
                    navigate('/');
                }else {
                    setNoSuccess(true);
                }
            }) 
            .catch((e) => {
                setNoSuccess(true);
            })     
        })
        .catch(validationErrors => {
            const errors = {};
            validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
        })
    };
    return (
        <form className={cx('form-login')}>
            <div className={cx('box-form')}>
                <InputField
                    type="email"
                    placeholder="Email đăng nhập*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />
            </div>

            <div className={cx('box-form')}>
                <InputField
                    type="password"
                    placeholder="Mật khẩu*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />
               
            </div>
             {noSuccess && <div className={cx('error')}>Sai tài khoản hoặc mật khẩu!</div>}   
            <div className={cx('box-right')}>
                <NavLink className={cx('forgot-password')}>Quên mật khẩu?</NavLink>
            </div>

            <div className={cx('box-form')}>
                <input type="button" onClick={handleSubmit} className={cx('submit-btn')} value={'Đăng nhập'} />
            </div>
        </form>
    );
}
export default Login;
