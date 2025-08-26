import { RouterModule, Routes } from '@angular/router';
import { Chat } from './chat/chat';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: Chat},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
