import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import * as Yup from 'yup';
const cx = classNames.bind(styles);

const InputFiled = ({ placeholder, value, onChange, error }) => {
    return (
        <>
            <input className={cx('form-control')} placeholder={placeholder} value={value} onChange={onChange} />
            <div className={cx('content-error')}>{error && <div className={cx('error')}>{error}</div>}</div>  
        </>
    );
};

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập họ và tên'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Số điện thoại không đúng định dạng')
        .required('Bạn chưa nhập số điện thoại'),
    email: Yup.string().email('Email không đúng định dạng').required('Bạn chưa nhập email'),
    password: Yup.string().required('Bạn chưa nhập password'),
})

function Register({ onRegisterSuccess }) {
    document.title = "Đăng kí";
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const hanldCreateSubmit = () => {
        RegisterSchema.validate({ name, phone,email, password }, {abortEarly:false})
        .then(() => {
            const data = {
                username:email,
                password:password,
                user: {
                    fullName: name,
                    phoneNumber: phone,
                    email: email
                }
            }
    
            const api = "http://34.124.192.61:8888/api/v1/auth/signupuser";
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    onRegisterSuccess();
                }else if (response.status === 409) {
                    setErrors({email: 'Tài khoản này đã được đăng kí'})
                }
                else {
                    throw new Error('Login feiled');
                }
            })
            .catch((e) => {
                console.log(e);
            })    
        })
        .catch(validationErrors => {
            const errors = {}
            validationErrors.inner.forEach(error => {
                /**
                 * error.path là thuộc tính của error chứa tên trường dữ liệu mà lỗi xảy ra.
                 * error.message thông báo lỗi
                 */
                errors[error.path] = error.message;
            })
            setErrors(errors);
        })
        
    }

    return (
        <form className={cx('form-register')}>
            <div className={cx('box-form')}>
                <InputFiled 
                placeholder="Họ và tên*" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                error={errors.name}
                />
            </div>

            <div className={cx('box-form')}>
                <InputFiled placeholder="Số điện thoại*" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
            </div>

            <div className={cx('box-form')}>
                <InputFiled
                    placeholder="Nhập địa chỉ email*"
                    value={email}
                    error={errors.email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={cx('box-form')}>
                <InputFiled 
                    error={errors.password} 
                    placeholder="Mật khẩu*" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>

            <div className={cx('box-form')}>
                <input 
                    type="button" 
                    onClick={hanldCreateSubmit} 
                    className={cx('submit-btn')} 
                    value={'Tạo tài khoản'} 
                />
            </div>
        </form>
    );
}

export default Register;
