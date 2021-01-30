import React, { useEffect } from 'react';
import { Card, Button, Spin, Typography, Col, Row } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { get } from 'lodash';
import CircleColor from '@/components/CircleColor';

import styles from '../styles.less';

const GREEN = '#219653';
const YELLOW = '#f29949';
const RED = '#ec5756';

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

const getColorFilterWord = value => {
  if (!value) return null;
  if (value < 6) return GREEN;
  if (value >= 6 && value < 10) return YELLOW;
  return RED;
}

const getColorNextStep = value => {
  if (value) return GREEN;
  return RED;
}

const getColorTalkTime = value => {
  if (!value) return null;
  if (value < 35) return GREEN;
  if (value >=35 && value < 55) return YELLOW;
  return RED;
}

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
        {(!!transcriptCoaching?.team_talk_time || !!transcriptCoaching?.longest_monologue) && (
          <ItemTitle>Interactivity</ItemTitle>
        )}
        {!!transcriptCoaching?.team_talk_time && (
          <ItemText>
            <Col>Team Talk time</Col>
            <Col>
              <span className={styles.middle}>
                {transcriptCoaching?.team_talk_time}%
              </span>
              <CircleColor color={getColorNextStep(transcriptCoaching?.team_talk_time)} />
            </Col>
          </ItemText>
        )}
        {!!transcriptCoaching?.longest_monologue && (
          <ItemText>
            <Col>Longest monologue</Col>
            <Col>
              <span className={styles.middle}>
                {transcriptCoaching?.longest_monologue}
              </span>
            </Col>
          </ItemText>
        )}

        {!!transcriptCoaching?.filler_word_per_min && (
          <>
            <ItemTitle>Confidence</ItemTitle>
            <ItemText>
              <Col>Filler words per minute</Col>
              <Col>
                <span className={styles.middle}>{transcriptCoaching?.filler_word_per_min}</span>
                <CircleColor color={getColorTalkTime(transcriptCoaching?.filler_word_per_min)} />
              </Col>
            </ItemText>
          </>
        )}

        {!!transcriptCoaching?.resp_time && (
          <>
            <ItemTitle>Patience</ItemTitle>
            <ItemText>
              <Col>Response time</Col>
              <Col>
                <span className={styles.middle}>
                  {transcriptCoaching?.resp_time}
                </span>
              </Col>
            </ItemText>
          </>
        )}

        {!!transcriptCoaching?.no_engage_question && (
          <>
            <ItemTitle>Engagement</ItemTitle>
            <ItemText>
              <Col># engaging questions</Col>
              <Col>{transcriptCoaching?.no_engage_question}</Col>
            </ItemText>
          </>
        )}

        {(!!transcriptCoaching?.no_customer_objection ||
          transcriptCoaching?.next_steps !== null ||
          !!transcriptCoaching?.no_competitor_mention) && (
            <>
              <ItemTitle>Risk factors</ItemTitle>
              {!!transcriptCoaching?.no_customer_objection && (
                <ItemText>
                  <Col># of customer objections</Col>
                  <Col>
                    <span className={styles.middle}>
                      {transcriptCoaching?.no_customer_objection}
                    </span>
                  </Col>
                </ItemText>
              )}
              <ItemText>
                <Col>Next steps</Col>
                <Col>
                  <span className={styles.middle}>
                    {transcriptCoaching?.next_steps ? 'Yes' : 'No'}
                  </span>
                  <CircleColor color={getColorNextStep(transcriptCoaching?.next_steps)} />
                </Col>
              </ItemText>
              {!!transcriptCoaching?.no_competitor_mention && (
                <ItemText>
                  <Col># of competitor mentions</Col>
                  <Col>
                    <span className={styles.middle}>
                      {transcriptCoaching?.no_competitor_mention}
                    </span>
                  </Col>
                </ItemText>
              )}
            </>
          )}
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
