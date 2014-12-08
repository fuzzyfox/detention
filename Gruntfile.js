module.exports = function(grunt) {
  var dirs = {
    src: 'src',
    build: 'build',
    dist: 'dist'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: dirs,
    jade: {
      build: {
        options: {
          pretty: true,
          data: function() {
            data = require('./' + dirs.src + '/config.json');
            data.debug = true;
            data.dist = false;
            return data;
          }
        },
        files: { '<%= dirs.build %>/index.html': '<%= dirs.src %>/index.jade' }
      },
      dist: {
        options: {
          pretty: false,
          data: function() {
            data = require('./' + dirs.src + '/config.json');
            data.debug = true;
            data.dist = true;
            return data;
          }
        },
        files: { '<%= dirs.dist %>/index.html': '<%= dirs.src %>/index.jade' }
      }
    },

    sass: {
      build: {
        options: {
          style: 'expanded',
          debugInfo: true,
          lineNumbers: true,
          trace: true
        },
        files: { '<%= dirs.build %>/styles/main.css': '<%= dirs.src %>/scss/main.scss' }
      },
      dist: {
        options: {
          style: 'compressed',
          debugInfo: false,
          lineNumbers: false,
          trace: false
        },
        files: { '<%= dirs.dist %>/styles/main.min.css': '<%= dirs.src %>/scss/main.scss' }
      }
    },

    copy: {
      build: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/*/fonts/**'], dest: '<%= dirs.build %>/fonts/', filter: 'isFile' },
          { '<%= dirs.build %>/styles/shower-bright.css': 'bower_components/shower-bright/styles/screen.css' },
          { '<%= dirs.build %>/js/shower.min.js': 'bower_components/shower-core/shower.min.js' },
          { expand: true, cwd: "<%= dirs.src %>/assets/", src: ['**'], dest: '<%= dirs.build %>/assets/' }
        ]
      },
      dist: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/*/fonts/**'], dest: '<%= dirs.dist %>/fonts/', filter: 'isFile' },
          { '<%= dirs.dist %>/styles/shower-bright.css': 'bower_components/shower-bright/styles/screen.css' },
          { '<%= dirs.dist %>/js/shower.min.js': 'bower_components/shower-core/shower.min.js' },
          { expand: true, cwd: "<%= dirs.src %>/assets/", src: ['**'], dest: '<%= dirs.dist %>/assets/' }
        ]
      }
    },

    watch: {
      jade: {
        files: ['<%= dirs.src %>/index.jade', '<%= dirs.src %>/config.json'],
        tasks: ['jade:build']
      },
      sass: {
        files: ['<%= dirs.src %>/scss/main.scss'],
        tasks: ['sass:build']
      },
      assets: {
        files: [
          '<%= dirs.src %>/assets/**',
          'bower_components/*/fonts/**'
        ],
        tasks: ['copy:build']
      },
      livereload: {
        options: { livereload: true },
        files: ['<%= dirs.build %>/**/*']
      }
    },

    clean: {
      build: ['<%= dirs.build %>'],
      dist: ['<%= dirs.dist %>']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean:build', 'jade:build', 'sass:build', 'copy:build']);
  grunt.registerTask('dist',  ['clean:dist',  'jade:dist',  'sass:dist',  'copy:dist' ]);
}
