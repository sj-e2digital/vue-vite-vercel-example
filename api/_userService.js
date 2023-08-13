// mock user service
class UserService {
  constructor() {
    this.users = new Map([
      ['1', { id: '1', name: 'John Doe' }],
      ['2', { id: '2', name: 'Jim Bob' }],
    ]);
  }

  async getUser(id) {
    return Promise.resolve(this.users.get(id) ?? null);
  }

  async getUsers() {
    return Promise.resolve(Array.from(this.users.values()));
  }
}

export const userService = new UserService();
