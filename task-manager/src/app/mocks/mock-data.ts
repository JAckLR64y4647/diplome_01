export const MOCK_DATA = {
  users: [
    {
      user_id: 1,
      login: 'ivanov.i',
      email: 'ivanov@example.com',
      surname: 'Иванов',
      name: 'Иван',
      password: '123',
      role_id: 1
    },
    {
      user_id: 2,
      login: 'petrova.p',
      email: 'petrova@example.com',
      surname: 'Петрова',
      name: 'Полина',
      password: '123',
      role_id: 2
    }
  ],
  roles: [
    {
      role_id: 1,
      role_name: 'Администратор'
    },
    {
      role_id: 2,
      role_name: 'Пользователь'
    }
  ],
  statuses: [
    {
      status_id: 1,
      status_name: 'Открыта'
    },
    {
      status_id: 2,
      status_name: 'Выполнена'
    }
  ],
  priorities: [
    {
      priority_id: 1,
      priority_name: 'Высокий'
    },
    {
      priority_id: 2,
      priority_name: 'Средний'
    },
    {
      priority_id: 3,
      priority_name: 'Низкий'
    }
  ],
  project_assignees: [
    {
      user_id: 1,
      project_id: 101
    },
    {
      user_id: 2,
      project_id: 102
    }
  ]
};
