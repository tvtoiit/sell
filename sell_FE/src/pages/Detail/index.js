import { NavLink, useParams } from 'react-router-dom';
import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import { useEffect,useState } from 'react';
import {parameters, hotIcons, checkDetails } from '../../assets/images';
const cx = classNames.bind(styles);

function Detail() {
    document.title='Chi tiết sản phẩm';
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    let { productId } = useParams();
    
    const handleAddCart = () => {
        //Kiểm tra nếu trùng id trong cart thì tăng số lượng thôi
            const resultIdCart = cart.filter(item => {
                return item.productId === data.productId
            })

            const resultCart = resultIdCart.map(item => {
                return item.number;
            })
            
            
            if (resultCart > data.number) {
                console.log('số lượng đã vượt quá cho phép');
            }else {
            const productIndex = cart.findIndex(item => item.productId === data.productId);
        
            if (productIndex !== -1) {
                const updateCart = [...cart];
                updateCart[productIndex].number += 1;
                setCart(updateCart);
            }else {
                //ngoài ra thì thêm data
                const productInfo = {
                    productId: data.productId,
                    title: data.title,
                    image: data.thumbnail,
                    price: data.price,
                    priceOld: data.priceDiscount,
                    number: 1,
                }
                setCart(prevCart => [...prevCart, productInfo])
            } 
        } 
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        const api = `http://34.124.192.61:8888/api/v1/product-home/details/${productId}`;
        fetch(api)
        .then(response => {
            if (!response) {
                throw new Error('Lỗi');
            }
            return response.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.error('catch fetch', error);
        })
    }, []);
    
    return (
        <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('detail-header')}>
                       {data.title}
                    </div>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('detail-container')}>
                        <aside className={cx('picture col l-4 ')}>
                            <div className={cx('slide-image')}>
                                <img src={data.thumbnail} className={cx('lSSlideOuter')} alt='ảnh chi tiết điện thoại'/>
                            </div>
                            <div className={cx('list-picture')}>
                                <ul className={cx('list-picture__ul')}>
                                    <li className={cx('list-picture__li')}>
                                        <img className={cx('list-picture__img')} src={hotIcons.icon} alt='icon list product'/>
                                    </li>
                                    <li className={cx('list-picture__li')}>
                                        <img className={cx('list-picture__img')} src={hotIcons.icon} alt='icon list product'/>
                                    </li>
                                    <li className={cx('list-picture__li')}>
                                        <img className={cx('list-picture__img')} src={hotIcons.icon} alt='icon list product'/>
                                    </li>
                                </ul>
                            </div>
                        </aside>
    
                        <aside className={cx('_extra col l-5')}>
                            <div className={cx('details_top1')}>
                                <div className={cx('details_top')}>
                                    <div className={cx('box_top_mb')}>
                                        <div className={cx('list_ct')}>
                                            <label className={cx('price-text')} htmlFor='city'>Giá tại: </label>
                                            <select id={cx('city') }defaultValue={1}>
                                                <option  value={1}>
                                                    Hà nội
                                                </option>
                                                <option>
                                                    Quảng bình
                                                </option>
                                                <option>
                                                    Bình định
                                                </option>
                                                <option>
                                                    Việt nam
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <p className={cx('top_prd')}>
                                        <span className={cx('_price')}>{data.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        <span className={cx('price_old')}>{data.priceDiscount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </span>
                                    </p>
                                    <div className={cx('accessories')}>
                                        <div className={cx('title_km')}>
                                            Khuyến mãi
                                        </div>
                                        <ul className={cx('accessories-list')}>
                                            <li className={cx('accessories-list__li')}>
                                                <img className={cx('accessories-img')} src={checkDetails.check} alt='check detail'/>
                                                <span className={cx('accessories--text')}>Tặng kèm Ốp lưng chính hãng theo máy</span>
                                            </li>
                                            <li className={cx('accessories-list__li')}>
                                                <img className={cx('accessories-img')} src={checkDetails.check} alt='check detail'/>
                                                <span className={cx('accessories--text')}>Tặng kèm Củ sạc nhanh 67W theo máy</span>
                                            </li>
                                            <li className={cx('accessories-list__li')}>
                                                <img className={cx('accessories-img')} src={checkDetails.check} alt='check detail'/>
                                                <span className={cx('accessories--text')}>Miễn phí dán cường lực 4 lần và 1 đổi 1 lỗi trong 12 tháng khi nâng cấp dGold. </span>
                                            </li>
                                            <li className={cx('accessories-list__li')}>
                                                <img className={cx('accessories-img')} src={checkDetails.check} alt='check detail'/>
                                                <span className={cx('accessories--text')}>Tặng kèm Ốp lưng chính hãng theo máy</span>
                                            </li>
    
                                        </ul>
                                    </div>
                                    <div className={cx('button-cart')}>
                                        <NavLink onClick={handleAddCart} className={cx('button-link')}>
                                            Mua ngay
                                            <div className={cx('button-cart__text')}>
                                                Giao tận nơi hoặc nhận tại cửa hàng
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className={cx('col l-3')}>
                            <div className={cx('_characteristic')}>
                                <div className={cx('title_box')}>
                                    <img className={cx('_characteristic_img')} src={parameters.parameter} alt='Thông số kĩ thuật'/>
                                    <span className={cx('_characteristic_text')}>Thông số kĩ thuật</span>
                                </div>
                                <table className={cx('charactestic_table')}>
                                    <tbody>
                                        <tr className={cx('tr-1')}>
                                            <td className={cx('title_charactestic')}>
                                               Màn hình
                                            </td>
                                            <td className={cx('content_charactestic')}>
                                                {data.config &&data.config.screen}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={cx('title_charactestic')}>
                                               Hệ điều hành
                                            </td>
                                            <td className={cx('content_charactestic')}>
                                                {data.config &&data.config.operatingSys}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={cx('title_charactestic')}>
                                                Camera sau
                                            </td>
                                            <td className={cx('content_charactestic')}>
                                                {data.config && data.config.frontCamera}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={cx('title_charactestic')}>
                                                Chip
                                            </td>
                                            <td className={cx('content_charactestic')}>
                                                {data.config && data.config.frontCamera}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <NavLink id={cx('load_more_charactestic')}>
                                    <span className={cx('load_more_charactestic__span')}>
                                        Xem cấu hình chi tiết
                                    </span>
    
                                </NavLink>
                            </div>
                        </aside>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}

export default Detail;