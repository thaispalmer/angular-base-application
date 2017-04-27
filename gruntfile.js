module.exports = function(grunt) {
    //noinspection JSUnusedGlobalSymbols
    grunt.initConfig({
        /**
         * Task for install dependencies with Bower
         */
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false
                }
            }
        },

        /**
         * Tasks related to Sass files
         */
        sass: {
            /**
             * The "dev" Sass config used with "grunt watch" command
             */
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: 'bower_components/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'dist/css/style.css': 'assets/scss/style.scss'
                }
            },

            /**
             * The production Sass config used with "grunt build-css" or
             * "grunt build" command.
             */
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: 'bower_components/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'dist/css/style.css': 'assets/scss/style.scss'
                }
            }
        },

        /**
         * JSHint task to verify code quality
         */
        jshint: {
            core: ['app/core/*.js'],
            components: ['app/components/**/*.js'],
            shared: ['app/shared/**/*.js']
        },

        /**
         * Task for concatenating files
         */
        concat: {
            options: {
                separator: ';',
                sourceMap: true,
                sourceMapStyle: 'link'
            },
            dependencies: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-i18n/angular-locale_pt-br.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-messages/angular-messages.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-filter/dist/angular-filter.min.js',
                    'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
                    'bower_components/ngstorage/ngStorage.min.js'
                ],
                dest: 'dist/js/dependencies.js'
            },
            coredev: {
                src: [
                    'app/core/app.module.js',
                    'app/core/app.constants.dev.js',
                    'app/core/app.constants.common.js',
                    'app/core/app.factory.js',
                    'app/core/app.filters.js',
                    'app/core/app.config.js',
                    'app/core/app.run.js',
                    'app/core/app.apiClient.js'
                ],
                dest: 'dist/js/core.js'
            },
            coreprod: {
                src: [
                    'app/core/app.module.js',
                    'app/core/app.constants.prod.js',
                    'app/core/app.constants.common.js',
                    'app/core/app.factory.js',
                    'app/core/app.filters.js',
                    'app/core/app.config.js',
                    'app/core/app.run.js',
                    'app/core/app.apiClient.js'
                ],
                dest: 'dist/js/core.js'
            },
            components: {
                src: ['app/components/**/*.js'],
                dest: 'dist/js/components.js'
            },
            shared: {
                src: ['app/shared/**/*.js'],
                dest: 'dist/js/shared.js'
            }
        },

        /**
         * Task for generating the template files
         */
        html2js: {
            options: {
                module: 'app.templates',
                rename: function (moduleName) {
                    return moduleName.replace('../app/', '');
                }
            },
            main: {
                src: ['app/**/views/*.html'],
                dest: 'dist/js/templates.js'
            }
        },

        /**
         * Task for minify files
         */
        uglify: {
            dist: {
                files: {
                    'dist/js/dependencies.js': ['dist/js/dependencies.js'],
                    'dist/js/core.js': ['dist/js/core.js'],
                    'dist/js/components.js': ['dist/js/components.js'],
                    'dist/js/shared.js': ['dist/js/shared.js'],
                    'dist/js/templates.js': ['dist/js/templates.js']
                },
                options: {
                    mangle: false
                }
            }
        },

        /**
         * Task for copying files
         */
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/fonts/',
                        src: '**',
                        dest: 'dist/fonts/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/img/',
                        src: '**',
                        dest: 'dist/img/'
                    }
                ]
            },
            index: {
                files: [
                    {
                        src: 'app/index.html',
                        dest: 'dist/index.html'
                    }
                ]
            }
        },

        /**
         * Task for generating webfonts with app custom icons
         */
        webfont: {
            icons: {
                src: 'assets/icons/*.svg',
                dest: 'dist/fonts/icons',
                destCss: 'dist/css',
                options: {
                    font: 'appicons',
                    styles: 'font,icon,extra',
                    syntax: 'bootstrap',
                    templateOptions: {
                        baseClass: 'appicon',
                        classPrefix: 'appicon-',
                        mixinPrefix: 'appicon-'
                    },
                    htmlDemo: false,
                    engine: 'node',
                    autohint: false,
                    fontHeight: 128
                }
            }
        },


        /**
         * The "grunt watch" task
         */
        watch: {
            bower: {
                files: 'bower.json',
                tasks: ['bower:install', 'concat:dependencies']
            },
            sass: {
                files: 'assets/scss/**/*.scss',
                tasks: ['sass:dev', 'copy:fonts']
            },
            webfont: {
                files: 'icons/*.svg',
                tasks: ['webfont:icons']
            },
            images: {
                files: 'assets/img/**',
                tasks: ['copy:images']
            },
            index: {
                files: ['app/index.html'],
                tasks: ['copy:index']
            },
            coredev: {
                files: 'app/core/*.js',
                tasks: ['jshint:core', 'concat:coredev']
            },
            components: {
                files: 'app/components/**/*.js',
                tasks: ['jshint:components', 'concat:components']
            },
            shared: {
                files: 'app/shared/**/*.js',
                tasks: ['jshint:shared', 'concat:shared']
            },
            templates: {
                files: 'app/**/views/*.html',
                tasks: ['html2js:main']
            },
            options: {
                atBegin: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build-css', ['sass:dist', 'copy:fonts']);
    grunt.registerTask('build-icons', ['webfont:icons']);
    grunt.registerTask('build-dependencies', ['bower:install', 'concat:dependencies']);
    grunt.registerTask('build-dev',
        [
            'jshint',
            'bower:install',
            'sass:dev',
            'webfont:icons',
            'copy:fonts',
            'copy:images',
            'copy:index',
            'concat:dependencies',
            'concat:coredev',
            'concat:components',
            'concat:shared',
            'html2js:main'
        ]
    );
    grunt.registerTask('build-prod',
        [
            'jshint',
            'bower:install',
            'sass:dist',
            'webfont:icons',
            'copy:fonts',
            'copy:images',
            'copy:index',
            'concat:dependencies',
            'concat:coreprod',
            'concat:components',
            'concat:shared',
            'html2js:main',
            'uglify:dist'
        ]
    );
    grunt.registerTask('build', ['build-prod']);
};
