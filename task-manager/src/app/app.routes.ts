import { Routes } from "@angular/router";
import { UserManagementComponent } from "./admin/user-management.component";
import { LoginComponent } from "./auth/login.component";
import { RegisterComponent } from "./auth/register.component";
import { ChartsComponent } from "./charts/charts.component";
import { TaskBoardComponent } from "./tasks/task-board.component"; // <-- Kanban-доска
import { WelcomeComponent } from "./welcome/welcome.component";
import { TaskCreatorComponent } from "./tasks/task-creator.component";

export const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskBoardComponent },     // <-- Kanban доска
  { path: 'tasks/new', component: TaskCreatorComponent },  // <-- Отдельная форма
  { path: 'dashboard', component: ChartsComponent },
  { path: 'admin', component: UserManagementComponent },
];
