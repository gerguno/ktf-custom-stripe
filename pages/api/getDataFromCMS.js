import {GraphQLClient} from "graphql-request"

export function request({ query, variables }) {
    const endpoint = 'https://api-eu-central-1.graphcms.com/v2/ckipww3t7jgqt01z11xzlhmwi/master';
    const graphcms = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`
        }
    });
    return graphcms.request(query, variables);
}

