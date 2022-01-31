import { knex } from '../app';
import { userTable } from '../tableType_alias';

const table_name = 'user';

async function findById(userId: userTable["id"]) {
    const user = await where({ id: userId });
    if (user === null) {
        throw new Error(`${table_name} not found.`);
    }
    return {...user};
}

async function where(condition: { id: string; }) {
    return await knex(table_name)
        .where(condition)
        .then((result: userTable[]) => {
            if (result.length === 0) {
                return null;
            }
            return result[0];
        });
}

export { findById };