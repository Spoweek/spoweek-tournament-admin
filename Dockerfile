FROM node:20-bullseye
WORKDIR /app

# copy package files first
COPY package*.json ./

# install dependencies
RUN npm ci

# install web dependencies
RUN npx expo install react-dom react-native-web @expo/metro-runtime

# install ngrok globally so tunnels work non-interactively
RUN npm install -g @expo/ngrok@^4.1.0

# copy rest of the code
COPY . .

# expo dev environment
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV WATCHPACK_POLLING=true

# expose ports
EXPOSE 8081 19000 19001 19002 19006

# start expo with web support
CMD ["npx", "expo", "start", "--web", "--host", "lan", "--port", "19006"]


