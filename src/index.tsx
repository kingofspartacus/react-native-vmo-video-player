import React from 'react';
import {
  View,
  StyleSheet,
  requireNativeComponent,
  Image,
  ViewPropTypes,
} from 'react-native';
import { useVmoVideoPlayer } from './use-vmo-video-player';
import TextTrackType from './text-track-type';
import FilterType from './filter-type';
import DRMType from './drm-type';
import PropTypes from 'prop-types';

const VideoPlayer = (props: any) => {
  const { nativeProps, refVideo, showPoster } = useVmoVideoPlayer(props);
  const posterStyle = {
    ...StyleSheet.absoluteFillObject,
    resizeMode: props?.posterResizeMode || 'contain',
  };
  return (
    <View style={nativeProps.style}>
      <VMOVideoPlayer
        ref={refVideo}
        {...nativeProps}
        style={StyleSheet.absoluteFill}
      />
      {showPoster && (
        <Image style={posterStyle} source={{ uri: props?.poster }} />
      )}
    </View>
  );
};

VideoPlayer.propTypes = {
  filter: PropTypes.oneOf([
    FilterType.NONE,
    FilterType.INVERT,
    FilterType.MONOCHROME,
    FilterType.POSTERIZE,
    FilterType.FALSE,
    FilterType.MAXIMUMCOMPONENT,
    FilterType.MINIMUMCOMPONENT,
    FilterType.CHROME,
    FilterType.FADE,
    FilterType.INSTANT,
    FilterType.MONO,
    FilterType.NOIR,
    FilterType.PROCESS,
    FilterType.TONAL,
    FilterType.TRANSFER,
    FilterType.SEPIA,
  ]),
  filterEnabled: PropTypes.bool,
  /* Native only */
  src: PropTypes.object,
  seek: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  fullscreen: PropTypes.bool,
  onVideoLoadStart: PropTypes.func,
  onVideoLoad: PropTypes.func,
  onVideoBuffer: PropTypes.func,
  onVideoError: PropTypes.func,
  onVideoProgress: PropTypes.func,
  onVideoBandwidthUpdate: PropTypes.func,
  onVideoSeek: PropTypes.func,
  onVideoEnd: PropTypes.func,
  onTimedMetadata: PropTypes.func,
  onVideoAudioBecomingNoisy: PropTypes.func,
  onVideoExternalPlaybackChange: PropTypes.func,
  onVideoFullscreenPlayerWillPresent: PropTypes.func,
  onVideoFullscreenPlayerDidPresent: PropTypes.func,
  onVideoFullscreenPlayerWillDismiss: PropTypes.func,
  onVideoFullscreenPlayerDidDismiss: PropTypes.func,

  /* Wrapper component */
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    // Opaque type returned by require('./video.mp4')
    PropTypes.number,
  ]),
  drm: PropTypes.shape({
    type: PropTypes.oneOf([
      DRMType.CLEARKEY,
      DRMType.FAIRPLAY,
      DRMType.WIDEVINE,
      DRMType.PLAYREADY,
    ]),
    licenseServer: PropTypes.string,
    headers: PropTypes.shape({}),
    base64Certificate: PropTypes.bool,
    certificateUrl: PropTypes.string,
    getLicense: PropTypes.func,
  }),
  minLoadRetryCount: PropTypes.number,
  maxBitRate: PropTypes.number,
  resizeMode: PropTypes.string,
  poster: PropTypes.string,
  // @ts-ignore
  posterResizeMode: Image.propTypes.resizeMode,
  repeat: PropTypes.bool,
  automaticallyWaitsToMinimizeStalling: PropTypes.bool,
  allowsExternalPlayback: PropTypes.bool,
  selectedAudioTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  selectedVideoTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  selectedTextTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  textTracks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        TextTrackType.SRT,
        TextTrackType.TTML,
        TextTrackType.VTT,
      ]),
      language: PropTypes.string.isRequired,
    })
  ),
  paused: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  bufferConfig: PropTypes.shape({
    minBufferMs: PropTypes.number,
    maxBufferMs: PropTypes.number,
    bufferForPlaybackMs: PropTypes.number,
    bufferForPlaybackAfterRebufferMs: PropTypes.number,
  }),
  stereoPan: PropTypes.number,
  rate: PropTypes.number,
  pictureInPicture: PropTypes.bool,
  playInBackground: PropTypes.bool,
  preferredForwardBufferDuration: PropTypes.number,
  playWhenInactive: PropTypes.bool,
  ignoreSilentSwitch: PropTypes.oneOf(['ignore', 'obey']),
  reportBandwidth: PropTypes.bool,
  disableFocus: PropTypes.bool,
  controls: PropTypes.bool,
  audioOnly: PropTypes.bool,
  currentTime: PropTypes.number,
  fullscreenAutorotate: PropTypes.bool,
  fullscreenOrientation: PropTypes.oneOf(['all', 'landscape', 'portrait']),
  progressUpdateInterval: PropTypes.number,
  useTextureView: PropTypes.bool,
  hideShutterView: PropTypes.bool,
  onLoadStart: PropTypes.func,
  onLoad: PropTypes.func,
  onBuffer: PropTypes.func,
  onError: PropTypes.func,
  onProgress: PropTypes.func,
  onBandwidthUpdate: PropTypes.func,
  onSeek: PropTypes.func,
  onEnd: PropTypes.func,
  onFullscreenPlayerWillPresent: PropTypes.func,
  onFullscreenPlayerDidPresent: PropTypes.func,
  onFullscreenPlayerWillDismiss: PropTypes.func,
  onFullscreenPlayerDidDismiss: PropTypes.func,
  onReadyForDisplay: PropTypes.func,
  onPlaybackStalled: PropTypes.func,
  onPlaybackResume: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onAudioFocusChanged: PropTypes.func,
  onAudioBecomingNoisy: PropTypes.func,
  onPictureInPictureStatusChanged: PropTypes.func,
  needsToRestoreUserInterfaceForPictureInPictureStop: PropTypes.func,
  onExternalPlaybackChange: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...ViewPropTypes,
};

// @ts-ignore
const VMOVideoPlayer = requireNativeComponent('VideoPlayer', VideoPlayer, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true,
  },
});

export { TextTrackType, FilterType, DRMType };
export default VideoPlayer;
