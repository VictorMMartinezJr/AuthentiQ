package in.victormartinezjr.authentiq.repository;

import in.victormartinezjr.authentiq.enitity.UserEntity;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;

import java.util.Optional;

public interface UserRepository extends JpaAttributeConverter<UserEntity, Long> {
    Optional<UserEntity>findByEmail(String email);
}
