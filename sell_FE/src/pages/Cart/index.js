import OrderProduct from '../OrderProduct';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { NavLink,Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState  } from 'react';
import { uses, delete_cart, checkDetails, cartEmpty } from '../../assets/images';

const cx = classNames.bind(styles);
function Cart() {
    const [numberProduct, setNumberProduct] = useState(0);
    const [cart, setCart] = useState((JSON.parse(localStorage.getItem('cart'))) || []);
    const [selectedProductId, setSelectedProductId] = useState([]);

    const hanldDeleteCart = (id) => {
        const updateCart = cart.filter(item => item.productId !== id);
        setCart(updateCart);
        localStorage.setItem('cart', JSON.stringify(updateCart));
    }

    const handleIncreaseQuantity = (productId) => {
        const updatedCart = cart.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.number + 1;
                return { ...item, number: newQuantity };
            }
            return item;
        });
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cart.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.number - 1;
                if (newQuantity >= 1) {
                    return { ...item, number: newQuantity };
                }
            }
            return item;
        });
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const selectedProducts = cart.filter(product => selectedProductId.includes(product.productId));

    const totalPrice = selectedProducts.reduce((total, product) => {
        return total + (product.price * product.number);
    }, 0);

    const totalNumber = selectedProducts.reduce((total, product) => {
        return total + product.number;
    }, 0)

    const handleCheckboxChange = (e, productId) => {
        if (e.target.checked) {
            setSelectedProductId([...selectedProductId, productId]);
        } else {
            setSelectedProductId(selectedProductId.filter(id => id !== productId));
        }
    }
    
    return (
        <div className={cx('wrapper')}>
            {cart.length != 0 ?
                (
                <div className={cx('l-12 m-12 c-12')}>
                <div className={cx('container-cart')}>
                    <div className={cx('nav-cart')}>
                        <NavLink to='/' className={cx('buy-more')}>
                            <FontAwesomeIcon className={cx('buy-more__icon')} icon = {faAngleLeft}/>
                            <span className={cx('buy-more_text')}>Mua thêm sản phẩm khác</span>
                        </NavLink>
                        <NavLink to='/authen' className={cx('user')}>
                            <img src={uses.use} className={cx('user-img')} alt='User'/>
                            <span className={cx('User-login')} >Đăng nhập</span>
                        </NavLink>
                    </div>
                    <div className={cx('container-inner')}>
                        <div className={cx('list-products')}>
                            {cart.map((item, index) => (
                            <div key={index} className={cx('product-cart1')}>
                                <div className={cx('product-cart')}>
                                    <div className={cx('product-image')}>
                                        <div className={cx('box-content__cart')}>
                                            <input type="checkbox"
                                                value={item.productId}
                                                onChange={(e) => handleCheckboxChange(e, item.productId)}
                                                />
                                            <NavLink className={cx('product-image__link')}>
                                                <img className={cx('product-image__img')} src={item.image} alt="Ảnh điện thoại"/>
                                            </NavLink>
                                        </div>
                                        <NavLink onClick={() => hanldDeleteCart(item.productId)} className={cx('cart-btn_delete')}>
                                            <img src={delete_cart.delete} alt='Icon xóa cart'/>
                                            <span className={cx('delete_btn-text')}>Xóa</span>
                                        </NavLink>
                                    </div>
                                    <div className={cx('product-detail')}>
                                        <div className={cx('top_detail')}>
                                            <NavLink to={'/'} className={cx('top_detail-link')}> 
                                                {item.title}
                                            </NavLink>
                                        </div>
                                        <div className={cx('accessories')}>
                                            <h4 className={cx('accessories-sell')}>Khuyến mãi:</h4>
                                            <ul className={cx('accessories-list')}>
                                                <li className={cx('accessories-item')}>
                                                    <img className={cx('accessories-img')} src={checkDetails.check} alt='checkDetails'/>
                                                    <span className={cx('accessories-text')}>Tặng sạc, cable nhanh 20W cao cấp khi nâng cấp bảo hành DGold</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={cx('product-price')}>
                                        <div className={cx('fee')}>
                                            <p className={cx('price-item')}>{(item.price * item.number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
                                            <del className={cx('old-price')}>{item.priceOld.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                                        </div>
                                        <div className={cx('quan')}>
                                            <div className={cx('number-input')}>
                                                <button type='button' onClick={() => handleDecreaseQuantity(item.productId)} className={cx('down')}></button>
                                                <input
                                                    type='number'
                                                    value={numberProduct !== 0 ? numberProduct : item.number} 
                                                    onChange={(e) => {
                                                        setNumberProduct(e.target.value);        
                                                    }} 
                                                    className={cx('numbersOnly1')}
                                                />
                                                <button type='button' onClick={() => handleIncreaseQuantity(item.productId)} className={cx('plus')}></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            
                        </div>
                        <div className={cx('total-price-products')}>
                            <p className={cx('total-price__para')}>
                                <span className={cx('price_tam')}>Tạm tính ({totalNumber}) sản phẩm: </span>
                                <span className={cx('price_tam')}>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </p>
                            <p className={cx('total-price__para')}>
                                <span className={cx('price_tam')}>Phí vận chuyển: </span>
                                <span className={cx('price_tam')}>Liên hệ</span>
                            </p>
                            <p className={cx('total-price__para')}>
                                <span className={cx('price_tam')}>Mã giảm giá: </span>
                                <span className={cx('price_tam')}>0đ</span>
                            </p>
                            
                        </div>
                        <OrderProduct totalPrice={totalPrice} selectedProducts={selectedProducts} />
                        
                    </div>
                    <span className={cx('agree')}>Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của Didongthongminh</span>
                </div>
            </div> 
                ) : (
                <div className={cx('l-12 m-12 c-12')}>
                    <div className={cx('cart-empty')}>
                        <img src={cartEmpty.cartEmpty} className={cx('img-cart__cs')} alt='Anh cart empty'/>
                    </div>
                    <NavLink to={'/'} className={cx('button-empty')} >
                        Mua hàng
                    </NavLink>
                </div>
                )
            }
        </div>
    );
}
export default Cart;