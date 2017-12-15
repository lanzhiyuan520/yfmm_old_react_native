/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import <RCTGetuiModule/RCTGetuiModule.h>
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
#import <UserNotifications/UserNotifications.h>
#endif
#define kGtAppId @"GVA23Sfmmw9zZHSL77Uoh5"
#define kGtAppKey @"5PcLAnFa7d9Qlzu6LJUXS9"
#define kGtAppSecret @"596q8Hcx0B6MInRexJYaK2"

@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate,GeTuiSdkDelegate>
@property (nonatomic, strong) UIWindow *window;

@end
