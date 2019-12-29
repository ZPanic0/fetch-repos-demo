export default class RepoFetch {
  constructor(userName, token, cacheKey) {
    this.userName = userName;
    this.token = token;
    this.cacheKey = cacheKey;
  }
  async getRepoData() {
    const currentDate = new Date();
    let cache;

    if (localStorage) {
      cache = localStorage[this.cacheKey];

      if (cache) {
        const parsed = JSON.parse(localStorage[this.cacheKey]);

        if (
          parsed &&
          parsed.lastUpdated &&
          parsed.lastUpdated > currentDate.setDate(currentDate.getDate() - 1)
        ) {
          return parsed.repos;
        }
      }

      cache = {
        lastUpdated: currentDate.getTime(),
        repos: await this.fetchRepos()
      };
      localStorage[this.cacheKey] = JSON.stringify(cache);

      return cache.repos;
    } else {
      return await this.fetchRepos();
    }
  }

  async fetchRepos() {
    const response = await fetch(
      `https://api.github.com/users/${this.userName}/repos`,
      { headers: { Authorization: `token ${this.token}` } }
    );

    return response.json();
  }
}
