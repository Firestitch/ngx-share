import { AnyShare, CopyShare, EmailShare, InstagramShare, LinkedInShare, MessengerShare, PinterestShare, RedditShare, SnapchatShare, TelegramShare, TikTokShare, TumblrShare, TwitterShare, WhatsAppShare } from "../classes/platforms";
import { FacebookShare } from "../classes/platforms/facebook";
import { Platform } from "../enums/platform.emun";

import { ShareConfig } from "../interfaces";

export function createShare(platform: Platform, config: ShareConfig) {
  switch (platform) {
    case Platform.Facebook:
      return new FacebookShare(config);

    case Platform.Twitter:
        return new TwitterShare(config);

    case Platform.LinkedIn:
      return new LinkedInShare(config);

    case Platform.WhatsApp:
      return new WhatsAppShare(config);

    case Platform.Telegram:
      return new TelegramShare(config);

    case Platform.Tumblr:
      return new TumblrShare(config);

    case Platform.Reddit:
      return new RedditShare(config);

    case Platform.Messenger:
      return new MessengerShare(config);

    case Platform.Pinterest:
      return new PinterestShare(config);

    case Platform.Instagram:
      return new InstagramShare(config);

    case Platform.TikTok:
      return new TikTokShare(config);

    case Platform.Snapchat:
      return new SnapchatShare(config);
    
    case Platform.Copy:
      return new CopyShare(config);

    case Platform.Email:
      return new EmailShare(config);

    case Platform.Any:
      return new AnyShare(config);
    
    default:
      throw 'Invalid platform: ' + platform;
  }
}