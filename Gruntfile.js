module.exports = function(grunt) {
  var jadeData = require('./config.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      serve: {
        options: {
          port: 8080,
          useAvailablePort: true
        }
      }
    },

    jade: {
      dev: {
        options: {
          pretty: true,
          data: function() {
            var data = JSON.parse(JSON.stringify(jadeData));
            data.debug = true;
            data.prod = false;
            return data;
          }
        },
        files: { './index.html': './index.jade' }
      },
      prod: {
        options: {
          pretty: true,
          data: function() {
            var data = JSON.parse(JSON.stringify(jadeData));
            data.debug = false;
            data.prod = true;
            return data;
          }
        },
        files: { './index.html': './index.jade' }
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          debugInfo: true,
          lineNumbers: true,
          trace: true
        },
        files: { 'assets/css/main.css': 'assets/scss/main.scss' }
      },
      prod: {
        options: {
          style: 'compressed',
          debugInfo: false,
          lineNumbers: false,
          trace: false,
          sourcemap: 'auto'
        },
        files: { 'assets/css/main.min.css': 'assets/scss/main.scss' }
      }
    },

    uglify: {
      prod: {
        options: {
          mangle: false,
          compress: true,
          sourceMap: true
        },
        files: { 'assets/js/main.min.js': 'assets/js/main.js' }
      }
    },

    watch: {
      jade: {
        files: ['index.jade', 'config.json'],
        tasks: ['jade:dev']
      },
      sass: {
        files: ['assets/scss/*.scss'],
        tasks: ['sass:dev']
      },
      livereload: {
        options: { livereload: true },
        files: ['assets/css/**', 'assets/js/**', 'index.html']
      }
    },

    bump: {
      options: {
        files: [ 'package.json', 'bower.json' ],
        commit: true,
        commitMessage: 'Version updated to v%VERSION%',
        commitFiles: [ 'package.json', 'bower.json' ],
        creatTag: true,
        tagName: 'v%VERSION%',
        push: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('serve', ['sass:dev', 'jade:dev', 'connect', 'watch']);
  grunt.registerTask('prod', ['sass:prod', 'uglify', 'jade:prod' ]);
}
