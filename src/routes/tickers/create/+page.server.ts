import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({request}) => {
        console.info("create ticker")
        const formData = await request.formData();

        const name = "12345";

        if ( name === formData.get("name") ) {
            return fail(400, {name, alreadyTaken: true})
        }


        return {success: true}
    }
} satisfies Actions