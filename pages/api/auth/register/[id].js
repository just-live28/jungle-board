import { connectDB } from '@/util/database';

export default async function register_handler(request, response) {
    const db = (await connectDB).db('board')

    if (request.method == 'GET') {
        const id = request.query.id;

        const result = await db.collection('user').findOne({ userId: id })

        if (result == null) {
            return response.status(200).json({ exists: true });
        }
        return response.status(200).json({ exists: false });
    }
}