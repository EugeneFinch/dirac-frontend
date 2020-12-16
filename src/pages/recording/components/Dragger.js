import React from 'react';
import { message, Upload } from 'antd';
import upload from '@/assets/upload.svg';
import { getToken } from '@/utils/utils';

const { Dragger } = Upload;

const token = getToken();

export default () => {
  const props = {
    name: 'file',
    accept: 'audio/*',
    headers: {
      Authorization: token,
    },
    action: 'https://api.diracnlp.com/upload',
    // showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <img src={upload} alt="upload" width={60} height={60} />
      </p>
      <p className="ant-upload-text">Upload audio file to generate a transcript</p>
      <p className="ant-upload-hint">
        Drag and drop <b>MP3</b> or <b>WAV</b> or <b>M4A</b> file to here to select files to upload.
      </p>
    </Dragger>
  );
};
