var request = require('supertest');

describe('UserController', function() {
	  describe('#packages()', function() {
		it('list packages without login', function (done) {
		  request(sails.hooks.http.app)
			.get('/packages')
			.expect(302)
			.expect('location',/\/login.*/, done);
		});
	  });

	 describe('#login()', function() {
		it('try login with wrong password', function (done) {
		  request(sails.hooks.http.app)
			.post('/login')
			.send({ name: 'tomi', password: '12' })
			.expect(200, done)
		});
	  });

	  describe('#login()', function() {
		it('login with good password', function (done) {
		  request(sails.hooks.http.app)
			.post('/login')
			.send({ name: 'tomi', password: '123' })
			.expect(302)
			.expect('location',/\//, done);
		});
	  });
});
