//
//  VideoPlayerViewController.h
//  Pods
//
//  Created by Thân Nông on 8/14/20.
//

#import <AVKit/AVKit.h>
#import "VideoPlayer.h"
#import "VideoPlayerViewControllerDelegate.h"

@interface VideoPlayerViewController : AVPlayerViewController
@property (nonatomic, weak) id<VideoPlayerViewControllerDelegate> rctDelegate;

// Optional paramters
@property (nonatomic, weak) NSString* preferredOrientation;
@property (nonatomic) BOOL autorotate;

@end
