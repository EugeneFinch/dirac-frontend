import React, { useState,useEffect } from 'react';
import { Select, Card, Tag,Button, Radio  } from 'antd';
import uniq from 'lodash/uniq';
import { connect } from 'umi';
import { get } from 'lodash';

const { Option } = Select;

function KeywordSearch({recordingDetail,refSearchKeyWord,searchKeyWord,getRefSearchKeyWord}) {

  const [value, setValue] = useState([]);
  function handleChange(v) {
    setValue(v);
  }

  function onClickTag(v) {
    handleChange(uniq([...value, v]));
  }

  useEffect(() => {
    if(!recordingDetail.id){
      return;
    }

    getRefSearchKeyWord({recording_id:recordingDetail.id})
  },[getRefSearchKeyWord,recordingDetail.id])

  useEffect(() => {
    searchKeyWord({
      predefined_keyword:value.join(','),
      limit:1,
      page:1
    })
    
  }, [searchKeyWord, value])

  function onActionChange(v) {
    searchKeyWord({
      action:v,
      predefined_keyword:value.join(','),
      limit:1
    })
  }

  return (
    <Card title="Meeting Recap" style={{ width: 300, marginBottom: 15 }}>
      <div style={{ marginBottom: 10 }}>
        <Select value={value} mode="multiple" onChange={handleChange} style={{ width: 200 }}>
          {refSearchKeyWord.map((v) => (
            <Option key={v.code}>{v.name} - {v.total}</Option>
          ))}
        </Select>
      </div>

      <div>
        {refSearchKeyWord.map((v) => (
          <Tag style={{
            cursor: 'pointer',
            marginBottom:15
          }} onClick={() => onClickTag(v.code)} key={v.code} color={v.color}>
            {v.name} - {v.total}
          </Tag>
        ))}
      </div>

      <Button  onClick={()=> onActionChange('prev')}>
      Prev
        </Button>
        <Button onClick={()=> onActionChange('next')}>
        Next
        </Button>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  refSearchKeyWord : get(state,'uploadManagement.refSearchKeyWord'),
  recordingDetail : get(state,'uploadManagement.recordingDetail')
})

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
