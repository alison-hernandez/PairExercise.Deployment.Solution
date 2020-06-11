const request = require('supertest')
const app = require('./index')
const { expect } = require('chai')
const db = require('./db')
const seedUsers = require('../script/users.json')


describe('GET /users', () => {

  // before(async (done) => {
  //   try {
  //     await db.sync({ force: false }) //changed it to false because heroku needs the real db
  //     await db.models.user.bulkCreate(seedUsers)
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  //   done();
  // })

  it('should return list of users', async (done) => {
    try {
      const res = await request(app).get('/api/users')
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
