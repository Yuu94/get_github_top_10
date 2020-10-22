// ベースクラス
class Base {
  templateElement;
  hostElement;
  element;

  constructor(
    templateId,
    hostElementId
  ) {
    this.templateElement = document.getElementById(templateId);
    this.hostElement = document.getElementById(hostElementId);
    const impotedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = impotedNode.firstElementChild;

    this.attach();
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      "afterbegin",
      this.element
    )
  }
}

class Repository extends Base {
  rank;
  repositoryName;
  language;
  star;
  pageUrl;
  cloneUrl;

  constructor(rank, item) {
    super('single-repo', 'body');

    this.rank = rank;
    this.repositoryName = item.full_name;
    this.language = item.language;
    this.star = item.stargazers_count;
    this.pageUrl = item.html_url;
    this.cloneUrl = item.ssh_url;

    this.renderContent();
  }

  renderContent() {
    this.element.querySelectorAll('td')[0].textContent = this.rank;
    this.element.querySelectorAll('td')[1].textContent = this.repositoryName;
    this.element.querySelectorAll('td')[2].textContent = this.language;
    this.element.querySelectorAll('td')[3].textContent = this.star;
    this.element.querySelectorAll('td')[4].textContent = this.cloneUrl;
  }
}

class RepositoryList extends Base {
  repositoryElement;

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
    }).then((res) => {
      const items = res.data.items;
      let count = 0;

      const repositoryList = items.map((item) => {
        count++;
        return new Repository(count, item);
      })
    }).catch((error) => {
      console.log('error');
      console.log(error);
    });
  }

  renderContent(){
    this.renderHeader();
    this.getRepositories();
  }
}

// new Base();
new RepositoryList();