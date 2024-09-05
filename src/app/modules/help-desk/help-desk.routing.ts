import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidLineComponent } from './guid-line/guid-line.component';

const routing: Routes = [
    { path: '', redirectTo: 'guide-line', pathMatch: 'full' },
    { path: 'guide-line', component:GuidLineComponent },
    { path: '**', redirectTo: 'guide-line', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routing)],
    exports: [RouterModule]
})
export class helpDeskRoutes { }