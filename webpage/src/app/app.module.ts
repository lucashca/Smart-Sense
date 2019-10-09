import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// Material Modules
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule
} from "@angular/material";
import { MatIconModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material";
import { MatGridListModule } from "@angular/material";
import { MatMenuModule } from "@angular/material";
import { MatSidenavModule } from "@angular/material";
import { MatListModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";

import { ChartsModule, WavesModule } from "angular-bootstrap-md";

import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { HomeComponent } from "./components/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { ConfigurationComponent } from "./components/configuration/configuration.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SelectDevicesComponent } from "./components/configuration/select-devices/select-devices.component";
import { SelectionComponentsUIComponent } from "./components/configuration/selection-components-ui/selection-components-ui.component";
import { RtsChartComponent } from "./components/componentsUI/rts-chart/rts-chart.component";
import { ModalDeviceComponent } from "./components/modal/modal-device/modal-device.component";
import { ModalComponentUIComponent } from "./components/modal/modal-component-ui/modal-component-ui.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./login/auth.service";
import { LayoutComponent } from "./components/configuration/layout/layout.component";
import { TraslaterUIComponent } from "./components/traslater-ui/traslater-ui.component";
import { AuthGuard } from "./guards/auth.guard";
import { ConfigurationService } from "../app/components/configuration/configuration.service"
import { HttpClientModule } from '@angular/common/http';
import { ActionButtonComponent } from './components/componentsUI/action-button/action-button.component';
import { CampoDadosComponent } from './components/componentsUI/campo-dados/campo-dados.component';
import { TableComponent } from './components/componentsUI/table/table.component';
import { ActionFieldComponent } from './components/componentsUI/action-field/action-field.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    ConfigurationComponent,
    SelectDevicesComponent,
    SelectionComponentsUIComponent,
    RtsChartComponent,
    ModalDeviceComponent,
    ModalComponentUIComponent,
    LoginComponent,
    LayoutComponent,
    TraslaterUIComponent,
    ActionButtonComponent,
    CampoDadosComponent,
    TableComponent,
    ActionFieldComponent,

  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    ChartsModule,
    WavesModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [AuthService, AuthGuard, ConfigurationService],
  bootstrap: [AppComponent],
  entryComponents: [ModalDeviceComponent, ModalComponentUIComponent]
})
export class AppModule { }
