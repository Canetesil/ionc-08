import { Component } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/interface/produto';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public produtos = new Array<Produto>();
  private produtoSubscription:Subscription;

  constructor(
    private loadingCtrl:LoadingController,
    private produtoService:ProdutoService,
    private toastCtrl: ToastController
  ) {
    this.produtoSubscription = this.produtoService.listaProduto().subscribe(data =>{this.produtos = data});
  }

  async deleteProduto(id:string){
    try{
      await this.produtoService.excluirProduto(id);
    }catch(error){
      this.presentToast('Erro ao excluir');
    }
  }
 async presentToast(mensagem:string){
   const toast = await this.toastCtrl.create({
     message:mensagem,
     duration:3000
   });
   toast.present();
 }

}
