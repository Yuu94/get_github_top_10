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

class Repository {
  rank;
  repositoryName;
  language;
  star;
  pageUrl;
  cloneUrl;

  constructor(rank, item) {
    this.rank = rank;
    this.repositoryName = item.full_name;
    this.language = item.language;
    this.star = item.stargazers_count;
    this.pageUrl = item.html_url;
    this.cloneUrl = item.ssh_url;
  }
}

class RepositoryRow extends Base {
  constructor(repo) {
    super('single-repo', 'body');

    this.renderContent(repo); 
  }

  renderContent(repo) {
    this.element.querySelectorAll('td')[0].textContent = repo.rank;
  }
}

class RepositoryTable extends Base {
  repositoryList;

  constructor(repiList) {
    super('repo-list', 'app');

    this.repositoryList = repiList;

    this.renderContent();
  }

  renderHeader() {
    this.element.querySelectorAll('th')[0].textContent = "順位";
    this.element.querySelectorAll('th')[1].textContent = "リポジトリ名";
    this.element.querySelectorAll('th')[2].textContent = "言語";
    this.element.querySelectorAll('th')[3].textContent = "スター";
    this.element.querySelectorAll('th')[4].textContent = "Clone";
  }

  renderTable() {
    //console.log(this.repositoryList)
    // this.repositoryList.forEach((repo) => {
    //   new RepositoryRow(repo);
    // });
  }

  renderContent(){
    this.renderHeader();
    this.renderTable();
  }
}

async function getRepositories() {
  await axios({
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

const repositoryList = getRepositories();
console.log(repositoryList);
new RepositoryTable(repositoryList);