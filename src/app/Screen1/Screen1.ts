import {
    Component
} from '@angular/core';
import {
    ChangeDetectorRef
} from '@angular/core';
import {
    ApperyioHelperService
} from '../scripts/apperyio/apperyio_helper';
import {
    ApperyioMappingHelperService
} from '../scripts/apperyio/apperyio_mapping_helper';
import {
    $aio_empty_object
} from '../scripts/interfaces';
import {
    ViewChild
} from '@angular/core';
@Component({
    templateUrl: 'Screen1.html',
    selector: 'page-screen1',
    styleUrls: ['Screen1.css', 'Screen1.scss']
})
export class Screen1 {
    public currentNumber: any;
    public $a: ApperyioHelperService;
    public $v: {
        [name: string]: any
    };
    public aioChangeDetector: ChangeDetectorRef;
    public currentItem: any = null;
    @ViewChild('_aio_content') _aio_content;
    public mappingData: any = {};
    public __getMapping(_currentItem, property, defaultValue, isVariable?, isSelected?) {
        return this.$aio_mappingHelper.getMapping(this.mappingData, _currentItem, property, defaultValue, isVariable, isSelected);
    }
    public __isPropertyInMapping(_currentItem, property) {
        return this.$aio_mappingHelper.isPropertyInMapping(this.mappingData, _currentItem, property);
    }
    public __setMapping(data: any = {}, keyName: string, propName?: string): void {
        const changes = data.detail || {};
        if (propName) {
            this.mappingData = this.$aio_mappingHelper.updateData(this.mappingData, [keyName], changes[propName]);
        } else {
            this.mappingData = this.$aio_mappingHelper.updateData(this.mappingData, [keyName], changes.value);
        }
        this.$aio_changeDetector.detectChanges();
    }
    public __bindedMethods: any = {};
    incrementNumber(): any {
        this.currentNumber++;
    }
    constructor(public Apperyio: ApperyioHelperService, private $aio_mappingHelper: ApperyioMappingHelperService, private $aio_changeDetector: ChangeDetectorRef) {
        this.$a = this.Apperyio;
        this.$v = this.Apperyio.vars;
        this.currentNumber = 0;
        this.aioChangeDetector = this.$aio_changeDetector;
    }
    ngOnInit() {
        this.Apperyio.setThinScrollIfNeeded();
    }
    ionViewWillEnter() {
        window.currentScreen = this;
    }
}