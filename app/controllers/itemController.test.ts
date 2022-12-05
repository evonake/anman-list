import request from 'supertest';

import mongoose from 'mongoose';

import app from '../app';

const sandbox = {
  token: '',
  itemListId: '',
  defaults: {
    itemList: {
      name: 'test-list',
    },
  },
};

const findTestItemList = (resLists: any[]) => {
  const found = resLists.find((l: any) => l.name === sandbox.defaults.itemList.name);
  return found;
};

// login and get token, create test itemList and store id
beforeAll(async () => {
  const res0 = await request(app)
    .post('/users/login')
    .send({
      username: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });

  [sandbox.token] = res0.get('Set-Cookie')[0].split('=')[1].split(';');

  await request(app)
    .post('/items/lists')
    .set('Cookie', `connect.sid=${sandbox.token}`)
    .send({
      itemList: sandbox.defaults.itemList,
    });

  const res1 = await request(app)
    .get('/items')
    .set('Cookie', `connect.sid=${sandbox.token}`);

  sandbox.itemListId = findTestItemList(res1.body.itemLists)._id;
});

// delete test itemList after all tests and disconnect mongoose
afterAll(async () => {
  await request(app)
    .delete('/items/lists')
    .set('Cookie', `connect.sid=${sandbox.token}`)
    .query({
      itemListId: sandbox.itemListId,
    });

  await mongoose.connection.close();
});

describe('GET /items', () => {
  it('should return an array with my itemList', async () => {
    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .expect(200);

    expect(res.body.itemLists).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'test-list' }),
      ]),
    );
  });
});

describe('POST /items', () => {
  // clear test itemList after each test
  afterEach(async () => {
    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    const itemList = findTestItemList(res.body.itemLists);

    itemList.items.forEach(async (item: any) => {
      await request(app)
        .delete('/items')
        .set('Cookie', `connect.sid=${sandbox.token}`)
        .query({
          itemId: item._id,
        });
    });
  });

  it('should add an item with defaults', async () => {
    const myItem = {
      title: 'test',
      listId: sandbox.itemListId,
    };
    const expectedItem = {
      ...myItem,
      link: '',
      trackers: [{ name: 'Page', value: 0 }],
      status: 'ongoing',
    };

    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      })
      .expect(200);

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(findTestItemList(res.body.itemLists).items).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedItem),
      ]),
    );
  });

  it('should add an item with custom values', async () => {
    const myItem = {
      title: 'test',
      link: 'test-link',
      trackers: [
        {
          name: 'test-tracker1',
          value: 1,
        },
        {
          name: 'test-tracker2',
          value: 2,
        },
      ],
      status: 'completed',
      listId: sandbox.itemListId,
    };
    const expectedItem = myItem;

    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      })
      .expect(200);

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(findTestItemList(res.body.itemLists).items).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedItem),
      ]),
    );
  });

  it('should not add an item with missing listId', async () => {
    const myItem = {
      title: 'test',
    };

    const res = await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'item',
      message: 'Invalid item.',
    });
  });

  it('should not add an item wiht an invalid listId', async () => {
    const myItem = {
      title: 'test',
      listId: 'invalid-id',
    };

    const res = await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'itemListId',
      message: 'Item list does not exist',
    });
  });

  it('should not add an item with missing title', async () => {
    const myItem = {
      link: 'test-link',
      trackers: [
        {
          name: 'test-tracker1',
          value: 1,
        },
        {
          name: 'test-tracker2',
          value: 2,
        },
      ],
      status: 'completed',
      listId: sandbox.itemListId,
    };

    const res = await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'item',
      message: 'Invalid item.',
    });
  });
});

describe('PUT /items', () => {
  // clear test itemList after each test
  afterEach(async () => {
    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    const itemList = findTestItemList(res.body.itemLists);

    itemList.items.forEach(async (item: any) => {
      await request(app)
        .delete('/items')
        .set('Cookie', `connect.sid=${sandbox.token}`)
        .query({
          itemId: item._id,
        });
    });
  });

  it('should update an item with new values', async () => {
    const myItem = {
      title: 'test',
      link: 'test-link',
      trackers: [
        {
          name: 'test-tracker1',
          value: 1,
        },
        {
          name: 'test-tracker2',
          value: 2,
        },
      ],
      status: 'ongoing',
      listId: sandbox.itemListId,
    };
    const updatedItem = {
      ...myItem,
      title: 'updated-test',
      link: 'updated-test-link',
      trackers: [
        {
          name: 'updated-test-tracker1',
          value: 11,
        },
        {
          name: 'updated-test-tracker2',
          value: 22,
        },
      ],
      status: 'completed',
    };
    const expectedUpdatedItem = updatedItem;

    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      });

    const res0 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    const itemId = findTestItemList(res0.body.itemLists).items[0]._id;

    await request(app)
      .put('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: {
          ...updatedItem,
          _id: itemId,
        },
      })
      .expect(200);

    const res1 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(findTestItemList(res1.body.itemLists).items).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedUpdatedItem),
      ]),
    );
  });

  it('should only update properties sent', async () => {
    const myItem = {
      title: 'test',
      link: 'test-link',
      trackers: [
        {
          name: 'test-tracker1',
          value: 1,
        },
        {
          name: 'test-tracker2',
          value: 2,
        },
      ],
      status: 'ongoing',
      listId: sandbox.itemListId,
    };
    const updatedItem = {
      link: 'updated-test-link',
      listId: sandbox.itemListId,
    };
    const expectedUpdatedItem = {
      ...myItem,
      ...updatedItem,
    };

    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      });

    const res0 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    const itemId = findTestItemList(res0.body.itemLists).items[0]._id;

    await request(app)
      .put('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: {
          ...updatedItem,
          _id: itemId,
        },
      })
      .expect(200);

    const res1 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(findTestItemList(res1.body.itemLists).items).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedUpdatedItem),
      ]),
    );
  });

  it('should not update an item with missing listId', async () => {
    const myItem = {
      _id: 'test-id',
      title: 'test',
    };

    const res = await request(app)
      .put('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'item',
      message: 'Invalid item.',
    });
  });

  it('should not update an item with an invalid itemListId', async () => {
    const myItem = {
      _id: 'test-id',
      title: 'test',
      listId: 'invalid-id',
    };

    const res = await request(app)
      .put('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        itemListId: 'invalid',
        item: myItem,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'item',
      message: 'Item does not exist.',
    });
  });

  it('should not update an item with a missing itemId', async () => {
    const myItem = {
      title: 'test',
    };

    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        itemListId: sandbox.itemListId,
        item: myItem,
      });

    const res1 = await request(app)
      .put('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        itemListId: sandbox.itemListId,
        item: myItem,
      })
      .expect(400);

    expect(res1.body.error).toEqual({
      type: 'item',
      message: 'Invalid item.',
    });
  });

  it('should not update an item with an invalid itemId', async () => {
    const myItem = {
      title: 'test',
      listId: sandbox.itemListId,
    };
    const updatedItem = {
      title: 'updated-test',
      listId: sandbox.itemListId,
    };

    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: myItem,
      });

    const res1 = await request(app)
      .put('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        itemListId: sandbox.itemListId,
        item: {
          ...updatedItem,
          _id: 'invalid',
        },
      })
      .expect(400);

    expect(res1.body.error).toEqual({
      type: 'item',
      message: 'Item does not exist.',
    });
  });
});

describe('DELETE /items', () => {
  let itemId = '';

  beforeEach(async () => {
    await request(app)
      .post('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .send({
        item: {
          title: 'test',
          listId: sandbox.itemListId,
        },
      });

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    itemId = findTestItemList(res.body.itemLists).items[0]._id;
  });

  it('should delete an item', async () => {
    await request(app)
      .delete('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .query({
        itemId,
      })
      .expect(200);

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(findTestItemList(res.body.itemLists).items).toHaveLength(0);
  });

  it('should not delete an item with a missing itemId', async () => {
    const res0 = await request(app)
      .delete('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .expect(400);

    expect(res0.body.error).toEqual({
      type: 'itemId',
      message: 'Invalid item id.',
    });
  });

  it('should not delete an item with an invalid itemId', async () => {
    const res = await request(app)
      .delete('/items')
      .set('Cookie', [`connect.sid=${sandbox.token}`])
      .query({
        itemId: 'invalid',
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'item',
      message: 'Item does not exist.',
    });
  });
});
