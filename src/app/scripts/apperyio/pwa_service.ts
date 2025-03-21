import {
    Injectable
} from '@angular/core';
import {
    Platform
} from '@angular/cdk/platform';
import {
    ApperyioHelperService
} from './apperyio_helper';
import PromptModalComponent from './declarables/apperyio_pwa_prompt_component';
const POPUP_INTERVAL = 3000;
@Injectable({
    providedIn: 'root'
})
export class PwaService {
    private promptEvent: any;
    constructor(
        private Apperyio: ApperyioHelperService,
        private platform: Platform
    ) {}
    initPwaPrompt() {
        if (window.location.hostname !== 'appery.io' && window.location.hostname !== 'localhost') {
            if (!localStorage.apperyioPWADismiss) {
                if (this.platform.IOS) {
                    if (!this.Apperyio.pwa.isStandalone()) {
                        this.openPromptComponent('ios');
                    }
                } else {
                    window.addEventListener('beforeinstallprompt', (event: any) => {
                        event.preventDefault();
                        this.promptEvent = event;
                        this.openPromptComponent('android');
                    });
                }
            }
        }
    }
    openPromptComponent(mobileType: 'ios' | 'android') {
        setTimeout(async () => {
            const modalController = this.Apperyio.getController("ModalController");
            const modal = await modalController.create({
                component: PromptModalComponent,
                'componentProps': {
                    data: {
                        mobileType,
                        promptEvent: this.promptEvent
                    }
                },
                'animated': true,
                'backdropDismiss': false,
                'keyboardClose': false,
                'showBackdrop': true,
                'cssClass': 'aio-modal-install-pwa ' + mobileType,
            });
            modal.onDidDismiss().then((data) => {
                if (data.data === "dismiss") {
                    localStorage.apperyioPWADismiss = Date.now();
                }
            });
            modal.present();
        }, POPUP_INTERVAL);
    }
}