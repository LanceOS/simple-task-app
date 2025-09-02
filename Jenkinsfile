pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.48.0-jammy'
            args '-u root:root --network=ci-network'
        }
    }

    environment {
        PUBLIC_URL = 'http://localhost:5173'

        PRIVATE_POSTGRES_URL = 'localhost:5432'

        PRIVATE_POSTGRES_USER = 'user'
        PRIVATE_POSTGRES_PASSWORD = 'user'
        PRIVATE_POSTGRES_DB = 'my_db'

        PRIVATE_BETTER_AUTH_SECRET = 'secret'
        PRIVATE_RESEND_API = 'secret'

        PUBLIC_LOKI_PUSH = 'http://localhost:3100/loki/api/v1/push'

        PRIVATE_EMAIL = 'email@email.com'
    }

    stages {
        stage('setup') {
            steps {
                sh '''
                    docker network create ci-network || true
                    docker run -d --rm \
                        --name postgres \
                        --network=ci-network \
                        -e POSTGRES_USER=$PRIVATE_POSTGRES_USER \
                        -e POSTGRES_PASSWORD=$PRIVATE_POSTGRES_PASSWORD \
                        -e POSTGRES_DB=$PRIVATE_POSTGRES_DB \
                        -p 5432:5432 \
                        postgres:15
                '''
            }
        }
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
