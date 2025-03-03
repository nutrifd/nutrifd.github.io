import './index.css'
import { useState } from 'react';
import { useQuery } from 'react-query';
import React from 'react'
import {
    Grid,
    Typography,
    Image,
    Input,
    Table,
    Divider,
} from '@arco-design/web-react';
import Qs from 'qs'
import { fetchDiseaseList } from '../utils/request';
import diseasePic from '../../../images/disease.png'

const Row = Grid.Row;
const Col = Grid.Col;
const { Title } = Typography;
const InputSearch = Input.Search;

export function DiseaseList(props) {
    const search = Qs.parse(props.location.search)['?search'];

    return <div className="xdisease">
        <div className="xframe">
            <div className="xtitle">
                <Row>
                    <Col flex={'auto'}>
                        <Typography>
                            <Title>Disease</Title>
                            <Title className="title" heading={2}>any harmful deviation from the normal structural or <br/> functional state of an organism</Title>
                        </Typography>

                    </Col>
                    <Col flex={'250px'}>
                        <div><Image
                            width="100%"
                            src={diseasePic}
                            alt='disease'
                        /></div>
                    </Col>
                </Row>
            </div>
            <Divider />
            <div className='xtable'>
                <DiseaseListTable name={search} history={props.history} />
            </div>
        </div>
    </div>;
}

function DiseaseListTable(props) {
    const { name, history } = { ...props };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Disease',
            dataIndex: 'name',
        },
        {
            title: 'Mesh',
            dataIndex: 'mesh',
        },
        {
            title: 'Tree Number',
            dataIndex: 'group',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record) => {
                return <div className={'ellipsis'}>{text}</div>
            }
        },
    ];
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    const { data, status } = useQuery(['disease', name, pageNum], () => fetchDiseaseList({ search: name, limit: pageSize, offset: (pageNum - 1)*pageSize }))
    var dataSource = [];
    var total = 0;
    if (data) {
        dataSource = data.data.data.map(item => {
            item.key = item.id;
            item.name = item.name;
            return item;
        });
        total = data.data.total;
    }

    return <div>
        <Row>
            <Col flex={'auto'}>
            <InputSearch
                    placeholder='Please enter disease name'
                    style={{ width: 350, marginBottom: 12 }}
                    searchButton={true}
                    defaultValue={name}
                    onSearch={value => {
                        props.history.push({ pathname: '/nutrifd-ui/disease', search: '?search=' + value });
                    }}
                /></Col>
            <Col flex={'250px'}>
                <div style={{ display: 'inline-block', marginBottom: 12, fontSize: '16px', float: 'right'}}><p>List Diseases {total} in total.</p></div>
            </Col>
        </Row>
    <Table
        loading={status === 'loading'}
        columns={columns}
        data={dataSource}
        onRow={(record, index) => {
            return {
                onClick: (event) => {
                    history.push({ pathname: '/nutrifd-ui/disease/detail', search: '?name=' + record.name })
                },
            }
        }}
        pagination={{
            pageSize: pageSize,
            current: pageNum,
            total: total,
            onChange: (pageNumber) => {
                setPageNum(pageNumber);
            }
        }}
        renderPagination={(paginationNode) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}
            >
                {paginationNode}
            </div>
        )}
    />
    </div>
}
