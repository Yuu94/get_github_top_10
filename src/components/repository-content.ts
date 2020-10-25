// TODO: any型解消
import { Base } from './base'
import { Repository } from '../models/repository'

export class RepositoryContent extends Base< HTMLTableSectionElement, HTMLTableRowElement> {
  repo: Repository;

  constructor(rank: number, item: any) {
    super('single-repo', 'body');

    this.repo = new Repository(rank, item);

    this.renderContent();
    this.configure();
  }

  renderContent() {
    const { name, url, rank, language, star} = this.repo;
    let aElement = document.createElement('a');
    aElement.textContent = name;
    aElement.href = url;

    let btnElement = document.createElement('button');
    btnElement.textContent = 'Clone SSH';

    this.element.querySelectorAll('td')[0].textContent = String(rank);
    this.element.querySelectorAll('td')[1].insertAdjacentElement(
      "afterbegin",
      aElement
    );
    this.element.querySelectorAll('td')[2].textContent = language;
    this.element.querySelectorAll('td')[3].textContent = String(star);
    this.element.querySelectorAll('td')[4].insertAdjacentElement(
      "afterbegin",
      btnElement
    );
  }

  clickHandler() {
    const { cloneUrl } = this.repo;
    var clone_url = document.createElement("textarea");
    clone_url.value = cloneUrl;
    document.body.appendChild(clone_url);
    clone_url.select();
    document.execCommand("copy");
    clone_url.parentElement!.removeChild(clone_url);

    alert('Coppied');
  }

  configure() {
    this.element.querySelector('button')!.addEventListener(
      'click',
      this.clickHandler.bind(this)
    );
  }
}