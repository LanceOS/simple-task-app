pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
    }
           
    post {
        always {
            script {
                if (fileExists('playwright-report/index.html')) {
                    echo 'Publishing Playwright HTML report'
                    
                    publishHTML(
                        target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: false,
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Playwright Test Report'
                        ]
                    )
                } else {
                    echo 'Playwright HTML report not found.'
                }
            }
        }
    }
}
