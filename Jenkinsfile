pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    stages {
        stage('Checkout') {
            steps {
                // Descarga el código del repo de la Distrital
                git branch: 'main', url: 'https://github.com/UDFJDC-ModelosProgramacion/MP_202610_G81_E4_Front.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // 1. Busca el scanner configurado en Jenkins
                    def scannerHome = tool 'SonarQubeScanner'
                    
                    // 2. Conecta con el servidor usando el nombre EXACTO de tu imagen
                    withSonarQubeEnv('MiServidorSonarQube') { 
                        sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=MP_202610_G81_E4_Front \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/*.test.js"
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