/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import WaveSurfer from 'wavesurfer.js';

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

export default function Waveform({ url, onProcess }) {
  if (!url) return null;
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on('ready', function (e) {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on('audioprocess', function (e) {
      onProcess(e);
    });
    wavesurfer.current.on('seek', function (e) {
      if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.play();
      }
    });
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
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
    <div style={{ width: '100%', padding: '0 15px' }}>
      <div style={{ width: 80, display: 'inline-block', verticalAlign: 25 }}>
        {!playing ? (
          <PlayCircleTwoTone
            style={{ fontSize: 80 }}
            twoToneColor="#eb2f96"
            onClick={handlePlayPause}
          />
        ) : (
          <PauseCircleTwoTone
            style={{ fontSize: 80 }}
            twoToneColor="#52c41a"
            onClick={handlePlayPause}
          />
        )}
      </div>
      <div style={{ width: 'calc(100% - 80px)', display: 'inline-block', paddingLeft: 10 }}>
        <div id="waveform" ref={waveformRef} />
      </div>
      <div style={{ textAlign: 'right' }} className="controls">
        <label htmlFor="volume">Volume: </label>
        <input
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
      </div>
    </div>
  );
}
