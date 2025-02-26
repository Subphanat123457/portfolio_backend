pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'backend-nginx:latest'
        BACKEND_DOCKERFILE = '/Dockerfile'
        BACKEND_DIR = 'backend'
        REGISTRY = 'docker.io'  // ระบุ Docker Registry ที่ใช้งาน
        DOCKER_CREDENTIALS_ID = 'DockerHub'  // ใช้ชื่อ Credential จาก Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // ดึงโค้ดจาก repository
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir(BACKEND_DIR) {
                        // ใช้ sudo เพื่อรันคำสั่ง Docker build
                        sh 'sudo docker build -t ${REGISTRY}/${BACKEND_IMAGE} -f ${BACKEND_DOCKERFILE} .'
                    }
                }
            }
        }

        stage('Push Backend Image to Docker Registry') {
            steps {
                script {
                    // Login to Docker registry using Jenkins Credentials
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // ใช้ sudo เพื่อทำการ login
                        sh 'sudo docker login -u $DOCKER_USER -p $DOCKER_PASSWORD ${REGISTRY}'
                    }

                    // Push the backend Docker image
                    sh 'sudo docker push ${REGISTRY}/${BACKEND_IMAGE}'
                }
            }
        }

        stage('Deploy Backend to Kubernetes') {
            steps {
                script {
                    // ใช้ sudo เพื่อรันคำสั่ง Kubernetes
                    sh '''
                    sudo kubectl set image deployment/backend-deployment backend=${REGISTRY}/${BACKEND_IMAGE} --record
                    '''
                }
            }
        }

        stage('Verify Backend Deployment') {
            steps {
                script {
                    // ทดสอบว่า Backend พร้อมใช้งานหรือไม่
                    sh '''
                    curl --fail https://apiprofile.minuteszone.com || exit 1
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace
        }
        success {
            echo 'Backend Deployment completed successfully!'
        }
        failure {
            echo 'Backend Deployment failed.'
        }
    }
}
