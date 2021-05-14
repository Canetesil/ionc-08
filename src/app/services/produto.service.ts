import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection }
from '@angular/fire/firestore';
import { Produto } from '../interface/produto';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
 private colecaoProduto: AngularFirestoreCollection<Produto>;
  constructor(
  private afs: AngularFirestore
  ) {
    this.colecaoProduto = this.afs.collection<Produto>('Produtos');
   }

  listaProduto(){
   return this.colecaoProduto.snapshotChanges().pipe(
     map(actions =>{
       return actions.map(a=>{
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id,...data};
       });
     })
   );
  }
  addProduto(produto:Produto){
   return this.colecaoProduto.add(produto);
  }
  mostraProduto(id:string){
    return this.colecaoProduto.doc<Produto>(id).valueChanges();
  }
editarProduto(id:string, produto:Produto){
 return this.colecaoProduto.doc<Produto>(id).update(produto);

}
excluirProduto(id:string){
 return this.colecaoProduto.doc(id).delete();
}
}
