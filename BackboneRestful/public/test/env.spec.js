var expect = chai.expect;

mocha.setup("bdd");

// Run tests on window load event.
window.onload = function () {
  (window.mochaPhantomJS || mocha).run();
};
window.hello = function () {
  return "Hello World";
};

describe("Trying out the test libraries", function () {
  describe("Chai", function () {
    it("should be equal using 'expect'", function () {
      expect(hello()).to.equal("Hello World");
    });
  });

  describe("Sinon.JS", function () {
    it("should report spy called", function () {
      var helloSpy = sinon.spy(window, 'hello');

      expect(helloSpy.called).to.be.false;
      hello();
      expect(helloSpy.called).to.be.true;
      hello.restore();
    });
  });
});

describe("Test timing", function () {
  it("should be a fast test", function (done) {
    expect("hi").to.equal("hi");
    done();
  });

  it("should be a medium test", function (done) {
    setTimeout(function () {
      expect("hi").to.equal("hi");
      done();
    }, 40);
  });

  it("should be a slow test", function (done) {
    setTimeout(function () {
      expect("hi").to.equal("hi");
      done();
    }, 100);
  });

  it("should be a timeout failure", function (done) {
    setTimeout(function () {
      expect("hi").to.equal("hi");
      done();
    }, 2001);
  });
});

mocha.bail(true);

describe("Test failures", function () {
  it("should fail on assertion", function () {
    expect("hi").to.equal("goodbye");
  });

  it("should fail on unexpected exception", function () {
    throw new Error();
  });
});