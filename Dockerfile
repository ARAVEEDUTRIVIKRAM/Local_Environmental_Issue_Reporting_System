# ===============================
# ---- Build Stage ----
# ===============================
# Use a more recent Maven image with better mirrors and TLS fixes
FROM maven:3.9.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /workspace

# Copy only pom.xml first to leverage Docker layer caching
COPY pom.xml .

# Pre-download dependencies (with retry + better error handling)
RUN mvn -B -f pom.xml dependency:go-offline -DskipTests || true

# Copy the entire source code
COPY src ./src

# Package the app (skip tests to speed up)
RUN mvn -B -DskipTests clean package

# ===============================
# ---- Runtime Stage ----
# ===============================
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy jar file from the build stage
COPY --from=build /workspace/target/*.jar app.jar

# Create uploads directory for file storage
RUN mkdir -p /app/uploads
VOLUME /app/uploads

# Environment variables
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS=""

# Expose application port
EXPOSE 8888

# Reliable entrypoint command
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dspring.profiles.active=${SPRING_PROFILES_ACTIVE} -jar /app/app.jar"]
