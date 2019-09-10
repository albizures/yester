/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNSplashScreen.h>
#import <React/RCTLinkingManager.h>
// #import <StoreKit/StoreKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Yester"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  // [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
  [[FBSDKApplicationDelegate sharedInstance] application:application
   
    didFinishLaunchingWithOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [RNSplashScreen show];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

 - (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  // Add any custom logic here.
  return handled;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
  restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
/*
- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray *)transactions{
  for(SKPaymentTransaction *transaction in transactions){
    switch(transaction.transactionState){
      case SKPaymentTransactionStatePurchasing:
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        NSLog(@"Transaction state -> Purchasing");
        break;
      case SKPaymentTransactionStatePurchased:
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        NSLog(@"Transaction state -> Purchased");
        break;
      case SKPaymentTransactionStateRestored:
        NSLog(@"Transaction state -> Restored");
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        break;
      case SKPaymentTransactionStateFailed:
        if(transaction.error.code == SKErrorPaymentCancelled){
          NSLog(@"Transaction state -> Cancelled");
        }
        [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
        break;
    }
  }
}
*/
@end
