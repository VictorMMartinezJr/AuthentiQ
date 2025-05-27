package in.victormartinezjr.authentiq.io;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String email;
    private String token;
}
