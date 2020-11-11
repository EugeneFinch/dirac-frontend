import React, { useEffect } from 'react';
import { Comment, List, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { get } from 'lodash';

import { LIMIT } from '../constants';
import { mapToTranscript } from '@/utils/utils';

export default ({ getTranscript, data, pagination, loading, id: recording_id }) => {
  const page = get(pagination, 'current', 1);
  const limit = get(pagination, 'pageSize', LIMIT);

  useEffect(() => {
    getTranscript({ page, limit, recording_id });
  }, [recording_id]);

  const onLoadMore = () => {
    getTranscript({ page: page + 1, limit, loadMore: true, recording_id });
  };

  const total = get(pagination, 'total', 0);
  const hasMore = !loading && total > page * limit;

  return (
    <Card
      bordered={false}
      bodyStyle={{
        maxHeight: 500,
        overflowY: 'auto',
      }}
    >
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        useWindow={false}
      >
        <List
          className="comment-list"
          // header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={mapToTranscript(data)}
          loading={loading}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
};
