'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var VueGenerator = module.exports = function VueGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    spawn('npm', ['install'], { stdio: 'inherit'} )
      .on('close', function () {
        spawn('component', ['install'], { stdio: 'inherit'} );
      })
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(VueGenerator, yeoman.generators.Base);

VueGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  var prompts = [
    {
      name: 'appName',
      message: 'What\'s the name of your app?',
      default: 'vue-app'
    },
    {
      type: 'confirm',
      name: 'sass',
      message: 'use sass?',
    }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.sass = props.sass;
    cb();
  }.bind(this));
};

VueGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('build');
  this.copy('_main.js', 'src/main.js')
  this.template('_index.html', 'index.html')
  this.template('_package.json', 'package.json');
  this.template('_component.json', 'component.json');
};

VueGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('_gulpfile.js', 'gulpfile.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
