const request = require('supertest')
const app = require('./index')
const { expect } = require('chai')
const db = require('./db')
const seedUsers = require('../script/users.json')


describe('GET /users', () => {

  before(async (done) => {
    try {
      console.log("BEFORE DB SYNC: ");
      console.log(db)
      await db.sync() //changed it to false because heroku needs the real db
      console.log("AFTER DB SYNC~~~~ ", db);
      await db.models.user.bulkCreate(seedUsers)
    } catch (error) {
      console.log(error);
    }
    
    done();
  })

  it('should return list of users', async (done) => {
    console.log("This IT block is running");
    try {
      const res = await request(app).get('/api/users')
      console.log(res);
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(seedUsers.length)
      done()
    } catch (error) {
      console.log(error);
      done()
    }
    done()
  })
})
