import './index.css'
import { useState } from 'react';
import { useQuery } from 'react-query';
import React from 'react'
import {
    Grid,
    Typography,
    Image,
    Input,
    Divider,
    Table,
} from '@arco-design/web-react';
import Qs from 'qs'
import { fetchFoodList } from '../utils/request';
import foodPic from '../../../images/food.png'

const Row = Grid.Row;
const Col = Grid.Col;
const { Title } = Typography;
const InputSearch = Input.Search;

export function FoodList(props) {
    const search = Qs.parse(props.location.search)['?search'];
    return <div className="xfood">
        <div className="xframe">
            <div className="xtitle">
                <Row>
                    <Col flex={'auto'}>
                        <Typography>
                            <Title>Food</Title>
                            <Title className="title" heading={2}>any substance that can be metabolized by <br /> an organism to give energy and build tissue</Title>
                        </Typography>
                    </Col>
                    <Col flex={'250px'}>
                        <div><Image
                            width="100%"
                            src={foodPic}
                            alt='food'
                        /></div>
                    </Col>
                </Row>
            </div>
            <Divider />
            <div className='xtable'>
                <FoodListTable name={search} history={props.history} />
            </div>
        </div>
    </div>;
}

function FoodListTable(props) {
    const { name, history } = { ...props };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Food',
            dataIndex: 'name',
        },
        {
            title: 'Scientific Name',
            dataIndex: 'scientific_name',
        },
        {
            title: 'Group',
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
    console.log(name);
    const { data, status } = useQuery(['food', name, pageNum], () => fetchFoodList({ search: name, limit: pageSize, offset: (pageNum - 1)*pageSize }))
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
                    placeholder='Please enter food name'
                    style={{ width: 350, marginBottom: 12 }}
                    searchButton={true}
                    defaultValue={name}
                    onSearch={value => {
                        props.history.push({ pathname: '/nutrifd-ui/food', search: '?search=' + value });
                    }}
                /></Col>
            <Col flex={'250px'}>
                <div style={{ display: 'inline-block', marginBottom: 12, fontSize: '16px', float: 'right'}}><p>List Foods {total} in total.</p></div>
            </Col>
        </Row>
        <Table
            loading={status === 'loading'}
            columns={columns}
            data={dataSource}
            onRow={(record, index) => {
                return {
                    onClick: (event) => {
                        history.push({ pathname: '/nutrifd-ui/food/detail', search: '?name=' + record.name })
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
        /></div>
}
