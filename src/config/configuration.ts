import { config } from 'dotenv';
import { env } from 'process';

type Configuration = {
  hubspot: {
    accessToken: string;
  };
};

export default (): Configuration => {
  config();

  return {
    hubspot: {
      accessToken: env.HUBSPOT_ACCESS_TOKEN,
    },
  };
};
