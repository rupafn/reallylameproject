module.exports = function(grunt) {

  // Project configuration.
  // Project configuration.
   grunt.initConfig({
       dirs:{
           src:'src',
           node:'nodejsmysql'
       },
       pkg: grunt.file.readJSON('package.json'),

       sass:{
           dist:{
               files:{
                   '<%=dirs.src%>/css':'<%=dirs.src%>/scss'
               }
           }
       },
       compass: {
         dist: {
           options: {
             sassDir: '<%=dirs.src%>/scss',
             cssDir: '<%=dirs.src%>/css',
             environment: 'production'
           }
         }
      },
       watch: {
           gruntfile: {
             files: 'Gruntfile.js',
           },
           css: {
             files: ['<%=dirs.src%>/scss/**/*.scss'],
             tasks: [
                 'compass'
             ],
           },
           js: {
               files: ['<%=dirs.src%>/components/*.js','<%=dirs.src%>/components/**/*.js']
           },
           redux:{
               files:["<%=dirs.src%>/redux/*"]
           }
      },
   });
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-sass');
     grunt.loadNpmTasks('grunt-contrib-compass');
     grunt.registerTask('default', ['compass']);

};
