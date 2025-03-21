import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    FormsModule
} from '@angular/forms';
import {
    RouterModule
} from '@angular/router';
import {
    IonicModule
} from '@ionic/angular';
import {
    ApperyioTranslateModule
} from '../scripts/apperyio/translate_module';
import {
    ApperyioDeclarablesModule
} from '../scripts/apperyio/declarables/apperyio.declarables.module';
import {
    Screen1
} from './Screen1';
import {
    PipesModule
} from '../scripts/pipes.module';
import {
    DirectivesModule
} from '../scripts/directives.module';
import {
    ComponentsModule
} from '../scripts/components.module';
import {
    CustomComponentsModule
} from '../scripts/custom-components.module';
import {
    CustomModulesModule
} from '../scripts/custom-modules.module';
@NgModule({
    declarations: [
        Screen1
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        DirectivesModule,
        ComponentsModule,
        ApperyioDeclarablesModule,
        CustomComponentsModule,
        CustomModulesModule, RouterModule.forChild([{
            path: '',
            component: Screen1,
        }]),
        ApperyioTranslateModule
    ],
    exports: [
        Screen1
    ]
})
export class Screen1PageModule {}