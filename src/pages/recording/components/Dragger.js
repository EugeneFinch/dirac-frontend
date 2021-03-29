import React from 'react';
import { message, Upload, Button } from 'antd';
import { getToken } from '@/utils/utils';
import config from '@/config';

const token = getToken();

export default () => {

  let hide;
  const props = {
    name: 'file',
    accept: 'audio/*',
    headers: {
      Authorization: token,
    },
    action: `${config.API_HOST}/upload`,
    showUploadList: false,
    onChange(info) {
      if(!hide) hide = message.loading('Uploading..', 0);
      if (info.file.status === 'uploading' && !info.event) {
        message.success(`${info.file.name} file upload started`);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        hide();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed`);
        hide();
      }
    },
  };

  return (
    <div className='ant-page-header-heading-left'>
    <Upload {...props}>
       <Button>Manual upload</Button>
    </Upload>
    </div>
  );
};
