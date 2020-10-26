import { Base } from './base'
import { RepositoryContent } from './repository-content';
import { 
  GithubRepositoryResponse,
  ErrorMessage
} from '../models/github-repo-response';


export class RepositoryList extends Base<HTMLDivElement, HTMLTableElement> {
  constructor() {
    super('repo-list', 'app');

    this.renderContent();
  }

  renderHeader() {
    this.element.querySelectorAll('th')[0].textContent = "順位";
    this.element.querySelectorAll('th')[1].textContent = "リポジトリ名";
    this.element.querySelectorAll('th')[2].textContent = "言語";
    this.element.querySelectorAll('th')[3].textContent = "スター";
    this.element.querySelectorAll('th')[4].textContent = "Clone";
  }

  getRepositories() {
    const axios = require('axios');
    axios({
      method: 'get',
      url: 'https://api.github.com/search/repositories',
      responseType: 'json',
      params: {
        q: 'stars:>1',
        s: 'stars',
        per_page: 10,
        page: 1
      },
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
      }
    }).then((res: GithubRepositoryResponse) => {
      const items = res.data.items;
      let count = 0;

      items.forEach((item: any) => {
        count++;
        new RepositoryContent(count, item);
      })
    }).catch((error: ErrorMessage) => {
      console.log('error');
      console.log(error.message);
    });
  }

  renderContent(){
    this.renderHeader();
    this.getRepositories();
  }
}