pipeline {
    agent any

    environment {
        // Variables para Docker (ajusta según tu configuración)
        DOCKER_IMAGE_NAME = 'web-gym-app'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clonar el repositorio
                git url: 'https://github.com/Juandarp96/web-gym-docker.git', branch: 'main'
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                dir('Backend') {
                    script {
                        docker.build("${env.DOCKER_IMAGE_NAME}-backend", '-f Dockerfile.yml .')
                    }
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('Frontend') {
                    script {
                        docker.build("${env.DOCKER_IMAGE_NAME}-frontend", '-f Dockerfile.yml .')
                    }
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
                // Aquí puedes hacer deploy, por ejemplo ejecutar docker-compose
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
