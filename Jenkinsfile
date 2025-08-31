pipeline {
    agent any

    tools {
        nodejs 'nodejs 24'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }

    stage('Build') {
        steps {
            echo 'Building...'
        }
    }
}