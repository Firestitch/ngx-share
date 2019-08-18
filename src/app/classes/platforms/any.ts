// import { Share } from '../share';
// import { Platform } from '../../enums/platform.emun';
// import { Observable } from 'rxjs';

// export class AnyShare extends Share {

//   public platform = Platform.Any;

//   protected _webUrlParams = {};
//   protected _webUrl = '';
//   protected _appUrl = '';

//   public open(): Observable<any> {

//     return new Observable(observer => {

//       if (!(<any>window).plugins || !(<any>window).plugins.socialsharing) {
//         return observer.error('Any social sharing not available');
//       }

//       (<any>window).plugins.socialsharing.shareWithOptions(
//         {
//           // message: shareConfig.title + (shareConfig.description ? ' - ' + shareConfig.description : ''),
//           // subject: 'Shared from',
//           // files: [shareConfig.image], // an array of filenames either locally or remotely
//           url: this.config.url,
//           chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
//         },
//         response => {
//           observer.next(response);
//           observer.complete();
//           // success
//           // console.log('Share completed? ' + result.completed);
//           // On Android apps mostly return false even while it's true
//           // On Android result.app is currently empty.
//           // On iOS it's empty when sharing is cancelled (result.completed=false)
//           // console.log('Shared to app: ' + result.app);
//         },
//         errormsg => {
//           observer.error(errormsg);
//         }
//       );
//     });
//   }
// }
