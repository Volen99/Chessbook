FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
# The port 80 shown in the code is internal within the Docker host, so it can't be reached by client apps.
# Client apps can access only the external ports (if any) published when deploying with docker-compose.
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["History/BC/Science/WorldFeed.History.BC.Science/WorldFeed.History.BC.Science.csproj", "History/BC/Science/WorldFeed.History.BC.Science/"]
COPY ["History/WorldFeed.History.Common/WorldFeed.History.Common.csproj", "History/WorldFeed.History.Common/"]
COPY ["WorldFeed.Common/WorldFeed.Common.csproj", "WorldFeed.Common/"]
COPY ["Web/WorldFeed.Web.Shared/WorldFeed.Web.Common.csproj", "Web/WorldFeed.Web.Shared/"]
RUN dotnet restore "History/BC/Science/WorldFeed.History.BC.Science/WorldFeed.History.BC.Science.csproj"
COPY . .
WORKDIR "/src/History/BC/Science/WorldFeed.History.BC.Science"
RUN dotnet build "WorldFeed.History.BC.Science.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WorldFeed.History.BC.Science.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WorldFeed.History.BC.Science.dll"]
