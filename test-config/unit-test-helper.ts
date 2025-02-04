import { MarketDataService } from './../src/app/services/market-data/market-data.service'
import { DrawChartService } from './../src/app/services/draw-chart/draw-chart.service'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { TestModuleMetadata } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { Push } from '@ionic-native/push/ngx'
import { AlertController, IonicModule, LoadingController, NavController, Platform, ToastController } from '@ionic/angular'
import { IonicStorageModule, Storage } from '@ionic/storage'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { MomentModule } from 'ngx-moment'

import { ComponentsModule } from '../src/app/components/components.module'
import { PipesModule } from '../src/app/pipes/pipes.module'

import {
  AlertControllerMock,
  AppVersionMock,
  DeeplinkMock,
  LoadingControllerMock,
  ModalControllerMock,
  NavControllerMock,
  PlatformMock,
  SplashScreenMock,
  StatusBarMock,
  ToastControllerMock
} from './mocks-ionic'
import { StorageMock } from './storage-mock'

export class UnitHelper {
  public readonly mockRefs = {
    appVersion: new AppVersionMock(),
    platform: new PlatformMock(),
    statusBar: new StatusBarMock(),
    splashScreen: new SplashScreenMock(),
    deeplink: new DeeplinkMock(),
    toastController: new ToastControllerMock(),
    alertController: new AlertControllerMock(),
    loadingController: new LoadingControllerMock(),
    modalController: new ModalControllerMock()
  }

  public testBed(testBed: TestModuleMetadata, useIonicOnlyTestBed: boolean = false): TestModuleMetadata {
    const mandatoryDeclarations: any[] = []
    const mandatoryImports: any[] = [
      CommonModule,
      ReactiveFormsModule,
      IonicModule,
      FormsModule,
      RouterTestingModule,
      HttpClientModule,
      ComponentsModule,
      IonicStorageModule.forRoot({
        name: '__test_airgap_storage',
        driverOrder: ['localstorage']
      }),
      MomentModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })
    ]
    const mandatoryProviders: any[] = [
      DrawChartService,
      { provide: NavController, useClass: NavControllerMock },
      { provide: Platform, useValue: this.mockRefs.platform },
      Push,
      { provide: ToastController, useValue: this.mockRefs.toastController },
      { provide: AlertController, useValue: this.mockRefs.alertController },
      { provide: LoadingController, useValue: this.mockRefs.loadingController }
    ]

    if (!useIonicOnlyTestBed) {
      mandatoryProviders.push({ provide: Storage, useClass: StorageMock })
      mandatoryDeclarations.push()
      mandatoryImports.push(PipesModule)
    }

    testBed.declarations = [...(testBed.declarations || []), ...mandatoryDeclarations]
    testBed.imports = [...(testBed.imports || []), ...mandatoryImports]
    testBed.providers = [...(testBed.providers || []), ...mandatoryProviders]

    return testBed
  }
}
