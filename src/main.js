import api from './api';

//recurso de classes
class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById('repo-form');
    this.inputEl = document.querySelector('input[name=repository]');
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  registerHandlers() {
    //recurso de Arrow function
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  //recurso de parametros padrao em funcao
  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando'));
      loadingEl.setAttribute('id', 'loading');

      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById('loading').remove();
    }
  }

  //recurso async await
  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0)
      return;

    this.setLoading();

    //recurso try catch
    try {
      //recurso de Template literals
      const response = await api.get(`/repos/${repoInput}`);

      //recurso de desestruturação de objetos
      const { name, description, html_url, owner: { avatar_url } } = response.data;

      //recurso de Object Short Syntax
      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url,
      });

      this.inputEl.value = '';

      this.render();
    } catch (err) {
      alert('O repositório não existe!');
    }

    this.setLoading(false);
  }

  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}

new App();



//API DO GIT HUB
// import axios from 'axios';

// class Api {
//   static async getUserInfo(username) {
//     try{
//       const response = await axios.get(`https://api.github.com/users/${username}`);
//       console.log(response);
//     } catch (err) {
//       console.warn('Erro na API');
//     }
//   }
// }

// Api.getUserInfo('gabrielkesslau');


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