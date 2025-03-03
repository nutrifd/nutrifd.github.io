import './index.css'
import { Typography } from '@arco-design/web-react';
import { Card, Link, Space, Tag } from '@arco-design/web-react';
import { IconCheckCircleFill, IconList, IconInfoCircle, IconCloudDownload } from '@arco-design/web-react/icon';
const { Title  } = Typography;

export function Datasets() {
    return <div class="xdatasets">
        <div class="xtitle">
            <Typography><Title heading={3}>Downloads Datasets</Title></Typography>
        </div>
        <div class="xcontent">
            <Space size='large' wrap={true} align={'center'}>
                <Card
                    title='Food Datasets'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>1343 Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>703 KB</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
                <Card
                    title='Disease Datasets'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>13271 Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>2.9 MB</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
                <Card
                    title='Disease Feature'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>13271 Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>2.9 MB</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
                <Card
                    title='Food-Disease Datasets'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>5405K Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>480 MB</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
                <Card
                    title='Food-Nutrition Datasets'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>27112 Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>1.6 MB</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
                <Card
                    title='Co Asso Matrix Datasets'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>66 Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>40 K</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
                <Card
                    title='Co Trea Matrix Datasets'
                    style={{
                        width: 360,
                    }}
                >
                    <Tag icon={<IconList />} style={{margin: '0 5px'}}>66 Lines</Tag>
                    <Tag icon={<IconInfoCircle />} style={{margin: '0 5px'}}>19 K</Tag>
                    <Tag icon={<IconCloudDownload />} style={{margin: '0 5px'}}><Link href='https://drive.google.com/file/d/1qR72iYKEy649kfNIaej4hUukyBDQwFS-/view?usp=sharing'>Download</Link></Tag>
                </Card>
            </Space>
        </div>
    </div>;
}