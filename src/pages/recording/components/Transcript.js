import React, { useEffect, useRef } from 'react';
import { Comment, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { find, forEach, get, map, max, uniqBy } from 'lodash';
import { DownloadOutlined } from '@ant-design/icons';
import config from '@/config';

import EditSpeakerName from './EditSpeakerName';
import AvatarSpeaker from './AvatarSpeaker';
import { LIMIT } from '../constants';
import { mapToTranscript } from '@/utils/utils';
import styles from '../styles.less';
import { connect } from 'umi';

const Transcript = ({
  getTranscript,
  getSpeakerInfo,
  speakers,
  data,
  pagination,
  loading,
  id: recording_id,
  processTime,
  putSpeakerName,
  loadingSpeaker,
  onClickParagraph,
  searchKeyWordResult,
  recordDuration,
  recordingCreatedAt,
}) => {
  const cardRef = useRef(null);

  const page = get(pagination, 'current', 1);
  const limit = get(pagination, 'pageSize', LIMIT);

  useEffect(() => {
    getTranscript({ page, limit, recording_id });
  }, [recording_id]);

  useEffect(() => {
    if (!searchKeyWordResult) {
      return;
    }

    onClickParagraph(searchKeyWordResult);
  }, [searchKeyWordResult]);

  useEffect(() => {
    const uniqData = uniqBy(data, 'speaker_id');
    const ids = [];
    forEach(uniqData, (item) => {
      const existSpeaker = find(speakers, (obj) => obj.id === item.speaker_id);
      if (!existSpeaker) {
        ids.push(item.speaker_id);
      }
    });
    getSpeakerInfo({ ids });
  }, [data]);

  const onLoadMore = () => {
    getTranscript({ page: page + 1, limit, loadMore: true, recording_id });
  };

  const total = get(pagination, 'total', 0);
  const hasMore = !loading && total > page * limit;

  const maxSecond = max(map(data, (item) => Number(item?.start_time)));
  const activeTime = processTime * recordDuration;

  if (Number(maxSecond) < activeTime && hasMore) {
    onLoadMore();
  }

  const exportTranscript = () => {
    window.open(`${config.API_HOST}/transcript-export/${recording_id}`)
  }

  return (
    <div className={styles.transcriptContainer} ref={cardRef}>
      <DownloadOutlined onClick={exportTranscript} className={styles.exportIcon}/>
      <InfiniteScroll
        initialLoad={false}
        pageStart={page}
        loadMore={onLoadMore}
        hasMore={hasMore}
        useWindow={false}
      >
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={mapToTranscript(data, searchKeyWordResult, recordingCreatedAt)}
          loading={loading}
          renderItem={(item, i) => {
            const isActive =
              activeTime < parseFloat(item?.end_time) && activeTime > parseFloat(item?.start_time);
            const ele = document.getElementById(`content-${i}`);
            // const distance = Math.abs(parseFloat(item.end_time) - parseFloat(activeTime)) < 0.5;
            if (isActive && cardRef.current) {
              cardRef?.current?.scrollTo({ top: ele?.offsetTop });
            }
            return (
              <li
                id={`content-${i}`}
                key={i}
                className={isActive ? styles.itemActive : styles.item}
              >
                <Comment
                  author={
                    <EditSpeakerName
                      loading={loadingSpeaker}
                      speakers={speakers}
                      putSpeakerName={putSpeakerName}
                      id={item?.speaker_id}
                    />
                  }
                  avatar={
                    <AvatarSpeaker
                      onClick={() => onClickParagraph(item)}
                      speakers={speakers}
                      id={item?.speaker_id}
                    />
                  }
                  content={<div onClick={() => onClickParagraph(item)}>{item?.content}</div>}
                  datetime={<div onClick={() => onClickParagraph(item)}>{item?.datetime}</div>}
                />
              </li>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = ({ uploadManagement }) => ({
  searchKeyWordResult: get(uploadManagement, 'searchKeyWordResult.data.0', null),
  recordingCreatedAt: get(uploadManagement, 'recordingDetail.created_at', null),
});

export default connect(mapStateToProps)(Transcript);
