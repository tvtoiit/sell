import { Fragment,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes,privateRoutes } from './Routes';
import { DefaultLayout, DefaultLayoutAdmin } from './Components/Layout';
import UserRoleContext from './pages/UserRole';
function App() {
    const [checkAdmin, setCheckAdmin] = useState(false);
    return (
    <UserRoleContext.Provider value={{checkAdmin,setCheckAdmin}}>
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout === 'admin' ?  Fragment : DefaultLayoutAdmin;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element= {
                                    <Layout>
                                        <Page/>
                                    </Layout>
                                }
                            >

                            </Route>
                        )
                    })}
                </Routes>
            </div>
        </Router>
        </UserRoleContext.Provider>
    );
}

export default App;
