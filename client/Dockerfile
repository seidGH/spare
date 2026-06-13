
### -------- Stage 1: Build React app --------
# 1. Start with a base image
FROM node:18-alpine  AS builder

# 2. Set the working directory
WORKDIR /app

# 3. Copy ONLY dependency files (Strategic move!)
COPY package.json package-lock.json ./

# 4. Install dependencies (This layer is cached)
RUN npm install

# 5. Copy the rest of the source code
COPY . .

# 6. Build the app
RUN npm run build
# -------- Stage 2: Serve with Nginx --------
FROM nginx:alpine

# remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# copy build output only , the final static html file only , throwing away the node modules and the entire node application
#thats what make the image lighter and more portable as it drops modules and environments.
COPY --from=builder /app/build /usr/share/nginx/html

# expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


