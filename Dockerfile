FROM node:lts AS frontend
WORKDIR /frontend
COPY build.sh ./ 
COPY package*.json ./
RUN npm ci
RUN npm run build

FROM python:3
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
COPY ./app ./app
COPY --from=frontend /frontend/app/static/dist ./app/static/dist
EXPOSE 5002
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5002"]