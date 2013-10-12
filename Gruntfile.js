module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jasmine: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['*.js', 'src/**/*.js', 'test/**/*.js','*.less'],
      options: {
        // options here to override JSHint defaults
        "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        "undef": true,
        "smarttabs": true,
        "laxcomma":true,
        "shadow":true,
        "node":true,
        "couch":true,
        ignores: ['src/libs/**/*.js'],
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          angular:true,
          require:true,
          couch: true,
          nonstandard: true
        }
      }
    },
    less: {
        development: {
            options: {
                paths: ['src/css'],
                yuicompress: false
            },
            files: {
                'src/index.css':'src/index.less'
            }
        }
    },

    watch: {
        scripts: {
            files:['Gruntfile.js','src/**/*.js'],
            tasks:['jshint','concat','less']
        },
        less:{
            files:'src/**/*.less',
            tasks:['less']
        }
      
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  
  //commands
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
