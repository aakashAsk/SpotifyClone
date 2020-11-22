import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {
  isNav = false;
  @Input() Inname;
  name;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.name = this.Inname;
  }
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

  navmenu() {
    this.isNav = !this.isNav
  }

}
