type Configuration = {
  hubspot: {
    accessToken: string;
  };
};

export const configuration: Configuration = {
  hubspot: {
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  },
};
