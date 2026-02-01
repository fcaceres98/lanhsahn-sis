import { Component } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FlexLayoutModule, MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
