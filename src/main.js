import axios from 'axios';

class Api {
  static async getUserInfo(username) {
    try{
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log(response);
    } catch (err) {
      console.warn('Erro na API');
    }
  }
}

Api.getUserInfo('gabrielkesslau');
// import { soma } from './funcoes';

// console.log(soma(1,2));

// class List {
//   constructor() {
//     this.data = [];
//   }

//   add(data) {
//     this.data.push(data);
//     console.log(this.data);
//   }
// }

// class TodoList extends List {
//   constructor() {
//     super(); // chama o metodo construtor da classe pai

//     this.usuario = 'Gabriel';
//   }

//   mostraUsuario() {
//     console.log(this.usuario);
//   }
  
// }

// const MinhaLista = new TodoList();

// document.getElementById('novotodo').onclick = function() {
//   MinhaLista.add('Novo todo');
// }

// MinhaLista.mostraUsuario();