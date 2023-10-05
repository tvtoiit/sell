import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { sell_item, sell_item2, iphones, products, startfill } from '../../assets/images';

const cx = classNames.bind(styles);
function Home() {
    const [data, setData] = useState([]);
    document.title = "Trang chủ";
    useEffect(() => {
        const api = "http://34.124.192.61:8888/api/v1/product-home";
        fetch(api)
        .then((response) => response.json())
        .then(data =>  setData(data))
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        })
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img className={cx('container-img')} src={sell_item.sell} alt="hinh ảnh 1" />
                <img className={cx('container-img')} src={sell_item2.sell} alt="hinh ảnh 2" />
            </div>
           {data.map((item, index) => (
            <div key={`${item.productTypeId}_${index}`} className={cx('products_news')}>
                <div className={cx('products_menu_tabs')}>
                    <div className={cx('nav-tabs')}>
                        <div className={cx('item-tab')}>
                            <img className={cx('iphone')} src={iphones.iphone} alt="Điện thoại iphone" />
                            <span className={cx('iphone-text')}>{item.name}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('l-12 m-12 c-12')}>
                    <div className={cx('box_product')}>
                        <div className={cx('list-slide')}>
                        {item.products.map((product, indexProduct) => (
                        <div key={product.productId} className={cx('item-slide l-2-4 m-4 c-6')}>
                            <div className={cx('col-sm-5ths')}>
                                <div className={cx('cat_item')}>
                                    <NavLink to={`/detail/${product.productId}`}
                                        className={cx('cat-item__a')}
                                        href={products.product}
                                        title='Điện thoại thông minh'
                                    >
                                        <div className={cx('frame_inner')}>
                                            <div  className={cx('product_image')}>
                                                    <img
                                                        className={cx('product-img')}
                                                        src={product.thumbnail}
                                                        alt="Điện thoại"
                                                    />
                                            </div>
                                            <div className={cx('discount')}>{product.discount}%</div>

                                            <div className={cx('frame_title')}>
                                                <h3 className={cx('frame_title--title')}>
                                                    {product.title}
                                                </h3>
                                            </div>

                                            <div className={cx('frame_price')}>
                                                <span className={cx('price')}>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                <span className={cx('price_old')}>{product.priceDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </div>

                                            {/* <div className={cx('sale-brief')}>
                                                <div className={cx('text-left')}>
                                                    <p>Tặng 100.000đ...</p>
                                                </div>
                                            </div> */}

                                            <div className={cx('rate-like')}>
                                                <div className={cx('star-rating')}>
                                                        <img src={startfill.start} alt="start" />
                                                        <img src={startfill.start} alt="start" />
                                                        <img src={startfill.start} alt="start" />
                                                        <img src={startfill.start} alt="start" />
                                                        <img src={startfill.start} alt="start" />
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
           ))}   
        </div>
    );
}

export default Home;
