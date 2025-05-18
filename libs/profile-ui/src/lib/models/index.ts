export declare type ProfileDto = {
    id: string;
    userId: string;
    profileName: string;
    profilePic: string;
    coverPic: string;
    bio: string;
    location: string;
    occupation: string;
    interests: string;
    skills: string;
    description: string;
    created_at: Date;
  }
  
  export declare type CreateProfileDto = {
    name: string;
    description: string;
    userId: string;
    profilePic: string;
    coverPic: string;
    bio: string;
    location: string;
    occupation: string;
    interests: string;
    skills: string;
  }
  
  export declare type UpdateProfileDto = {
    name?: string;
    description?: string;
    userId?: string;
    profilePic?: string;
    coverPic?: string;
    bio?: string;
    location?: string;
    occupation?: string;
    interests?: string;
    skills?: string;
  }