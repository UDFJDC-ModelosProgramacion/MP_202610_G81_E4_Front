pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
    }

    stages {
        stage('Checkout') {
            steps {
                // Descarga el código del repositorio
                git branch: 'main', url: 'https://github.com/UDFJDC-ModelosProgramacion/MP_202610_G81_E4_Front.git'
            }
        }

        stage('Install & Build') {
            steps {
                // Se agrupan para optimizar el tiempo de ejecución en la tabla
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Busca el scanner configurado en Jenkins
                    def scannerHome = tool 'SonarQubeScanner'
                    
                    // Conecta con el servidor de SonarQube
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
