import React, { useState } from 'react';
import { Select, Card, Tag } from 'antd';
import uniq from 'lodash/uniq';

const { Option } = Select;

const OPTIONS = [
  {
    label: 'Next Steps',
    key: 'next_steps',
    color: '#2db7f5',
  },
  {
    label: 'Budget',
    key: 'budget',
    color: '#87d068',
  },
];

export default function KeywordSearch() {
  const [value, setValue] = useState([]);
  function handleChange(v) {
    setValue(v);
  }

  function onClickTag(v) {
    handleChange(uniq([...value, v]));
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
    </Card>
  );
}
