import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard, notLoggedInGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full" },
  { path: "register", component: RegisterComponent, canActivate: [notLoggedInGuard] },
  { path: "login", component: LoginComponent, canActivate: [notLoggedInGuard] },
  { path: "home", component: HomeComponent, canActivate: [authGuard] },
  { path: "reset/:token", component: ResetPasswordComponent },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "**", component: NotFoundComponent }
];
