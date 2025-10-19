package chris.springboot.TodoBackend.repository;

import chris.springboot.TodoBackend.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TodoRepository extends JpaRepository<Todo, Long> {

}
