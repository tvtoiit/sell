import useCustomApi from '../../CustomApi';
import React, { useReducer, useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import styles from './Addproduct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const initialState = {
  title: '',
  price: 0,
  discountCode: '',
  quantity: 0,
  releaseYear: 0,
  productType: '',
  config: '',
  selectedImage: false,
  editorHtml: '',
};
//action
const SET_TITLE = 'SET_TITLE';
const SET_PRICE = 'SET_PRICE';
const SET_DISCOUNT = 'SET_DISCOUNT';
const SET_NUMBER = 'SET_NUMBER';
const SET_RELEASETIME = 'SET_RELEASETIME';
const SET_PRODUCTTYPEID = 'SET_PRODUCTTYPEID';
const SET_CONFIGID = 'SET_CONFIGID';
const SET_IMAGE = 'SET_IMAGE';
const SET_EDITORHTML = 'SET_EDITORHTML';

const setTitle = (payload) => {
    return {
      type: SET_TITLE,
      payload
    }
}

const setPrice = (payload) => {
  return {
    type: SET_PRICE,
    payload
  }
}

const setDiscount = (payload) => {
  return {
    type: SET_DISCOUNT,
    payload
  }
}

const setQuantity = (payload) => {
  return {
    type: SET_NUMBER,
    payload
  }
}

const setReleaseYear = (payload) => {
  return {
    type: SET_RELEASETIME,
    payload
  }
}


const setProductType = (payload) => {
  return {
    type: SET_PRODUCTTYPEID,
    payload
  }
}

const setConfigId = (payload) => {
  return {
    type: SET_CONFIGID,
    payload
  }
}

const setImage = (payload) => {
  return {
    type: SET_IMAGE,
    payload
  }
}

const setEditorhtml = (payload) => {
  return {
    type: SET_EDITORHTML,
    payload
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case SET_TITLE:
      return {...state,title: action.payload};
    case SET_PRICE:
      return {...state,price: action.payload};
    case SET_DISCOUNT:
      return {...state,discountCode: action.payload};
    case SET_NUMBER:
      return {...state,quantity: action.payload};
    case SET_RELEASETIME:
      return {...state,releaseYear: action.payload};
    case SET_PRODUCTTYPEID:
      return {...state,productType: action.payload};
    case SET_CONFIGID:
      return {...state,config: action.payload};
    case SET_IMAGE:
      return {...state,selectedImage: action.payload};
    case SET_EDITORHTML:
      return {...state,editorHtml: action.payload};
    default: 
      throw new Error('Invalid action.');
  }
}
function Addproduct() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [apiGetId, setApiGetId] = useState([]);

  const {data} = useCustomApi('http://34.124.192.61:8888/api/v1/producttypes');

  const {title, price,discountCode,quantity, releaseYear,productType,config,selectedImage,editorHtml} = state;
 
  
  const location  = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  const navigater = useNavigate();
  useEffect(() => {
  if (productId) {
    fetch(`http://34.124.192.61:8888/api/v1/product-home/details/${productId}`)
    .then(response => {
      return response.json();
    })
    .then(dataProductId => {
      setApiGetId(dataProductId);
      console.log(dataProductId);
      dispatch(setTitle(dataProductId.title))
      dispatch(setPrice(dataProductId.price))
      dispatch(setDiscount(dataProductId.discount))
      dispatch(setQuantity(dataProductId.number))
      dispatch(setProductType(dataProductId.productTypeId))
      dispatch(setConfigId(dataProductId.config.configId))
      dispatch(setReleaseYear(dataProductId.releaseTime))
    }) 
    
    .catch(err => {
      console.log(err + 'api get id update');
    })
  }
}, [productId])

  const handleBtnAdd = () => {
    const formData = new FormData();
    formData.append('file', selectedImage); // Assuming selectedImage is a File object
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discount', discountCode);
    formData.append('number', quantity);
    formData.append('releaseTime', releaseYear);
    formData.append('productTypeId', productType);
    formData.append('configId', config);
    formData.append('description', editorHtml);
    
    const apiAddProduct = 'http://34.124.192.61:8888/api/v1/product_admin/create';
    const accessToken = localStorage.getItem('token');
    fetch(apiAddProduct, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        },
        body: formData
    })
    .then((response) => {
        if (response.ok) {
          navigater('/adminproduct');
          return response.json();
        } else {
            throw new Error('Thêm dữ liệu không thành công: ');
        }
    })
    .catch(err => {
        console.log(err);
    });
  }
// console.log(editorHtml);
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('file', selectedImage); // Assuming selectedImage is a File object
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discount', discountCode);
    formData.append('number', quantity);
    formData.append('releaseTime', releaseYear);
    formData.append('productTypeId', productType);
    formData.append('configId', config);
    formData.append('description', editorHtml);
    
    const apiUpdateProduct = `http://34.124.192.61:8888/api/v1/product_admin/update/${productId}`;
    const accessToken = localStorage.getItem('token');
    fetch(apiUpdateProduct, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        },
        body: formData
    })
    .then((response) => {
        console.log(response);
        if (response.ok) {
          navigater('/adminproduct');
          return response.json();
        } else {
            throw new Error('Thêm dữ liệu không thành công: ');
        }
    })
    .catch(err => {
        console.log(err);
    });
  }


  const TextInput = ({children}) => {
    return <h3 className={cx('container_text')}>{children}</h3>
  }
  
  return (
    <div className={cx('product-form')}>
      <div className={cx('inner-form')}>
        <div className={cx('inner-form-header')}>
          <h1 className={cx('product-form_text')}>Thêm Sản Phẩm</h1>
          <input onClick={productId ? handleUpdate : handleBtnAdd} type="button" className={cx('inner-form-header_btn')} value={productId ? 'Cập nhật' :'Thêm'}/>
        </div>
        <div className={cx('editor-container')}>
          <div className={cx('container-name')}>
            <TextInput>Nhập tên: </TextInput>
            <input
               value={title}
              type="text"
              className={cx('form-control')}
              placeholder="Tên sản phẩm" 
              onChange={e =>  dispatch(setTitle(e.target.value))}
            />
          </div>
          <div className={cx('container-price')}>
          <TextInput>Giá: </TextInput>
            <input 
              value={price}
              className={cx('form-control')} 
              type="number" 
              placeholder="Giá sản phẩm"
              onChange={e => dispatch(setPrice(e.target.value))}
            />
          </div>
          <div className={cx('container-discount')}>
            <TextInput>Mã giảm giá:</TextInput>
            <input 
              value={discountCode}
              className={cx('form-control')}
              type="number" 
              placeholder='Mã giảm giá' 
              onChange={e => dispatch(setDiscount(e.target.value))}
            />
          </div>
          <div className={cx('cotainer-number')}>
            <TextInput>Số lượng:</TextInput>
            <input 
              value={quantity}
              className={cx('form-control')}
              type="number" 
              placeholder='Số lượng'
              onChange={e => dispatch(setQuantity(e.target.value))}
             />
          </div>

          <div className={cx('container-releaseTime')}>
            <TextInput>Năm sản xuất:</TextInput>
            <input 
              value={releaseYear}
              className={cx('form-control')}
              type='number' 
              placeholder='Năm sản xuất'
              onChange={e => dispatch(setReleaseYear(e.target.value))} 
            />
          </div>
         <div className={cx('container-productId')}>
          <TextInput>Loại sản phẩm:</TextInput>
            <select 
                  value={productType}
                  onChange={e => dispatch(setProductType(e.target.value))}
                  className={cx('container-productId_select')}
            >
              <option className={cx('container-productId_option')}>Chọn loại sản phẩm</option>
              {data.productType ? (
                data.productType.map((productId,index) => (
                  <option className={cx('container-productId_option')} key={index} value={productId.productTypeId}>
                    {productId.typeName}
                  </option>
                ))
              ) : (
                <option className={cx('container-productId_option')}>Không có dữ liệu</option>
              )}
            </select>
          </div>
          <div className={cx('container-config')}>
          <TextInput>Cấu hình:</TextInput>
          <select 
            value={productId && apiGetId.config?.configId ? apiGetId.config?.configId : config}
            onChange={e => dispatch(setConfigId(e.target.value))}
            className={cx('container-productId_select')}
          >
            <option className={cx('container-productId_option')}>Chọn cấu hình:</option>
            {data.config ? data.config.map((item, index) => (
              <option key={index} value={item.configId}>{item.configName}</option>
              )): (
                <option className={cx('container-productId_option')}>Không có dữ liệu</option>
              )
            }
          </select>
        </div>


          <div className={cx('container-image')}>
          <TextInput>Chọn ảnh:</TextInput>
          <input 
            className={cx('container-image__input')} 
            type="file" 
            accept="image/*" 
            onChange={e => {
              dispatch(setImage(e.target.files[0]));
              
            }}
          />
          {selectedImage ? (
            <div className={cx('selected-image')}>
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
            </div>
          ) : (
            apiGetId.thumbnail && (
              <div>
                <img src={apiGetId.thumbnail} className={cx('selected-image_apiGetId')} alt="API Thumbnail" />
              </div>
            )
          )}
        </div>
        <div className={cx('editor-container')}>
        <TextInput>Chi tiết sản phẩm:</TextInput>
          <ReactQuill
            className={cx('editor-container_ReactQuill')}
            value={editorHtml}
            onChange={(value) => dispatch(setEditorhtml(value))}
            modules={{
              toolbar: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
              ],
            }}
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Addproduct;
