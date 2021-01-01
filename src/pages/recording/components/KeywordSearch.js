import React, { useState,useEffect } from 'react';
import { Select, Card, Tag,Button, Radio  } from 'antd';
import uniq from 'lodash/uniq';
import { connect } from 'umi';
import { get } from 'lodash';

const { Option } = Select;

const OPTIONS = [
  {
    label: 'Next Step',
    key: 'next_step',
    color: '#2db7f5',
  },
  {
    label: 'Budget',
    key: 'budget',
    color: '#87d068',
  },
];

function KeywordSearch({searchKeyWord}) {
  const [value, setValue] = useState([]);
  function handleChange(v) {
    setValue(v);
  }

  function onClickTag(v) {
    handleChange(uniq([...value, v]));
  }

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
      <div style={{ marginBottom: 15 }}>
        <Select value={value} mode="multiple" onChange={handleChange} style={{ width: 200 }}>
          {OPTIONS.map((v) => (
            <Option key={v.key}>{v.label}</Option>
          ))}
        </Select>
      </div>

      <div>
        {OPTIONS.map((v) => (
          <Tag onClick={() => onClickTag(v.key)} key={v.key} color={v.color}>
            {v.label}
          </Tag>
        ))}
      </div>

      <div>
      <Button  onClick={()=> onActionChange('prev')}>
      Prev
        </Button>
        <Button onClick={()=> onActionChange('next')}>
        Next
        </Button>
      </div>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => ({
  searchKeyWord: (params) =>
    dispatch({
      type: 'uploadManagement/searchKeyWord',
      params,
    }),
});

export default connect(null, mapDispatchToProps)(KeywordSearch);
