import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Output() msgComponent = 'Bem vindo!';
  @Output() component = 'Home';
}
