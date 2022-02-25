import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { ShoplistService } from '../../services/shoplist.service'
import { Shoplist } from '../../interfaces/shoplist'

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  list?: Shoplist | undefined;
  item: string = '';

  constructor(private route: ActivatedRoute,
              private location: Location,
              private shoplistService: ShoplistService) { }

  ngOnInit(): void {
    this.getShopList()
  }

  private getShopList(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.shoplistService.getList(id).subscribe(
      (list) => this.list = list
    )
  }

  onChange(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.shoplistService.updateList(id, this.list).subscribe();
  }

  deleteList(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.shoplistService.removeList(id).subscribe(_ => this.location.back());
  }

  addItem(): void {
    if (this.item.trim() === '') return;
    this.list.items.push({ name: this.item, isChecked: false });
    this.item = '';
  }

  removeItem(name: string) {
    this.list.items = this.list.items.filter((e) => e.name !== name)
    this.onChange();
  }
}
