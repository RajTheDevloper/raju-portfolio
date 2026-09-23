FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/portfolio-backend-*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]