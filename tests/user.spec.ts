
import request from 'supertest';
import { UserModel } from '../src/models/users/users.schema';
import app from '../src/app';

let token: string = '';

describe('POST /login', () => {
  it('should return unauthorized login ', async done => {
    const user = {
      email: 'cruxstyle77@gmail.com',
      password: 'testpassword',
    };

    request(app)
      .post('/api/v1/login')
      .send(user)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({message: "Access Unauthorized"});
        done();
      })
  })
  
  it('should return 200 & login to the app', async done => {
    const user = {
      email: 'modular123@gmail.com',
      password: 'modular123',
    };

    await request(app)
      .post('/api/v1/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((resp) => {
        token = resp.body.token;
      })

    done();
  })
});

describe('GET /users', () => {
  it('should return 401 without token', async done => {
    request(app)
      .get(`/api/v1/users`)
      .expect(401)
        
    done();
  })

  it('should return 200 & instance of array', async done => {
    request(app)
      .get(`/api/v1/users`)
      .set({auth: token})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Array);
        done();
      })
  })
})
