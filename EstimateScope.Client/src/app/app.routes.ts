import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { AuditPage } from './pages/audit/audit';
import { PricingPage } from './pages/pricing/pricing';
import { FaqPage } from './pages/faq/faq';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Kosong lari ke Home
  { path: 'home', component: HomePage },
  { path: 'audit', component: AuditPage },
  { path: 'pricing', component: PricingPage },
  { path: 'faq', component: FaqPage },
  { path: '**', redirectTo: 'home' }
];