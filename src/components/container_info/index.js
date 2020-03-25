import { PageHeader, Skeleton } from 'antd';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';




function ContainerPageHeader() {
    let { id } = useParams();

    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="容器详情"
            subTitle={`容器:${id}`}
        >
        </PageHeader>
    );
}

export class ContainerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: '',
        }
        this.get_args();
    }

    get_args() {
        axios.post('/api',
            {
                api: 'one_container_info',
                id: this.props.id,
            }).then(data => {
                this.setState({
                    loading: false,
                    data: data.data,
                });
            });
    }


    render() {
        return (
            <div>
                <ContainerPageHeader />
                <Skeleton active loading={this.state.loading}>
                    {this.state.data.data}
                </Skeleton>
            </div>
        );
    }
}

export function ContainerOne() {
    let { server_id, id } = useParams();

    return (
        <ContainerInfo server_id={server_id} id={id} />
    )
}