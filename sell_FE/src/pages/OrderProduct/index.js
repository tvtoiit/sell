import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import * as Yup from 'yup';

const cx = classNames.bind(styles);


const OrderSchema = Yup.object().shape({
    phone: Yup.string().matches(/^[0-9]{10}$/, "Số điện thoại không đúng định dạng").required('Điện thoại không được để trống '),
    gender: Yup.string().required('Bạn chưa chọn giới tính'),
})

function OrderProduct({ totalPrice, selectedProducts }) {
    document.title = "Giỏ hàng";
    const [errors, setErrors] = useState({});
    const [errorMessageTotal, setErrorMessageToTal] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [gender, setGender] = useState();
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [optionedProvince, setOptionProvince] = useState();
    const [optionDistrict, setOptionDistrict] = useState();
    const [optionWard, setOptionWard] = useState(district[0] ? district[0].districtId : '');
    
    const handleSelectChange = (event) => {
        const selectOption = event.target.value;
        setOptionProvince(selectOption);
    }

    const handleSelectWard = (event) => {
        setOptionWard(event.target.value);
    }

    //kiểm tra nếu district none
    if (optionedProvince === '1234f') {
        setOptionProvince(-1);
        setOptionWard(-1);
    }

    useEffect(() => {
        if (district.length > 0 &&!district.some(item => item.districtId === optionWard)) {
          setOptionWard(district[0].districtId);
        }
      }, [district]);

    useEffect(() => {
        const apiWard = `http://34.124.192.61:8888/api/v1/wrad/${optionWard}`;
        fetch(apiWard)
            .then((response) => response.json())
            .then(data => setWard(data))
            .catch(error => console.log(error))
    }, [optionWard])

    useEffect(() => {
        const api = `http://34.124.192.61:8888/api/v1/province`;
        fetch(api)
        .then(response => response.json())
        .then(data => setProvince(data))
        .catch(error => console.error('catch fetch', error));
    }, []);

    useEffect(() => {
        const api = `http://34.124.192.61:8888/api/v1/district/${optionedProvince}`;
        fetch(api)
            .then(response => response.json())
            .then(data => setDistrict(data))
            .catch(error => console.error('catch fetch', error))
    }, [optionedProvince])

    const productsForRequest = selectedProducts.map(product => ({
        productId: product.productId,
        number: product.number,
    }));

    let navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    const handlePlaceOrder = async () => {
        try {
          if (accessToken == null) {
            navigate('/authen');
            return;
          }

          if (parseFloat(totalPrice) === 0) {
            setErrorMessageToTal('Bạn chưa chọn sản phẩm');
            return;
          }else if (parseFloat(totalPrice) > 0){
            setErrorMessageToTal('');
          }
      
          await OrderSchema.validate(
            { gender, phone, province, district, ward },
            { abortEarly: false }
          );
      
          setErrors({}); // Đặt lỗi về rỗng (nếu dữ liệu hợp lệ)
      
          const apiCreateOrder = "http://34.124.192.61:8888/api/v1/order-user/create";
          const requestBody = {
            phoneNumber: phone,
            address: `${optionedProvince}-${optionWard}-${optionDistrict}`,
            provinceId: optionedProvince,
            gender: gender,
            product: productsForRequest,
          };
      
          const response = await fetch(apiCreateOrder, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
      
          if (response.status === 201) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              if (data) {
                navigate('/successOrder');
              }
            } else {
              const data = await response.text();
              if (data) {
                const cart = JSON.parse(localStorage.getItem('cart'));
                const productsToDelete = selectedProducts;
                const updatedCart = cart.filter((product) => !productsToDelete.some(item => item.productId === product.productId));

                // Cập nhật mảng "Cart" trong localStorage
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                navigate('/successOrder');
              }
            }
          }
        } catch (error) {
          const validationErrors = {};
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });
          setErrors(validationErrors);
          console.error("There was a problem with the fetch operation:", error);
        }
      };

      const Gender = [
        {
            id: 1,
            name: "Nam"
        },
        {
            id: 2,
            name: "Nữ"
        }
      ]

    return (
        <div className={cx('l-12 m-12 c-12')}>
            <form className={cx('formPayment')}>
                <h3 className={cx('h3_title')}>Thông tin mua hàng</h3>
                {errors.gender && <div className={cx('error-message')}>{errors.gender}</div>}  
                <div className={cx('content-form__cart')}>
                    {Gender.map(gtGender => (
                        <div key={gtGender.id}>
                            <input 
                                type="radio"
                                checked = {gender === gtGender.id}
                                onChange={() => setGender(gtGender.id)}
                            />
                            <span className={cx('gender-span')}>{gtGender.name}</span>
                        </div>
                    ))}
                    
                      
                    {/* <label className={cx('gender1')} htmlFor="gender1">
                        <input type="radio" onChange={(event) => setGender(event.target.value)} checked  id="gender1" name="gender" value="1"/>
                        <span className={cx('gender-span')}>Anh</span>
                    </label>
                    <label className={cx('gender1')} htmlFor="gender0">
                        <input type="radio"  onChange={(event) => setGender(event.target.value)} id="gender0" name="gende" value="0" />
                        <span className={cx('gender-span')}>Chị</span>
                    </label> */}
                </div>
                
                <div className={cx('l-12')}>
                    <div className={cx('content-input__info')}>
                        <div className={cx('l-6 m-6 c-12')}>
                            <div className={cx('padding-input_info')}>
                                <input type="text" className={cx('input-form__cart')} placeholder="Họ tên" />
                            </div>
                            {errors.fullname && <div className={cx('error-message')}>{errors.fullname}</div>}
                        </div>
                        <div className={cx('l-6 m-6 c-12')}>
                            <div className={cx('padding-input_info')}>
                                <input type="text" value={phone} onChange={(event) => setPhoneNumber(event.target.value)} className={cx('input-form__cart')} placeholder="Số điện thoại" />
                            </div>
                            {errors.phone && <div className={cx('error-message')}>{errors.phone}</div>}
                        </div>
                    </div>
                </div>
                <h3 className={cx('h3_title')}>Cách thức chọn mua hàng</h3>
                <div className={cx('typeReceive')}>
                    <label className={cx('gender1')} htmlFor="typeReceive0" title="Giao hàng tận nơi">
                        <input type="radio" name="receive" id="typeReceive0" />
                        <span className={cx('gender-span')}>Giao tận nơi</span>
                    </label>
                    <label className={cx('gender1')} htmlFor="typeReceive1" title="Giao hàng tận nơi">
                        <input type="radio" name="receive" id="typeReceive1" />
                        <span className={cx('gender-span')}>Nhận tại cữa hàng</span>
                    </label>
                </div>
                <div className={cx('tabReceive')}>
                    <div className={cx('mainTab')}>
                        <p className={cx('tab-title')}>Chọn địa chỉ để biết thời gian và phí vận chuyển (nếu có)</p>
                        <div className={cx('row_1')}>
                            <div className={cx('col-md-12')}>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <select className={cx('pd1-select')} onChange={handleSelectChange} value={optionedProvince}>
                                           <option key={"1234f"} value={"1234f"}>Tỉnh/ Thành phố</option>
                                           {province.map((item) => (
                                                <option style={{padding: '5px', height: '100px'}} className={cx('pd1-select__option')} key={item.provinceCityId} value={item.provinceCityId}>
                                                    {item.name}
                                                </option>
                                            ))} 
                                        </select>
                                       
                                    </div>
                                </div>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <select className={cx('pd1-select')} onChange={handleSelectWard} value={optionWard}>
                                            <option key={"1234f"} value={"1234f"}>Quận/ Huyện</option>
                                            {district.map(item => (
                                                <option key={item.districtId} value={item.districtId}>{item.name}</option>
                                            ))}
                                        </select>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-md-12')}>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <select onChange={(e) => setOptionDistrict(e.target.value)} value={optionDistrict} className={cx('pd1-select')}>
                                            <option key={"1234f"} value={"1234f"}>Phường/ Xã</option>
                                            {ward.map(item => (
                                                <option key={item.districtId} value={item.districtId}>{item.name}</option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                </div>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <input className={cx('pd1-select')} placeholder='Số nhà tên đường'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('total_end')}>
                    <span>Tổng tiền:</span>
                    <span style={{ color: '#FF6700' }}>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
                {errorMessageTotal && <div className={cx('error-message')}>{errorMessageTotal}</div>}
                <div className={cx('btn-area')}>
                    <div onClick={handlePlaceOrder} className={cx('payment-btn')}>Đặt hàng</div>
                </div>
            </form>
        </div>
    );
}
export default OrderProduct;
