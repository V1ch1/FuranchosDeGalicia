import { GET_PLACES_LIST_QUERY } from "./schema";

export async function getPlacesList() {
    const { data } = await GET_PLACES_LIST_QUERY()
        .get("/lugares/")
        .catch(({ response }) => {
            return { error: response };
        });

    return data;
}
