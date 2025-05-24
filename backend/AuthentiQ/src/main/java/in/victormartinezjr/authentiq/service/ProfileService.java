package in.victormartinezjr.authentiq.service;

import in.victormartinezjr.authentiq.io.ProfileRequest;
import in.victormartinezjr.authentiq.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest request);
}
