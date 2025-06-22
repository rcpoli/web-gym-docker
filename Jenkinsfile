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
            steps {
                withCredentials([usernamePassword(credentialsId: 'rcpoli-github-test', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    bat '''
                    :: Usar directorio seguro temporal
                    cd %WORKSPACE%
                    if exist deploy-temp rmdir /S /Q deploy-temp

                    :: Clona el repositorio gh-pages
                    git clone --branch gh-pages https://%GIT_USER%:%GIT_TOKEN%@github.com/rcpoli/web-gym-docker.git deploy-temp

                    :: Limpiar los archivos anteriores
                    cd deploy-temp
                    for /D %%D in (*) do if /I not "%%D"==".git" rmdir /S /Q "%%D"
                    for %%F in (*) do if /I not "%%F"==".git" del /Q "%%F"

                    :: Copia los archivos del frontend al directorio temporal
                    xcopy /E /Y /I "%WORKSPACE%\\Frontend\\*" .

                    :: Commit y push
                    git config user.email "jenkins@local"
                    git config user.name "%GIT_USER%"
                    git add .
                    git commit -m "Deploy static site from Jenkins" || echo Nothing to commit
                    git push origin gh-pages
                    '''
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
