# ===============================
# ---- Build Stage ----
# ===============================
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /workspace

COPY pom.xml .
RUN mvn -B -f pom.xml dependency:go-offline -DskipTests || true

COPY src ./src
RUN mvn -B -DskipTests clean package

# ===============================
# ---- Runtime Stage ----
# ===============================
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Install netcat (required by wait-for.sh)
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

# Copy built JAR
COPY --from=build /workspace/target/*.jar app.jar

# Copy wait-for script
COPY wait-for.sh /app/wait-for.sh
RUN chmod +x /app/wait-for.sh

# Upload folder (for static file serving)
RUN mkdir -p /app/uploads
VOLUME /app/uploads

ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS=""

EXPOSE 8080

ENTRYPOINT ["/app/wait-for.sh", "postgres:5432", "java", "-jar", "/app/app.jar"]
