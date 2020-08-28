"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TextTrackType", {
  enumerable: true,
  get: function () {
    return _textTrackType.default;
  }
});
Object.defineProperty(exports, "FilterType", {
  enumerable: true,
  get: function () {
    return _filterType.default;
  }
});
Object.defineProperty(exports, "DRMType", {
  enumerable: true,
  get: function () {
    return _drmType.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _useVmoVideoPlayer = require("./use-vmo-video-player");

var _textTrackType = _interopRequireDefault(require("./text-track-type"));

var _filterType = _interopRequireDefault(require("./filter-type"));

var _drmType = _interopRequireDefault(require("./drm-type"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const VideoPlayer = props => {
  const {
    nativeProps,
    refVideo,
    showPoster
  } = (0, _useVmoVideoPlayer.useVmoVideoPlayer)(props);
  const posterStyle = { ..._reactNative.StyleSheet.absoluteFillObject,
    resizeMode: (props === null || props === void 0 ? void 0 : props.posterResizeMode) || 'contain'
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: nativeProps.style
  }, /*#__PURE__*/_react.default.createElement(VMOVideoPlayer, _extends({
    ref: refVideo
  }, nativeProps, {
    style: _reactNative.StyleSheet.absoluteFill
  })), showPoster && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: posterStyle,
    source: {
      uri: props === null || props === void 0 ? void 0 : props.poster
    }
  }));
};

VideoPlayer.propTypes = {
  filter: _propTypes.default.oneOf([_filterType.default.NONE, _filterType.default.INVERT, _filterType.default.MONOCHROME, _filterType.default.POSTERIZE, _filterType.default.FALSE, _filterType.default.MAXIMUMCOMPONENT, _filterType.default.MINIMUMCOMPONENT, _filterType.default.CHROME, _filterType.default.FADE, _filterType.default.INSTANT, _filterType.default.MONO, _filterType.default.NOIR, _filterType.default.PROCESS, _filterType.default.TONAL, _filterType.default.TRANSFER, _filterType.default.SEPIA]),
  filterEnabled: _propTypes.default.bool,

  /* Native only */
  src: _propTypes.default.object,
  seek: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object]),
  fullscreen: _propTypes.default.bool,
  onVideoLoadStart: _propTypes.default.func,
  onVideoLoad: _propTypes.default.func,
  onVideoBuffer: _propTypes.default.func,
  onVideoError: _propTypes.default.func,
  onVideoProgress: _propTypes.default.func,
  onVideoBandwidthUpdate: _propTypes.default.func,
  onVideoSeek: _propTypes.default.func,
  onVideoEnd: _propTypes.default.func,
  onTimedMetadata: _propTypes.default.func,
  onVideoAudioBecomingNoisy: _propTypes.default.func,
  onVideoExternalPlaybackChange: _propTypes.default.func,
  onVideoFullscreenPlayerWillPresent: _propTypes.default.func,
  onVideoFullscreenPlayerDidPresent: _propTypes.default.func,
  onVideoFullscreenPlayerWillDismiss: _propTypes.default.func,
  onVideoFullscreenPlayerDidDismiss: _propTypes.default.func,

  /* Wrapper component */
  source: _propTypes.default.oneOfType([_propTypes.default.shape({
    uri: _propTypes.default.string
  }), // Opaque type returned by require('./video.mp4')
  _propTypes.default.number]),
  drm: _propTypes.default.shape({
    type: _propTypes.default.oneOf([_drmType.default.CLEARKEY, _drmType.default.FAIRPLAY, _drmType.default.WIDEVINE, _drmType.default.PLAYREADY]),
    licenseServer: _propTypes.default.string,
    headers: _propTypes.default.shape({}),
    base64Certificate: _propTypes.default.bool,
    certificateUrl: _propTypes.default.string,
    getLicense: _propTypes.default.func
  }),
  minLoadRetryCount: _propTypes.default.number,
  maxBitRate: _propTypes.default.number,
  resizeMode: _propTypes.default.string,
  poster: _propTypes.default.string,
  // @ts-ignore
  posterResizeMode: _reactNative.Image.propTypes.resizeMode,
  repeat: _propTypes.default.bool,
  automaticallyWaitsToMinimizeStalling: _propTypes.default.bool,
  allowsExternalPlayback: _propTypes.default.bool,
  selectedAudioTrack: _propTypes.default.shape({
    type: _propTypes.default.string.isRequired,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  }),
  selectedVideoTrack: _propTypes.default.shape({
    type: _propTypes.default.string.isRequired,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  }),
  selectedTextTrack: _propTypes.default.shape({
    type: _propTypes.default.string.isRequired,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  }),
  textTracks: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    uri: _propTypes.default.string.isRequired,
    type: _propTypes.default.oneOf([_textTrackType.default.SRT, _textTrackType.default.TTML, _textTrackType.default.VTT]),
    language: _propTypes.default.string.isRequired
  })),
  paused: _propTypes.default.bool,
  muted: _propTypes.default.bool,
  volume: _propTypes.default.number,
  bufferConfig: _propTypes.default.shape({
    minBufferMs: _propTypes.default.number,
    maxBufferMs: _propTypes.default.number,
    bufferForPlaybackMs: _propTypes.default.number,
    bufferForPlaybackAfterRebufferMs: _propTypes.default.number
  }),
  stereoPan: _propTypes.default.number,
  rate: _propTypes.default.number,
  pictureInPicture: _propTypes.default.bool,
  playInBackground: _propTypes.default.bool,
  preferredForwardBufferDuration: _propTypes.default.number,
  playWhenInactive: _propTypes.default.bool,
  ignoreSilentSwitch: _propTypes.default.oneOf(['ignore', 'obey']),
  reportBandwidth: _propTypes.default.bool,
  disableFocus: _propTypes.default.bool,
  controls: _propTypes.default.bool,
  audioOnly: _propTypes.default.bool,
  currentTime: _propTypes.default.number,
  fullscreenAutorotate: _propTypes.default.bool,
  fullscreenOrientation: _propTypes.default.oneOf(['all', 'landscape', 'portrait']),
  progressUpdateInterval: _propTypes.default.number,
  useTextureView: _propTypes.default.bool,
  hideShutterView: _propTypes.default.bool,
  onLoadStart: _propTypes.default.func,
  onLoad: _propTypes.default.func,
  onBuffer: _propTypes.default.func,
  onError: _propTypes.default.func,
  onProgress: _propTypes.default.func,
  onBandwidthUpdate: _propTypes.default.func,
  onSeek: _propTypes.default.func,
  onEnd: _propTypes.default.func,
  onFullscreenPlayerWillPresent: _propTypes.default.func,
  onFullscreenPlayerDidPresent: _propTypes.default.func,
  onFullscreenPlayerWillDismiss: _propTypes.default.func,
  onFullscreenPlayerDidDismiss: _propTypes.default.func,
  onReadyForDisplay: _propTypes.default.func,
  onPlaybackStalled: _propTypes.default.func,
  onPlaybackResume: _propTypes.default.func,
  onPlaybackRateChange: _propTypes.default.func,
  onAudioFocusChanged: _propTypes.default.func,
  onAudioBecomingNoisy: _propTypes.default.func,
  onPictureInPictureStatusChanged: _propTypes.default.func,
  needsToRestoreUserInterfaceForPictureInPictureStop: _propTypes.default.func,
  onExternalPlaybackChange: _propTypes.default.func,

  /* Required by react-native */
  scaleX: _propTypes.default.number,
  scaleY: _propTypes.default.number,
  translateX: _propTypes.default.number,
  translateY: _propTypes.default.number,
  rotation: _propTypes.default.number,
  ..._reactNative.ViewPropTypes
}; // @ts-ignore

const VMOVideoPlayer = (0, _reactNative.requireNativeComponent)('VideoPlayer', VideoPlayer, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true
  }
});
var _default = VideoPlayer;
exports.default = _default;
//# sourceMappingURL=index.js.map