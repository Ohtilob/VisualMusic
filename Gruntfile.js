module.exports = function (grunt) {

grunt.initConfig({
    connect: {
        server: {
            options: {
                keepalive: true,
                hostname: '172.30.200.86',
                port: 8003
            }
        }
    },
    requirejs: {
        dist: {
            options: {
                baseUrl: 'js/',
                mainConfigFile: 'js/main.js',
                name: 'main',
                out: 'dist/main.js'
            }
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-requirejs');

grunt.registerTask('build', ['requirejs:dist']);

}
