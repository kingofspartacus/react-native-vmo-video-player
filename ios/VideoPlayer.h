#import <AVFoundation/AVFoundation.h>
#import "AVKit/AVKit.h"
#import "UIView+FindUIViewController.h"
#import "VideoPlayerViewController.h"
#import "VideoPlayerViewControllerDelegate.h"
#import <React/RCTComponent.h>
#import <React/RCTBridgeModule.h>

#if __has_include(<react-native-vmo-video-player/VideoPlayerCache.h>)
#import <react-native-vmo-video-player/VideoPlayerCache.h>
#import <DVAssetLoaderDelegate/DVURLAsset.h>
#import <DVAssetLoaderDelegate/DVAssetLoaderDelegate.h>
#endif

@class RCTEventDispatcher;
#if __has_include(<react-native-vmo-video-player/VideoPlayerCache.h>)
@interface VideoPlayer : UIView <VideoPlayerViewControllerDelegate, DVAssetLoaderDelegatesDelegate, AVAssetResourceLoaderDelegate>
#elif TARGET_OS_TV
@interface VideoPlayer : UIView <VideoPlayerViewControllerDelegate, AVAssetResourceLoaderDelegate>
#else
@interface VideoPlayer : UIView <VideoPlayerViewControllerDelegate, AVPictureInPictureControllerDelegate, AVAssetResourceLoaderDelegate>
#endif

@property (nonatomic, copy) RCTDirectEventBlock onVideoLoadStart;
@property (nonatomic, copy) RCTDirectEventBlock onVideoLoad;
@property (nonatomic, copy) RCTDirectEventBlock onVideoBuffer;
@property (nonatomic, copy) RCTDirectEventBlock onVideoError;
@property (nonatomic, copy) RCTDirectEventBlock onVideoProgress;
@property (nonatomic, copy) RCTDirectEventBlock onBandwidthUpdate;
@property (nonatomic, copy) RCTDirectEventBlock onVideoSeek;
@property (nonatomic, copy) RCTDirectEventBlock onVideoEnd;
@property (nonatomic, copy) RCTDirectEventBlock onTimedMetadata;
@property (nonatomic, copy) RCTDirectEventBlock onVideoAudioBecomingNoisy;
@property (nonatomic, copy) RCTDirectEventBlock onVideoFullscreenPlayerWillPresent;
@property (nonatomic, copy) RCTDirectEventBlock onVideoFullscreenPlayerDidPresent;
@property (nonatomic, copy) RCTDirectEventBlock onVideoFullscreenPlayerWillDismiss;
@property (nonatomic, copy) RCTDirectEventBlock onVideoFullscreenPlayerDidDismiss;
@property (nonatomic, copy) RCTDirectEventBlock onReadyForDisplay;
@property (nonatomic, copy) RCTDirectEventBlock onPlaybackStalled;
@property (nonatomic, copy) RCTDirectEventBlock onPlaybackResume;
@property (nonatomic, copy) RCTDirectEventBlock onPlaybackRateChange;
@property (nonatomic, copy) RCTDirectEventBlock onVideoExternalPlaybackChange;
@property (nonatomic, copy) RCTDirectEventBlock onPictureInPictureStatusChanged;
@property (nonatomic, copy) RCTDirectEventBlock onRestoreUserInterfaceForPictureInPictureStop;
@property (nonatomic, copy) RCTDirectEventBlock onGetLicense;

typedef NS_ENUM(NSInteger, VideoPlayerError) {
    VideoPlayerErrorFromJSPart,
    VideoPlayerErrorLicenseRequestNotOk,
    VideoPlayerErrorNoDataFromLicenseRequest,
    VideoPlayerErrorNoSPC,
    VideoPlayerErrorNoDataRequest,
    VideoPlayerErrorNoCertificateData,
    VideoPlayerErrorNoCertificateURL,
    VideoPlayerErrorNoFairplayDRM,
    VideoPlayerErrorNoDRMData
};

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

- (AVPlayerViewController*)createPlayerViewController:(AVPlayer*)player withPlayerItem:(AVPlayerItem*)playerItem;

- (void)save:(NSDictionary *)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)setLicenseResult:(NSString * )license;
- (BOOL)setLicenseResultError:(NSString * )error;

@end
