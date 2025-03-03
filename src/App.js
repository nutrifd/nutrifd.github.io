import React from "react";


import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "@arco-design/web-react/dist/css/arco.css";
import { Menu, Layout, Typography, Link as MyLink } from '@arco-design/web-react';
import icon from './icon.png';
import { Home } from './pages/home';
import { FoodDetail } from './pages/food/detail';
import { FoodList } from "./pages/food/home";
import { DiseaseDetail } from './pages/disease/detail';
import { DiseaseList } from "./pages/disease/home";
import { Datasets } from './pages/datasets';
import { About } from './pages/about/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Page404 } from "./pages/common/404";

const MenuItem = Menu.Item;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

darkThemeMq.addListener(e => {
  if (e.matches) {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Header><Menu mode='horizontal' defaultSelectedKeys={['1']}>
            <MenuItem
              key='1'
            >

              <Link to="/nutrifd-ui">
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundImage: 'url(' + icon + ')',
                    //backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                /></Link>
            </MenuItem>
            <MenuItem key='2'><Link to="/nutrifd-ui/food?search=">Food</Link></MenuItem>
            <MenuItem key='3'><Link to="/nutrifd-ui/disease?search=">Disease</Link></MenuItem>
            <MenuItem key='4'><MyLink href="https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing">Datasets</MyLink></MenuItem>
            <MenuItem key='5'><Link to="/nutrifd-ui/about">About</Link></MenuItem>
          </Menu>
          </Header>
          <Content style={{
            minHeight: '100vh',
            paddingBottom: '50px',
          }}><Switch>
              <Route path="/nutrifd-ui/about" component={About} />
              <Route path="/nutrifd-ui/datasets" component={Datasets} />
              <Route path="/nutrifd-ui/food/detail" component={FoodDetail} />
              <Route path="/nutrifd-ui/food" component={FoodList} />
              <Route path="/nutrifd-ui/disease/detail" component={DiseaseDetail} />
              <Route path="/nutrifd-ui/disease" component={DiseaseList} />
              <Route path="/404" component={Page404} />
              <Route path="/nutrifd-ui" component={Home} />
            </Switch></Content>
          <Footer style={{
            backgroundColor: '#eeeeee',
            height: '50px',
            marginTop: '-50px',
            width: '100%',
          }}>
            <Layout>
              <Typography.Text style={{ textAlign: "center", paddingTop: "10px" }}> ⓒCopyright Nutri 2023-</Typography.Text>
            </Layout>
          </Footer>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
