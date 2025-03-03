import './index.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import React from 'react';
import {
    Breadcrumb,
    Typography,
    Divider,
    Descriptions,
    Table,
    Radio,
    Space,
    Select
} from '@arco-design/web-react';

import { IconHome, IconStarFill, IconHeartFill } from '@arco-design/web-react/icon';
import { fetchDiseaseList, fetchRelatedFoodList } from '../utils/request';
import Qs from 'qs'
const Option = Select.Option;
const BreadcrumbItem = Breadcrumb.Item;
const { Title } = Typography;

export function DiseaseDetail(props) {
    const name = Qs.parse(props.location.search)['?name'];
    return <div className="xdisease">
        <div className="xframe">
            <div className="xbreadcrumb">
                <Breadcrumb>
                    <BreadcrumbItem><IconHome /></BreadcrumbItem>
                    <BreadcrumbItem href='/disease'>All Diseases</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Divider />
            <div className="xcontent">
                <div className="xbasic">
                    <BasicInfo diseaseName={name} history={props.history} />
                </div>
                <div className="xrelatedfood">
                    <Typography>
                        <a name="xrelatedfood"><Title heading={5}>Related Food Info</Title></a>
                        <RelatedFoodInfo diseaseName={name} />
                    </Typography>
                </div>
            </div>
        </div>
    </div>;
}

function BasicInfo(props) {
    const { diseaseName, history } = props;
    const { data } = useQuery(['disease', diseaseName], () => fetchDiseaseList({ name: diseaseName }));
    var dataSource = [];
    if (data) {
        if (data.data.data.length === 0) {
            history.push('/404');
            return;
        } else {
            let item = data.data.data[0]
            dataSource.push({ label: 'name', value: item.name});
            dataSource.push({ label: 'mesh', value: item.mesh });
            dataSource.push({ label: 'tree_number', value: item.tree_number });
            dataSource.push({ label: 'description', value: item.description });
        }
    }
    return <Descriptions colon=' :' layout='inline-horizontal' data={dataSource} />
}

function RelatedFoodInfo(props) {
    const [scoreSorter, setScoreSorter] = useState('descend');
    const [relationType, setRelationType] = useState('association');
    const [calculationMethod, setCalculationMethod] = useState('existence');
    const [source, setSource] = useState('');
    const relationTypeOptions = ['association', 'treatment'];
    const calculationMethodOptions = ['existence', 'predict'];
    const sourceOptions = ['miRNA', 'Gene', 'DO', 'Disease ontology'];
    const { diseaseName = "apple" } = props;

    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    let ordering = ''
    switch (scoreSorter) {
        case "descend":
            ordering = "-inference_score";
            break;
        case "ascend":
            ordering = "inference_score";
            break;
        default:

    }
    const { data, status } = useQuery(['disease_food', diseaseName, pageNum, relationType, calculationMethod, source, ordering], () => fetchRelatedFoodList({ disease_name: diseaseName, relation_type: relationType, calculation_method: calculationMethod, source: calculationMethod == 'existence' ? '' : source, limit: pageSize, offset: (pageNum - 1) * pageSize, ordering: ordering }))
    var dataSource = [];
    var total = 0;
    let columns = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Food',
            dataIndex: 'food_name',
        },
        {
            title: 'Score',
            dataIndex: 'inference_score',
            sorter: true,
            defaultSortOrder: 'descend',
        },
    ];
    if (data) {
        dataSource = data.data.data.map(item => {
            item.key = item.id;
            let result = {
                key: item.id,
                food_name: item.food_name,
                inference_score: item.inference_score,
                source: item.source,
            }
            return result;
        });
        total = data.data.total;
    }
    if (calculationMethod === 'existence') {
        return <>
            <Space wrap={true}>
                <Typography.Text style={{ minWidth: 100, display: 'inline-block' }}>Relation Type:</Typography.Text>
                <Select
                    placeholder='Please select '
                    style={{ width: 300 }}
                    defaultValue={relationType}
                    onChange={(value) => {
                        setRelationType(value);
                    }
                    }
                >
                    {relationTypeOptions.map((option, index) => (
                        <Option key={option} disabled={index === 4} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
                <Typography.Text style={{ minWidth: 100, display: 'inline-block' }}>Calculation Method:</Typography.Text>
                <Select
                    placeholder='Please select calculation method'
                    style={{ width: 300 }}
                    defaultValue={calculationMethod}
                    onChange={(value) => {
                        setCalculationMethod(value)
                        if (value === 'predict') {
                            setSource('')
                        }
                        }
                    }
                >
                    {calculationMethodOptions.map((option, index) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </Space>
            <Table
                loading={status === 'loading'}
                columns={columns}
                data={dataSource}
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
                onChange={(pagination, sorter, filters, extra) => {
                    if (extra.action === 'sort') {
                        console.log(sorter);
                        if (sorter.field === 'score') {
                            setScoreSorter(sorter.direction);
                        }
                    }
                }}
            />
        </>
    } else {
        columns.push({
            title: 'Source',
            dataIndex: 'source',
        },);
        return <>
            <Space wrap={true}>
                <Typography.Text style={{ minWidth: 100, display: 'inline-block' }}>Relation Type:</Typography.Text>
                <Select
                    placeholder='Please select '
                    style={{ width: 300 }}
                    defaultValue={relationType}
                    onChange={(value) => {
                        setRelationType(value);
                    }
                    }
                >
                    {relationTypeOptions.map((option, index) => (
                        <Option key={option} disabled={index === 4} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
                <Typography.Text style={{ minWidth: 100, display: 'inline-block' }}>Calculation Method:</Typography.Text>
                <Select
                    placeholder='Please select calculation method'
                    style={{ width: 300 }}
                    defaultValue={calculationMethod}
                    onChange={(value) => setCalculationMethod(value)}
                >
                    {calculationMethodOptions.map((option, index) => (
                        <Option key={option} disabled={index === 4} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
                <Typography.Text style={{ minWidth: 100, display: 'inline-block' }}>Source:</Typography.Text>
                <Select
                    placeholder='Please select source'
                    style={{ width: 300 }}
                    defaultValue={''}
                    onChange={(value) => setSource(value)}
                >
                    {sourceOptions.map((option, index) => (
                        <Option key={option} disabled={index === 4} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </Space>
            <Table
                loading={status === 'loading'}
                columns={columns}
                data={dataSource}
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
                onChange={(pagination, sorter, filters, extra) => {
                    if (extra.action === 'sort') {
                        if (sorter.field === 'score') {
                            setScoreSorter(sorter.direction);
                        }
                    }
                }}
            />
        </>
    }
}
