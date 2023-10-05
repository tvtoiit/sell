import { Wrapper as WrapperPopper } from '../../../Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images, { cate_btn, call_btn, the_row, stores, logins, proMax, avatas, iconLogoMobile, iconNavMobile } from '../../../../assets/images';
import Tippy from '@tippyjs/react';
import { useEffect, useState, useContext, Fragment } from 'react';
import UserRoleContext from '../../../../pages/UserRole';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function Header() {
    const { checkAdmin } = useContext(UserRoleContext);
    const [searchResult, setSearchResult] = useState([]);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    let [valueInputSearch, setValueInputSearch] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const toggleOverlay = () => {
        setIsChecked(!isChecked);
    };

    const getNumberCartLocalStorage = () => {
        const array = JSON.parse(localStorage.getItem('cart'));
        if (array === null) {
            return 0;
        }
        const number = array.reduce((acc, item) => acc + item.number, 0);
        return number;
    }

    const removeLocalStorage = () => {
        localStorage.removeItem('token');
        setIsBoxVisible(false);
    }

    const handleAvataClick  = () => {
        setIsBoxVisible(!isBoxVisible);
    }

    const handleLogout = () => {
        const apiLogout = "http://34.124.192.61:8888/api/v1/auth/logout/api/v1/auth/logout";
        fetch((apiLogout, {
            method: 'POST'
        }))
        .then(response => response.json())
    }

    const hasLocalStorageData  = !!localStorage.getItem('token');
    useEffect(() => {
        if (valueInputSearch === "") {
            valueInputSearch = "/none";
        } 
        const api = `http://34.124.192.61:8888/api/v1/search?keyword=${valueInputSearch}`;
            fetch(api)
            .then(response => response.json())
            .then(data => setSearchResult(data))
            .catch(err => console.log(err));
    }, [valueInputSearch]);
    return (
        <>
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('menu-store')}>
                    <div className={cx('logo_site')}>
                        <NavLink to='/' className={cx('img-home')}>
                            <img className={cx('img-home-a')} src={images.logo} alt="logo di động thông minh pc" />
                            <img className={cx('img-home-a__mobi')} src={iconLogoMobile.iconMobi} alt="logo di động thông minh mobile" />
                        </NavLink>
                    </div>
                    <div className={cx('menu-center')}>
                        <button className={cx('cate-btn')}>
                            <img className={cx('cate-btn__img')} src={cate_btn.cate} alt="cate" />
                            Danh mục
                        </button>
                        <div className={cx('address_pc')}>
                            <div className={cx('select_city')}>
                                <button className={cx('btn-drop')}>
                                    <span className={cx('title')}>Xem giá, tồn kho tại:</span>
                                    <span className={cx('click_drop')}>
                                        Hà Nội
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <Tippy
                            interactive
                            visible={searchResult.length > 0 && valueInputSearch !== ""}
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1">
                                    <div className={cx('search-result__content')} style={{ maxHeight: '300px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
                                    <WrapperPopper>
                                            {searchResult.map((item, index) => (
                                                <div className={cx('autocomplete-suggestion')} key={index}>
                                                    <NavLink to={`/detail/${item.productId}`}  className={cx('autocomplete-suggestion__a')}>
                                                        <img 
                                                            className={cx('autocomplete-suggestion__img')}
                                                            src={item.thumbnail}
                                                            alt={item.altText}
                                                        />
                                                        <label className={cx('label-group')}>
                                                            <span>
                                                                <strong className={cx('strong')}>{item.title}</strong>
                                                                <span>{item.description}</span>
                                                            </span>
                                                            <span className={cx('price')}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                        </label>
                                                    </NavLink>
                                                </div>
                                            ))}
                                    </WrapperPopper>
                                        </div>
                                </div>
                            )}
                        >
                            <div id={cx('search_simple')}>
                                <div className={cx('search_simple_content')}>
                                    <form id={cx('search_form_simple')}>
                                        <input
                                            onChange={e => setValueInputSearch(e.target.value)}
                                            value={valueInputSearch}
                                            className={cx('search_form_simple-input')}
                                            type="text"
                                            placeholder="Bạn tìm gì ở đây!"
                                        />
                                    </form>
                                </div>
                            </div>
                        </Tippy>

                        <div className={cx('right_menu')}>
                            <div href="" className={cx('hotline_menu')}>
                                <img className={cx('hotline_menu-img')} src={call_btn.call} alt="gọi điện" />
                                <div className={cx('right_menu__text')}>
                                    <span className={cx('right_menu__text-span')}>Gọi mua hàng</span>
                                    <span className={cx('right_menu__text-span')}>085 5100 001</span>
                                </div>
                            </div>

                            <div className={cx('address')}>
                                <img src={the_row.row} className={cx('address_img')} alt="Địa chỉ" />
                                <div className={cx('address__text')}>
                                    <span className={cx('address__text-span')}>Cửa hàng</span>
                                    <span className={cx('address__text-span')}>Gần bạn</span>
                                </div>
                            </div>

                            <NavLink to='/cart' className={cx('store-cart')}>
                                <img src={stores.store} alt="store" />
                                <span className={cx('ncc')}>{getNumberCartLocalStorage()}</span>
                            </NavLink>

                            <div  className={cx('login-a')}>
                                {hasLocalStorageData ? (
                                    <div onClick={handleAvataClick} className={cx('avatas')}>
                                        <NavLink >
                                            <img className={cx('avata-img')} src={avatas.avata}  alt="login-img" />
                                        </NavLink>
                                     </div>
                                ): (
                                    <>
                                        <NavLink to='/authen' className={cx('login-img__iconPC')}>
                                            <img src={logins.login} className={cx('icon-login_in')}  alt="login-img"/>
                                        </NavLink>
                                        
                                    </>
                                )}
                                 <div onClick={toggleOverlay} className={cx('login-img__IconMobile')}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"></path></svg>
                                </div>
                                       
                                <div onClick={toggleOverlay} className={cx(`${isChecked ? 'over-lay' : ''}`)}></div>   
                            </div>
                             {isBoxVisible && <div className={cx('box-telegory')}>
                                <ul className={cx('box-list')}>
                                    <div className={cx('avataWrapper')}>
                                        <div className={cx('item-avata')}>
                                            <img className={cx('item-avata__img')} src={avatas.avata}  alt="login-img" />
                                        </div>
                                        <div className={cx('avata-info')}>
                                            <span className={cx('avata-usename')}>Trần Tới</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <ul className={cx('menu-list')}>
                                        <li>
                                            <NavLink className={cx('menu-item')}>
                                                Đơn hàng
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <hr/>
                                    {checkAdmin === true ?
                                    <ul className={cx('menu-list')}>
                                        <li>
                                            <NavLink to= '/admin' className={cx('menu-item')}>
                                                Admin
                                            </NavLink>
                                        </li>
                                    </ul> : <Fragment/>}
                                    <hr/>
                                    <ul className={cx('menu-list')}>
                                        <li onClick={removeLocalStorage}>
                                            <div onClick={handleLogout} className={cx('menu-item')}>
                                                Đăng xuất
                                            </div>
                                        </li>
                                    </ul>
                                </ul>
                            </div>}  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={cx(`${isChecked ? 'model' : 'modelNone'}`)}>
        <div className={cx('modal-containe')}>
            <div className={cx('modal-close')}>
                <img className={cx('item-avata__img')} src={avatas.avata}  alt="login-img" />
            </div>
                <header className={cx('model-header')}>
                    
                </header>
                <div className={cx('model-body')}>
                    <ul className={cx('model-list__body')}>
                        <NavLink to={'/'} className={cx('model-item__body')} onClick={toggleOverlay}>
                            <p className={cx('model-item__svg')}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" class="svg-inline--fa fa-house " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"></path></svg>                                
                            </p>
                            <span className={cx('text-nav__mmobile')}>Trang chủ</span>
                        </NavLink>
                        {/* <li className={cx('model-item__body')}>
                            <em className={cx('model-item__svg')}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper" class="svg-inline--fa fa-newspaper " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"></path></svg>
                            </em>
                            <span className={cx('text-nav__mmobile')}>Đơn hàng</span>
                        </li> */}
                        {checkAdmin === true ? (
                        <NavLink to={'/addproduct'} className={cx('model-item__body')} onClick={toggleOverlay}>
                             <em className={cx('model-item__svg')}>
                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                             </em>
                             <span className={cx('text-nav__mmobile')}>
                                 Admin    
                             </span>
                         </NavLink>   

                        ) : <Fragment/>}

                        {hasLocalStorageData ? (
                            <NavLink className={cx('model-item__body')} onClick={removeLocalStorage} >
                                <em className={cx('model-item__svg')}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="right-from-bracket" class="svg-inline--fa fa-right-from-bracket " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"></path></svg>
                                </em>
                                <span className={cx('text-nav__mmobile')} onClick={toggleOverlay}>
                                    Đăng xuất
                                </span>
                            </NavLink>
                        ) : (
                            <NavLink className={cx('model-item__body')} to={'/authen'} onClick={toggleOverlay}>
                                <em className={cx('model-item__svg')}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="right-from-bracket" class="svg-inline--fa fa-right-from-bracket " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"></path></svg>
                                </em>
                                <span className={cx('text-nav__mmobile')} >
                                    Đăng nhập
                                </span>
                            </NavLink>
                        )}
                    </ul>
                </div>
                <footer className={cx('modal-footer')}>

                </footer>
            </div>
        </div>
    </>
    );
}

export default Header;
