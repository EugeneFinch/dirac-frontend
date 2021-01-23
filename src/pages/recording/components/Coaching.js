import React, { useEffect } from 'react';
import { Card, Button, Spin, Typography, Col, Row } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { get } from 'lodash';
import styles from '../styles.less';

const ItemTitle = ({ children }) => (
  <Row className={styles.itemTitle}>
    <Typography.Title style={{ marginBottom: 0 }} level={5}>
      {children}
    </Typography.Title>
  </Row>
);

const ItemText = ({ children }) => (
  <Row justify="space-between" align="middle" className={styles.itemText}>
    {children}
  </Row>
);

function Coaching({ id, getCoaching, refreshCoaching, transcriptCoaching, loading }) {
  useEffect(() => {
    if (id) {
      getCoaching({ id });
    }
  }, [id]);

  return (
    <Spin spinning={!!loading}>
      <Card className={styles.coaching} bordered={false}>
        <Row justify="space-between" gutter={[0, 16]} align="middle">
          <Col>
            <Typography.Title level={4}>Call coaching</Typography.Title>
          </Col>
          <Col>
            <Button
              onClick={() => refreshCoaching({ id: transcriptCoaching?.id })}
              icon={<RetweetOutlined />}
              shape="circle"
            />
          </Col>
        </Row>
        <ItemTitle>Interactivity</ItemTitle>
        <ItemText>
          <Col>Team Talk time</Col>
          <Col>{transcriptCoaching?.team_talk_time}</Col>
        </ItemText>
        <ItemText>
          <Col>Longest monologue</Col>
          <Col>{transcriptCoaching?.longest_monologue}</Col>
        </ItemText>

        <ItemTitle>Confidence</ItemTitle>
        <ItemText>
          <Col>Filter words per minute</Col>
          <Col>{transcriptCoaching?.filler_word_per_min}</Col>
        </ItemText>

        <ItemTitle>Patience</ItemTitle>
        <ItemText>
          <Col>Response time</Col>
          <Col>{transcriptCoaching?.resp_time}</Col>
        </ItemText>

        <ItemTitle>Engagement</ItemTitle>
        <ItemText>
          <Col># engaging questions</Col>
          <Col>{transcriptCoaching?.no_engage_question}</Col>
        </ItemText>

        <ItemTitle>Risk factors</ItemTitle>
        <ItemText>
          <Col># of customer objections</Col>
          <Col>{transcriptCoaching?.no_customer_objection}</Col>
        </ItemText>
        <ItemText>
          <Col>Next steps</Col>
          <Col>{transcriptCoaching?.next_steps}</Col>
        </ItemText>
        <ItemText>
          <Col># of competitor mentions</Col>
          <Col>{transcriptCoaching?.no_competitor_mention}</Col>
        </ItemText>
      </Card>
    </Spin>
  );
}

const mapStateToProps = (state) => ({
  transcriptCoaching: get(state, 'uploadManagement.transcriptCoaching'),
  loading:
    state?.loading?.effects['uploadManagement/getCoaching'] ||
    state?.loading?.effects['uploadManagement/refreshCoaching'],
});

const mapDispatchToProps = (dispatch) => ({
  getCoaching: (params) =>
    dispatch({
      type: 'uploadManagement/getCoaching',
      params,
    }),
  refreshCoaching: (params) =>
    dispatch({
      type: 'uploadManagement/refreshCoaching',
      params,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coaching);
