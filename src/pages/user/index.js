import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import 'antd/dist/antd.css';

import { Layout, Breadcrumb } from 'antd';

import { AllHeader } from '../../components/header'


const { Content } = Layout;


export default function UserPage(){


    return(
        <Layout>
            <AllHeader number={'2'} />
        </Layout>
    );
}