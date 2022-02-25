import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ShoplistService } from '../../services/shoplist.service'
import { Shoplist } from '../../interfaces/shoplist'

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {

  private lastId: number;
  list: Shoplist = { id: 0, name: '', items: [] };
  item: string = '';

  constructor(private location: Location, private shoplistService: ShoplistService) { }

  ngOnInit() {
    this.getLastId()
    this.list.id = this.lastId;
  }

  private getLastId(): void {
    this.shoplistService.getLastItem().subscribe((list) => this.lastId = list[0].id)
  }

  removeItem(name: string) {
    this.list.items = this.list.items.filter((e) => e.name !== name)
  }

  addItem(): void {
    if (this.item.trim() === '') return;
    this.list.items.push({ name: this.item, isChecked: false });
    this.item = '';
  }

  saveList(): void {
    this.list.name.trim()
    if (this.list.name === '') {
      alert("Name should not be empty");
      return;
    }
    this.shoplistService.addList(this.list).subscribe(_ => this.location.back());
  }
}
