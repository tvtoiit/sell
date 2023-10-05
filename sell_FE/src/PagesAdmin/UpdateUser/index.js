import {useLocation} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect,useState, useReducer } from 'react';
import styles from './Update.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


const initialState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  address: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  accountId: '',
  role: '',
}

//action
const SET_FULLNAME = 'SET_FULLNAME';
const SET_PHONENUMBER = 'SET_PHONENUMBER';
const SET_EMAIL = 'SET_EMAIL';
const SET_ADDRESS = 'SET_ADDRESS';
const SET_STATUS = 'SET_STATUS';
const SET_CREATEAT = 'SET_CREATEAT';
const SET_UPDATEAT = 'SET_UPDATEAT';
const SET_ACCOUNTID = 'SET_ACCOUNTID';
const SET_ROLE = 'SET_ROLE';

const setFullname = payload => {
  return {
    type: SET_FULLNAME,
    payload
  }
}

const setPhoneNumber = payload => {
  return {
    type: SET_PHONENUMBER,
    payload
  }
}

const setEmail = payload => {
    return {
      type: SET_EMAIL,
      payload
    }
}

const setAddress = payload => {
    return {
      type: SET_ADDRESS,
      payload
    }
}

const setStatus = payload => {
    return {
      type: SET_STATUS,
      payload
    }
}

const setCreateAt = payload => {
    return {
      type: SET_CREATEAT,
      payload
    }
}

const setUpdateAt = payload => {
    return {
      type: SET_UPDATEAT,
      payload
    }
}

const setAccount = payload => {
    return {
      type: SET_ACCOUNTID,
      payload
    }
}

const setRole = payload => {
  return {
    type: SET_ROLE,
    payload
  }
} 

//reducer
const reducer = (state, action) => {
  switch(action.type) {
    case SET_FULLNAME: 
      return {...state,fullName: action.payload}
    case SET_PHONENUMBER:
      return {...state,phoneNumber: action.payload}
    case SET_EMAIL:
      return {...state,email: action.payload}
    case SET_ADDRESS:
      return {...state,address: action.payload}
    case SET_STATUS:
      return {...state,status: action.payload}
    case SET_CREATEAT:
      return {...state,createdAt: action.payload}
    case SET_UPDATEAT:
      return {...state,updatedAt: action.payload}
    case SET_ROLE:
      return {...state,role: action.payload}
    default: 
      throw new Error('Invalid action.');
  }
}
//dispatch
const TextInput = ({children}) => {
  return <h3 className={cx('container_text')}>{children}</h3>
}

function AddUser() {
  const accessToken = localStorage.getItem('token');
  const location  = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idUser = searchParams.get('idUser');

  const [state, dispatch] = useReducer(reducer, initialState);
  //console.log(state);
  const {fullName, phoneNumber,email,address,status,createdAt,updatedAt,accountId,role} = state;
  console.log(fullName, phoneNumber,email,address,status,createdAt,updatedAt,accountId,role);
  const [dataGetRoleAll, setDataGetRole] = useState([]);
  useEffect(() => {
    fetch('http://34.124.192.61:8888/api/v1/role', {
      method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(dataGetRole => {
      setDataGetRole(dataGetRole);
    })
    
  }, []);

  useEffect(() => {
    if (idUser) {
      const apiGet = `http://34.124.192.61:8888/api/v1/user_admin/${accessToken}`;
      fetch(apiGet, {
        method: 'GET',
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json'
          },
        })
        .then(response => {
          return response.json();
        })
        .then(dataUser => {
          dispatch(setFullname(dataUser.fullName));
          dispatch(setPhoneNumber(dataUser.phoneNumber));
          dispatch(setEmail(dataUser.email));
          dispatch(setAddress(dataUser.address));
          dispatch(setStatus(dataUser.status));
          const createdAtDate = new Date(dataUser.createdAt);
          dispatch(setCreateAt(createdAtDate));
          const updateAtDate = new Date(dataUser.updatedAt);
          dispatch(setUpdateAt(updateAtDate));
          dispatch(setRole(dataUser.role));
        })
        .catch(err => {
          console.log(`Lỗi get api by id người dùng ${err}`);
        })
    }
  }, [idUser])
  const handleUpdateUser = () => {
      const apiUpdateUser = `http://34.124.192.61:8888/api/v1/user_admin/${idUser}`;
      const dataIdUser = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        roleName: role,
      }
      console.log(dataIdUser);
      fetch(apiUpdateUser, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataIdUser)
      })
      .then(response => {
        if (response.ok) {
          // navigater('/adminuser');
          return response.json();
        }
      })
      .then(dataUser => {
        console.log(dataUser);
      })
      .catch(err => {
        console.log('Lỗi api error: updateUser', err);
      })
    
  }
    return (
    <div className={cx('product-form')}>
      <div className={cx('inner-form')}>
        <div className={cx('inner-form-header')}>
          <h1 className={cx('product-form_text')}>Cập Nhật Người Dùng</h1>
          <input type="button" onClick={handleUpdateUser} className={cx('inner-form-header_btn')} value={'Cập nhật'}/>
        </div>
        <div className={cx('editor-container')}>
          <div className={cx('container-name')}>
            <TextInput>Họ tên: </TextInput>
            <input
              value={fullName}
              onChange={e => dispatch(setFullname(e.target.value))}
              type="text"
              className={cx('form-control')}
              placeholder="Họ tên: " 
            />
          </div>

          <div className={cx('container-name')}>
            <TextInput>Số điện thoại: </TextInput>
            <input
              value = {phoneNumber}
              onChange={e => dispatch(setPhoneNumber(e.target.value))}
              type="number"
              className={cx('form-control')}
              placeholder="Số điện thoại: " 
            />
          </div>

          <div className={cx('container-name')}>
            <TextInput>Email: </TextInput>
            <input
              value={email}
              onChange={e => dispatch(setEmail(e.target.value))}
              type="email"
              className={cx('form-control')}
              placeholder="Email: " 
            />
          </div>

          <div className={cx('container-name')}>
            <TextInput>Địa chỉ: </TextInput>
            <input
              value={address}
              onChange={e => dispatch(setAddress(e.target.value))}
              type="text"
              className={cx('form-control')}
              placeholder="Địa chỉ" 
            />
          </div>

          <div className={cx('container-name')}>
            <TextInput>Trạng thái: </TextInput>
            <input
              value={status}
              onChange={e => dispatch(setStatus(e.target.value))}
              type="text"
              className={cx('form-control')}
              placeholder="Trạng thái: " 
            />
          </div>

          <div className={cx('container-name')}>
            <TextInput>Ngày tạo: </TextInput>
            <DatePicker
              selected={createdAt}
              onChange={date => dispatch(setCreateAt(date))}
              className={cx('form-control')}
              placeholderText="Ngày tạo"
            />
          </div>

          <div className={cx('container-name')}>
            <TextInput>Ngày sửa: </TextInput>
            <DatePicker
              selected={updatedAt}
              onChange={date => dispatch(setUpdateAt(date))}
              className={cx('form-control')}
              placeholder="Ngày sửa" 
              type="text"
            />
          </div>
          
          <div className={cx('container-config')}>
          <TextInput>Id người dùng:</TextInput>
          <select 
            className={cx('container-productId_select')}
          >
            <option className={cx('container-productId_option')}>Chọn id người dùng:</option>
            
          </select>

          </div>

          <div className={cx('container-config')}>
          <TextInput>Vai trò:</TextInput>
          <select
            value={role}
            className={cx('container-productId_select')}
            onChange={e => dispatch(setRole(e.target.value))}
          > 
            <option className={cx('container-productId_option')}>Chọn vai trò:</option>
            {dataGetRoleAll ? dataGetRoleAll.map((item, index) => (
              <option key={index} value={item.roleName} className={cx('container-productId_option')}>{item.roleName}</option>
            )): (
              <option className={cx('container-productId_option')}>Không có data</option>
            )}
          </select>
          </div>
      </div>
      </div>
    </div>

    );
}
export default AddUser;