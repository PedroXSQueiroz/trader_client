import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationsComponent } from './pages/quotations/quotations.component';


const routes: Routes = [{
  component: QuotationsComponent, path:''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
