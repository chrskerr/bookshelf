const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const desiredUserIds = ['kate', 'chris'];

async function seed() {
	const existingUsers = await db.user.findMany();

	for (const userId of desiredUserIds) {
		const hasUser = existingUsers.some(user => user.id === userId);
		if (!hasUser) {
			await db.user.create({ data: { id: userId } });
		}
	}
}

seed();
