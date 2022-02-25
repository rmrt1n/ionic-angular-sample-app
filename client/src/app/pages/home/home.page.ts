import { Component } from '@angular/core';
import { ShoplistService } from '../../services/shoplist.service'
import { Shoplist } from '../../interfaces/shoplist'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  shoplists: Shoplist[] = [];

  constructor(private shoplistService: ShoplistService) {}

  ngOnInit(): void {
    this.getShoplists();
  }

  private getShoplists(): void {
    this.shoplistService.getLists().subscribe(
      (lists) => this.shoplists = lists
    )
  }

}
