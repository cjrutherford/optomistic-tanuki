import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ProfileDto, CreateProfileDto, UpdateProfileDto } from '@optomistic-tanuki/profile-ui';
import { firstValueFrom } from 'rxjs';
import { AuthStateService } from './state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUserProfiles = signal<ProfileDto[]>([]);
  currentUserProfile = signal<ProfileDto | null>(null);
  constructor(private readonly http: HttpClient, private readonly authState: AuthStateService) { }

  selectProfile(_p: ProfileDto) {
    const profile = this.currentUserProfiles().find(p => p.id === _p.id);
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

  async getAllProfiles() {
    const profiles = await firstValueFrom(this.http.get<ProfileDto[]>('/api/profile'));
    this.currentUserProfiles.set(profiles);
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }

  async getProfileById(id: string) {
    const profile = await firstValueFrom(this.http.get<ProfileDto>(`/api/profile/${id}`));
    this.currentUserProfile.set(profile);
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
  }

  async createProfile(profile: CreateProfileDto) {
    const originalProfilePic = profile.profilePic;
    const originalCoverPic = profile.coverPic;
    profile.profilePic = '';
    profile.coverPic = '';
    profile.userId = this.authState.getDecodedTokenValue()?.userId;
    const newProfile = await firstValueFrom(this.http.post<ProfileDto>('/api/profile', profile));
    const picUpdate = await firstValueFrom(this.http.put<ProfileDto>(
      `/api/profile/${newProfile.id}`, 
      { profilePic: originalProfilePic },
    ));
    const coverUpdate = await firstValueFrom(this.http.put<ProfileDto>(`/api/profile/${picUpdate.id}`, { coverPic: originalCoverPic }));
    this.currentUserProfiles.update(profiles => {
      const updatedProfiles = [...profiles, coverUpdate];
      return updatedProfiles.filter((profile, index, self) => 
      index === self.findIndex(p => p.id === profile.id)
      );
    });
    localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
  }

  async updateProfile(id: string, profile: UpdateProfileDto) {
    const updatedProfile = await firstValueFrom(this.http.put<ProfileDto>(`/api/profiles/${id}`, profile));
    this.currentUserProfiles.update(profiles => profiles.map(p => p.id === id ? updatedProfile : p));
    localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
    if (this.currentUserProfile()?.id === id) {
      this.currentUserProfile.set(updatedProfile);
      localStorage.setItem('selectedProfile', JSON.stringify(updatedProfile));
    }
  }

  async deleteProfile(id: string) {
    await firstValueFrom(this.http.delete<void>(`/api/profiles/${id}`));
    this.currentUserProfiles.update(profiles => profiles.filter(p => p.id !== id));
    localStorage.setItem('profiles', JSON.stringify(this.currentUserProfiles()));
    if (this.currentUserProfile()?.id === id) {
      this.currentUserProfile.set(null);
      localStorage.removeItem('selectedProfile');
    }
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
