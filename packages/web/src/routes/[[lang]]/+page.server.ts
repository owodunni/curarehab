import type { PageServerLoad } from "./$types";
import type { ArticlesAndTerapeutsQuery } from "../../__generated__/gql/graphql";

const query = /* GraphQL */ `
  query ArticlesAndTerapeuts {
    artiklar {
      date_updated
      date_created
      etiketter
      omslagsbild {
        id
        title
      }
      sammanfattning
      slug
      titel
      user_created {
        first_name
        last_name
        work_title
        slug
        avatar {
          id
          title
          filename_download
        }
      }
    }
    terapeuter_directus_users {
      directus_users_id {
        first_name
        last_name
        work_title
        sammanfattning
        slug
        avatar {
          id
          title
          filename_download
        }
      }
    }
  }
`;

export const load: PageServerLoad = async (event) => {
  return event.locals.client.query<ArticlesAndTerapeutsQuery>(query, []).toPromise();
};
