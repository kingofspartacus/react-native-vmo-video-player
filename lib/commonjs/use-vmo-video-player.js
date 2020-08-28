"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVmoVideoPlayer = useVmoVideoPlayer;

var _react = require("react");

var _reactNative = require("react-native");

var _resolveAssetSource = _interopRequireDefault(require("react-native/Libraries/Image/resolveAssetSource"));

var _videoResizeMode = _interopRequireDefault(require("./video-resize-mode"));

var _stringHelper = require("./utils/string-helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
function useVmoVideoPlayer(props) {
  var _nativeProps$drm;

  const [showPoster, setShowPoster] = (0, _react.useState)(!!(props === null || props === void 0 ? void 0 : props.showPoster));
  const refVideo = (0, _react.useRef)(null);
  const setNativeProps = (0, _react.useCallback)(nativeProps => {
    var _refVideo$current;

    (_refVideo$current = refVideo.current) === null || _refVideo$current === void 0 ? void 0 : _refVideo$current.setNativeProps(nativeProps);
  }, []);
  const seek = (0, _react.useCallback)((time, tolerance = 100) => {
    if (isNaN(time)) {
      throw new Error('Specified time is not a number');
    }

    if (_reactNative.Platform.OS === 'ios') {
      setNativeProps({
        seek: {
          time,
          tolerance
        }
      });
    } else {
      setNativeProps({
        seek: time
      });
    }
  }, [setNativeProps]);
  const presentFullscreenPlayer = (0, _react.useCallback)(() => {
    setNativeProps({
      fullscreen: true
    });
  }, [setNativeProps]);
  const dismissFullscreenPlayer = (0, _react.useCallback)(() => {
    setNativeProps({
      fullscreen: false
    });
  }, [setNativeProps]);
  const save = (0, _react.useCallback)(() => async (options = {}) => {
    return await _reactNative.NativeModules.VideoManager.save(options, (0, _reactNative.findNodeHandle)(refVideo.current));
  }, []);
  const restoreUserInterfaceForPictureInPictureStopCompleted = (0, _react.useCallback)(restored => {
    setNativeProps({
      restoreUserInterfaceForPIPStopCompletionHandler: restored
    });
  }, [setNativeProps]);
  const onVideoLoadStart = (0, _react.useCallback)(event => {
    var _props$onLoadStart;

    props === null || props === void 0 ? void 0 : (_props$onLoadStart = props.onLoadStart) === null || _props$onLoadStart === void 0 ? void 0 : _props$onLoadStart.call(props, event.nativeEvent);
  }, [props]);
  const onVideoLoad = (0, _react.useCallback)(event => {
    var _props$onLoad;

    props === null || props === void 0 ? void 0 : (_props$onLoad = props.onLoad) === null || _props$onLoad === void 0 ? void 0 : _props$onLoad.call(props, event.nativeEvent);
  }, [props]);
  const onVideoError = (0, _react.useCallback)(event => {
    var _props$onError;

    props === null || props === void 0 ? void 0 : (_props$onError = props.onError) === null || _props$onError === void 0 ? void 0 : _props$onError.call(props, event.nativeEvent);
  }, [props]);
  const onVideoProgress = (0, _react.useCallback)(event => {
    var _props$onProgress;

    props === null || props === void 0 ? void 0 : (_props$onProgress = props.onProgress) === null || _props$onProgress === void 0 ? void 0 : _props$onProgress.call(props, event.nativeEvent);
  }, [props]);
  const onVideoBandwidthUpdate = (0, _react.useCallback)(event => {
    var _props$onBandwidthUpd;

    props === null || props === void 0 ? void 0 : (_props$onBandwidthUpd = props.onBandwidthUpdate) === null || _props$onBandwidthUpd === void 0 ? void 0 : _props$onBandwidthUpd.call(props, event.nativeEvent);
  }, [props]);
  const onVideoSeek = (0, _react.useCallback)(event => {
    var _props$onSeek;

    props === null || props === void 0 ? void 0 : (_props$onSeek = props.onSeek) === null || _props$onSeek === void 0 ? void 0 : _props$onSeek.call(props, event.nativeEvent);
  }, [props]);
  const onVideoEnd = (0, _react.useCallback)(event => {
    var _props$onEnd;

    props === null || props === void 0 ? void 0 : (_props$onEnd = props.onEnd) === null || _props$onEnd === void 0 ? void 0 : _props$onEnd.call(props, event.nativeEvent);
  }, [props]);
  const onTimedMetadata = (0, _react.useCallback)(event => {
    var _props$onTimedMetadat;

    props === null || props === void 0 ? void 0 : (_props$onTimedMetadat = props.onTimedMetadata) === null || _props$onTimedMetadat === void 0 ? void 0 : _props$onTimedMetadat.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerWillPresent = (0, _react.useCallback)(event => {
    var _props$onFullscreenPl;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl = props.onFullscreenPlayerWillPresent) === null || _props$onFullscreenPl === void 0 ? void 0 : _props$onFullscreenPl.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerDidPresent = (0, _react.useCallback)(event => {
    var _props$onFullscreenPl2;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl2 = props.onFullscreenPlayerDidPresent) === null || _props$onFullscreenPl2 === void 0 ? void 0 : _props$onFullscreenPl2.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerWillDismiss = (0, _react.useCallback)(event => {
    var _props$onFullscreenPl3;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl3 = props.onFullscreenPlayerWillDismiss) === null || _props$onFullscreenPl3 === void 0 ? void 0 : _props$onFullscreenPl3.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerDidDismiss = (0, _react.useCallback)(event => {
    var _props$onFullscreenPl4;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl4 = props.onFullscreenPlayerDidDismiss) === null || _props$onFullscreenPl4 === void 0 ? void 0 : _props$onFullscreenPl4.call(props, event.nativeEvent);
  }, [props]);
  const onReadyForDisplay = (0, _react.useCallback)(event => {
    if (props.audioOnly && showPoster) {
      setShowPoster(prev => ({ ...prev,
        showPoster: false
      }));
    } else {
      var _props$onReadyForDisp;

      props === null || props === void 0 ? void 0 : (_props$onReadyForDisp = props.onReadyForDisplay) === null || _props$onReadyForDisp === void 0 ? void 0 : _props$onReadyForDisp.call(props, event.nativeEvent);
    }
  }, [props, showPoster]);
  const onPlaybackStalled = (0, _react.useCallback)(event => {
    var _props$onPlaybackStal;

    props === null || props === void 0 ? void 0 : (_props$onPlaybackStal = props.onPlaybackStalled) === null || _props$onPlaybackStal === void 0 ? void 0 : _props$onPlaybackStal.call(props, event.nativeEvent);
  }, [props]);
  const onPlaybackResume = (0, _react.useCallback)(event => {
    var _props$onPlaybackResu;

    props === null || props === void 0 ? void 0 : (_props$onPlaybackResu = props.onPlaybackResume) === null || _props$onPlaybackResu === void 0 ? void 0 : _props$onPlaybackResu.call(props, event.nativeEvent);
  }, [props]);
  const onPlaybackRateChange = (0, _react.useCallback)(event => {
    var _props$onPlaybackRate;

    props === null || props === void 0 ? void 0 : (_props$onPlaybackRate = props.onPlaybackRateChange) === null || _props$onPlaybackRate === void 0 ? void 0 : _props$onPlaybackRate.call(props, event.nativeEvent);
  }, [props]);
  const onVideoExternalPlaybackChange = (0, _react.useCallback)(event => {
    var _props$onExternalPlay;

    props === null || props === void 0 ? void 0 : (_props$onExternalPlay = props.onExternalPlaybackChange) === null || _props$onExternalPlay === void 0 ? void 0 : _props$onExternalPlay.call(props, event.nativeEvent);
  }, [props]);
  const onAudioBecomingNoisy = (0, _react.useCallback)(() => {
    var _props$onAudioBecomin;

    props === null || props === void 0 ? void 0 : (_props$onAudioBecomin = props.onAudioBecomingNoisyfnc) === null || _props$onAudioBecomin === void 0 ? void 0 : _props$onAudioBecomin.call(props);
  }, [props]);
  const onPictureInPictureStatusChanged = (0, _react.useCallback)(event => {
    var _props$onPictureInPic;

    props === null || props === void 0 ? void 0 : (_props$onPictureInPic = props.onPictureInPictureStatusChanged) === null || _props$onPictureInPic === void 0 ? void 0 : _props$onPictureInPic.call(props, event.nativeEvent);
  }, [props]);
  const onRestoreUserInterfaceForPictureInPictureStop = (0, _react.useCallback)(event => {
    var _props$onRestoreUserI;

    props === null || props === void 0 ? void 0 : (_props$onRestoreUserI = props.onRestoreUserInterfaceForPictureInPictureStop) === null || _props$onRestoreUserI === void 0 ? void 0 : _props$onRestoreUserI.call(props, event.nativeEvent);
  }, [props]);
  const onAudioFocusChanged = (0, _react.useCallback)(event => {
    var _props$onAudioFocusCh;

    props === null || props === void 0 ? void 0 : (_props$onAudioFocusCh = props.onAudioFocusChanged) === null || _props$onAudioFocusCh === void 0 ? void 0 : _props$onAudioFocusCh.call(props, event.nativeEvent);
  }, [props]);
  const onVideoBuffer = (0, _react.useCallback)(event => {
    var _props$onBuffer;

    props === null || props === void 0 ? void 0 : (_props$onBuffer = props.onBuffer) === null || _props$onBuffer === void 0 ? void 0 : _props$onBuffer.call(props, event.nativeEvent);
  }, [props]);
  const onGetLicense = (0, _react.useCallback)(event => {
    if (props.drm && props.drm.getLicense instanceof Function) {
      const data = event.nativeEvent;

      if (data && data.spc) {
        const getLicenseOverride = props.drm.getLicense(data.spc, data.contentId, data.spcBase64, props);
        const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.

        getLicensePromise.then(result => {
          if (result !== undefined) {
            _reactNative.NativeModules.VideoManager.setLicenseResult(result, (0, _reactNative.findNodeHandle)(refVideo.current));
          } else {
            _reactNative.NativeModules.VideoManager.setLicenseError && _reactNative.NativeModules.VideoManager.setLicenseError('Empty license result', (0, _reactNative.findNodeHandle)(refVideo.current));
          }
        }).catch(error => {
          _reactNative.NativeModules.VideoManager.setLicenseError && _reactNative.NativeModules.VideoManager.setLicenseError(error, (0, _reactNative.findNodeHandle)(refVideo.current));
        });
      } else {
        _reactNative.NativeModules.VideoManager.setLicenseError && _reactNative.NativeModules.VideoManager.setLicenseError('No spc received', (0, _reactNative.findNodeHandle)(refVideo.current));
      }
    }
  }, [props]);
  const getViewManagerConfig = (0, _react.useCallback)(viewManagerName => {
    if (!_reactNative.NativeModules.UIManager.getViewManagerConfig) {
      return _reactNative.NativeModules.UIManager[viewManagerName];
    }

    return _reactNative.NativeModules.UIManager.getViewManagerConfig(viewManagerName);
  }, []);
  const resizeMode = props === null || props === void 0 ? void 0 : props.resizeMode;
  const source = (0, _resolveAssetSource.default)(props === null || props === void 0 ? void 0 : props.source) || {};
  const shouldCache = !(source === null || source === void 0 ? void 0 : source.__packager_asset);
  let uri = source.uri || '';

  if (uri && uri.match(/^\//)) {
    uri = "file://".concat(uri);
  }

  if (!uri) {
    console.warn('Trying to load empty source.');
  }

  const isNetwork = !!(uri && uri.match(/^https?:/));
  const isAsset = !!(uri && uri.match(/^(assets-library|ipod-library|file|content|ms-appx|ms-appdata):/));
  let nativeResizeMode;
  const VideoPlayerInstance = getViewManagerConfig('VideoPlayer');

  if (resizeMode === _videoResizeMode.default.stretch) {
    nativeResizeMode = VideoPlayerInstance.Constants.ScaleToFill;
  } else if (resizeMode === _videoResizeMode.default.contain) {
    nativeResizeMode = VideoPlayerInstance.Constants.ScaleAspectFit;
  } else if (resizeMode === _videoResizeMode.default.cover) {
    nativeResizeMode = VideoPlayerInstance.Constants.ScaleAspectFill;
  } else {
    nativeResizeMode = VideoPlayerInstance.Constants.ScaleNone;
  }

  const nativeProps = Object.assign({}, props);
  Object.assign(nativeProps, {
    style: [{
      overflow: 'hidden'
    }, nativeProps === null || nativeProps === void 0 ? void 0 : nativeProps.style],
    resizeMode: nativeResizeMode,
    src: {
      uri,
      isNetwork,
      isAsset,
      shouldCache,
      type: source.type || '',
      mainVer: source.mainVer || 0,
      patchVer: source.patchVer || 0,
      requestHeaders: source.headers ? (0, _stringHelper.stringsOnlyObject)(source.headers) : {}
    },
    onVideoLoadStart,
    onVideoLoad,
    onVideoError,
    onVideoProgress,
    onVideoSeek,
    onVideoEnd,
    onVideoBuffer,
    onVideoBandwidthUpdate,
    onTimedMetadata,
    onVideoAudioBecomingNoisy: onAudioBecomingNoisy,
    onVideoExternalPlaybackChange,
    onVideoFullscreenPlayerWillPresent,
    onVideoFullscreenPlayerDidPresent,
    onVideoFullscreenPlayerWillDismiss,
    onVideoFullscreenPlayerDidDismiss,
    onReadyForDisplay,
    onPlaybackStalled,
    onPlaybackResume,
    onPlaybackRateChange,
    onAudioFocusChanged,
    onAudioBecomingNoisy,
    onGetLicense: nativeProps.drm && (nativeProps === null || nativeProps === void 0 ? void 0 : (_nativeProps$drm = nativeProps.drm) === null || _nativeProps$drm === void 0 ? void 0 : _nativeProps$drm.getLicense) && onGetLicense,
    onPictureInPictureStatusChanged,
    onRestoreUserInterfaceForPictureInPictureStop
  });
  return {
    nativeProps,
    seek,
    save,
    presentFullscreenPlayer,
    dismissFullscreenPlayer,
    restoreUserInterfaceForPictureInPictureStopCompleted,
    refVideo,
    showPoster
  };
}
//# sourceMappingURL=use-vmo-video-player.js.map