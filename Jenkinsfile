pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'web-gym-app'
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
                git url: 'https://github.com/Juandarp96/web-gym-docker.git', branch: 'main'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('Backend') {
                    bat "docker build -t %DOCKER_IMAGE_NAME%-backend -f Dockerfile ."
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('Frontend') {
                    bat "docker build -t %DOCKER_IMAGE_NAME%-frontend -f Dockerfile ."
                }
            }
        }

        stage('Run Tests Backend') {
            steps {
                dir('Backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }
        success {
            echo '¡Build y tests exitosos!'
        }
        failure {
            echo 'Falló el pipeline'
        }
    }
}
