Complete code is for DockerImage in github Actions

name: Docker Image CI

on:
  push:
    branches: [ "main" ]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Login Dockerhub
      env: 
          DOCKER_USERNAME: ${{secrets.DOCKER_USERNAME}}
          DOCKER_PASSWORD: ${{secrets.DOCKER_PASSWORD}}
      run: docker login -u $DOCKER_USERNAME -P $DOCKER_PASSWORD
    - name: Build the Docker image
      run: docker build -t cicd-pipline .
    - name: Push to Dockerhub
      run: docker push arbaan/cicd-pipline: latest
