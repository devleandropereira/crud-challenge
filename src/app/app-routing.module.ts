import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payments',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then((m) => m.PaymentsModule),
    canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
