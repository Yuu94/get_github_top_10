export type GithubRepositoryResponse = {
  data: {
    items: GithubRepositoryItem[]
  }
}

export type GithubRepositoryItem = {
  full_name: string,
  language: string,
  stargazers_count: number,
  html_url: string,
  ssh_url: string
}

export type ErrorMessage = {
  message: string
}