export default () => ({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  domain: process.env.DB_DOMAIN,
  get url() {
    return `mongodb+srv://${this.username}:${this.password}@${this.domain}/?retryWrites=true&w=majority`;
  },
});
