//
//  VideoPlayerViewControllerDelegate.h
//  Pods
//
//  Created by Thân Nông on 8/14/20.

#import <Foundation/Foundation.h>
#import "AVKit/AVKit.h"

@protocol VideoPlayerViewControllerDelegate <NSObject>
- (void)videoPlayerViewControllerWillDismiss:(AVPlayerViewController *)playerViewController;
- (void)videoPlayerViewControllerDidDismiss:(AVPlayerViewController *)playerViewController;
@end
