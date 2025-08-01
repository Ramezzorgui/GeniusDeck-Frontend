import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { PresentationDetailsComponent } from './presentation-details/presentation-details.component';
import { PresentationListComponent } from './presentation-list/presentation-list.component';
import { PresentationFormComponent } from './presentation-form/presentation-form.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { SlideListComponent } from './slide-list/slide-list.component';
import { SlideDetailsComponent } from './slide-details/slide-details.component';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { GenerationHistoryListComponent } from './generation-history-list/generation-history-list.component';
import { GenerationHistoryFormComponent } from './generation-history-form/generation-history-form.component';
import { GenerationHistoryDetailsComponent } from './generation-history-details/generation-history-details.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PresentationCreateComponent } from './presentation-create/presentation-create.component'; 
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PresentationBriefComponent } from './components/presentation-brief/presentation-brief.component';
import { CreatePresentationComponent } from './pages/create-presentation/create-presentation.component';
import { EditorPresentationComponent } from './pages/editor-presentation/editor-presentation.component';
import { SavedPresentationsComponent } from './pages/saved-presentation/saved-presentation.component';
import { HistoryComponent } from './pages/history/history.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import{AdminDashboardComponent} from  'src/app/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'presentations', component: PresentationListComponent },
  { path: 'presentations/new', component: PresentationFormComponent },
  { path: 'presentations/:id/edit', component: PresentationFormComponent },
  { path: 'presentations/:id', component: PresentationDetailsComponent },
  { path: 'templates',component: TemplateListComponent},
  { path: 'templates/new',component: TemplateFormComponent},
  { path: 'templates/edit/:id', component: TemplateFormComponent},
  { path: 'templates/:id', component: TemplateDetailsComponent},
  { path: 'slides', component: SlideListComponent },
  { path: 'slides/add', component: SlideFormComponent },
  { path: 'slides/edit/:id', component: SlideFormComponent },
  { path: 'slides/details/:id', component: SlideDetailsComponent },
  { path: 'generation-history', component: GenerationHistoryListComponent },
  { path: 'generation-history/add', component: GenerationHistoryFormComponent },
  { path: 'generation-history/edit/:id', component: GenerationHistoryFormComponent },
  { path: 'generation-history/:id', component: GenerationHistoryDetailsComponent },
  { path: 'home11', component: AppComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'presentations/neww', component: PresentationCreateComponent },
  { path: 'dashboard', component: PresentationListComponent},
  { path: 'presentations/newww', component: PresentationBriefComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'create-presentation', component: CreatePresentationComponent },
  { path: 'edit-presentation', component: EditorPresentationComponent },
  { path: 'saved-presentations', component: SavedPresentationsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'dashboard1', component: AdminDashboardComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
