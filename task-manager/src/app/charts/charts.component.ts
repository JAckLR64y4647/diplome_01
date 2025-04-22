import { Component } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['../ui/charts.component.css']
})
export class ChartsComponent {
  lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{ data: [65, 59, 80, 81], label: 'Tasks' }]
  };
  lineChartOptions = { responsive: true };
  lineChartType: 'line' = 'line';
}
