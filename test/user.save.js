/*jshint expr: true*/
var mongoose = require('mongoose');
var _ = require('lodash');
var expect = require('chai').expect;
var async = require('async');

var conf = require('./conf');
var User = require('../app/user');

// data for testing purposes
var VALID_EMAIL1 = 'foo@bar.com';
var VALID_EMAIL2 = 'no@mistake.com';
var VALID_EMAIL3 = 'hello@world.com';

var ORPHAN_EMAIL = 'im@lonely.com';

var INVALID_EMAIL = 'badatgoogle.com';


var VALID_USERNAME1 = 'plypy';
var VALID_USERNAME2 = 'plypx';

var INVALID_USERNAME = 'Ply_py'; // contain one underscore

var SIMPLE_STRING = 'string';

var VALID_INFO1 = {
  username: VALID_USERNAME1,
  firstName: SIMPLE_STRING,
  lastName: SIMPLE_STRING,
  displayName: SIMPLE_STRING,
  primaryEmail: VALID_EMAIL1,
  displayEmail: VALID_EMAIL2,
  emailList: [VALID_EMAIL1, VALID_EMAIL3],
  password: SIMPLE_STRING,
};

var VALID_INFO2 = {
  username: VALID_USERNAME2,
  primaryEmail: VALID_EMAIL2,
  displayEmail: VALID_EMAIL2,
  emailList: [VALID_EMAIL2],
  password: SIMPLE_STRING,
};



describe('User', function() {
  before(function (done) {
    async.series([
      function (callback) {
        mongoose.connect(conf.mongoURI, callback);
      },
      function (callback) {
        User.remove(callback);
      }
    ],
    function (err) {
      done(err);
    });
  });

  beforeEach(function (done){
    User.remove(done);
  });

  after(function (done) {
    async.series([
      function (callback) {
        User.remove(callback);
      },
      function (callback) {
        mongoose.disconnect(callback);
      }
    ],
    function (err) {
      done(err);
    });
  });

  it('should store the valid users well', function(done) {
    var user1 = new User(VALID_INFO1);
    var user2 = new User(VALID_INFO2);

    async.parallel([
      function (callback) {
        user1.save(callback);
      },
      function (callback) {
        user2.save(callback);
      },
    ],
    function (err) {
      expect(err).to.be.null;

      User.find({}, function (err, users) {
        expect(err).to.be.null;
        expect(users).to.have.length(2);
        done();
      });
    });

  });

  it('should fail when two user have same username', function(done) {
    var dupUsernameInfo = _.cloneDeep(VALID_INFO2);
    dupUsernameInfo.username = VALID_INFO1.username;

    var user1 = new User(VALID_INFO1);
    var user2 = new User(dupUsernameInfo);
    async.parallel([
      function (callback) {
        user1.save(callback);
      },
      function (callback) {
        user2.save(callback);
      }
    ],
    function (err) {
      expect(err).not.to.be.null;
      done();
    });

  });

  it('should fail when the username is invalid', function(done) {
    var invalidUsernameInfo = _.cloneDeep(VALID_INFO1);
    invalidUsernameInfo.username = INVALID_USERNAME;

    var user = new User(invalidUsernameInfo);
    user.save(function(err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the username is missing', function(done) {
    var noUsernameInfo = _.cloneDeep(VALID_INFO1);
    delete noUsernameInfo.username;

    var user = new User(noUsernameInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it ('should fail when the displayEmail is invalid', function(done) {
    var invalidDisplayEmailInfo = _.cloneDeep(VALID_INFO1);
    invalidDisplayEmailInfo.displayEmail = INVALID_EMAIL;

    var user = new User(invalidDisplayEmailInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the primaryEmail is missing', function(done) {
    var noPrimaryEmailInfo = _.cloneDeep(VALID_INFO1);
    delete noPrimaryEmailInfo.primaryEmail;

    var user = new User(noPrimaryEmailInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the primaryEmail is not in List', function(done) {
    var orphanPrimaryEmailInfo = _.cloneDeep(VALID_INFO1);
    orphanPrimaryEmailInfo.primaryEmail = ORPHAN_EMAIL;

    var user = new User(orphanPrimaryEmailInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the emailList is empty', function(done) {
    var emptyEmailListInfo = _.cloneDeep(VALID_INFO1);
    emptyEmailListInfo.emailList = [];

    var user = new User(emptyEmailListInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the emailList have invalid email', function(done) {
    var invalidEmailListInfo = _.cloneDeep(VALID_INFO1);
    invalidEmailListInfo.emailList.push(INVALID_EMAIL);

    var user = new User (invalidEmailListInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the emailList have duplicate emails', function(done) {
    var dupEmailListInfo = _.cloneDeep(VALID_INFO1);
    dupEmailListInfo.emailList.push(ORPHAN_EMAIL);
    dupEmailListInfo.emailList.push(ORPHAN_EMAIL.toUpperCase());

    var user = new User (dupEmailListInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should fail when the password is missing', function(done) {
    var noPasswordInfo = _.cloneDeep(VALID_INFO1);
    delete noPasswordInfo.password;

    var user = new User (noPasswordInfo);
    user.save(function (err) {
      expect(err).not.to.be.null;
      done();
    });
  });

});
