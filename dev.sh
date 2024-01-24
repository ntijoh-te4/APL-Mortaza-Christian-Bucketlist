#!/bin/bash

cd frontend
npm i
npm run web

cd ../backend
dotnet restore
dotnet run dev --launch-profile https
