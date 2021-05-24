FROM gitpod/workspace-full
                
USER root
RUN sudo apt-get update
RUN npm i -g npm
RUN npm i -g firebase-tools
RUN npm i -g workbox-cli