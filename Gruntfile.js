/*
 * grunt-rendr-stitch
 *
 *
 * Copyright (c) 2013 Spike Brehm
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    rendr_stitch: {
      sample: {
        options: {
          dependencies: [
            'test/fixtures/sample/deps/**/*.js',
          ],
          npmDependencies: {
            grunt: 'lib/util/exit.js'
          },
          aliases: [
            {from: 'test/fixtures/sample/some_module/shared', to: 'rendr/shared'}
          ]
        },
        files: [{
          dest: 'tmp/test/sample/bundle.js',
          src: [
            'test/fixtures/sample/app/**/*.js',
            'test/fixtures/sample/some_module/shared/**/*.js'
          ]
        }, {
          includeDependencies: false,
          dest: 'tmp/test/sample/no-deps.js',
          src: [
            'test/fixtures/sample/other/**/*.js'
          ]
        }]
      },
      // default_options: {
      //   options: {
      //   },
      //   files: {
      //     'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
      //   },
      // },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rendr_stitch', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
