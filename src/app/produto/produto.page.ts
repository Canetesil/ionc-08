import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto} from 'src/app/interface/produto';
import { NavController, LoadingController, ToastController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
 
private produtoId:string ;
public produto:Produto = {};
private carregar:any;
private produtoSubscription: Subscription;

  constructor(
    private produtoService:ProdutoService,
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.produtoId = this.activateRoute.snapshot.params['id'];
    
    if(this.produtoId)
    this.carregarProduto();

   }

  ngOnInit() {
  }
  
  carregarProduto(){
    this.produtoSubscription = this.produtoService.mostraProduto
    (this.produtoId).subscribe(data => {this.produto = data});
  }

    async salvarProduto(){
      if(this.produtoId){
        try{
          await this.produtoService.editarProduto(this.produtoId,this.produto);
          this.navCtrl.navigateRoot('/home');  
        }catch(error){
        this.presentToast('Erro ao salvar');
        }
      }else{
        this.produto.criacao = new Date().getTime();
        try{
          await this.produtoService.addProduto(this.produto);

          this.navCtrl.navigateRoot('/home');
        }catch(error){
          this.presentToast('Erro ao salvar');
        }
      }
    }
async presentToast(mensagem:string){
  const toast = await this.toastCtrl.create({
    message: mensagem,duration:2000
  });
  toast.present();
}



}
