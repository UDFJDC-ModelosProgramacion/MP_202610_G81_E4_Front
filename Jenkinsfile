pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/UDFJDC-ModelosProgramacion/MP_202610_G81_E4_Front.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv('MiServidorSonarQube') { 
                        sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=MP_202610_G81_E4_Front \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/**"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Finalizando el pipeline del Proyecto Mascota - G81'
        }
    }
} 
