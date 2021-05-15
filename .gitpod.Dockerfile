FROM gitpod/workspace-full
                
USER root
RUN sudo apt-get update
RUN npm i -g firebase-tools