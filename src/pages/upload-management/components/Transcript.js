import React, { useEffect, useRef } from 'react';
import { Comment, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { find, forEach, get, uniqBy } from 'lodash';

import EditSpeakerName from './EditSpeakerName';
import { LIMIT } from '../constants';
import { mapToTranscript } from '@/utils/utils';
import styles from '../styles.less';

export default ({
  getTranscript,
  getSpeakerInfo,
  speakers,
  data,
  pagination,
  loading,
  id: recording_id,
  processTime,
}) => {
  const cardRef = useRef(null);

  const page = get(pagination, 'current', 1);
  const limit = get(pagination, 'pageSize', LIMIT);

  useEffect(() => {
    getTranscript({ page, limit, recording_id });
  }, [recording_id]);

  useEffect(() => {
    const uniqData = uniqBy(data, 'speaker_id');
    forEach(uniqData, (item) => {
      const existSpeaker = find(speakers, (obj) => obj.id === item.speaker_id);
      if (!existSpeaker) {
        getSpeakerInfo({ id: item.speaker_id });
      }
    });
  }, [data]);

  const onLoadMore = () => {
    getTranscript({ page: page + 1, limit, loadMore: true, recording_id });
  };

  const total = get(pagination, 'total', 0);
  const hasMore = !loading && total > page * limit;

  return (
    <div className={styles.transcriptContainer} ref={cardRef}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        useWindow={false}
      >
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={mapToTranscript(data, speakers)}
          loading={loading}
          renderItem={(item, i) => {
            const diffTime = processTime - Number(item.start_time);
            const isActive = diffTime < 5 && diffTime > 0;
            if (isActive && cardRef.current) {
              cardRef.current.scrollTo({ top: (i + 1) * 82 });
            }
            return (
              <li key={i} className={isActive ? styles.itemActive : styles.item}>
                <Comment
                  actions={item.actions}
                  author={<EditSpeakerName id={item.speaker_id} name={item.author} />}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};
