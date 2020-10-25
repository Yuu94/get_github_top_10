class Base {
  // templateElement;
  // hostElement;
  // element;

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
      "beforeend",
      this.element
    );
  }
}

class Repository extends Base {
  // rank;
  // repositoryName;
  // language;
  // star;
  // repoUrl;
  // cloneUrl;

  constructor(rank, item) {
    super('single-repo', 'body');

    this.rank = rank;
    this.repositoryName = item.full_name;
    this.language = item.language;
    this.star = item.stargazers_count;
    this.repoUrl = item.html_url;
    this.cloneUrl = item.ssh_url;

    this.renderContent();
    this.configure();
  }

  renderContent() {
    let aElement = document.createElement('a');
    aElement.textContent = this.repositoryName;
    aElement.href = this.repoUrl;

    let btnElement = document.createElement('button');
    btnElement.textContent = 'Clone SSH';

    this.element.querySelectorAll('td')[0].textContent = this.rank;
    this.element.querySelectorAll('td')[1].insertAdjacentElement(
      "afterbegin",
      aElement
    );
    this.element.querySelectorAll('td')[2].textContent = this.language;
    this.element.querySelectorAll('td')[3].textContent = this.star;
    this.element.querySelectorAll('td')[4].insertAdjacentElement(
      "afterbegin",
      btnElement
    );
  }

  clickHandler() {
    var clone_url = document.createElement("textarea");
    clone_url.value = this.cloneUrl;
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

class RepositoryList extends Base {
  // repositoryElement;

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

      items.forEach((item) => {
        count++;
        new Repository(count, item);
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

new RepositoryList();