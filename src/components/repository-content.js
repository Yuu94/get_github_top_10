import { Base } from './base.js'
import { Repository } from '../models/repository.js'

export class RepositoryContent extends Base {
  // repo;

  constructor(rank, item) {
    super('single-repo', 'body');

    this.repo = new Repository(rank, item);

    this.renderContent();
    this.configure();
  }

  renderContent() {
    let aElement = document.createElement('a');
    aElement.textContent = this.repo.name;
    aElement.href = this.repo.url;

    let btnElement = document.createElement('button');
    btnElement.textContent = 'Clone SSH';

    this.element.querySelectorAll('td')[0].textContent = this.repo.rank;
    this.element.querySelectorAll('td')[1].insertAdjacentElement(
      "afterbegin",
      aElement
    );
    this.element.querySelectorAll('td')[2].textContent = this.repo.language;
    this.element.querySelectorAll('td')[3].textContent = this.repo.star;
    this.element.querySelectorAll('td')[4].insertAdjacentElement(
      "afterbegin",
      btnElement
    );
  }

  clickHandler() {
    var clone_url = document.createElement("textarea");
    clone_url.value = this.repo.cloneUrl;
    document.body.appendChild(clone_url);
    clone_url.select();
    document.execCommand("copy");
    clone_url.parentElement.removeChild(clone_url);

    alert('Coppied');
  }

  configure() {
    this.element.querySelector('button').addEventListener(
      'click',
      this.clickHandler.bind(this)
    );
  }
}