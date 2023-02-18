export type TCredentials = {
  email: string;
  pass: string;
};

export type TProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
};

export type TService = {
  actions: Record<string, Function>;
  resourceCreators: Record<string, Function>;
  state: {
    langs: Array<{ code: string; name: string }>;
    authenticated: boolean;
    profile: TProfile;
    account: TCredentials;
  };
};
