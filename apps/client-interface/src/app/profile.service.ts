import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ProfileDto, CreateProfileDto, UpdateProfileDto } from '@optomistic-tanuki/profile-ui';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUserProfiles = signal<ProfileDto[]>([]);
  currentUserProfile = signal<ProfileDto | null>(null);
  constructor(private readonly http: HttpClient) { }

  selectProfile(id: string) {
    const profile = this.currentUserProfiles().find(p => p.id === id);
    if (profile) {
      this.currentUserProfile.set(profile);
      localStorage.setItem('selectedProfile', JSON.stringify(profile));
    }
  }

  getCurrentUserProfiles() {
    return this.currentUserProfiles();
  }

  getCurrentUserProfile() {
    return this.currentUserProfile();
  }

  getAllProfiles() {
    return this.http.get<ProfileDto[]>('/api/profiles').subscribe(profiles => {
      this.currentUserProfiles.set(profiles);
      localStorage.setItem('profiles', JSON.stringify(profiles));
    });
  }

  getProfileById(id: string) {
    return this.http.get<ProfileDto>(`/api/profiles/${id}`).subscribe(profile => {
      this.currentUserProfile.set(profile);
      localStorage.setItem('selectedProfile', JSON.stringify(profile));
    });
  }

  createProfile(profile: CreateProfileDto) {
    return this.http.post<ProfileDto>('/api/profiles', profile).subscribe(newProfile => {
      this.currentUserProfiles.update(profiles => [...profiles, newProfile]);
      localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
    });
  }

  updateProfile(id: string, profile: UpdateProfileDto) {
    return this.http.put<ProfileDto>(`/api/profiles/${id}`, profile).subscribe(updatedProfile => {
      this.currentUserProfiles.update(profiles => profiles.map(p => p.id === id ? updatedProfile : p));
      localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
      if (this.currentUserProfile()?.id === id) {
        this.currentUserProfile.set(updatedProfile);
        localStorage.setItem('selectedProfile', JSON.stringify(updatedProfile));
      }
    });
  }

  deleteProfile(id: string) {
    return this.http.delete<void>(`/api/profiles/${id}`).subscribe(() => {
      this.currentUserProfiles.update(profiles => profiles.filter(p => p.id !== id));
      localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
      if (this.currentUserProfile()?.id === id) {
        this.currentUserProfile.set(null);
        localStorage.removeItem('selectedProfile');
      }
    });
  }

  loadProfilesFromLocalStorage() {
    const profiles = localStorage.getItem('profiles');
    if (profiles) {
      this.currentUserProfiles.set(JSON.parse(profiles));
    }
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (selectedProfile) {
      this.currentUserProfile.set(JSON.parse(selectedProfile));
    }
  }

  persistProfilesToLocalStorage() {
    localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
    localStorage.setItem('selectedProfile', JSON.stringify(this.currentUserProfile()));
  }

}
