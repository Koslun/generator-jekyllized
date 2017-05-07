'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('jekyllized:jekyll', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '.'))
      .withOptions({
        projectName: 'jekyllized',
        projectDescription: 'Tests for Jekyllized',
        projectURL: 'example.org',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@email.com',
        authorURI: 'homepage.com',
        authorBio: 'I am a tester for tests'
      });
  });

  it('creates Gemfile', () => {
    assert.file('Gemfile');
  });

  it('creates _config.yml files', () => {
    assert.file([
      '_config.yml',
      '_config.build.yml'
    ]);
  });

  it('creates src directory', () => {
    assert.file([
      'src/404.html',
      'src/about.md',
      'src/crossdomain.xml',
      'src/humans.txt',
      'src/index.html',
      'src/robots.txt'
    ]);
  });

  it('_config.yml contains the correct settings', () => {
    [
      'title: jekyllized',
      'description: Tests for Jekyllized',
      'url: example.org',
      'name: Ola Nordmann',
      'email: ola.nordmann@email.com',
      'uri: homepage.com',
      'bio: I am a tester for tests'
    ].forEach(function (config) {
      assert.fileContent('_config.yml', config);
    });
  });

  it('_config.build.yml contains the correct settings', () => {
    [
      'future: false',
      'show_drafts: false',
      'limit_posts: 0'
    ].forEach(function (config) {
      assert.fileContent('_config.build.yml', config);
    });
  });

  it('fills out humans.txt correctly', () => {
    assert.fileContent('src/humans.txt', 'Ola Nordmann -- <role> -- @');
  });
});

describe('jekyllized:jekyll -- date permalinks', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '.'))
      .withOptions({jekyllPermalinks: 'date'});
  });

  it('sets date permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: date');
  });
});

describe('jekyllized:jekyll -- no permalinks', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '.'))
      .withOptions({jekyllPermalinks: 'none'});
  });

  it('sets none permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: none');
  });
});

describe('jekyllized:jekyll -- pretty permalinks', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../../generators/jekyll'))
      .withOptions({jekyllPermalinks: 'pretty'});
  });

  it('sets pretty permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: pretty');
  });
});

describe('jekyllized:jekyll -- pretty permalinks', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../../generators/jekyll'))
      .withOptions({jekyllPermalinks: 'ordinal'});
  });

  it('sets ordinal permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: ordinal');
  });
});
