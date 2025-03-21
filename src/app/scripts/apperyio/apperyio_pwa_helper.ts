import {
    Injectable
} from '@angular/core';
@Injectable()
export class ApperyioPWAHelperService {
    getCurrentVersionDate(): string {
        return localStorage.apperyioPWACurrentDate;
    }
    async getLatestVersionDate(): Promise < string | undefined > {
        return new Promise((res, rej) => {
            fetch('https://' + window.location.hostname + '/' + 'sw.js?date=' + Date.now())
                .then(response => {
                    return response.headers.get('Last-Modified');
                })
                .then(function(date) {
                    res(date);
                })
                .catch(e => {
                    console.log('error', e);
                    res(undefined)
                });
        })
    }
    async update(): Promise < void > {
        if (window.location.hostname !== 'appery.io' && window.location.hostname !== 'localhost') {
            const currDate = this.getCurrentVersionDate();
            if (!currDate) return;
            const availableDate = await this.getLatestVersionDate();
            if (!availableDate) return;
            if (currDate !== availableDate) {
                navigator.serviceWorker?.getRegistration()
                    .then((reg) => {
                        if (reg) {
                            reg.unregister().then(() => {
                                localStorage.apperyioPWACurrentDate = availableDate;
                                window.location.reload();
                            });
                        }
                    })
                    .catch(e => {
                        console.log('error', e);
                    });
            }
        }
    }
    isStandalone(): boolean {
        return ('standalone' in window.navigator) && (window.navigator['standalone']);
    }
};