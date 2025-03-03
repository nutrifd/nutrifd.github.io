import { Result, Button } from '@arco-design/web-react';

export const Page404 = () => {
  return (
    <div>
      <Result
        status='404'
        subTitle='Whoops, that page is gone. '
        extra={[
          <Button key='back' type='primary' href='/'>
            Back
          </Button>,
        ]}
      ></Result>
    </div>
  );
};
