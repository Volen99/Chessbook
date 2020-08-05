#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["WorldFeed.Identity/WorldFeed.Identity.API.csproj", "WorldFeed.Identity/"]
COPY ["WorldFeed.Common/WorldFeed.Common.csproj", "WorldFeed.Common/"]
COPY ["Web/WorldFeed.Web.Shared/WorldFeed.Web.Common.csproj", "Web/WorldFeed.Web.Shared/"]
RUN dotnet restore "WorldFeed.Identity/WorldFeed.Identity.API.csproj"
COPY . .
WORKDIR "/src/WorldFeed.Identity"
RUN dotnet build "WorldFeed.Identity.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WorldFeed.Identity.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WorldFeed.Identity.API.dll"]