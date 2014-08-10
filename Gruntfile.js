var path = require("path");
var async = require("async");

// Helper function to spawn a child grunt task
// Optional stdoutData gets 'data' once started
function runTask(grunt, task, stdoutData) {
  var child = grunt.util.spawn({
    grunt: true,
    args: [task]
  }, function() {});
  if (stdoutData) {
    child.stdout.on("data", stdoutData);
  }
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

module.exports = function(grunt) {

  // load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // project config
    project: {
      sass: "sass",
      styles: "styles",
      javascript: "js",
      fonts: "fonts"
    },

    // contrib-compass config
    compass: {
      options: {
        sassDir: "<%= project.sass %>",
        cssDir: "<%= project.styles %>",
        javascriptsDir: "<%= project.javascript %>",
        fontsDir: "<%= project.fonts %>"
      },
      dev: {
        options: {
          environment: "development"
        }
      }
    },    

    // grunt-autoprefixer
    autoprefixer: {
      dev: {
        src: "<%= project.styles %>/index.css"
      }
    },

    // contrib-jshint config
    jshint: {
      all: [
        "Gruntfile.js",
        "<%= project.javascript %>/**/*.js"
      ]
    },

    // contrib-watch config
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ["<%= project.javascript %>/**/*.js"],
        tasks: ["jshint"]
      },
      css: {
        files: ["<%= project.sass %>/**/*.scss"],
        tasks: ["ccss"]
      },
      html: {
        files: ["**/*.html"]
      }
    },

    // contrib-connect config
    connect: {
      options: {
        port: "9000",
        middleware: function(connect) {
          return [
            connect.static(path.resolve("."))
          ];
        }
      },
      dev: {
        options: {
          keepalive: true
        }
      }
    }

  });
  
  // The compile css task
  grunt.registerTask("ccss", ["compass", "autoprefixer"]);

  // the dev task
  grunt.registerTask("devTasks", "parallel development tasks", function() {
    async.parallel([
      function() {
        runTask(grunt, "watch");
      },
      function() {
        runTask(grunt, "connect:dev");
      }
    ], this.async());
  });

  // run the development stuff
  grunt.registerTask("default", ["jshint", "ccss", "devTasks"]);

};