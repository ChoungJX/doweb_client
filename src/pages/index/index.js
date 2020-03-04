import React from 'react';
import { Switch, Route, useRouteMatch} from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Layout,} from 'antd';

import { AllHeader } from '../../components/header'
import { IndexSider } from '../../components/index_menu'
import { ServerTable } from '../../components/server_table'
import { ContainerTable } from '../../components/container_table'
import { ContainerInfo } from '../../components/container_info'


const { Content } = Layout;


export default function Index(){
    let {url} = useRouteMatch();

    return(
      <Layout>
          <AllHeader  number={'1'}/>
          <Layout>
          <Switch>
                <Route exact path={`${url}`}>
                    <IndexSider />
                </Route>
                <Route path={`${url}/serverinfo`}>
                    <IndexSider  openKey='sub1' selectOptins='1' />
                </Route>
                <Route path={`${url}/containerinfo`}>
                <IndexSider  openKey='sub2' selectOptins='5' />
                </Route>
            </Switch>
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
                              <Route exact path={`${url}/containerinfo`}>
                                  <ContainerTable />
                              </Route>
                              <Route  path={`${url}/containerinfo/:server_ip/:id`}>
                                  <ContainerInfo />
                              </Route>
                          </Switch>

                  </Content>
              </Layout>
          </Layout>
      </Layout>
    );
}