Exsolve / B3

Bucketlist är ett småskaligt projekt som hjälper dig att spara dina personliga mål på webben

## git hooks (run prettier on pre-commit)
activate git hook `git config --local core.hooksPath .githooks/`

## Build instructions

### Setup database

- Install Docker if not already installed `brew install —cask docker`

- Remove any postgres docker images if there is any `rm -rf $HOME/docker/volumes/postgres`

- Pull postgres docker image if not pulled already `docker pull postgres`

- Stop any container named `pg-docker` if there is any running.

- Make docker volumes folder `mkdir -p $HOME/docker/volumes/postgres`

- Start Docker. Replace [ DATABASE_PASSWORD ] with your password.    
```docker run --rm --name pg-docker -e POSTGRES_PASSWORD=[ DATABASE_PASSWORD ] -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres```

- Set [secret storage manager](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=linux) variable DbPassword to your database password `dotnet user-secrets set "DbPassword" "[ DATABASE_PASSWORD ]"`

- Access database through psql `psql -h localhost -U postgres -d postgres -c "CREATE DATABASE bucketlist;"`

- Run migration files `dotnet run migrate`

- Run migration files **and** seed database `dotnet run seed`
