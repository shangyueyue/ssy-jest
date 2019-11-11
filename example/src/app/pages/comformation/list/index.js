import React from 'react';
import IceContainer from '@icedesign/container';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from '@ice/form';
import { Button, Grid, Message } from '@alifd/next';
import CustomTable from '@/components/CustomTable';
import tableConfig from './tableConfig';
import formConfig from './formConfig';
import request from '../../../utils/request';
import './styles.scss';


const { Row, Col } = Grid;

class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      totalPage: 0,
    };
    this.formData = {
      pageIndex: 1,
      pageSize: 10,
    };
  }

  onItemClick = (record) => {
    const { history } = this.props;
    history.push('/customer/detail', { partyNo: record.partyNo || '' });
  }

  onSubmit = (value) => {
    this.formData = { ...value, pageIndex: 1 };
    this.getCustomerList(this.formData);
  }

  onPaginationChange=(current) => {
    this.formData = { ...this.formData, pageIndex: current };
    this.getCustomerList(this.formData);
  }

  onPageSizeChange=(pageSize) => {
    this.formData.pageSize = pageSize;
    this.getCustomerList(this.formData);
  }

    // 设置客服在线状态
    getCustomerList = (params) => {
      request({
        url: '/service/user/customer/list',
        method: 'POST',
        data: params,
      }).then((res) => {
        if (res && res.res_code === '0') {
          const { data = [], totalPage } = res.data || {};
          this.setState({ dataSource: data, totalPage });
          return;
        }
        this.setState({ dataSource: [] });
      }).catch((err) => {
        Message.error(err.res_msg);
      });
    }

    render() {
      return (
        <div>
          <IceContainer>
            <Form
              onSubmit={this.onSubmit}
              layout={{
                labelCol: 4,
                wrapperCol: 8,
              }}
            >
              {
              (formCore) => (
                <div>
                  <Row wrap>
                    {
                      formConfig(formCore).map((formItem) => (
                        <Col key={formItem.name} s={24} l={12}>
                          <Field placeholder="Pleasse Input" {...formItem} />
                        </Col>
                      ))
                    }
                  </Row>
                  <Row>
                    <Col style={{ textAlign: 'center' }}>
                      <Button htmlType="submit" style={{ marginRight: '20px' }}>
                        <FormattedMessage id="app.common.bubbon.reset" />
                      </Button>
                      <Button type="primary" onClick={() => formCore.reset()}>
                        <FormattedMessage id="app.common.bubbon.submit" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              )
              }
            </Form>
          </IceContainer>
          <IceContainer>
            <CustomTable
              dataSource={this.state.dataSource}
              columns={tableConfig(this.onItemClick)}
              hasBorder={false}
              pagination={{
                onChange: this.onPaginationChange,
                total: this.state.totalPage,
                onPageSizeChange: this.onPageSizeChange,
              }}
            />
          </IceContainer>
        </div>
      );
    }
}

export default ListPage;
