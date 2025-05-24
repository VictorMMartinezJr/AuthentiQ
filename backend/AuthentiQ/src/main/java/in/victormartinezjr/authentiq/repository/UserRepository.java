package in.victormartinezjr.authentiq.repository;

import in.victormartinezjr.authentiq.enitity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity>findByEmail(String email);
}
