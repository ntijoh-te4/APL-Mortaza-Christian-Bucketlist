#!/bin/bash

cd frontend
npm i
npm run web &

cd ../backend
dotnet restore
dotnet watch run dev --launch-profile https
