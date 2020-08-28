import { useCallback, useRef, useState } from 'react';
import { Platform, findNodeHandle, NativeModules } from 'react-native'; // @ts-ignore

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import VideoResizeMode from './video-resize-mode';
import { stringsOnlyObject } from './utils/string-helper';
export function useVmoVideoPlayer(props) {
  var _nativeProps$drm;

  const [showPoster, setShowPoster] = useState(!!(props === null || props === void 0 ? void 0 : props.showPoster));
  const refVideo = useRef(null);
  const setNativeProps = useCallback(nativeProps => {
    var _refVideo$current;

    (_refVideo$current = refVideo.current) === null || _refVideo$current === void 0 ? void 0 : _refVideo$current.setNativeProps(nativeProps);
  }, []);
  const seek = useCallback((time, tolerance = 100) => {
    if (isNaN(time)) {
      throw new Error('Specified time is not a number');
    }

    if (Platform.OS === 'ios') {
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
  const presentFullscreenPlayer = useCallback(() => {
    setNativeProps({
      fullscreen: true
    });
  }, [setNativeProps]);
  const dismissFullscreenPlayer = useCallback(() => {
    setNativeProps({
      fullscreen: false
    });
  }, [setNativeProps]);
  const save = useCallback(() => async (options = {}) => {
    return await NativeModules.VideoManager.save(options, findNodeHandle(refVideo.current));
  }, []);
  const restoreUserInterfaceForPictureInPictureStopCompleted = useCallback(restored => {
    setNativeProps({
      restoreUserInterfaceForPIPStopCompletionHandler: restored
    });
  }, [setNativeProps]);
  const onVideoLoadStart = useCallback(event => {
    var _props$onLoadStart;

    props === null || props === void 0 ? void 0 : (_props$onLoadStart = props.onLoadStart) === null || _props$onLoadStart === void 0 ? void 0 : _props$onLoadStart.call(props, event.nativeEvent);
  }, [props]);
  const onVideoLoad = useCallback(event => {
    var _props$onLoad;

    props === null || props === void 0 ? void 0 : (_props$onLoad = props.onLoad) === null || _props$onLoad === void 0 ? void 0 : _props$onLoad.call(props, event.nativeEvent);
  }, [props]);
  const onVideoError = useCallback(event => {
    var _props$onError;

    props === null || props === void 0 ? void 0 : (_props$onError = props.onError) === null || _props$onError === void 0 ? void 0 : _props$onError.call(props, event.nativeEvent);
  }, [props]);
  const onVideoProgress = useCallback(event => {
    var _props$onProgress;

    props === null || props === void 0 ? void 0 : (_props$onProgress = props.onProgress) === null || _props$onProgress === void 0 ? void 0 : _props$onProgress.call(props, event.nativeEvent);
  }, [props]);
  const onVideoBandwidthUpdate = useCallback(event => {
    var _props$onBandwidthUpd;

    props === null || props === void 0 ? void 0 : (_props$onBandwidthUpd = props.onBandwidthUpdate) === null || _props$onBandwidthUpd === void 0 ? void 0 : _props$onBandwidthUpd.call(props, event.nativeEvent);
  }, [props]);
  const onVideoSeek = useCallback(event => {
    var _props$onSeek;

    props === null || props === void 0 ? void 0 : (_props$onSeek = props.onSeek) === null || _props$onSeek === void 0 ? void 0 : _props$onSeek.call(props, event.nativeEvent);
  }, [props]);
  const onVideoEnd = useCallback(event => {
    var _props$onEnd;

    props === null || props === void 0 ? void 0 : (_props$onEnd = props.onEnd) === null || _props$onEnd === void 0 ? void 0 : _props$onEnd.call(props, event.nativeEvent);
  }, [props]);
  const onTimedMetadata = useCallback(event => {
    var _props$onTimedMetadat;

    props === null || props === void 0 ? void 0 : (_props$onTimedMetadat = props.onTimedMetadata) === null || _props$onTimedMetadat === void 0 ? void 0 : _props$onTimedMetadat.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerWillPresent = useCallback(event => {
    var _props$onFullscreenPl;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl = props.onFullscreenPlayerWillPresent) === null || _props$onFullscreenPl === void 0 ? void 0 : _props$onFullscreenPl.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerDidPresent = useCallback(event => {
    var _props$onFullscreenPl2;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl2 = props.onFullscreenPlayerDidPresent) === null || _props$onFullscreenPl2 === void 0 ? void 0 : _props$onFullscreenPl2.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerWillDismiss = useCallback(event => {
    var _props$onFullscreenPl3;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl3 = props.onFullscreenPlayerWillDismiss) === null || _props$onFullscreenPl3 === void 0 ? void 0 : _props$onFullscreenPl3.call(props, event.nativeEvent);
  }, [props]);
  const onVideoFullscreenPlayerDidDismiss = useCallback(event => {
    var _props$onFullscreenPl4;

    props === null || props === void 0 ? void 0 : (_props$onFullscreenPl4 = props.onFullscreenPlayerDidDismiss) === null || _props$onFullscreenPl4 === void 0 ? void 0 : _props$onFullscreenPl4.call(props, event.nativeEvent);
  }, [props]);
  const onReadyForDisplay = useCallback(event => {
    if (props.audioOnly && showPoster) {
      setShowPoster(prev => ({ ...prev,
        showPoster: false
      }));
    } else {
      var _props$onReadyForDisp;

      props === null || props === void 0 ? void 0 : (_props$onReadyForDisp = props.onReadyForDisplay) === null || _props$onReadyForDisp === void 0 ? void 0 : _props$onReadyForDisp.call(props, event.nativeEvent);
    }
  }, [props, showPoster]);
  const onPlaybackStalled = useCallback(event => {
    var _props$onPlaybackStal;

    props === null || props === void 0 ? void 0 : (_props$onPlaybackStal = props.onPlaybackStalled) === null || _props$onPlaybackStal === void 0 ? void 0 : _props$onPlaybackStal.call(props, event.nativeEvent);
  }, [props]);
  const onPlaybackResume = useCallback(event => {
    var _props$onPlaybackResu;

    props === null || props === void 0 ? void 0 : (_props$onPlaybackResu = props.onPlaybackResume) === null || _props$onPlaybackResu === void 0 ? void 0 : _props$onPlaybackResu.call(props, event.nativeEvent);
  }, [props]);
  const onPlaybackRateChange = useCallback(event => {
    var _props$onPlaybackRate;

    props === null || props === void 0 ? void 0 : (_props$onPlaybackRate = props.onPlaybackRateChange) === null || _props$onPlaybackRate === void 0 ? void 0 : _props$onPlaybackRate.call(props, event.nativeEvent);
  }, [props]);
  const onVideoExternalPlaybackChange = useCallback(event => {
    var _props$onExternalPlay;

    props === null || props === void 0 ? void 0 : (_props$onExternalPlay = props.onExternalPlaybackChange) === null || _props$onExternalPlay === void 0 ? void 0 : _props$onExternalPlay.call(props, event.nativeEvent);
  }, [props]);
  const onAudioBecomingNoisy = useCallback(() => {
    var _props$onAudioBecomin;

    props === null || props === void 0 ? void 0 : (_props$onAudioBecomin = props.onAudioBecomingNoisyfnc) === null || _props$onAudioBecomin === void 0 ? void 0 : _props$onAudioBecomin.call(props);
  }, [props]);
  const onPictureInPictureStatusChanged = useCallback(event => {
    var _props$onPictureInPic;

    props === null || props === void 0 ? void 0 : (_props$onPictureInPic = props.onPictureInPictureStatusChanged) === null || _props$onPictureInPic === void 0 ? void 0 : _props$onPictureInPic.call(props, event.nativeEvent);
  }, [props]);
  const onRestoreUserInterfaceForPictureInPictureStop = useCallback(event => {
    var _props$onRestoreUserI;

    props === null || props === void 0 ? void 0 : (_props$onRestoreUserI = props.onRestoreUserInterfaceForPictureInPictureStop) === null || _props$onRestoreUserI === void 0 ? void 0 : _props$onRestoreUserI.call(props, event.nativeEvent);
  }, [props]);
  const onAudioFocusChanged = useCallback(event => {
    var _props$onAudioFocusCh;

    props === null || props === void 0 ? void 0 : (_props$onAudioFocusCh = props.onAudioFocusChanged) === null || _props$onAudioFocusCh === void 0 ? void 0 : _props$onAudioFocusCh.call(props, event.nativeEvent);
  }, [props]);
  const onVideoBuffer = useCallback(event => {
    var _props$onBuffer;

    props === null || props === void 0 ? void 0 : (_props$onBuffer = props.onBuffer) === null || _props$onBuffer === void 0 ? void 0 : _props$onBuffer.call(props, event.nativeEvent);
  }, [props]);
  const onGetLicense = useCallback(event => {
    if (props.drm && props.drm.getLicense instanceof Function) {
      const data = event.nativeEvent;

      if (data && data.spc) {
        const getLicenseOverride = props.drm.getLicense(data.spc, data.contentId, data.spcBase64, props);
        const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.

        getLicensePromise.then(result => {
          if (result !== undefined) {
            NativeModules.VideoManager.setLicenseResult(result, findNodeHandle(refVideo.current));
          } else {
            NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('Empty license result', findNodeHandle(refVideo.current));
          }
        }).catch(error => {
          NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError(error, findNodeHandle(refVideo.current));
        });
      } else {
        NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('No spc received', findNodeHandle(refVideo.current));
      }
    }
  }, [props]);
  const getViewManagerConfig = useCallback(viewManagerName => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName];
    }

    return NativeModules.UIManager.getViewManagerConfig(viewManagerName);
  }, []);
  const resizeMode = props === null || props === void 0 ? void 0 : props.resizeMode;
  const source = resolveAssetSource(props === null || props === void 0 ? void 0 : props.source) || {};
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

  if (resizeMode === VideoResizeMode.stretch) {
    nativeResizeMode = VideoPlayerInstance.Constants.ScaleToFill;
  } else if (resizeMode === VideoResizeMode.contain) {
    nativeResizeMode = VideoPlayerInstance.Constants.ScaleAspectFit;
  } else if (resizeMode === VideoResizeMode.cover) {
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
      requestHeaders: source.headers ? stringsOnlyObject(source.headers) : {}
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