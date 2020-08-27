import { useCallback, useRef, useState } from 'react';
import { Platform, findNodeHandle, NativeModules } from 'react-native';
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import VideoResizeMode from './video-resize-mode';
import { stringsOnlyObject } from './utils/string-helper';

export function useVmoVideoPlayer(props: any) {
  const [showPoster, setShowPoster] = useState(!!props?.showPoster);
  const refVideo = useRef<any>(null);

  const setNativeProps = useCallback((nativeProps) => {
    refVideo.current?.setNativeProps(nativeProps);
  }, []);

  const seek = useCallback(
    (time, tolerance = 100) => {
      if (isNaN(time)) {
        throw new Error('Specified time is not a number');
      }

      if (Platform.OS === 'ios') {
        setNativeProps({
          seek: {
            time,
            tolerance,
          },
        });
      } else {
        setNativeProps({ seek: time });
      }
    },
    [setNativeProps]
  );

  const presentFullscreenPlayer = useCallback(() => {
    setNativeProps({ fullscreen: true });
  }, [setNativeProps]);

  const dismissFullscreenPlayer = useCallback(() => {
    setNativeProps({ fullscreen: false });
  }, [setNativeProps]);

  const save = useCallback(
    () => async (options = {}) => {
      return await NativeModules.VideoManager.save(
        options,
        findNodeHandle(refVideo.current)
      );
    },
    []
  );

  const restoreUserInterfaceForPictureInPictureStopCompleted = useCallback(
    (restored) => {
      setNativeProps({
        restoreUserInterfaceForPIPStopCompletionHandler: restored,
      });
    },
    [setNativeProps]
  );

  const onVideoLoadStart = useCallback(
    (event) => {
      props?.onLoadStart?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoLoad = useCallback(
    (event) => {
      props?.onLoad?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoError = useCallback(
    (event) => {
      props?.onError?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoProgress = useCallback(
    (event) => {
      props?.onProgress?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoBandwidthUpdate = useCallback(
    (event) => {
      props?.onBandwidthUpdate?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoSeek = useCallback(
    (event) => {
      props?.onSeek?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoEnd = useCallback(
    (event) => {
      props?.onEnd?.(event.nativeEvent);
    },
    [props]
  );

  const onTimedMetadata = useCallback(
    (event) => {
      props?.onTimedMetadata?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoFullscreenPlayerWillPresent = useCallback(
    (event) => {
      props?.onFullscreenPlayerWillPresent?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoFullscreenPlayerDidPresent = useCallback(
    (event) => {
      props?.onFullscreenPlayerDidPresent?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoFullscreenPlayerWillDismiss = useCallback(
    (event) => {
      props?.onFullscreenPlayerWillDismiss?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoFullscreenPlayerDidDismiss = useCallback(
    (event) => {
      props?.onFullscreenPlayerDidDismiss?.(event.nativeEvent);
    },
    [props]
  );

  const onReadyForDisplay = useCallback(
    (event) => {
      if (props.audioOnly && showPoster) {
        setShowPoster((prev: any) => ({ ...prev, showPoster: false }));
      } else {
        props?.onReadyForDisplay?.(event.nativeEvent);
      }
    },
    [props, showPoster]
  );

  const onPlaybackStalled = useCallback(
    (event) => {
      props?.onPlaybackStalled?.(event.nativeEvent);
    },
    [props]
  );

  const onPlaybackResume = useCallback(
    (event) => {
      props?.onPlaybackResume?.(event.nativeEvent);
    },
    [props]
  );

  const onPlaybackRateChange = useCallback(
    (event) => {
      props?.onPlaybackRateChange?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoExternalPlaybackChange = useCallback(
    (event) => {
      props?.onExternalPlaybackChange?.(event.nativeEvent);
    },
    [props]
  );

  const onAudioBecomingNoisy = useCallback(() => {
    props?.onAudioBecomingNoisyfnc?.();
  }, [props]);

  const onPictureInPictureStatusChanged = useCallback(
    (event) => {
      props?.onPictureInPictureStatusChanged?.(event.nativeEvent);
    },
    [props]
  );

  const onRestoreUserInterfaceForPictureInPictureStop = useCallback(
    (event) => {
      props?.onRestoreUserInterfaceForPictureInPictureStop?.(event.nativeEvent);
    },
    [props]
  );

  const onAudioFocusChanged = useCallback(
    (event) => {
      props?.onAudioFocusChanged?.(event.nativeEvent);
    },
    [props]
  );

  const onVideoBuffer = useCallback(
    (event) => {
      props?.onBuffer?.(event.nativeEvent);
    },
    [props]
  );

  const onGetLicense = useCallback(
    (event) => {
      if (props.drm && props.drm.getLicense instanceof Function) {
        const data = event.nativeEvent;
        if (data && data.spc) {
          const getLicenseOverride = props.drm.getLicense(
            data.spc,
            data.contentId,
            data.spcBase64,
            props
          );
          const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
          getLicensePromise
            .then((result) => {
              if (result !== undefined) {
                NativeModules.VideoManager.setLicenseResult(
                  result,
                  findNodeHandle(refVideo.current)
                );
              } else {
                NativeModules.VideoManager.setLicenseError &&
                  NativeModules.VideoManager.setLicenseError(
                    'Empty license result',
                    findNodeHandle(refVideo.current)
                  );
              }
            })
            .catch((error) => {
              NativeModules.VideoManager.setLicenseError &&
                NativeModules.VideoManager.setLicenseError(
                  error,
                  findNodeHandle(refVideo.current)
                );
            });
        } else {
          NativeModules.VideoManager.setLicenseError &&
            NativeModules.VideoManager.setLicenseError(
              'No spc received',
              findNodeHandle(refVideo.current)
            );
        }
      }
    },
    [props]
  );

  const getViewManagerConfig = useCallback((viewManagerName) => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName];
    }
    return NativeModules.UIManager.getViewManagerConfig(viewManagerName);
  }, []);

  const resizeMode = props?.resizeMode;
  const source = resolveAssetSource(props?.source) || {};
  const shouldCache = !source?.__packager_asset;

  let uri = source.uri || '';
  if (uri && uri.match(/^\//)) {
    uri = `file://${uri}`;
  }

  if (!uri) {
    console.warn('Trying to load empty source.');
  }

  const isNetwork = !!(uri && uri.match(/^https?:/));
  const isAsset = !!(
    uri &&
    uri.match(/^(assets-library|ipod-library|file|content|ms-appx|ms-appdata):/)
  );

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
    style: [
      {
        overflow: 'hidden',
      },
      nativeProps?.style,
    ],
    resizeMode: nativeResizeMode,
    src: {
      uri,
      isNetwork,
      isAsset,
      shouldCache,
      type: source.type || '',
      mainVer: source.mainVer || 0,
      patchVer: source.patchVer || 0,
      requestHeaders: source.headers ? stringsOnlyObject(source.headers) : {},
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
    onGetLicense:
      nativeProps.drm && nativeProps?.drm?.getLicense && onGetLicense,
    onPictureInPictureStatusChanged,
    onRestoreUserInterfaceForPictureInPictureStop,
  });

  return {
    nativeProps,
    seek,
    save,
    presentFullscreenPlayer,
    dismissFullscreenPlayer,
    restoreUserInterfaceForPictureInPictureStopCompleted,
    refVideo,
    showPoster,
  };
}
