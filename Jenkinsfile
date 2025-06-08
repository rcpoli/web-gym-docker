pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'web-gym-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Juandarp96/web-gym-docker.git', branch: 'main'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('Backend') {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}-backend ."
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('Frontend') {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}-frontend ."
                }
            }
        }

        stage('Run Tests Backend') {
            steps {
                dir('Backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
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
