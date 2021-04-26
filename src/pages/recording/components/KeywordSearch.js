import React, { useState, useEffect } from 'react';
import { Select, Card, Tag, Button } from 'antd';
import uniq from 'lodash/uniq';
import { connect } from 'umi';
import { get } from 'lodash';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

function KeywordSearch({ recordingDetail, refSearchKeyWord, searchKeyWord, getRefSearchKeyWord }) {
  const [value, setValue] = useState([]);
  const [content, setContent] = useState('');
  const [pageSearchKeyWord, setPageSearchKeyWord] = useState(1);

  function handleChange(v) {
    setValue(v);
    searchKeyWord({
      predefined_keyword: v.join(','),
      limit: 1,
      page: 1,
      content
    });
  }

  function onClickTag(v) {
    let newValue = [];
    if(value.includes(v)){
      newValue = value.filter(val=>val !==v);
    }else{
      newValue = uniq([...value, v])
    }

    handleChange(newValue);
  }

  useEffect(() => {
    if (!recordingDetail.id) {
      return;
    }

    getRefSearchKeyWord({ recording_id: recordingDetail.id });
  }, [getRefSearchKeyWord, recordingDetail.id]);

  function onActionChange(v) {
    if(v === 'next') {
      setPageSearchKeyWord(pageSearchKeyWord + 1)
    } else {
      setPageSearchKeyWord(pageSearchKeyWord - 1)
    }

    searchKeyWord({
      action: v,
      predefined_keyword: value.join(','),
      limit: 1,
      page: pageSearchKeyWord,
      content,
    });
  }

  function onChangeContent (e){
    setContent(e.target.value)
  }

  function onEnter (){
    setPageSearchKeyWord(1);
    searchKeyWord({
      predefined_keyword: value.join(','),
      content,
      limit: 1,
      page: 1,
    });
  }

  return (
    <Card title="Call Trackers" style={{ width: 700 }}>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Search"
        onPressEnter={onEnter}
         value={content} onChange = {onChangeContent} prefix={<SearchOutlined />} />
      </div>

      <div>
        {refSearchKeyWord.map((v) => (
          <Tag
            style={{
              cursor: 'pointer',
              marginBottom: 15
            }}
            onClick={() => onClickTag(v.code)}
            key={v.code}
            className={value.includes(v.code) && v.code ? 'tag-choosen' : ''}
          >
            {v.name} - {v.total}
          </Tag>
        ))}
      </div>

      <Button onClick={() => onActionChange('prev')}>Prev</Button>
      <Button onClick={() => onActionChange('next')}>Next</Button>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  refSearchKeyWord: get(state, 'uploadManagement.refSearchKeyWord'),
  recordingDetail: get(state, 'uploadManagement.recordingDetail'),
});

const mapDispatchToProps = (dispatch) => ({
  searchKeyWord: (params) =>
    dispatch({
      type: 'uploadManagement/searchKeyWord',
      params,
    }),
  getRefSearchKeyWord: (params) =>
    dispatch({
      type: 'uploadManagement/getRefSearchKeyWord',
      params,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeywordSearch);
