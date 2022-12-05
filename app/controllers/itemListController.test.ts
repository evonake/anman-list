import request from 'supertest';

import mongoose from 'mongoose';

import app from '../app';

const sandbox = {
  token: '',
  testName: 'test',
  testName2: 'test2',
};

const findTestItemList = (resLists: any[]) => {
  const found = resLists.find((l: any) => l.name === sandbox.testName);
  return found;
};

// login and get token
beforeAll(async () => {
  const res0 = await request(app)
    .post('/users/login')
    .send({
      username: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });

  [sandbox.token] = res0.get('Set-Cookie')[0].split('=')[1].split(';');
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  const res = await request(app)
    .get('/items')
    .set('Cookie', `connect.sid=${sandbox.token}`);

  const { itemLists: iL } = res.body;
  const itemList = iL.find((l: any) => l.name === sandbox.testName || l.name === sandbox.testName2);
  if (itemList) {
    await request(app)
      .delete('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .query({
        itemListId: itemList._id,
      });
  }
});

describe('GET /items/lists', () => {
  it('should return an array of item lists', async () => {
    const myItem = {
      name: sandbox.testName,
    };

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItem,
      });

    const res0 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    const itemListId = findTestItemList(res0.body.itemLists)._id;

    const res1 = await request(app)
      .get('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .query({
        itemListId,
      })
      .expect(200);

    expect(res1.body.itemList).toEqual(
      expect.objectContaining(myItem),
    );
  });

  it('should not return an itemList if missing itemListId', async () => {
    const res = await request(app)
      .get('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'itemListId',
      message: 'Invalid item list id.',
    });
  });

  it('should not return an itemList if invalid itemListId', async () => {
    const res = await request(app)
      .get('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .query({
        itemListId: 'invalid',
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'itemList',
      message: 'Item list does not exist.',
    });
  });
});

describe('POST /items/lists', () => {
  it('should add an itemList with defaults', async () => {
    const myItemList = {
      name: sandbox.testName,
    };
    const expectedItem = {
      ...myItemList,
      trackerNames: ['Page'],
    };

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      })
      .expect(200);

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(res.body.itemLists).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedItem),
      ]),
    );
  });

  it('should add an itemList with custom values', async () => {
    const myItemList = {
      name: sandbox.testName,
      trackerNames: ['Chapter', 'Page'],
    };

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      })
      .expect(200);

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(res.body.itemLists).toEqual(
      expect.arrayContaining([
        expect.objectContaining(myItemList),
      ]),
    );
  });

  it('should not add an itemList with missing name', async () => {
    const myItemList = {
      trackerNames: ['Chapter', 'Page'],
    };

    const res = await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'itemList',
      message: 'Invalid item list.',
    });
  });
});

describe('PUT /items/lists', () => {
  it('should update an itemList with new values', async () => {
    const myItemList = {
      name: sandbox.testName,
      trackerNames: ['Chapter', 'Page'],
    };
    const updatedItemList = {
      name: sandbox.testName2,
      trackerNames: ['Volume', 'Chapter', 'Page'],
    };
    const expectedItemList = updatedItemList;

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      });

    const res0 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    await request(app)
      .put('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: {
          ...updatedItemList,
          _id: findTestItemList(res0.body.itemLists)._id,
        },
      })
      .expect(200);

    const res1 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(res1.body.itemLists).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedItemList),
      ]),
    );
  });

  it('should only update properties sent', async () => {
    const myItemList = {
      name: sandbox.testName,
      trackerNames: ['Chapter', 'Page'],
    };
    const updatedItemList = {
      trackerNames: ['Volume', 'Chapter', 'Page'],
    };
    const expectedItemList = {
      ...myItemList,
      ...updatedItemList,
    };

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      });

    const res0 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    await request(app)
      .put('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: {
          ...updatedItemList,
          _id: findTestItemList(res0.body.itemLists)._id,
        },
      })
      .expect(200);

    const res1 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(res1.body.itemLists).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedItemList),
      ]),
    );
  });

  it('should not update an itemList with missing itemListId', async () => {
    const myItemList = {
      name: sandbox.testName,
    };
    const updatedItemList = {
      name: sandbox.testName2,
    };

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      });

    const res1 = await request(app)
      .put('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: {
          ...updatedItemList,
        },
      })
      .expect(400);

    expect(res1.body.error).toEqual({
      type: 'itemList',
      message: 'Invalid item list.',
    });
  });

  it('should not update an itemList with invalid itemListId', async () => {
    const myItemList = {
      name: sandbox.testName,
    };
    const updatedItemList = {
      name: sandbox.testName2,
    };

    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: myItemList,
      });

    const res1 = await request(app)
      .put('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: {
          ...updatedItemList,
          _id: 'invalid',
        },
      })
      .expect(400);

    expect(res1.body.error).toEqual({
      type: 'itemList',
      message: 'Item list does not exist.',
    });
  });
});

describe('DELETE /items/lists', () => {
  let itemListId = '';

  beforeEach(async () => {
    await request(app)
      .post('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .send({
        itemList: {
          name: sandbox.testName,
        },
      });

    const res = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    itemListId = findTestItemList(res.body.itemLists)._id;
  });

  it('should delete an itemList', async () => {
    await request(app)
      .delete('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .query({
        itemListId,
      })
      .expect(200);

    const res1 = await request(app)
      .get('/items')
      .set('Cookie', `connect.sid=${sandbox.token}`);

    expect(res1.body.itemLists).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          _id: itemListId,
        }),
      ]),
    );
  });

  it('should not delete an itemList with missing itemListId', async () => {
    const res0 = await request(app)
      .delete('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .expect(400);

    expect(res0.body.error).toEqual({
      type: 'itemListId',
      message: 'Invalid item list id.',
    });
  });

  it('should not delete an itemList with invalid itemListId', async () => {
    const res0 = await request(app)
      .delete('/items/lists')
      .set('Cookie', `connect.sid=${sandbox.token}`)
      .query({
        itemListId: 'invalid',
      })
      .expect(400);

    expect(res0.body.error).toEqual({
      type: 'itemList',
      message: 'Item list does not exist.',
    });
  });
});
