/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { PlayCircleTwoTone, PauseCircleOutlined } from '@ant-design/icons';
import WaveSurfer from 'wavesurfer.js';
import { Spin } from 'antd';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#242424',
  progressColor: 'OrangeRed',
  cursorColor: 'OrangeRed',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 120,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url, onProcess, setRecordDuration, seekTime }) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [speed, setSpeed] = useState(1);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  if (!url) return null;

  useEffect(() => {
    wavesurfer?.current?.seekTo(seekTime);
  }, [seekTime]);

  useEffect(() => {
    setLoading(true);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on('ready', function () {
      if (wavesurfer.current) {
        setLoading(false);
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        setRecordDuration(wavesurfer.current.getDuration());
      }
    });

    wavesurfer.current.on('audioprocess', function (e) {
      onProcess(e / wavesurfer.current.getDuration());
    });

    wavesurfer.current.on('seek', function (e) {
      // if (wavesurfer.current.isPlaying()) {
      //   setPlay(false);
      // } else {
      //   setPlay(true);
      // }
      setPlay(true);
      wavesurfer.current.play();
      onProcess(e);
    });
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onSpeedChange = () => {
    wavesurfer.current.playPause();
    let newSpeed = 1;
    if(speed === 1) {
      newSpeed = 2;
    }
    if (newSpeed) {
      setSpeed(newSpeed);
      wavesurfer.current.setPlaybackRate(newSpeed || 1);
    }
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <Spin spinning={loading}>
      <div style={{ width: '100%', padding: '0 15px' }}>
        <div style={{ width: 80, display: 'inline-block', verticalAlign: 40 }}>
          {!playing ? (
            <PlayCircleTwoTone
              style={{ fontSize: 60 }}
              twoToneColor="orangered"
              onClick={handlePlayPause}
            />
          ) : (
            <PauseCircleOutlined
              style={{ fontSize: 60 }}
              twoToneColor="grey"
              onClick={handlePlayPause}
            />
          )}
        </div>
        <div style={{ width: 'calc(100% - 80px)', display: 'inline-block', paddingLeft: 10 }}>
          <div id="waveform" ref={waveformRef} />
        </div>
        <div style={{ textAlign: 'right', paddingBottom: 10 }} className="controls">
          <label htmlFor="volume">Volume: </label>
          <input
            style={{ verticalAlign: 'middle' }}
            type="range"
            id="volume"
            name="volume"
            // waveSurfer recognize value of `0` same as `1`
            //  so we need to set some zero-ish value for silence
            min="0.01"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
          <label htmlFor="volume">Speed: </label>
          <button
            style={{ verticalAlign: 'middle' }}
            onClick={onSpeedChange}
          >{speed === 1 ? '1x' : '2x'}</button>
        </div>
      </div>
    </Spin>
  );
}
