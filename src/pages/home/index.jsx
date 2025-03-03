import './index.css'
import { Typography } from '@arco-design/web-react';
import { Grid } from '@arco-design/web-react';
import { Card, Space } from '@arco-design/web-react';
import { Input, Link } from '@arco-design/web-react';
import { useHistory } from "react-router-dom";

const InputSearch = Input.Search;

const { Title, Paragraph } = Typography;

const Row = Grid.Row;
const Col = Grid.Col;

export function Home(props) {
    return <div className="home">
        <div style={{ display: 'inline-block' }}></div>

        <Typography className="topography">
            <Title className="title">NutriFD <br /> Proving the medicinal value of food nutrition based on  <br /> Food-Disease association and treatment networks. More detailed info. can be find at <Link href='https://arxiv.org/abs/2304.04775' style={{fontSize: '30px'}}>paper link.</Link></Title>
        </Typography>

        <div className="content-databox">
            <Typography >
                <Row>
                    <Col span={6}>
                        <div> <Title heading={3} className="title">NutriFDA</Title>
                            <Paragraph className="paragraph">
                                Associations between 591 foods and 2208 diseases.
                            </Paragraph></div>
                    </Col>
                    <Col span={6}>
                        <div> <Title heading={3} className="title">NutriFDT</Title>
                            <Paragraph className="paragraph">
                                Treatment relations between 591 foods and 671 diseases.
                            </Paragraph></div>            </Col>
                    <Col span={6}>
                        <div> <Title heading={3} className="title">2900+ diseases</Title>
                            <Paragraph className="paragraph">
                                2900+ diseases with similarity feature
                            </Paragraph></div>
                    </Col>
                    <Col span={6}>
                        <div> <Title heading={3} className="title">5000+ food</Title>
                            <Paragraph className="paragraph">
                            5000+ food with nutrition feature
                            </Paragraph></div>
                    </Col>
                </Row>
            </Typography>
        </div>
        <div style={{
            margin: '0 auto',
            textAlign: 'center',
        }}>
            <div className='box'>
                <div className='boxbg'></div>
            </div>
            <div style={{ backgroundColor: '#ffffff', width: '100%' }}>
                <Space size='large' wrap={true}>
                    <Card
                        style={{ width: 500 }}
                        title='Search Food'
                        hoverable
                        bordered={false}
                    >
                        <SearchFood />
                    </Card>
                    <Card
                        style={{ width: 500 }}
                        title='Search Disease'
                        hoverable
                        bordered={false}
                    >
                        <SearchDisease />
                    </Card>
                </Space></div>
        </div>
    </div>;
}

function SearchFood(props) {
    let history = useHistory();
    function enter(text) {
        history.push('/nutrifd-ui/food?search=' + text);
    }
    return <InputSearch
        onSearch={(text) => {
            enter(text);
        }
        }
        placeholder='Please enter food name'
        style={{ width: 350, margin: 12 }}
        searchButton={true}
    />
}

function SearchDisease(props) {
    let history = useHistory();
    function enter(text) {
        history.push('/nutrifd-ui/disease?search=' + text);
    }
    return <InputSearch
        onSearch={(text) => {
            enter(text);
        }
        }
        placeholder='Please enter disease name'
        style={{ width: 350, margin: 12 }}
        searchButton={true}
    />
}