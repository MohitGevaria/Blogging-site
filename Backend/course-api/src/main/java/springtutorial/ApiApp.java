package springtutorial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springtutorial.topic.TopicRepository;

//@SpringBootApplication
//@ComponentScan({"springtutorial.topic.*"})
//@EntityScan("springtutorial.topic.*")
//@EnableJpaRepositories("springtutorial.topic.*")
@EnableJpaRepositories
@SpringBootApplication
public class ApiApp {
    public static void main(String[] args) {
        SpringApplication.run(ApiApp.class, args);
    }
}
