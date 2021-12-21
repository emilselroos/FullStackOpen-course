== Commands ==

- docker container ls -a

- docker container run -p 3000:3000 [container-name] 
- docker build [location / . = here] -t [tag-string]
- docker run -p 3000:3000 [container-name]
- docker kill [conatainer-name]

- docker-compose up (to build and run)
- docker-compose up --build (to rebuild the image)
- docker-compose -f docker-compose.dev.yml up (with different composer file)

- docker exec -it [container-name] bash

- docker run -p 3000:3000 -v "$(pwd):/usr/src/app/" [container-name] (to use files in Visual Studio Code)

== Containers and images ==

There are two core concepts when starting with containers and they are easy to confuse with one another:

A *container* is a runtime instance of an *image*.

Both of the following statements are true:

- Images include all of the code, dependencies and instructions on how to run the application
- Containers package software into standardized units

It is no wonder they are easily mixed up.

To help with the confusion, almost everyone uses the word container to describe both. But you can never actually build a container or download one since containers only exist during runtime. Images, on the other hand, are immutable files. As a result of the immutability, you can not edit an image after you have created one. However, you can use existing images to create a new image by adding new layers on top of the existing ones.

Cooking metaphor:

Image is pre-cooked, frozen treat.
Container is the delicious treat.
Docker is the most popular containerization technology and pioneered the standards most containerization technologies use today. In practice, Docker is a set of products that help us to manage images and containers. This set of products will enable us to leverage all of the benefits of containers. For example, the docker engine will take care of turning the immutable files called images into containers.

For managing the docker containers, there is also a tool called Docker Compose that allows one to orchestrate (control) multiple containers at the same time. In this part we shall use Docker Compose to set up a complex local development environment. In the final version of the development environment that we set up, even installing the Node to our machine is not a requirement anymore.