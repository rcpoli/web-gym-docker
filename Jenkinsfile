pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'web-gym-app-backend'
        FRONTEND_IMAGE = 'web-gym-app-frontend'
    }

    stages {
        stage('Verificar Docker') {
            steps {
                bat 'docker --version'
                bat 'docker ps'
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/rcpoli/web-gym-docker.git', branch: 'main'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('Backend') {
                    bat "docker build -t ${BACKEND_IMAGE} ."
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('Frontend') {
                    bat "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }

        stage('Run Tests Backend') {
            steps {
                dir('Backend') {
                    bat """
                    docker run --rm ${BACKEND_IMAGE} npm test
                    """
                }
            }
        }

        stage('Deploy to GitHub Pages') {
            when {
                branch 'main'
            }
            steps {
                dir('Frontend') {
                    withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                        bat '''
                        :: Configure Git
                        git config --global user.email "jenkins@local"
                        git config --global user.name "%GIT_USER%"

                        :: Clone gh-pages branch to temp folder
                        git clone --branch gh-pages https://%GIT_USER%:%GIT_TOKEN%@github.com/rcpoli/web-gym-docker.git gh-pages

                        :: Delete existing content in gh-pages
                        del /Q /S gh-pages\\*

                        :: Copy static files into gh-pages
                        xcopy /E /Y /I * gh-pages\\

                        :: Commit and push
                        cd gh-pages
                        git add .
                        git commit -m "Deploy static site from Jenkins"
                        git push origin gh-pages
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }
        failure {
            echo 'Falló el pipeline'
        }
    }
}
