/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['src/**/*.js']
    },
    jasmine: {

    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'src/server.js'
        }
      },
      prod: {
        options: {
          script: 'dist/server.js',
          node_env: 'production'
        }
      }
    },
    watch: {
      express: {
        files: ['**/*.js'],
        tasks: ['jshint', 'express:dev'],
        options: {
          spawn: false
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'src/',
            src: ['**'],
            dest: 'dist/'
          }
        ],
      },
    },
    // clean the output directory before each build
    clean: {
      build: ['dist']
    },
    jasmine_nodejs: {
      // task specific (default) options
      options: {
        specNameSuffix: "spec.js", // also accepts an array
        helperNameSuffix: "helper.js",
        useHelpers: false,
        stopOnFailure: false,
        // configure one or more built-in reporters
        reporters: {
          console: {
            colors: true,
            cleanStack: 1, // (0|false)|(1|true)|2|3
            verbosity: 3, // (0|false)|1|2|(3|true)
            listStyle: "indent", // "flat"|"indent"
            activity: false
          }
        }
      },
      your_target: {
        // target specific options
        options: {
          useHelpers: true
        },
        // spec files
        specs: [
          "spec/**"
        ],
        helpers: [
          "spec/**"
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');

  grunt.registerTask('hint', ['jshint']);

  grunt.registerTask('test', ['hint', 'jasmine_nodejs']); 

  grunt.registerTask('build', ['clean', 'test', 'copy']);

  grunt.registerTask('server', ['hint', 'express:dev', 'watch']);

  grunt.registerTask('default', ['server']);

};
