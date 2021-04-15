import React, { useEffect, useState } from 'react';
import {HorizontalBar} from "react-chartjs-2";
import { map } from 'lodash';
import config from '@/config';
import {DownloadOutlined} from "@ant-design/icons";
import styles from '../styles.less';

export default ({
                  userId,
                  getTalkToListenList
                }) => {
  const [listName, setListName] = useState([]);
  const [listListeningRatio, setListListeningRatio] = useState([]);
  const [listTalkingRatio, setListTalkingRatio] = useState([]);

  useEffect(() => {

    getTalkToListenList({ userId, cb: (result) => {
        setListName(map(result, v => v.name))
        setListListeningRatio(map(result, v => v.listen_ratio))
        setListTalkingRatio(map(result, v => v.talk_ratio))
      }})
  }, [userId]);

  const exportTalkToListen = () => {
    window.open(`${config.API_HOST}/analytics-talk-to-listen-export?userId=${userId}`)
  }

  const state = {
    labels: listName,
    position: 'bottom',
    datasets: [
      {
        label: 'Time spend talking',
        backgroundColor: '#df9d9b',
        data: listTalkingRatio
      },
      {
        label: 'Time spent listening to prospect',
        backgroundColor: '#bdd5ac',
        data: listListeningRatio
      }
    ]
  }

  return (
    <div className={styles.analyticContainer}>
      <DownloadOutlined onClick={exportTalkToListen} className={styles.exportIcon} />
      <HorizontalBar
        width={10}
        height={5}
        data={state}
        options={
          {
            title:{
              display:true,
              text:'How much time do we spend talking vs listening',
              fontSize:20,
              position: 'top'
            },
            legend:{
              display:true,
              position:'bottom'
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontFamily: "'Open Sans Bold', sans-serif",
                  beginAtZero:true,
                  mirror: true,
                  fontSize:12
                },
                stacked: true
              }],
              yAxes: [{
                gridLines: {
                  display:false,
                  color: "#fff",
                  zeroLineColor: "#fff",
                  zeroLineWidth: 0
                },
                ticks: {
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize:12,
                },
                stacked: true
              }],
            },
          }}
      />
    </div>

  );
};
