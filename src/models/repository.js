export class Repository {
  // rank;
  // repositoryName;
  // language;
  // star;
  // repoUrl;
  // cloneUrl;

  constructor(rank, item) {
    this.rank = rank;
    this.name = item.full_name;
    this.language = item.language ? item.language : '--';
    this.star = item.stargazers_count;
    this.url = item.html_url;
    this.cloneUrl = item.ssh_url;
  }
}