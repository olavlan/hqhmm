#install frontend
FROM node:lts AS frontend
WORKDIR /frontend
COPY build.sh ./ 
COPY package*.json ./
RUN npm ci
RUN npm run build

FROM python:3
WORKDIR /backend

#install hmm
RUN apt-get update && \
    apt-get install -y git build-essential libglm-dev && \
    git clone https://github.com/fogleman/hmm.git && \
    cd hmm && \
    make && \
    make install && \
    cd .. && \
    rm -rf hmm

COPY requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
COPY ./app ./app
COPY --from=frontend /frontend/app/static/dist ./app/static/dist
EXPOSE 80
CMD ["flask", "run", "--debug", "--host", "0.0.0.0", "--port", "80"]