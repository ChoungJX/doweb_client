import React from 'react';
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, } from 'antd';

import { AllHeader } from '../../components/header'
import { IndexSider } from '../../components/index_menu'
import { ServerTable } from '../../components/server_table'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function Index(){
    let {path, url} = useRouteMatch();

    return(
      <Layout>
          <AllHeader  number={'1'}/>
          <Layout>
              <IndexSider />
              <Layout style={{ padding: '0 24px 24px' }}>
                  <Content
                      className="site-layout-background"
                      style={{
                          padding: 24,
                          margin: 0,
                          minHeight: 280,
                      }}
                      >
                          <Switch>
                              <Route exact path={`${url}`}>
                              <div>aaaa</div>
                              </Route>
                              <Route path={`${url}/serverinfo`}>
                                  <ServerTable />
                              </Route>
                          </Switch>

                  </Content>
              </Layout>
          </Layout>
      </Layout>
    );
}