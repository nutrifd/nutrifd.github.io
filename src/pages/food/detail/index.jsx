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
    Select,
    Space,
} from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import { fetchFoodList, fetchRelatedDiseaseList, fetchRelatedNutritionList } from '../utils/request';
import Qs from 'qs'
const Option = Select.Option;

const BreadcrumbItem = Breadcrumb.Item;
const { Title } = Typography;

export function FoodDetail(props) {
    const name = Qs.parse(props.location.search)['?name'];
    return <div className="xfood">
        <div className="xframe">
            <div className="xbreadcrumb">
                <Breadcrumb>
                    <BreadcrumbItem><IconHome /></BreadcrumbItem>
                    <BreadcrumbItem href='/food'>All Foods</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Divider />
            <div className="xcontent">
                <div className="xbasic" href="#xbasic">
                    <BasicInfo foodName={name} history={props.history} />
                </div>
                <div className="xrelateddisease">
                    <Typography>
                        <a name="xrelateddisease"><Title heading={5}>Related Disease Info</Title></a>
                        <RelatedRelatedDiseaseInfo foodName={name} />
                    </Typography>
                </div>
                <div className="xrelatednutrition">
                    <Typography>
                        <a name="xrelatednutrition"><Title heading={5}>Related Nutrition Info</Title></a>
                        <RelatedRelatedNutritionInfo foodName={name} />
                    </Typography>
                </div>
            </div>
        </div>
    </div>;
}

function BasicInfo(props) {
    const { foodName, history } = props;
    const { data, status } = useQuery(['food', foodName], () => fetchFoodList({ name: foodName }));
    var dataSource = [];
    if (data) {
        if (data.data.data.length === 0) {
            history.push('/404');
            return;
        } else {
            let item = data.data.data[0]
            dataSource.push({ label: 'Food', value: item.name });
            dataSource.push({ label: 'Scientific Name', value: item.scientific_name });
            dataSource.push({ label: 'Group', value: item.group });
            dataSource.push({ label: 'Description', value: item.description });
        }
    }
    return <Descriptions colon=' :' layout='inline-horizontal' data={dataSource} />
}

function RelatedRelatedDiseaseInfo(props) {
    const [scoreSorter, setScoreSorter] = useState('descend');
    const [relationType, setRelationType] = useState('association');
    const [calculationMethod, setCalculationMethod] = useState('existence');
    const [source, setSource] = useState('');
    const relationTypeOptions = ['association', 'treatment'];
    const calculationMethodOptions = ['existence', 'predict'];
    const sourceOptions = ['miRNA', 'Gene', 'DO', 'Disease ontology'];
    const { foodName = "apple" } = props;

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
    let { data, status } = useQuery(['food_disease', foodName, pageNum, relationType, calculationMethod, source, ordering], () => fetchRelatedDiseaseList({ food_name: foodName, relation_type: relationType, calculation_method: calculationMethod, source: calculationMethod=='existence'?'':source, limit: pageSize, offset: (pageNum - 1) * pageSize, ordering: ordering }))
    var dataSource = [];
    var total = 0;
    let columns = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Disease',
            dataIndex: 'disease_name',
        },
        {
            title: 'Score',
            dataIndex: 'inference_score',
            sorter: true,
            defaultSortOrder: scoreSorter,
        },
    ];
    if (data) {
        dataSource = data.data.data.map(item => {
            item.key = item.id;
            let result = {
                key: item.id,
                disease_name: item.disease_name,
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
            <Typography.Text style={{minWidth: 100, display: 'inline-block'}}>Relation Type:</Typography.Text>
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
            <Typography.Text style={{minWidth: 100, display: 'inline-block'}}>Calculation Method:</Typography.Text>
            <Select
                placeholder='Please select calculation method'
                style={{ width: 300 }}
                defaultValue={calculationMethod}
                onChange={(value) =>{
                    setCalculationMethod(value);
                    if (value === 'predict') {
                        setSource('')
                    }
                    }
                }
            >
                {calculationMethodOptions.map((option, index) => (
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
            <Typography.Text style={{minWidth: 100, display: 'inline-block'}}>Relation Type:</Typography.Text>
            <Select
                placeholder='Please select '
                style={{ width: 300 }}
                defaultValue={relationType}
                onChange={(value) => {
                    console.log(value);
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
            <Typography.Text style={{minWidth: 100, display: 'inline-block'}}>Calculation Method:</Typography.Text>
            <Select
                placeholder='Please select calculation method'
                style={{ width: 300 }}
                defaultValue={calculationMethod}
                onChange={(value) =>setCalculationMethod(value)}
            >
                {calculationMethodOptions.map((option, index) => (
                    <Option key={option} disabled={index === 4} value={option}>
                        {option}
                    </Option>
                ))}
            </Select>
            <Typography.Text style={{minWidth: 100, display: 'inline-block'}}>Source:</Typography.Text>
            <Select
                placeholder='Please select source'
                style={{ width: 300 }}
                defaultValue={''}
                onChange={(value) =>setSource(value)}
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

function RelatedRelatedNutritionInfo({ foodName = 'apple' }) {
    const [ammountSorter, setAmmountSorter] = useState('descend');
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'FoodName',
            dataIndex: 'food_name',
        },
        {
            title: 'FoodLongName',
            dataIndex: 'food_long_name',
        },
        {
            title: 'NutritionName',
            dataIndex: 'nutrition_name',
        },
        {
            title: 'Ammount',
            dataIndex: 'ammount',
            sorter: true,
            defaultSortOrder: ammountSorter,
        },
    ];
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    let ordering = ''
    switch (ammountSorter) {
        case "descend":
            ordering = "-ammount";
            break;
        case "ascend":
            ordering = "ammount";
            break;
        default:
    }
    const { data, status } = useQuery(['food_nutrition', foodName, pageNum, ammountSorter], () => fetchRelatedNutritionList({ food_name: foodName, limit: pageSize, offset: (pageNum - 1) * pageSize, ordering: ordering }))
    var dataSource = [];
    var total = 0;
    if (data) {
        dataSource = data.data.data.map(item => {
            item.key = item.id;
            item.food_name = item.food_name;
            item.food_long_name = item.food_long_name;
            item.nutrition_name = item.nutrition_name;
            return item;
        });
        total = data.data.total;
    }

    return <Table
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
                if (sorter.field === 'ammount') {
                    setAmmountSorter(sorter.direction);
                }
            }
        }}
    />
}
